// 이력서 PDF 생성 — 손으로 조판한 이력서 HTML 을 public/resume-{ko,en}.pdf 로 변환합니다.
// (포트폴리오는 build-portfolio.mjs 담당)
//
// ⚠️ HTML 원본은 이 레포에 없습니다. 이 저장소는 공개(mmyonaa.github.io)라 문안 원본과
//    수정 이력을 두지 않고, private 인 claude-shared 에서 버전 관리합니다.
//    기본 경로: ~/claude-shared/career/documents/  (CAREER_DOCS_DIR 로 덮어쓸 수 있습니다)
//
//   pnpm resume:pdf              # ko + en 둘 다
//   pnpm resume:pdf -- --lang=ko # 하나만
//
// 다른 Chrome 경로는 CHROME_BIN 환경변수로 지정합니다.

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { existsSync } from 'node:fs'
import { renderPdfs } from './lib/html-to-pdf.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = process.env.CAREER_DOCS_DIR || resolve(homedir(), 'claude-shared/career/documents')

const TARGETS = {
  ko: { html: 'resume-ko.html', pdf: 'public/resume-ko.pdf' },
  en: { html: 'resume-en.html', pdf: 'public/resume-en.pdf' },
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
  html: resolve(docsDir, TARGETS[lang].html),
  pdf: resolve(root, TARGETS[lang].pdf),
}))

for (const job of jobs) {
  if (!existsSync(job.html)) {
    console.error(`원본을 찾을 수 없습니다: ${job.html}`)
    console.error(`claude-shared 체크아웃 위치가 다르면 CAREER_DOCS_DIR 로 지정하세요.`)
    process.exit(1)
  }
}

await renderPdfs(jobs, {
  onDone: ({ label, pdf }) => console.log(`pdf   → ${pdf}  (${label})`),
})
