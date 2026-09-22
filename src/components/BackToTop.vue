<script setup lang="ts">
// 스크롤이 한 화면 이상 내려가면 나타나는 최상단 이동 버튼.
import { onMounted, onUnmounted, ref } from 'vue'

const shown = ref(false)
function onScroll() {
  shown.value = window.scrollY > window.innerHeight * 0.8
}

function toTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <button
    type="button"
    class="to-top"
    :class="{ 'to-top--shown': shown }"
    :tabindex="shown ? 0 : -1"
    :aria-hidden="!shown"
    aria-label="Back to top"
    title="Back to top"
    @click="toTop"
  >
    <span aria-hidden="true">↑</span>
  </button>
</template>

<style scoped src="../styles/BackToTop.css"></style>
