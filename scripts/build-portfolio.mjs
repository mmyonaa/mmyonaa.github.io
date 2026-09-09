// 포트폴리오 PDF 생성 — src/content 의 프로젝트 데이터로 인쇄용 HTML(docs/portfolio.html)을
// 만들고, 헤드리스 크롬으로 public/portfolio-ko.pdf 를 뽑습니다.
// (이력서 PDF 는 손으로 조판한 docs/resume.html 을 사용 — 그쪽은 이 스크립트가 건드리지 않습니다.)
//
//   pnpm portfolio:pdf            # ko
//   pnpm portfolio:pdf -- --lang=en

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lang = (process.argv.find((a) => a.startsWith('--lang=')) || '--lang=ko').slice(7)
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const t =
  lang === 'en'
    ? {
        docTitle: 'Portfolio',
        contents: 'Contents',
        overview: 'Overview',
        highlights: 'Highlights',
        techNotes: 'Technical notes',
        qa: 'QA & Testing',
        screens: 'Screens',
        architecture: 'Architecture',
        links: 'Links',
        page: 'Portfolio',
      }
    : {
        docTitle: '포트폴리오',
        contents: '목차',
        overview: '개요',
        highlights: '주요 성과',
        techNotes: '기술 포인트',
        qa: 'QA · 테스트',
        screens: '화면',
        architecture: '아키텍처',
        links: '링크',
        page: '포트폴리오',
      }

const esc = (s) =>
  String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

// docs/ 기준 상대 경로. 파일이 없으면 제외 (비공개 이미지 등).
// 원본 PNG 를 그대로 넣으면 PDF 가 10MB 를 넘어가서, sips 로 축소한 JPEG 캐시를 참조합니다.
const CACHE = resolve(root, 'docs/.print-cache')
mkdirSync(CACHE, { recursive: true })

