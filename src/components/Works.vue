<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { featuredProjects, projects } from '../data'
import { locale } from '../i18n'
import { tints } from '../tints'
import { splitTitle } from '../title'
import ImageSlider from './ImageSlider.vue'

// 카드에 펼쳐 보이는 스택 수 — 나머지는 '+N' 으로 접고 상세에서 전부 본다
const MAX_TAGS = 5

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

const total = computed(() => featuredProjects.value.length)
const allCount = computed(() => projects.value.length)
const dotTop = computed(() => (total.value > 1 ? (active.value / (total.value - 1)) * 100 : 0))
const activeProject = computed(() => featuredProjects.value[active.value])

const activeTitle = computed(() => splitTitle(activeProject.value.title))
const t = computed(() =>
  locale.value === 'ko'
    ? { all: `전체 ${allCount.value}개 프로젝트 보기`, live: '운영 중' }
    : { all: `See all ${allCount.value} projects`, live: 'Live' },
)
</script>

<template>
  <section id="works" class="works">
    <div class="works__head reveal">
      <span class="eyebrow">( Selected )</span>
      <h2 class="works__title">Works</h2>
      <a class="works__all" href="#/archive">{{ t.all }} <span aria-hidden="true">→</span></a>
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
              <span class="rail__name-main">{{ activeTitle.main }}</span>
              <span v-if="activeTitle.sub" class="rail__name-sub">{{ activeTitle.sub }}</span>
            </a>
            <span class="rail__period">{{ activeProject.period }}</span>
          </div>
        </div>
      </aside>

      <div class="panels">
        <article
          v-for="(p, i) in featuredProjects"
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
            :themed="p.themedImages"
          />
          <a v-else class="panel__mock" :style="{ background: tints[i % tints.length] }" :href="`#/project/${p.slug}`">
            <span class="panel__dots" aria-hidden="true"><i /><i /><i /></span>
            <span v-if="p.mediaNote" class="panel__lock" title="Confidential">
              <span aria-hidden="true">🔒</span> Confidential
            </span>
            <span class="panel__ghost">{{ p.title }}</span>
            <span class="panel__cta">View project ↗</span>
          </a>

          <p class="panel__period">
            {{ p.period }}
            <span v-if="p.live" class="panel__live"><i aria-hidden="true" />{{ t.live }}</span>
            <span v-if="p.team" class="panel__team">· {{ p.team }}</span>
          </p>
          <p class="panel__desc">{{ p.description }}</p>
          <p v-if="p.stats?.length" class="panel__stat">
            <strong>{{ p.stats[0].value }}</strong>
            <span>{{ p.stats[0].label }}</span>
          </p>
          <div class="panel__role">
            <span class="panel__role-label">Stack</span>
            <ul>
              <li v-for="tag in p.tags.slice(0, MAX_TAGS)" :key="tag">{{ tag }}</li>
              <li v-if="p.tags.length > MAX_TAGS" class="is-more">+{{ p.tags.length - MAX_TAGS }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/Works.css"></style>
