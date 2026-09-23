<script setup lang="ts">
// 경력 레인 차트 — 아래 Experience·Activities·Education 목록의 색인.
// 세로 목록은 항목을 하나씩 보여줄 뿐 '같은 시기에 무엇이 겹쳐 있었는지'를 못 보여준다.
// 그 겹침(재학 중 강의·부트캠프, 재직 중 외주)만 보이게 하는 것이 이 차트의 목적이다.
//
// 데이터는 site.ts 의 세 배열을 그대로 쓴다 — 별도 콘텐츠를 두면 목록과 어긋난다.
// 기간 문자열은 ko·en 이 같은 숫자 표기('2023.11 – 2025.05')라 파서 하나로 처리한다.
import { computed, ref } from 'vue'
import { aboutDetail } from '../data'

type Span = {
  key: string
  label: string
  from: number // 시작 월 인덱스
  to: number // 끝 월 인덱스 (포함)
  vague: boolean // 연도만 주어진 항목 — 월을 모른다
  ongoing: boolean
  target: string // 클릭 시 이동할 목록 항목 id
}

const MONTH_RE = /(\d{4})\.(\d{1,2})/g
const idx = (y: number, m: number) => y * 12 + (m - 1)

const now = new Date()
const nowIdx = idx(now.getFullYear(), now.getMonth() + 1)

// '2020.03 – 2025.02' · '2025.09 –' · '2025.09 – 현재' · '2026.05 – 07' · '2026'
function parse(period: string): { from: number; to: number; vague: boolean; ongoing: boolean } | null {
  const hits = [...period.matchAll(MONTH_RE)]

  if (hits.length >= 2) {
    const from = idx(+hits[0][1], +hits[0][2])
    const to = idx(+hits[1][1], +hits[1][2])
    return { from, to, vague: false, ongoing: false }
  }

  if (hits.length === 1) {
    const year = +hits[0][1]
    const from = idx(year, +hits[0][2])
    const tail = period.slice((hits[0].index ?? 0) + hits[0][0].length)

    const sameYear = tail.match(/^\s*[–~-]\s*(\d{1,2})\s*$/) // '2026.05 – 07'
    if (sameYear) return { from, to: idx(year, +sameYear[1]), vague: false, ongoing: false }

    const open = /[–~-]/.test(tail) // '2025.09 –' · '2025.09 – 현재' · '– Present'
    return { from, to: open ? nowIdx : from, vague: false, ongoing: open }
  }

  const yearOnly = period.match(/(\d{4})/)
  if (yearOnly) {
    const y = +yearOnly[1]
    return { from: idx(y, 1), to: Math.min(idx(y, 12), nowIdx), vague: true, ongoing: false }
  }
  return null
}

function toSpans(
  items: { period: string; title?: string; school?: string; shortLabel?: string }[],
  kind: string,
): Span[] {
  return items
    .map((it, i) => {
      const p = parse(it.period)
      if (!p) return null
      return {
        key: `${kind}-${i}`,
        label: it.shortLabel ?? it.title ?? it.school ?? '',
        target: `tl-${kind}-${i}`,
        ...p,
      } as Span
    })
    .filter((s): s is Span => !!s)
}

// 같은 레인에서 겹치는 항목은 아래 줄로 내린다(그리디 배치).
// 막대 밖으로 빠진 라벨도 자리를 차지하므로 그만큼을 구간에 더해 겹침을 판정한다 —
// 안 그러면 짧은 막대의 이름이 옆 막대 위에 겹쳐 찍힌다.
function pack(spans: Span[], span: (s: Span) => [number, number]): Span[][] {
  const rows: { items: Span[]; end: number }[] = []
  for (const s of [...spans].sort((a, b) => a.from - b.from || b.to - a.to)) {
    const [from, to] = span(s)
    const row = rows.find((r) => r.end < from)
    if (row) {
      row.items.push(s)
      row.end = Math.max(row.end, to)
    } else {
      rows.push({ items: [s], end: to })
    }
  }
  return rows.map((r) => r.items)
}

