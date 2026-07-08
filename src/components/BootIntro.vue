<script setup lang="ts">
// 첫 로드 시 짧은 터미널 부팅 시퀀스 → 페이드아웃. 클릭/키로 스킵 가능.
// 세션당 1회(sessionStorage), prefers-reduced-motion 이면 표시하지 않음.
import { onMounted, onUnmounted, ref } from 'vue'

const lines = [
  '> initializing portfolio…',
  '> hyona lim :: full-stack developer',
  '> mounting projects ████████ ok',
  '> ready.',
]

const shown = ref<string[]>([])

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const already = (() => {
  try {
    return sessionStorage.getItem('booted') === '1'
  } catch {
    return false
  }
})()

// 이미 부팅했거나 모션 최소화면 즉시 숨김(깜빡임 방지)
const done = ref(already || reduced)
let skipped = false

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function finish() {
  done.value = true
  try {
    sessionStorage.setItem('booted', '1')
  } catch {
    /* ignore */
  }
}

function skip() {
  if (done.value) return
  skipped = true
  finish()
}

function onKey() {
  skip()
}

onMounted(async () => {
  if (done.value) return
  window.addEventListener('keydown', onKey)
  for (let i = 0; i < lines.length; i++) {
    if (skipped) break
    shown.value.push(lines[i])
    await wait(i === lines.length - 1 ? 340 : 250)
  }
  if (!skipped) {
    await wait(320)
    finish()
  }
})

onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <transition name="boot">
    <div v-if="!done" class="boot" @click="skip">
      <pre class="boot__log"><span
        v-for="(l, i) in shown"
        :key="i"
        class="boot__line"
      >{{ l }}</span><span class="boot__caret" aria-hidden="true">▊</span></pre>
      <span class="boot__skip">click to skip</span>
    </div>
  </transition>
</template>

<style scoped src="../styles/BootIntro.css"></style>
