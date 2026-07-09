<script setup lang="ts">
// 함께 이루는 시스템을 실제 구조(클라이언트 → API → 인프라)의 계층 다이어그램으로 시각화.
// systemMaps(shared.ts)에 시스템 단위로 정의된 노드·엣지를 그린다.
// slug 있는 노드는 해당 프로젝트 상세로 이동, 없는 노드는 표시용. 호버 시 연결 엣지 강조.
import { computed, ref } from 'vue'
import type { SystemMap } from '../content/types'

const props = defineProps<{ map: SystemMap; currentSlug: string }>()

const hovered = ref('')

// 층별 세로 위치(%) — 위 16% ~ 아래 84% 사이 균등 분배
const layerYs = computed(() => {
  const n = props.map.layers.length
  if (n <= 1) return [50]
  return props.map.layers.map((_, i) => 16 + (i * 68) / (n - 1))
})

const nodes = computed(() => {
  const rows = props.map.layers.map((_, li) => props.map.nodes.filter((nd) => nd.layer === li))
  return props.map.nodes.map((nd) => {
    const row = rows[nd.layer]
    const x = nd.x ?? ((row.indexOf(nd) + 1) / (row.length + 1)) * 100
    return { ...nd, x, y: layerYs.value[nd.layer], current: nd.slug === props.currentSlug }
  })
})

const edges = computed(() =>
  props.map.edges.map((e, i) => {
    const a = nodes.value.find((n) => n.id === e.from)!
    const b = nodes.value.find((n) => n.id === e.to)!
    return {
      key: i,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      mx: (a.x + b.x) / 2,
      my: (a.y + b.y) / 2,
      label: e.label,
      hot: hovered.value === e.from || hovered.value === e.to,
    }
  }),
)

function pos(x: number, y: number) {
  return { left: x + '%', top: y + '%' }
}
</script>

<template>
  <div class="sysmap">
    <svg class="sysmap__edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line
        v-for="e in edges"
        :key="e.key"
        class="sysmap__edge"
        :class="{ 'is-hot': e.hot }"
        :x1="e.x1"
        :y1="e.y1"
        :x2="e.x2"
        :y2="e.y2"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <span
      v-for="(l, i) in map.layers"
      :key="l"
      class="sysmap__layer"
      :style="{ top: layerYs[i] + '%' }"
      aria-hidden="true"
    >
      {{ l }}
    </span>

    <span
      v-for="e in edges.filter((e) => e.label)"
      :key="'label-' + e.key"
      class="sysmap__edge-label"
      :class="{ 'is-hot': e.hot }"
      :style="pos(e.mx, e.my)"
    >
      {{ e.label }}
    </span>

    <component
      :is="n.slug && !n.current ? 'a' : 'div'"
      v-for="n in nodes"
      :key="n.id"
      :href="n.slug && !n.current ? `#/project/${n.slug}` : undefined"
      class="sysmap__node"
      :class="{ 'is-current': n.current, 'is-hot': hovered === n.id, 'is-plain': !n.slug }"
      :style="pos(n.x, n.y)"
      @pointerenter="hovered = n.id"
      @pointerleave="hovered = ''"
    >
      <span class="sysmap__node-title">{{ n.label }}<template v-if="n.slug && !n.current"> ↗</template></span>
      <span v-if="n.sub" class="sysmap__node-sub">{{ n.sub }}</span>
      <span v-if="n.current" class="sysmap__node-here">This project</span>
    </component>
  </div>
</template>

<style scoped src="../styles/SystemGraph.css"></style>
