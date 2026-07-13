<script setup lang="ts">
// 멀티 에이전트 분석 파이프라인 라이브 시각화 — 실제 코드(orchestrator.ts) 기준.
// 공개용(safe) 캡션만 렌더 — 임계값·내부 도구·레포명 등 대외 세부는 제외한다.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { locale } from '../i18n'

type Node = {
  id: string
  code: string
  label: string
  x: number
  y: number
  kind: 'code' | 'LLM'
  dashed?: boolean // 조건부/백그라운드 (동기 스파인이 아님)
  koSafe: string
  enSafe: string
}

const XS = [10, 30, 50, 70, 90] // 스테이지 열 중심 %

// 노드는 공개용(safe) 캡션만 인라인. 상세(full)는 pipeline-full.local.ts 에서 id 로 매핑.
const NODES: Node[] = [
  { id: 'triage', code: '0', label: 'TriageAgent', x: XS[0], y: 50, kind: 'LLM',
    koSafe: '인시던트를 분류해 판정(정탐/오탐)·신뢰도·우선순위를 산정하고, 이후 분석 파이프라인의 실행 범위를 결정합니다.',
    enSafe: 'Classifies the incident into a verdict (true/false positive), confidence, and priority, which gate the downstream analysis pipeline.' },
  { id: 'ioc', code: '1.1', label: 'IOCAgent', x: XS[1], y: 26, kind: 'code',
    koSafe: 'IOC(해시·IP·도메인)를 위협 인텔 데이터와 매칭·추출합니다.',
    enSafe: 'Extracts and matches IOCs (hashes, IPs, domains) against threat-intel data.' },
  { id: 'mitre', code: '1.2', label: 'MITREAgent', x: XS[1], y: 50, kind: 'code',
    koSafe: '프로세스·명령 지표를 MITRE ATT&CK 기법·전술로 매핑합니다.',
    enSafe: 'Maps process/command indicators to MITRE ATT&CK techniques & tactics.' },
  { id: 'network', code: '1.3', label: 'NetworkAgent', x: XS[1], y: 74, kind: 'code', dashed: true,
    koSafe: '네트워크 아티팩트(IP·도메인·포트·프로토콜)를 분석합니다. 우선순위에 따라 선택적으로 실행됩니다.',
    enSafe: 'Analyzes network artifacts (IPs, domains, ports, protocols). Runs selectively by priority.' },
  { id: 'secint', code: '2.1', label: 'SecurityIntel', x: XS[2], y: 50, kind: 'LLM', dashed: true,
    koSafe: '외부 보안 인텔리전스를 검색·수집해 악성 IOC를 보강합니다. 필요할 때만 조건부로 실행됩니다.',
    enSafe: 'Enriches with external security intelligence to extract malicious IOCs. Runs conditionally, only when needed.' },
  { id: 'correlation', code: '3.1', label: 'Correlation', x: XS[3], y: 50, kind: 'LLM',
    koSafe: '모든 에이전트 결과를 종합해 위협 점수·공격 체인·kill-chain 그래프·신뢰도를 생성합니다.',
    enSafe: 'Synthesizes all agent outputs into a threat score, attack chain, kill-chain graph, and confidence.' },
  { id: 'compliance', code: '4.1', label: 'Compliance', x: XS[4], y: 34, kind: 'LLM', dashed: true,
    koSafe: '종합된 위협 맥락 기반으로 컴플라이언스(ISMS-P·ISO 27001·GDPR)를 분석합니다. 백그라운드로 처리됩니다.',
    enSafe: 'Generates compliance analysis (ISMS-P, ISO 27001, GDPR) against the synthesized context, in the background.' },
  { id: 'translation', code: '4.2', label: 'Translation', x: XS[4], y: 66, kind: 'code', dashed: true,
    koSafe: '분석 결과를 다국어(한/영/일)로 번역합니다. 백그라운드로 처리됩니다.',
    enSafe: 'Translates the analysis into multiple languages (ko/en/ja), in the background.' },
]

// 신호 흐름 순서 (스테이지 진행)
const ORDER = ['triage', 'ioc', 'mitre', 'network', 'secint', 'correlation', 'compliance', 'translation']

const STAGES = [
  { x: XS[0], text: 'STAGE 0 · TRIAGE' },
  { x: XS[1], text: 'STAGE 1 · GROUNDING' },
  { x: XS[2], text: 'STAGE 2 · INTELLIGENCE' },
  { x: XS[3], text: 'STAGE 3 · SYNTHESIS' },
  { x: XS[4], text: 'STAGE 4 · ENRICHMENT' },
]

// 연결 (from → to)
const LINKS: [string, string][] = [
  ['triage', 'ioc'],
  ['triage', 'mitre'],
  ['triage', 'network'],
  ['ioc', 'secint'],
  ['mitre', 'secint'],
  ['network', 'secint'],
  ['secint', 'correlation'],
  ['correlation', 'compliance'],
  ['correlation', 'translation'],
]

const byId = (id: string) => NODES.find((n) => n.id === id)!
const segments = LINKS.map(([from, to]) => {
  const a = byId(from)
  const b = byId(to)
  return { from, to, x1: a.x, y1: a.y, x2: b.x, y2: b.y }
})

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const active = ref(reduced ? ORDER.indexOf('correlation') : 0)
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
  <div class="apl" :class="{ 'apl--static': reduced }">
    <div class="apl__bar">
      <span class="apl__live"><i class="apl__dot" />LIVE / MULTI_AGENT_ANALYSIS</span>
      <span class="apl__tag">SentiveX · AI server</span>
    </div>

    <div class="apl__canvas">
      <span
        v-for="s in STAGES"
        :key="s.text"
        class="apl__stage"
        :style="{ left: s.x + '%' }"
        >{{ s.text }}</span
      >

      <svg class="apl__edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          v-for="(s, i) in segments"
          :key="i"
          class="apl__edge"
          :class="{ 'is-hot': ORDER[active] === s.to || ORDER[active] === s.from }"
          :x1="s.x1"
          :y1="s.y1"
          :x2="s.x2"
          :y2="s.y2"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <div
        class="apl__pulse"
        :style="{ left: activeNode.x + '%', top: activeNode.y + '%' }"
        aria-hidden="true"
      />

      <div
        v-for="n in NODES"
        :key="n.id"
        class="apl__node"
        :class="{ 'apl__node--dashed': n.dashed, 'is-active': ORDER[active] === n.id }"
        :style="{ left: n.x + '%', top: n.y + '%' }"
      >
        <span class="apl__code">{{ n.code }}</span>
        <span class="apl__name">{{ n.label }}</span>
        <span class="apl__kind">{{ n.kind }}</span>
      </div>
    </div>

    <div class="apl__caption">
      <span class="apl__caption-head">
        <span class="apl__caption-code">{{ activeNode.code }}</span>
        {{ activeNode.label }}
      </span>
      <span class="apl__caption-text">{{ caption }}</span>
    </div>
  </div>
</template>

<style scoped src="../styles/AnalysisPipeline.css"></style>
