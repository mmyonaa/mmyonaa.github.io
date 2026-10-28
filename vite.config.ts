import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 푸터 콜로폰에 찍는 버전·커밋. 버전 정본은 package.json, 커밋은 빌드 시점의 HEAD.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string }
let commit = ''
try {
  commit = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
} catch {
  /* git 이 없는 환경 — 커밋 표기 생략 */
}

// https://vite.dev/config/
// 루트 사용자 페이지(mmyonaa.github.io)로 배포하므로 base 는 '/'.
// 하위 경로(<user>.github.io/<repo>/)로 배포한다면 '/<repo>/' 로 변경하세요.
export default defineConfig({
  plugins: [vue()],
  base: '/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __COMMIT_HASH__: JSON.stringify(commit),
  },
})
