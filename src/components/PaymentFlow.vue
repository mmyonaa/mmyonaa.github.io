<script setup lang="ts">
// 구독 요금제 업/다운그레이드 플로우 시각화 — 설계 다이어그램(drawio)·연구노트 기준.
// 공개용(safe) 캡션만 렌더 — 내부 테이블/필드명·리뷰어 메모 등은 제외한다.
// (full 상세는 docs/apoc-payment-work.md 에만 보관)
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { locale } from '../i18n'

type Node = {
  id: string
  label: string
  kind: string
  x: number
  y: number
  dashed?: boolean // 다음 주기까지 지연(즉시 결제 없음) 등
  koSafe: string
  enSafe: string
}

const NODES: Node[] = [
  { id: 'req', label: '구독제 전환 요청', kind: 'request', x: 10, y: 50,
    koSafe: '사용자가 요금제 전환을 요청합니다 — 업그레이드 또는 다운그레이드로 분기합니다.',
    enSafe: 'The user requests a plan change — branching into an upgrade or a downgrade.' },
  { id: 'lookup', label: '구독 정보 조회·검증', kind: 'db', x: 31, y: 50,
    koSafe: '구독 정보를 조회해 존재 여부를 확인합니다. 없으면 전환을 실패 처리합니다.',
    enSafe: 'Looks up the subscription and validates that it exists; otherwise the change fails.' },
  // ── 업그레이드 레인
  { id: 'calc', label: '차액 계산 API', kind: 'api', x: 50, y: 27,
    koSafe: '남은 기간의 차액을 미리 계산해 반환합니다 — 사용자가 결제 전에 전환 금액을 확인합니다.',
    enSafe: 'Computes the prorated difference for the remaining period and returns it — the user confirms the amount before paying.' },
  { id: 'charge', label: '즉시 차액 결제', kind: 'pg', x: 71, y: 27,
    koSafe: '차액을 billing key로 즉시 결제하고, 구독·결제 상태를 갱신하며 변경 이력을 남깁니다.',
    enSafe: 'Charges the prorated difference immediately via the billing key, updates subscription/payment state, and records the change in history.' },
  { id: 'upnext', label: '다음 주기 상향 청구', kind: 'cycle', x: 89, y: 27,
    koSafe: '다음 결제 주기부터 상향된 금액으로 자동 청구됩니다.',
    enSafe: 'From the next billing cycle, the higher amount is billed automatically.' },
  // ── 다운그레이드 레인
  { id: 'hist', label: '기존 요금제 이력 저장', kind: 'db', x: 50, y: 73,
    koSafe: '즉시 결제·환불 없이 전환 전 요금제 정보를 이력으로 저장하고 구독 상태를 갱신합니다.',
    enSafe: 'With no immediate charge or refund, saves the pre-change plan as history and updates the subscription state.' },
  { id: 'downnext', label: '다음 주기 하향 청구', kind: 'cycle', x: 89, y: 73, dashed: true,
    koSafe: '다음 결제 주기부터 하향된 금액으로 자동 청구됩니다 (즉시 결제 없음).',
    enSafe: 'From the next billing cycle, the lower amount is billed automatically (no immediate charge).' },
]

const LANES = [
  { text: '▲ UPGRADE', y: 27 },
  { text: '▼ DOWNGRADE', y: 73 },
]

// 신호 흐름 순서 (공통 → 업그레이드 → 다운그레이드)
const ORDER = ['req', 'lookup', 'calc', 'charge', 'upnext', 'hist', 'downnext']

// 연결 (from → to, dashed = 지연 흐름)
const LINKS: { from: string; to: string; dashed?: boolean }[] = [
  { from: 'req', to: 'lookup' },
  { from: 'lookup', to: 'calc' },
  { from: 'lookup', to: 'hist' },
  { from: 'calc', to: 'charge' },
  { from: 'charge', to: 'upnext' },
  { from: 'hist', to: 'downnext', dashed: true },
]

const byId = (id: string) => NODES.find((n) => n.id === id)!
const segments = LINKS.map((l) => {
  const a = byId(l.from)
  const b = byId(l.to)
  return { ...l, x1: a.x, y1: a.y, x2: b.x, y2: b.y }
})

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const active = ref(reduced ? ORDER.indexOf('charge') : 0)
const activeNode = computed(() => byId(ORDER[active.value]))
const caption = computed(() =>
  locale.value === 'en' ? activeNode.value.enSafe : activeNode.value.koSafe,
)

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  if (reduced) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % ORDER.length
  }, 1600)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="pf" :class="{ 'pf--static': reduced }">
    <div class="pf__bar">
      <span class="pf__live"><i class="pf__dot" />FLOW / SUBSCRIPTION_UP_DOWNGRADE</span>
      <span class="pf__tag">apoc · payment</span>
    </div>

    <div class="pf__canvas">
      <span
        v-for="l in LANES"
        :key="l.text"
        class="pf__lane"
        :style="{ top: l.y + '%' }"
        >{{ l.text }}</span
      >

      <svg class="pf__edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          v-for="(s, i) in segments"
          :key="i"
          class="pf__edge"
          :class="{ 'is-dashed': s.dashed, 'is-hot': ORDER[active] === s.to || ORDER[active] === s.from }"
          :x1="s.x1"
          :y1="s.y1"
          :x2="s.x2"
          :y2="s.y2"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <div
        class="pf__pulse"
        :style="{ left: activeNode.x + '%', top: activeNode.y + '%' }"
        aria-hidden="true"
      />

      <div
        v-for="n in NODES"
        :key="n.id"
        class="pf__node"
        :class="{ 'pf__node--dashed': n.dashed, 'is-active': ORDER[active] === n.id }"
        :style="{ left: n.x + '%', top: n.y + '%' }"
      >
        <span class="pf__name">{{ n.label }}</span>
        <span class="pf__kind">{{ n.kind }}</span>
      </div>
    </div>

    <div class="pf__caption">
      <span class="pf__caption-head">{{ activeNode.label }}</span>
      <span class="pf__caption-text">{{ caption }}</span>
    </div>
  </div>
</template>

<style scoped src="../styles/PaymentFlow.css"></style>
