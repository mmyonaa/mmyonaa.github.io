// 이력서 PDF 생성 — 손으로 조판한 docs/resume.html · docs/resume-en.html 을
// public/resume-{ko,en}.pdf 로 변환합니다. (포트폴리오는 build-portfolio.mjs 담당)
//
//   pnpm resume:pdf              # ko + en 둘 다
//   pnpm resume:pdf -- --lang=ko # 하나만
//
// 다른 Chrome 경로는 CHROME_BIN 환경변수로 지정합니다.

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderPdfs } from './lib/html-to-pdf.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const TARGETS = {
  ko: { html: 'docs/resume.html', pdf: 'public/resume-ko.pdf' },
  en: { html: 'docs/resume-en.html', pdf: 'public/resume-en.pdf' },
}

const langArg = process.argv.find((a) => a.startsWith('--lang='))?.slice(7)
const langs = langArg ? [langArg] : Object.keys(TARGETS)

for (const lang of langs) {
  if (!TARGETS[lang]) {
    console.error(`알 수 없는 --lang=${lang} (가능: ${Object.keys(TARGETS).join(', ')})`)
    process.exit(1)
  }
}

const jobs = langs.map((lang) => ({
  label: `resume-${lang}`,
  html: resolve(root, TARGETS[lang].html),
  pdf: resolve(root, TARGETS[lang].pdf),
}))

await renderPdfs(jobs, {
  onDone: ({ label, pdf }) => console.log(`pdf   → ${pdf}  (${label})`),
})
