<script setup lang="ts">
// 계기판 프레임 — 뷰포트 전체에 깔리는 헤어라인 그리드 + 교차점 십자선,
// 그리고 하단 세 개의 모노 판독값(서울 시각 / 커서 좌표 / 스크롤 진행률).
// 콘텐츠가 아니라 '틀'이다. 장면이 바뀌어도 이 프레임만은 그대로 남는다.
//
// 비용 관리: 시계는 1초 interval, 커서·스크롤은 rAF 게이팅(이벤트가 있을 때만
// 한 프레임 예약)으로 최대 60회/초에서 멈춘다. 탭이 숨으면 시계도 멈춘다.
import { onMounted, onUnmounted, ref } from 'vue'

const COLS = 4 // 세로 괘선 4줄 → 3컬럼
const ROWS = [33.3333, 66.6667] // 가로 괘선 위치(%)

const clock = ref('')
const cursor = ref('0000 X 0000 Y')
const progress = ref('000%')

let timer = 0
let raf = 0
let cleanup: (() => void) | null = null

const time = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function tick() {
  clock.value = `GMT+9 SEOUL ${time.format(new Date())}`
}

onMounted(() => {
  const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0')

  let px = 0
  let py = 0
  let dirty = false

  // 이벤트가 들어온 프레임에만 DOM 을 갱신한다. 포인터가 멈추면 루프도 멈춘다.
  function flush() {
    raf = 0
    dirty = false
    cursor.value = `${pad(px)} X ${pad(py)} Y`
    const span = document.documentElement.scrollHeight - window.innerHeight
    const pct = span > 0 ? (window.scrollY / span) * 100 : 0
    progress.value = `${String(Math.round(pct)).padStart(3, '0')}%`
  }
  function schedule() {
    if (dirty) return
    dirty = true
    raf = requestAnimationFrame(flush)
  }

  function onMove(e: PointerEvent) {
    px = e.clientX
    py = e.clientY
    schedule()
  }

  function onVisible() {
    if (document.hidden) {
      clearInterval(timer)
      timer = 0
    } else if (!timer) {
      tick()
      timer = window.setInterval(tick, 1000)
    }
  }

  tick()
  timer = window.setInterval(tick, 1000)
  schedule()
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  document.addEventListener('visibilitychange', onVisible)

  cleanup = () => {
    clearInterval(timer)
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    document.removeEventListener('visibilitychange', onVisible)
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <div class="hud" aria-hidden="true">
    <div class="hud__grid">
      <i
        v-for="c in COLS"
        :key="'v' + c"
        class="hud__v"
        :style="{ left: ((c - 1) / (COLS - 1)) * 100 + '%' }"
      >
        <b v-for="r in ROWS" :key="'x' + r" class="hud__cross" :style="{ top: r + '%' }" />
      </i>
      <i v-for="r in ROWS" :key="'h' + r" class="hud__h" :style="{ top: r + '%' }" />
    </div>

    <div class="hud__readout hud__readout--left">{{ clock }}</div>
    <div class="hud__readout hud__readout--center">{{ cursor }}</div>
    <div class="hud__readout hud__readout--right">{{ progress }}</div>
  </div>
</template>

<style scoped src="../styles/HudFrame.css"></style>
