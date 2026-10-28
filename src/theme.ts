import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

function initial(): Theme {
  const t = document.documentElement.dataset.theme
  return t === 'light' || t === 'dark' ? t : 'dark'
}

export const theme = ref<Theme>(initial())

// 테마 변경 시 문서에 반영 + 저장 (모듈 로드 시 즉시 1회 적용)
watch(
  theme,
  (t) => {
    document.documentElement.dataset.theme = t
    // 브라우저 UI 색(모바일 주소창 등)도 테마를 따른다 — index.css 의 --bg 와 같은 값
    document
      .querySelector('meta[name="theme-color"]:not([media])')
      ?.setAttribute('content', t === 'light' ? '#f4f2ea' : '#0a0a0b')
    try {
      localStorage.setItem('theme', t)
    } catch {
      /* ignore */
    }
  },
  { immediate: true },
)

export function toggleTheme(): void {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
