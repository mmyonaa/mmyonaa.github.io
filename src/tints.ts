import { computed } from 'vue'
import { theme } from './theme'

// 이미지가 없는 프로젝트 목업 카드의 배경 그라디언트 (테마별)
const darkTints = [
  'radial-gradient(70% 90% at 78% 18%, rgba(230,200,77,0.22), transparent 60%), linear-gradient(150deg, #16161a, #0f0f12)',
  'radial-gradient(70% 90% at 22% 22%, rgba(120,160,255,0.18), transparent 60%), linear-gradient(150deg, #14151a, #0f0f12)',
  'radial-gradient(70% 90% at 60% 85%, rgba(255,120,170,0.18), transparent 60%), linear-gradient(150deg, #18141a, #0f0f12)',
]

const lightTints = [
  'radial-gradient(70% 90% at 78% 18%, rgba(154,116,0,0.16), transparent 60%), linear-gradient(150deg, #f0ede3, #ffffff)',
  'radial-gradient(70% 90% at 22% 22%, rgba(90,120,220,0.14), transparent 60%), linear-gradient(150deg, #edf0f5, #ffffff)',
  'radial-gradient(70% 90% at 60% 85%, rgba(210,90,140,0.14), transparent 60%), linear-gradient(150deg, #f5edf1, #ffffff)',
]

// 현재 테마에 맞는 tint 배열 (컴포넌트에서 index 로 접근)
export const tints = computed(() => (theme.value === 'light' ? lightTints : darkTints))
