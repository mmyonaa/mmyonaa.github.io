<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 데스크톱(마우스) + 모션 허용 환경에서만 활성화
const enabled =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const el = ref<HTMLElement | null>(null)
const active = ref(false) // 링크·버튼 위
const visible = ref(false) // 첫 이동 전에는 숨김

let tx = 0
let ty = 0 // 목표(실제 포인터)
let cx = 0
let cy = 0 // 렌더(감속 추적)
let raf = 0

const INTERACTIVE = 'a, button, input, textarea, select, summary, [role="button"], .lang'

function onMove(e: MouseEvent) {
  tx = e.clientX
  ty = e.clientY
  if (!visible.value) {
    cx = tx
    cy = ty
    visible.value = true
  }
}
function onOver(e: MouseEvent) {
  active.value = !!(e.target as HTMLElement).closest?.(INTERACTIVE)
}
function onLeave() {
  visible.value = false
}

// 포인터가 안에 있고 탭이 보일 때만 돈다 — 그 외에는 프레임을 쓰지 않는다
let running = false
function loop() {
  if (!visible.value || document.hidden) {
    running = false
    return
  }
  cx += (tx - cx) * 0.18
  cy += (ty - cy) * 0.18
  if (el.value) {
    el.value.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(loop)
}
function ensureLoop() {
  if (running) return
  running = true
  raf = requestAnimationFrame(loop)
}
function onMoveStart(e: MouseEvent) {
  onMove(e)
  ensureLoop()
}
function onVisibility() {
  if (!document.hidden && visible.value) ensureLoop()
}

onMounted(() => {
  if (!enabled) return
  window.addEventListener('mousemove', onMoveStart, { passive: true })
  window.addEventListener('mouseover', onOver, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  if (!enabled) return
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMoveStart)
  window.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div
    v-if="enabled"
    ref="el"
    class="cursor"
    :class="{ 'cursor--active': active, 'is-visible': visible }"
    aria-hidden="true"
  >
    <span class="cursor__dot" />
  </div>
</template>

<style scoped src="../styles/CursorFollower.css"></style>
