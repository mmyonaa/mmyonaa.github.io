import { reactive } from 'vue'

// 전역 라이트박스 상태. openLightbox(src, alt) 로 열고, Lightbox.vue 가 렌더.
export const lightbox = reactive({
  open: false,
  src: '',
  alt: '',
})

export function openLightbox(src: string, alt = '') {
  lightbox.src = src
  lightbox.alt = alt
  lightbox.open = true
}

export function closeLightbox() {
  lightbox.open = false
}