function asset(p) {
  const src = resolve(root, 'public', p.replace(/^\//, ''))
  if (!existsSync(src)) return null
  const name = p.replace(/^\//, '').replace(/\//g, '_').replace(/\.\w+$/, '.jpg')
  const out = resolve(CACHE, name)
  const fresh = existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs
  if (!fresh) {
    try {
      execFileSync(
        'sips',
        ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', '1400', src, '--out', out],
        { stdio: 'ignore' },
      )
    } catch {
      return `../public${p}` // sips 없으면 원본 사용
    }
  }
  return `.print-cache/${basename(out)}`
}

function figure(src, caption, cls = '') {
  return `<figure class="shot ${cls}">
            <img src="${src}" alt="" />
            ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
          </figure>`
}

function projectSection(p, i) {
  const shots = (p.images || []).map(asset).filter(Boolean).slice(0, 4)
  const archs = (p.architectureImages || []).map(asset).filter(Boolean).slice(0, 2)
  const links = [
    p.link && { label: 'Live', url: p.link },
    p.repo && { label: 'Repository', url: p.repo },
    p.apiDocs && { label: 'API Docs', url: p.apiDocs },
    p.board && { label: 'Board', url: p.board },
  ].filter(Boolean)

  const block = (title, inner) =>
    inner ? `<div class="block"><h3 class="block__title">${title}</h3>${inner}</div>` : ''

  return `
    <section class="proj">
      <header class="proj__head">
        <div class="proj__no">${String(i + 1).padStart(2, '0')}</div>
        <div class="proj__headmain">
          <h2 class="proj__title">${esc(p.title)}</h2>
          <div class="proj__period">${esc(p.period)}</div>
          <p class="proj__desc">${esc(p.description)}</p>
          <ul class="tags">${(p.tags || []).map((tg) => `<li>${esc(tg)}</li>`).join('')}</ul>
        </div>
      </header>

      ${block(t.overview, (p.overview || []).length ? (p.overview || []).map((x) => `<p class="para">${esc(x)}</p>`).join('') : '')}

      ${block(
        t.highlights,
        (p.highlights || []).length
          ? `<ul class="bullets">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`
          : '',
      )}

      ${block(
        t.techNotes,
        (p.techNotes || []).length
          ? (p.techNotes || [])
              .map(
                (n) =>
                  `<div class="note"><div class="note__title">${esc(n.title)}</div><p class="note__body">${esc(n.body)}</p></div>`,
              )
              .join('')
          : '',
      )}

      ${block(
        t.qa,
        p.qa
          ? `<ul class="stats">${(p.qa.stats || [])
              .map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`)
              .join('')}</ul>` +
              (p.qa.findings || [])
                .map(
                  (f) =>
                    `<div class="note"><div class="note__title">${esc(f.title)}</div><p class="note__body">${esc(f.body)}</p></div>`,
                )
                .join('') +
              (p.qa.note ? `<p class="muted">${esc(p.qa.note)}</p>` : '')
          : '',
      )}

      ${block(
        t.screens,
        shots.length
          ? `<div class="shots">${shots.map((s) => figure(s)).join('')}</div>` +
              (p.imageNote ? `<p class="muted">${esc(p.imageNote)}</p>` : '')
          : p.mediaNote
            ? `<p class="muted">${esc(p.mediaNote)}</p>`
            : '',
      )}

      ${block(
        t.architecture,
        archs.length
          ? archs
              .map((s, ai) => {
                const note = (p.architectureNotes || [])[ai]
                return (
                  `<div class="arch">` +
                  figure(s, (p.architectureCaptions || [])[ai], 'shot--wide') +
                  (note ? `<p class="para">${esc(note)}</p>` : '') +
                  `</div>`
                )
              })
              .join('')
          : '',
      )}

      ${block(
        t.links,
        links.length
          ? `<ul class="links">${links
              .map((l) => `<li><b>${l.label}</b> <span>${esc(l.url)}</span></li>`)
              .join('')}</ul>`
          : '',
      )}
    </section>`
}

function html(content) {
  const { profile, contacts, skills, projects } = content
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <title>${esc(profile.name)} · ${t.docTitle}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #ffffff;
        --text: #1a1a1e;
        --dim: #55555d;
        --faint: #8a8992;
        --line: #e3e0d8;
        --gold: #9a7400;
        --sans: 'Manrope', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
        --mono: 'Space Mono', ui-monospace, monospace;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { font-family: var(--sans); color: var(--text); background: #7a7a7a; }
      @page { size: A4; margin: 14mm 13mm; }

      .sheet { width: 210mm; margin: 12mm auto; padding: 14mm 13mm; background: var(--bg); box-shadow: 0 4px 24px rgba(0,0,0,.25); }

      /* ---------- 표지 ---------- */
      .cover { min-height: 250mm; display: flex; flex-direction: column; }
      .cover__kicker { font-family: var(--mono); font-size: 11px; letter-spacing: .18em; color: var(--gold); text-transform: uppercase; }
      .cover__title { margin-top: 10px; font-size: 46px; font-weight: 800; letter-spacing: -.02em; line-height: 1.05; }
      .cover__name { margin-top: 14px; font-size: 17px; font-weight: 700; }
      .cover__role { margin-top: 3px; font-size: 12px; color: var(--dim); }
      .cover__tagline { margin-top: 10px; max-width: 130mm; font-size: 12px; line-height: 1.6; color: var(--dim); word-break: keep-all; }
      .cover__contact { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 4px 16px; font-family: var(--mono); font-size: 10px; color: var(--dim); }
      .cover__skills { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 18px; }
      .skillgroup__cat { font-family: var(--mono); font-size: 9.5px; letter-spacing: .1em; color: var(--gold); text-transform: uppercase; }
      .skillgroup__items { margin-top: 4px; font-size: 10.5px; line-height: 1.5; color: var(--dim); }

      .toc { margin-top: 22px; padding-top: 14px; border-top: 2px solid var(--text); }
      .toc__title { font-size: 13px; font-weight: 800; letter-spacing: .04em; }
      .toc__list { margin-top: 10px; list-style: none; }
      .toc__list li { display: flex; align-items: baseline; gap: 8px; padding: 5px 0; border-bottom: 1px dotted var(--line); font-size: 11px; }
      .toc__no { font-family: var(--mono); font-size: 9.5px; color: var(--gold); width: 20px; flex-shrink: 0; }
      .toc__name { font-weight: 600; }
      .toc__period { margin-left: auto; font-family: var(--mono); font-size: 9.5px; color: var(--faint); white-space: nowrap; }

      /* ---------- 프로젝트 ---------- */
      .proj { break-before: page; padding-top: 2mm; }
      .proj:first-of-type { break-before: auto; }
      .proj__head { display: flex; gap: 12px; padding-bottom: 12px; border-bottom: 2px solid var(--text); }
      .proj__no { font-family: var(--mono); font-size: 11px; font-weight: 700; color: var(--gold); padding-top: 5px; }
      .proj__headmain { flex: 1; }
      .proj__title { font-size: 21px; font-weight: 800; letter-spacing: -.01em; line-height: 1.2; }
      .proj__period { margin-top: 3px; font-family: var(--mono); font-size: 10px; color: var(--faint); }
      .proj__desc { margin-top: 8px; font-size: 11.5px; line-height: 1.6; color: var(--dim); word-break: keep-all; }
      .tags { margin-top: 9px; list-style: none; display: flex; flex-wrap: wrap; gap: 4px; }
      .tags li { font-family: var(--mono); font-size: 8.5px; letter-spacing: .02em; color: var(--dim); border: 1px solid var(--line); border-radius: 3px; padding: 2px 5px; }

      .block { margin-top: 14px; }
      .block__title { font-family: var(--mono); font-size: 9.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); padding-bottom: 5px; border-bottom: 1px solid var(--line); margin-bottom: 8px; break-after: avoid; }
      .para { font-size: 11px; line-height: 1.65; color: var(--dim); word-break: keep-all; margin-bottom: 6px; }
      .bullets { list-style: none; }
      .bullets li { position: relative; padding-left: 11px; font-size: 11px; line-height: 1.6; margin-bottom: 4px; word-break: keep-all; }
      .bullets li::before { content: ''; position: absolute; left: 0; top: 7px; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; }
      .note { margin-bottom: 9px; break-inside: avoid; }
      .note__title { font-size: 11px; font-weight: 700; }
      .note__body { margin-top: 3px; font-size: 10.5px; line-height: 1.6; color: var(--dim); word-break: keep-all; }
      .muted { margin-top: 6px; font-size: 9.5px; line-height: 1.5; color: var(--faint); word-break: keep-all; }

      .stats { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
      .stats li { border: 1px solid var(--line); border-radius: 4px; padding: 6px 10px; text-align: center; }
      .stats b { display: block; font-size: 14px; font-weight: 800; }
      .stats span { display: block; margin-top: 2px; font-size: 9px; color: var(--faint); }

      .shots { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .shot { break-inside: avoid; }
      .shot img { display: block; margin: 0 auto; width: auto; max-width: 100%; max-height: 66mm; border: 1px solid var(--line); border-radius: 4px; }
      .shot--wide { grid-column: 1 / -1; margin-bottom: 8px; }
      .shot--wide img { max-height: 105mm; }
      .arch { margin-bottom: 10px; }
      .shot figcaption { margin-top: 4px; font-size: 9px; color: var(--faint); word-break: keep-all; }

      .links { list-style: none; }
      .links li { font-size: 10px; line-height: 1.7; }
      .links b { font-family: var(--mono); font-size: 9px; letter-spacing: .06em; color: var(--gold); display: inline-block; width: 70px; }
      .links span { font-family: var(--mono); font-size: 9px; color: var(--dim); word-break: break-all; }

      @media print {
        html { background: #fff; }
        .sheet { width: auto; margin: 0; padding: 0; box-shadow: none; }
        .cover { min-height: 0; height: 247mm; }
      }
    </style>
  </head>
  <body>
    <div class="sheet">
      <section class="cover">
        <div class="cover__kicker">${esc(t.page)}</div>
        <h1 class="cover__title">Selected<br />Work</h1>
        <div class="cover__name">${esc(profile.name)}</div>
        <div class="cover__role">${esc(profile.role)} · ${esc(profile.location)}</div>
        <p class="cover__tagline">${esc(profile.tagline)}</p>
        <div class="cover__contact">${contacts
          .map((c) => `<span>${esc(c.label)} · ${esc(c.value)}</span>`)
          .join('')}</div>

        <div class="cover__skills">${skills
          .map(
            (s) =>
              `<div class="skillgroup"><div class="skillgroup__cat">${esc(s.category)}</div><div class="skillgroup__items">${esc(s.items.join(' · '))}</div></div>`,
          )
          .join('')}</div>

        <nav class="toc">
          <h2 class="toc__title">${esc(t.contents)}</h2>
          <ul class="toc__list">${projects
            .map(
              (p, i) =>
                `<li><span class="toc__no">${String(i + 1).padStart(2, '0')}</span><span class="toc__name">${esc(p.title)}</span><span class="toc__period">${esc(p.period)}</span></li>`,
            )
            .join('')}</ul>
        </nav>
      </section>

      ${projects.map(projectSection).join('\n')}
    </div>
  </body>
</html>
`
}

// --- run ---
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' })
const mod = await server.ssrLoadModule(`/src/content/${lang}.ts`)
await server.close()

const htmlPath = resolve(root, `docs/portfolio${lang === 'en' ? '-en' : ''}.html`)
const pdfPath = resolve(root, `public/portfolio-${lang}.pdf`)
writeFileSync(htmlPath, html(mod[lang]))
console.log(`html  → ${htmlPath}`)

if (!existsSync(CHROME)) {
  console.log(`chrome 없음(${CHROME}) — HTML 만 생성했습니다.`)
  process.exit(0)
}
execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=15000',
  `--print-to-pdf=${pdfPath}`,
  `file://${htmlPath}`,
])
console.log(`pdf   → ${pdfPath}`)
