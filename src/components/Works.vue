<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { projects } from '../data'
import { tints } from '../tints'
import ImageSlider from './ImageSlider.vue'

const active = ref(0)
const panels = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

function setPanel(el: Element | ComponentPublicInstance | null, i: number) {
  if (el) panels.value[i] = el as HTMLElement
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          active.value = Number((e.target as HTMLElement).dataset.index)
        }
      })
    },
    // 화면 중앙의 얇은 밴드에 들어온 패널을 active 로 판정
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  )
  panels.value.forEach((el) => el && observer!.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())

const total = computed(() => projects.value.length)
const dotTop = computed(() => (total.value > 1 ? (active.value / (total.value - 1)) * 100 : 0))
const activeProject = computed(() => projects.value[active.value])
</script>

<template>
  <section id="works" class="works">
    <div class="works__head reveal">
      <span class="eyebrow">( Selected )</span>
      <h2 class="works__title">Works</h2>
    </div>

    <div class="works__body">
      <aside class="rail">
        <div class="rail__sticky">
          <div class="rail__line">
            <span class="rail__dot" :style="{ top: dotTop + '%' }" />
          </div>
          <span class="rail__count">
            {{ String(active + 1).padStart(2, '0') }} <i>/ {{ String(total).padStart(2, '0') }}</i>
          </span>
          <div :key="active" class="rail__active">
            <a class="rail__name" :href="`#/project/${activeProject.slug}`">
              {{ activeProject.title }}
            </a>
          </div>
        </div>
      </aside>

      <div class="panels">
        <article
          v-for="(p, i) in projects"
          :key="p.slug"
          :ref="(el) => setPanel(el, i)"
          :data-index="i"
          :class="['panel', { 'is-active': i === active }]"
        >
          <ImageSlider
            v-if="p.images?.length"
            class="panel__slider"
            :images="p.images.slice(0, 1)"
            :alt="p.title"
            :href="`#/project/${p.slug}`"
            :autoplay="i === active"
            :frame="p.imageFrame"
          />
          <a v-else class="panel__mock" :style="{ background: tints[i % tints.length] }" :href="`#/project/${p.slug}`">
            <span class="panel__dots" aria-hidden="true"><i /><i /><i /></span>
            <span v-if="p.mediaNote" class="panel__lock" title="Confidential">
              <span aria-hidden="true">🔒</span> Confidential
            </span>
            <span class="panel__ghost">{{ p.title }}</span>
            <span class="panel__cta">View project ↗</span>
          </a>
          <p class="panel__desc">{{ p.description }}</p>
          <div class="panel__role">
            <span class="panel__role-label">Stack</span>
            <ul>
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/Works.css"></style>
