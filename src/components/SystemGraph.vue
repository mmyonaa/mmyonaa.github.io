<script setup lang="ts">
// 함께 이루는 시스템을 허브-스포크 노드 그래프로 시각화.
// 현재 프로젝트 + related 프로젝트가 공유 백엔드(허브)에 연결되고,
// 노드에 호버하면 연결선이 강조된다. related 노드 클릭 시 해당 상세로 이동.
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    current: { slug: string; title: string }
    related: { slug: string; title: string; role: string }[]
    hub?: string
    hubSub?: string
  }>(),
  { hub: 'Shared backend', hubSub: '' },
)

const hovered = ref('')

const nodes = computed(() => {
  const all = [
    { slug: props.current.slug, title: props.current.title, role: 'This project', current: true },
    ...props.related.map((r) => ({ slug: r.slug, title: r.title, role: r.role, current: false })),
  ]
  const n = all.length
  return all.map((nd, i) => {
    const ang = ((-90 + (360 / n) * i) * Math.PI) / 180
    return { ...nd, x: 50 + 33 * Math.cos(ang), y: 50 + 30 * Math.sin(ang) }
  })
})

function pos(x: number, y: number) {
  return { left: x + '%', top: y + '%' }
}
</script>

<template>
  <div class="sysgraph">
    <svg class="sysgraph__edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line
        v-for="n in nodes"
        :key="n.slug"
        class="sysgraph__edge"
        :class="{ 'is-hot': hovered === n.slug }"
        x1="50"
        y1="50"
        :x2="n.x"
        :y2="n.y"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <div class="sysgraph__hub" :style="pos(50, 50)">
      <span class="sysgraph__hub-label">{{ hub }}</span>
      <span v-if="hubSub" class="sysgraph__hub-sub">{{ hubSub }}</span>
    </div>

    <component
      :is="n.current ? 'div' : 'a'"
      v-for="n in nodes"
      :key="n.slug"
      :href="n.current ? undefined : `#/project/${n.slug}`"
      class="sysgraph__node"
      :class="{ 'is-current': n.current, 'is-hot': hovered === n.slug }"
      :style="pos(n.x, n.y)"
      @pointerenter="hovered = n.slug"
      @pointerleave="hovered = ''"
    >
      <span class="sysgraph__node-title">{{ n.title }}<template v-if="!n.current"> ↗</template></span>
      <span class="sysgraph__node-role">{{ n.role }}</span>
    </component>
  </div>
</template>

<style scoped src="../styles/SystemGraph.css"></style>
