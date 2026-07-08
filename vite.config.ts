import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// 루트 사용자 페이지(mmyonaa.github.io)로 배포하므로 base 는 '/'.
// 하위 경로(<user>.github.io/<repo>/)로 배포한다면 '/<repo>/' 로 변경하세요.
export default defineConfig({
  plugins: [vue()],
  base: '/',
})
