// 인쇄용 HTML → A4 PDF 공용 렌더러.
//
// `--virtual-time-budget` 로 시간을 추측하는 대신 CDP 로 붙어서
// 폰트·이미지 로딩 완료를 실제로 기다리고, 이미지가 빠지면 에러로 중단합니다.
// `preferCSSPageSize` 라 HTML 의 @page 규칙(여백·용지)이 그대로 적용됩니다.
//
//   import { renderPdfs } from './lib/html-to-pdf.mjs'
//   await renderPdfs([{ label: 'resume', html: '/abs/in.html', pdf: '/abs/out.pdf' }])

import { spawn } from 'node:child_process'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

export const CHROME_BIN =
  process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * @param {{label?: string, html: string, pdf: string}[]} jobs 변환할 HTML→PDF 쌍(절대 경로)
 * @param {{chrome?: string, width?: number, height?: number, onDone?: Function}} [opts]
 * @returns {Promise<{label: string, pdf: string, missingImages: string[]}[]>}
 */
export async function renderPdfs(jobs, opts = {}) {
  const chrome = opts.chrome || CHROME_BIN
  if (!existsSync(chrome)) throw new Error(`Chrome 을 찾을 수 없습니다: ${chrome}`)
  for (const job of jobs) {
    if (!existsSync(job.html)) throw new Error(`입력 HTML 이 없습니다: ${job.html}`)
  }

  const profile = await mkdtemp(join(tmpdir(), 'html-to-pdf-'))
  const proc = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  let launchError
  proc.on('error', (error) => {
    launchError = error
  })

  let socket
  const pending = new Map()
  let seq = 0
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++seq
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`CDP timeout: ${method}`))
      }, 60000)
      pending.set(id, { resolve, reject, timer })
      socket.send(JSON.stringify({ id, method, params }))
    })

  const results = []
  try {
    let port
    for (let i = 0; i < 100; i++) {
      if (launchError) throw launchError
      try {
        port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]
        break
      } catch {}
      await delay(100)
    }
    if (!port) throw new Error('Chrome 이 기동하지 않았습니다')

    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    socket = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true })
      socket.addEventListener('error', reject, { once: true })
    })
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      const entry = pending.get(message.id)
      if (!entry) return
      clearTimeout(entry.timer)
      pending.delete(message.id)
      message.error ? entry.reject(new Error(JSON.stringify(message.error))) : entry.resolve(message.result)
    })

    await send('Page.enable')
    await send('Emulation.setDeviceMetricsOverride', {
      width: opts.width ?? 1100,
      height: opts.height ?? 1200,
      deviceScaleFactor: 1,
      mobile: false,
    })
    await send('Emulation.setEmulatedMedia', { media: 'print' })

    for (const job of jobs) {
      const label = job.label || job.html
      const url = pathToFileURL(job.html).href
      await send('Page.navigate', { url })
      for (let i = 0; i < 100; i++) {
        const loaded = await send('Runtime.evaluate', {
          expression: `location.href === ${JSON.stringify(url)} && document.readyState === 'complete'`,
          returnByValue: true,
        })
        if (loaded.result.value) break
        await delay(50)
      }

      // 폰트·이미지가 실제로 준비될 때까지 대기하고, 빠진 이미지를 보고합니다.
      const probe = await send('Runtime.evaluate', {
        expression: `(async () => {
          await document.fonts.ready
          await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
          if (window.printReady) await window.printReady
          return {
            printAudit: window.printAudit || null,
            missingImages: [...document.images]
              .filter(image => !image.complete || !image.naturalWidth)
              .map(image => image.src),
          }
        })()`,
        awaitPromise: true,
        returnByValue: true,
      })
      if (probe.exceptionDetails) {
        throw new Error(`${label}: ${probe.exceptionDetails.exception?.description || probe.exceptionDetails.text}`)
      }
      const { missingImages } = probe.result.value
      if (missingImages.length) {
        throw new Error(`${label}: 이미지 ${missingImages.length}개 누락 — ${missingImages[0]}`)
      }

      const pdf = await send('Page.printToPDF', {
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        transferMode: 'ReturnAsStream',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      })
      const chunks = []
      try {
        while (true) {
          const chunk = await send('IO.read', { handle: pdf.stream, size: 65536 })
          chunks.push(Buffer.from(chunk.data, chunk.base64Encoded ? 'base64' : 'utf8'))
          if (chunk.eof) break
        }
      } finally {
        await send('IO.close', { handle: pdf.stream })
      }
      await writeFile(job.pdf, Buffer.concat(chunks))

      const result = { label, pdf: job.pdf, missingImages, printAudit: probe.result.value.printAudit }
      results.push(result)
      opts.onDone?.(result)
    }
  } finally {
    if (socket) socket.close()
    for (const { timer } of pending.values()) clearTimeout(timer)
    proc.kill('SIGTERM')
    await delay(500)
    if (proc.exitCode === null && proc.signalCode === null) proc.kill('SIGKILL')
    await delay(200)
    await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 })
  }

  return results
}
