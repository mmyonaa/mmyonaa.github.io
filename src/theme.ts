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
