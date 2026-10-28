// Google Fonts 에서 사이트가 쓰는 서체의 latin 서브셋 woff2 를 받아 public/fonts/ 에 두고,
// src/fonts.css 에 @font-face 를 생성한다. 폰트 파일은 저장소에 들어가므로 보통 다시 돌릴 일은 없다.
// 사용: node scripts/fetch-fonts.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const FAMILIES = 'family=Manrope:wght@300..700&family=Space+Mono:wght@400;700'
const SUBSETS = ['latin', 'latin-ext'] // 한글은 시스템 서체 폴백 — Manrope 에 한글이 없다
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' // woff2 + unicode-range 응답을 받기 위한 UA

const root = resolve(import.meta.dirname, '..')
const outDir = resolve(root, 'public/fonts')
mkdirSync(outDir, { recursive: true })

const css = await (await fetch(`https://fonts.googleapis.com/css2?${FAMILIES}&display=swap`, { headers: { 'User-Agent': UA } })).text()

// 블록: /* latin */ @font-face { ... }
const blocks = [...css.matchAll(/\/\* (\S+) \*\/\s*@font-face \{([^}]+)\}/g)]
let out = '/* 자가 호스팅 서체 — scripts/fetch-fonts.mjs 가 생성. 직접 고치지 않는다. */\n'
let n = 0
for (const [, subset, body] of blocks) {
  if (!SUBSETS.includes(subset)) continue
  const family = body.match(/font-family: '([^']+)'/)[1]
  const weight = body.match(/font-weight: ([\d ]+)/)[1]
  const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1]
  const range = body.match(/unicode-range: ([^;]+);/)[1]
  const file = `${family.replace(/\s+/g, '')}-${weight.replace(' ', '-')}-${subset}.woff2`
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
  writeFileSync(resolve(outDir, file), buf)
  out += `@font-face {\n  font-family: '${family}';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('/fonts/${file}') format('woff2');\n  unicode-range: ${range};\n}\n`
  n++
  console.log(file, buf.length)
}
writeFileSync(resolve(root, 'src/fonts.css'), out)
console.log(`${n} faces → public/fonts, src/fonts.css`)
