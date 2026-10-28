import { ref, watch } from 'vue'

export type Locale = 'ko' | 'en'

function initial(): Locale {
  try {
    // ?lang=en 처럼 URL 로 언어를 고정할 수 있다 (hreflang 링크가 이 형식을 쓴다). 저장값보다 우선
    const q = new URLSearchParams(location.search).get('lang')
    if (q === 'ko' || q === 'en') return q
    const s = localStorage.getItem('locale')
    if (s === 'ko' || s === 'en') return s
  } catch {
    /* ignore */
  }
  return 'ko'
}

export const locale = ref<Locale>(initial())

// 언어 변경 시 <html lang> 반영 + 저장 (모듈 로드 시 즉시 1회 적용)
watch(
  locale,
  (l) => {
    document.documentElement.lang = l
    try {
      localStorage.setItem('locale', l)
    } catch {
      /* ignore */
    }
  },
  { immediate: true },
)

export function toggleLocale(): void {
  locale.value = locale.value === 'ko' ? 'en' : 'ko'
}

export function setLocale(l: Locale): void {
  locale.value = l
}

// 드롭다운 등 UI 에서 사용하는 언어 목록 (코드 / 표시명)
export const LOCALES: { value: Locale; label: string; short: string }[] = [
  { value: 'ko', label: '한국어', short: 'KO' },
  { value: 'en', label: 'English', short: 'EN' },
]
