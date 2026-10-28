// public/projects 의 이미지 크기를 재서 src/content/image-dims.ts 를 생성한다.
// <img width/height> 에 써서 로딩 중 레이아웃이 밀리지 않게 하는 용도. 이미지를 추가·교체하면 다시 돌린다.
// 사용: node scripts/image-dims.mjs
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dir = resolve(root, 'public/projects')
const exts = /\.(webp|png|jpe?g|avif)$/i

function walk(d) {
  return readdirSync(d).flatMap((f) => {
    const p = join(d, f)
    return statSync(p).isDirectory() ? walk(p) : exts.test(f) ? [p] : []
  })
}

const dims = {}
for (const p of walk(dir).sort()) {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', p], { encoding: 'utf8' })
  const w = +(out.match(/pixelWidth: (\d+)/) || [])[1]
  const h = +(out.match(/pixelHeight: (\d+)/) || [])[1]
  if (w && h) dims['/' + relative(resolve(root, 'public'), p)] = [w, h]
}

const body = Object.entries(dims)
  .map(([k, [w, h]]) => `  '${k}': [${w}, ${h}],`)
  .join('\n')
writeFileSync(
  resolve(root, 'src/content/image-dims.ts'),
  `// 이미지 고유 크기 [width, height] — scripts/image-dims.mjs 가 생성. 직접 고치지 않는다.\nexport const imageDims: Record<string, [number, number]> = {\n${body}\n}\n`,
)
console.log(`${Object.keys(dims).length} images → src/content/image-dims.ts`)
