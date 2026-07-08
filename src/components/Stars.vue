<script setup lang="ts">
// 결정적(deterministic) 의사난수로 별 위치를 생성 — 새로고침해도 동일.
function frac(n: number): number {
  const v = Math.sin(n) * 43758.5453
  return v - Math.floor(v)
}

const stars = Array.from({ length: 90 }, (_, i) => ({
  left: frac(i * 1.13) * 100,
  top: frac(i * 2.31 + 5) * 100,
  size: 1 + frac(i * 3.77) * 1.8,
  opacity: 0.18 + frac(i * 4.19) * 0.6,
  delay: frac(i * 5.91) * 5,
}))
</script>

<template>
  <div class="stars" aria-hidden="true">
    <span
      v-for="(s, i) in stars"
      :key="i"
      :style="{
        left: s.left + '%',
        top: s.top + '%',
        width: s.size + 'px',
        height: s.size + 'px',
        opacity: s.opacity,
        animationDelay: s.delay + 's',
      }"
    />
  </div>
</template>

<style scoped src="../styles/Stars.css"></style>
