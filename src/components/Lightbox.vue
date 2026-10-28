<script setup lang="ts">
// 이미지 확대 보기. <dialog> 로 열어 포커스 가두기·ESC·닫힌 뒤 원래 자리로 포커스 복귀를 브라우저에 맡긴다.
import { onBeforeUnmount, ref, watch } from 'vue'
import { lightbox, closeLightbox } from '../lightbox'

const MIN = 1
const MAX = 6
const STEP = 0.4

const dialogEl = ref<HTMLDialogElement | null>(null)
const scale = ref(1)
const tx = ref(0)
const ty = ref(0)

let dragging = false
let lastX = 0
let lastY = 0

function reset() {
  scale.value = 1
  tx.value = 0
  ty.value = 0
}
function zoomBy(d: number) {
  scale.value = Math.min(MAX, Math.max(MIN, Math.round((scale.value + d) * 100) / 100))
  if (scale.value === 1) {
    tx.value = 0
    ty.value = 0
  }
}
function onWheel(e: WheelEvent) {
  e.preventDefault()
  zoomBy(e.deltaY < 0 ? STEP : -STEP)
}
function onDown(e: PointerEvent) {
  if (scale.value === 1) return
  dragging = true
  lastX = e.clientX
  lastY = e.clientY
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
}
function onMove(e: PointerEvent) {
  if (!dragging) return
  tx.value += e.clientX - lastX
  ty.value += e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
}
function onUp() {
  dragging = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === '+' || e.key === '=') zoomBy(STEP)
  else if (e.key === '-' || e.key === '_') zoomBy(-STEP)
}

watch(
  () => lightbox.open,
  (open) => {
    const d = dialogEl.value
    if (open) {
      reset()
      if (d && !d.open) d.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (d?.open) d.close()
    }
  },
)
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialogEl"
      class="lb"
      :aria-label="lightbox.alt || 'Image'"
      @cancel.prevent="closeLightbox"
      @close="closeLightbox"
      @keydown="onKey"
    >
      <div v-if="lightbox.open" class="lb__stage" @wheel="onWheel" @pointerdown.self="closeLightbox">
        <img
          class="lb__img"
          :class="{ 'is-zoomed': scale > 1 }"
          :src="lightbox.src"
          :alt="lightbox.alt"
          draggable="false"
          :style="{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }"
          @pointerdown="onDown"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointercancel="onUp"
          @dblclick="scale > 1 ? reset() : zoomBy(1.4)"
        />
      </div>

      <div class="lb__bar" @pointerdown.stop>
        <button type="button" aria-label="축소" @click="zoomBy(-STEP)">−</button>
        <span class="lb__zoom" role="status" aria-live="polite">{{ Math.round(scale * 100) }}%</span>
        <button type="button" aria-label="확대" @click="zoomBy(STEP)">+</button>
        <button type="button" aria-label="원래 크기" @click="reset">⤢</button>
      </div>

      <button class="lb__close" type="button" aria-label="닫기" @click="closeLightbox">✕</button>
      <p v-if="lightbox.alt" class="lb__caption">{{ lightbox.alt }}</p>
    </dialog>
  </Teleport>
</template>

<style scoped src="../styles/Lightbox.css"></style>
