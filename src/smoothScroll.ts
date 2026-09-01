// 관성 스크롤 — haoqi.design 실측을 그대로 옮긴 것.
//
// 계측(2026-09-01): 휠 임펄스 후 목표까지 남은 거리가 100ms 마다 0.548배로 줄었다
// (497→272→149→82→45→24→13, 편차 없음). 즉 순수 지수 감쇠이고
//   λ = -ln(0.548)/0.1 ≈ 6.0 /s,  반감기 116ms,  60fps 환산 lerp 0.095.
// 휠 델타는 배율 없이 1:1 로 목표에 더해진다(1000 → 정확히 1000px). 스냅 없음.
//
// 구현 방침: 문서를 통째로 transform 하지 않고 네이티브 스크롤 위치만 매 프레임 쓴다.
// 그래야 position:fixed(Navbar·HudFrame), 스크롤바, 앵커 이동이 전부 그대로 산다.
// 휠만 가로챈다 — 터치는 OS 관성이 이미 낫고, 가로채면 오히려 나빠진다.

export const LAMBDA = 6.0

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)

const maxScroll = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

// 휠이 향한 곳에 자체 스크롤 여지가 있으면(모달 내부 목록 등) 건드리지 않는다.
function hasScrollableAncestor(start: EventTarget | null, dy: number): boolean {
  const from = start instanceof Element ? start : null
  for (let n: Element | null = from; n && n !== document.body; n = n.parentElement) {
    const s = getComputedStyle(n)
    if (!/auto|scroll/.test(s.overflowY)) continue
    if (n.scrollHeight <= n.clientHeight) continue
    if (dy > 0 && n.scrollTop + n.clientHeight < n.scrollHeight - 1) return true
    if (dy < 0 && n.scrollTop > 1) return true
  }
  return false
}

export function initSmoothScroll(): () => void {
  // 모션 최소화 선호 / 터치 기기에서는 아예 걸지 않는다.
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return () => {}
  }

  let target = window.scrollY
  // 브라우저는 스크롤 위치를 정수로 반올림한다. 매 프레임 window.scrollY 를 다시 읽으면
  // 잔여거리가 1px 밑으로 내려간 순간 증분이 반올림에 먹혀 위치가 멈추고, 종료 조건에
  // 영영 닿지 못해 루프가 영구히 돈다(실측으로 확인). 그래서 실수 위치를 따로 들고 간다.
  let current = window.scrollY
  let written = -1 // 마지막으로 우리가 써넣은 스크롤 값
  let last = 0
  let raf = 0

  function frame(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05) // 탭 복귀 시 점프 방지
    last = now

    current += (target - current) * (1 - Math.exp(-LAMBDA * dt))

    // 0.5px 안으로 들어오면 목표에 붙이고 루프를 끝낸다 — 정지 상태에서 rAF 0회.
    if (Math.abs(target - current) < 0.5) {
      current = target
      written = target
      window.scrollTo({ top: target, behavior: 'instant' })
      raf = 0
      return
    }

    written = current
    window.scrollTo({ top: current, behavior: 'instant' })
    raf = requestAnimationFrame(frame)
  }

  function onWheel(e: WheelEvent) {
    if (e.ctrlKey) return // 브라우저 확대 제스처
    if (document.body.style.overflow === 'hidden') return // 라이트박스 등 스크롤 잠금 중
    if (maxScroll() <= 0) return
    if (hasScrollableAncestor(e.target, e.deltaY)) return

    e.preventDefault()
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
    target = clamp(target + e.deltaY * unit, 0, maxScroll())

    if (!raf) {
      current = window.scrollY // 멈춰 있던 동안 다른 수단으로 움직였을 수 있다
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
  }

  // 우리가 쓰지 않은 스크롤(스크롤바 드래그·키보드·앵커 이동)은 그대로 존중하고 목표를 재동기화.
  function onScroll() {
    if (Math.abs(window.scrollY - written) < 2) return
    target = current = window.scrollY
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('scroll', onScroll)
  }
}
