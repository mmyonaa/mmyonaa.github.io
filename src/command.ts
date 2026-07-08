// ⌘K 커맨드 팔레트 열림 상태 스토어 (lightbox.ts 와 동일 패턴).
import { ref } from 'vue'

export const commandOpen = ref(false)

export function openCommand(): void {
  commandOpen.value = true
}
export function closeCommand(): void {
  commandOpen.value = false
}
export function toggleCommand(): void {
  commandOpen.value = !commandOpen.value
}