// 이름이 막대 폭을 넘으면 말줄임이 되는데, 줄여 쓴 이름은 읽을 값이 없다.
// 그래서 폭을 글자 수로 어림해(한 글자 ≈ 0.85개월) 안 들어갈 이름은 아예 막대 밖에 적는다.
// 어림이 빗나가지 않도록 넉넉히 잡고, 긴 이름은 콘텐츠의 shortLabel 로 줄여 둔다.
const CHAR_MONTHS = 0.85
const needed = (s: Span) => Math.ceil(s.label.length * CHAR_MONTHS)
const isNarrow = (s: Span) => s.to - s.from + 1 < needed(s)
const labelRoom = (s: Span) => (isNarrow(s) ? Math.min(needed(s), 18) : 0)
// 오른쪽 끝에 붙은 막대는 이름을 왼쪽에 단다(오른쪽은 차트 밖이다)
const isFlipped = (s: Span, endMonth: number) => isNarrow(s) && s.to > endMonth - 18
const occupies = (endMonth: number) => (s: Span): [number, number] =>
  isFlipped(s, endMonth) ? [s.from - labelRoom(s), s.to] : [s.from, s.to + labelRoom(s)]

const lanes = computed(() => {
  const d = aboutDetail.value
  const all = [
    ...toSpans(d.timeline, 'work'),
    ...toSpans(d.activities, 'activity'),
    ...toSpans(d.education, 'edu'),
  ]
  const endMonth = Math.max(...all.map((s) => s.to), nowIdx)
  const room = occupies(endMonth)
  return [
    { id: 'work', label: 'Experience', rows: pack(toSpans(d.timeline, 'work'), room) },
    { id: 'activity', label: 'Activities', rows: pack(toSpans(d.activities, 'activity'), room) },
    { id: 'edu', label: 'Education', rows: pack(toSpans(d.education, 'edu'), room) },
  ].filter((l) => l.rows.length)
})

// 축 범위는 데이터에서 뽑되 연 단위로 맞춘다.
const range = computed(() => {
  const all = lanes.value.flatMap((l) => l.rows.flat())
  const from = Math.min(...all.map((s) => s.from))
  const to = Math.max(...all.map((s) => s.to), nowIdx)
  const y0 = Math.floor(from / 12)
  const y1 = Math.floor(to / 12)
  return { start: idx(y0, 1), end: idx(y1, 12), years: Array.from({ length: y1 - y0 + 1 }, (_, i) => y0 + i) }
})

const pct = (m: number) => ((m - range.value.start) / (range.value.end - range.value.start + 1)) * 100
const width = (s: Span) => Math.max(pct(s.to + 1) - pct(s.from), 1.4)
const bar = (s: Span) => ({ left: `${pct(s.from)}%`, width: `${width(s)}%` })
const yearLeft = (y: number) => `${pct(idx(y, 1))}%`

// 좁은 화면에서는 CSS 가 바깥 라벨을 감춘다(자리가 없다).
const narrow = isNarrow
const flip = (s: Span) => isFlipped(s, range.value.end)

const active = ref('')

// 막대를 누르면 아래 목록의 해당 항목으로 이동하고 잠깐 강조한다.
function goto(s: Span) {
  active.value = s.key
  const el = document.getElementById(s.target)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.add('is-flash')
  window.setTimeout(() => el.classList.remove('is-flash'), 1400)
}
</script>

<template>
  <div class="ctl">
    <div class="ctl__axis" aria-hidden="true">
      <span v-for="y in range.years" :key="y" class="ctl__year" :style="{ left: yearLeft(y) }">
        {{ y }}
      </span>
    </div>

    <div class="ctl__body">
      <div class="ctl__grid" aria-hidden="true">
        <span v-for="y in range.years" :key="y" class="ctl__gridline" :style="{ left: yearLeft(y) }" />
      </div>

      <section v-for="lane in lanes" :key="lane.id" class="ctl__lane">
        <h3 class="ctl__lane-title">{{ lane.label }}</h3>
        <div class="ctl__rows">
          <div v-for="(row, ri) in lane.rows" :key="ri" class="ctl__row">
            <button
              v-for="s in row"
              :key="s.key"
              type="button"
              class="ctl__bar"
              :class="[
                `ctl__bar--${lane.id}`,
                {
                  'is-ongoing': s.ongoing,
                  'is-vague': s.vague,
                  'is-active': active === s.key,
                  'is-narrow': narrow(s),
                  'is-flip': narrow(s) && flip(s),
                },
              ]"
              :style="bar(s)"
              :title="s.label"
              @click="goto(s)"
            >
              <span class="ctl__bar-label">{{ s.label }}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped src="../styles/CareerTimeline.css"></style>
