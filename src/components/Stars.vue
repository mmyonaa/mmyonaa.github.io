<script setup lang="ts">
// 커서 반응형 별자리 — 결정적(deterministic) 위치의 별들을 캔버스에 그리고,
// 커서 근처 별들을 얇은 선으로 연결(constellation) + 미세 패럴럭스.
// prefers-reduced-motion 이면 반짝임·선·패럴럭스 없이 정적으로만 표시.
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)

// sin 기반 의사난수 — 새로고침해도 동일한 별 배치
function frac(n: number): number {
  const v = Math.sin(n) * 43758.5453
  return v - Math.floor(v)
}

let cleanup: (() => void) | null = null

onMounted(() => {
  const cv = canvas.value
  if (!cv) return
  const ctx = cv.getContext('2d')
  if (!ctx) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const N = 104
  const stars = Array.from({ length: N }, (_, i) => ({
    bx: frac(i * 1.13), // 0..1 (화면 비율 기준)
    by: frac(i * 2.31 + 5),
    r: 0.6 + frac(i * 3.77) * 1.2,
    base: 0.18 + frac(i * 4.19) * 0.6,
    phase: frac(i * 5.91) * Math.PI * 2,
    speed: 0.6 + frac(i * 7.13) * 0.9,
  }))

  let w = 0
  let h = 0
  const mouse = { x: -9999, y: -9999, active: false }
  let px = 0
  let py = 0
  let raf = 0
  const R = 150 // 연결 반경(px)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = window.innerWidth
    h = window.innerHeight
    cv!.width = Math.floor(w * dpr)
    cv!.height = Math.floor(h * dpr)
    cv!.style.width = w + 'px'
    cv!.style.height = h + 'px'
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function palette() {
    const light = document.documentElement.dataset.theme === 'light'
    return light
      ? { star: '154,116,0', line: '154,116,0' }
      : { star: '255,255,255', line: '230,200,77' }
  }

  function frame(t: number) {
    const time = t / 1000
    ctx!.clearRect(0, 0, w, h)
    const c = palette()

    const tx = mouse.active ? (mouse.x / w - 0.5) * -18 : 0
    const ty = mouse.active ? (mouse.y / h - 0.5) * -18 : 0
    px += (tx - px) * 0.05
    py += (ty - py) * 0.05

    const pts: { x: number; y: number }[] = []
    for (const s of stars) {
      const x = s.bx * w + px * s.speed
      const y = s.by * h + py * s.speed
      pts.push({ x, y })
      const a = reduced ? s.base : s.base * (0.55 + 0.45 * Math.sin(time * s.speed + s.phase))
      ctx!.beginPath()
      ctx!.arc(x, y, s.r, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${c.star},${a.toFixed(3)})`
      ctx!.fill()
    }

    if (!reduced && mouse.active) {
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (dm >= R) continue
        const o = (1 - dm / R) * 0.6
        ctx!.beginPath()
        ctx!.moveTo(p.x, p.y)
        ctx!.lineTo(mouse.x, mouse.y)
        ctx!.strokeStyle = `rgba(${c.line},${(o * 0.5).toFixed(3)})`
        ctx!.lineWidth = 0.6
        ctx!.stroke()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const ds = Math.hypot(p.x - q.x, p.y - q.y)
          if (ds >= R * 0.72) continue
          if (Math.hypot(q.x - mouse.x, q.y - mouse.y) >= R) continue
          const oo = (1 - ds / (R * 0.72)) * o
          ctx!.beginPath()
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(q.x, q.y)
          ctx!.strokeStyle = `rgba(${c.line},${(oo * 0.45).toFixed(3)})`
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }
    }

    raf = requestAnimationFrame(frame)
  }

  function onMove(e: PointerEvent) {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.active = true
  }
  function onLeave() {
    mouse.active = false
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerleave', onLeave)
  raf = requestAnimationFrame(frame)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', onLeave)
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="stars" aria-hidden="true"></canvas>
</template>

<style scoped src="../styles/Stars.css"></style>
