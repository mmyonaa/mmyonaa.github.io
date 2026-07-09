<script setup lang="ts">
import { computed } from 'vue'
import { profile, projects, type Project } from '../data'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'
import ImageSlider from './ImageSlider.vue'
import SystemGraph from './SystemGraph.vue'
import AnalysisPipeline from './AnalysisPipeline.vue'
import PaymentFlow from './PaymentFlow.vue'
import { tints } from '../tints'
import { theme } from '../theme'
import { locale } from '../i18n'
import { openLightbox } from '../lightbox'
import { openCommand, cmdKLabel } from '../command'

const props = defineProps<{ project: Project }>()

const images = computed(() => props.project.images ?? [])

// 다이어그램: base = 한국어·다크. 영어면 '-en', 라이트 테마면 '-light' 변형 사용
function archSrc(src: string) {
  let s = src.replace(/\.png$/, '')
  if (locale.value === 'en') s += '-en'
  if (theme.value === 'light') s += '-light'
  return s + '.png'
}

// 라이트박스는 다크 변형으로 열되 언어는 현재 로케일에 맞춤
function archLightboxSrc(src: string) {
  return locale.value === 'en' ? src.replace(/\.png$/, '-en.png') : src
}

const idx = computed(() => projects.value.findIndex((p) => p.slug === props.project.slug))
const next = computed(() => projects.value[(idx.value + 1) % projects.value.length])
const tint = computed(() => tints.value[idx.value % tints.value.length])
const num = computed(() => String(idx.value + 1).padStart(2, '0'))
const totalLabel = computed(() => String(projects.value.length).padStart(2, '0'))
const hasLinks = computed(() => !!(props.project.link || props.project.repo || props.project.apiDocs))

// 함께 이루는 시스템의 관련 프로젝트 (slug → 대상 프로젝트 제목 + 역할)
const relatedProjects = computed(() =>
  (props.project.related ?? [])
    .map((r) => {
      const target = projects.value.find((p) => p.slug === r.slug)
      return target ? { slug: r.slug, role: r.role, title: target.title } : null
    })
    .filter((r): r is { slug: string; role: string; title: string } => r !== null),
)
</script>

<template>
  <article class="detail">
    <header class="detail__bar">
      <a class="detail__back" href="#/">← Back to index</a>
      <div class="detail__bar-right">
        <span class="detail__brand">{{ profile.name.toLowerCase() }}<span>_</span></span>
        <button
          type="button"
          class="detail__cmdk"
          :title="`Command menu — ${cmdKLabel}`"
          aria-label="Open command menu"
          @click="openCommand"
        >
          <span aria-hidden="true">{{ cmdKLabel }}</span>
        </button>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>

    <div class="detail__wrap">
      <header class="detail__head">
        <p class="eyebrow reveal">( Project {{ num }} / {{ totalLabel }} )</p>
        <h1 class="detail__title reveal">{{ project.title }}</h1>
        <p class="detail__period reveal">{{ project.period }}</p>
      </header>

      <div class="detail__layout">
        <div class="detail__media reveal">
          <ImageSlider
            v-if="images.length"
            :images="images"
            :alt="project.title"
            :frame="project.imageFrame"
            :tall="!!project.imageFrame"
            zoomable
          />
          <p v-if="images.length && project.imageNote" class="detail__media-note reveal">
            {{ project.imageNote }}
          </p>
          <div
            v-if="!images.length"
            class="detail__hero"
            :class="{ 'detail__hero--locked': project.mediaNote }"
            :style="{ background: tint }"
          >
            <span class="panel__dots" aria-hidden="true"><i /><i /><i /></span>
            <template v-if="project.mediaNote">
              <span class="lockcard__icon" aria-hidden="true">🔒</span>
              <span class="lockcard__label">Confidential</span>
              <p class="lockcard__note">{{ project.mediaNote }}</p>
            </template>
            <span v-else class="detail__hero-ghost">{{ project.title }}</span>
          </div>
        </div>

        <div class="detail__info">
          <p class="detail__desc reveal">{{ project.description }}</p>

          <ul class="detail__points reveal">
            <li v-for="(h, i) in project.highlights" :key="i">
              <span class="detail__points-num">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ h }}
            </li>
          </ul>

          <div class="detail__meta reveal">
            <div class="meta__block">
              <span class="meta__label">Stack</span>
              <ul class="meta__stack">
                <li v-for="t in project.tags" :key="t">{{ t }}</li>
              </ul>
            </div>
            <div v-if="hasLinks" class="meta__block">
              <span class="meta__label">Links</span>
              <div class="meta__links">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noreferrer">Live demo ↗</a>
                <a v-if="project.repo" :href="project.repo" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a v-if="project.apiDocs" :href="project.apiDocs" target="_blank" rel="noreferrer">API Docs ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section v-if="project.overview?.length" class="detail__section">
        <h2 class="detail__section-title reveal">Overview</h2>
        <div class="detail__overview">
          <p v-for="(p, i) in project.overview" :key="i" class="reveal">{{ p }}</p>
        </div>
      </section>

      <section v-if="project.techNotes?.length" class="detail__section">
        <h2 class="detail__section-title reveal">Technical notes</h2>
        <ul class="detail__notes">
          <li v-for="(n, i) in project.techNotes" :key="i" class="note reveal">
            <span class="note__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="note__body">
              <h3 class="note__title">{{ n.title }}</h3>
              <p class="note__text">{{ n.body }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section v-if="project.qa" class="detail__section">
        <h2 class="detail__section-title reveal">QA & Testing</h2>
        <div class="detail__qa-stats reveal">
          <div v-for="s in project.qa.stats" :key="s.label" class="qa-stat">
            <span class="qa-stat__value">{{ s.value }}</span>
            <span class="qa-stat__label">{{ s.label }}</span>
          </div>
        </div>
        <ul v-if="project.qa.findings?.length" class="detail__notes reveal">
          <li v-for="(n, i) in project.qa.findings" :key="i" class="note">
            <span class="note__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="note__body">
              <h3 class="note__title">{{ n.title }}</h3>
              <p class="note__text">{{ n.body }}</p>
              <img
                v-if="n.media"
                class="note__media"
                :src="n.media"
                :alt="`${n.title} — 개선 후 동작`"
                loading="lazy"
                @click="openLightbox(n.media, n.title)"
              />
            </div>
          </li>
        </ul>
        <p v-if="project.qa.note" class="detail__qa-note reveal">{{ project.qa.note }}</p>
      </section>

      <section v-if="project.analysisPipeline" class="detail__section">
        <h2 class="detail__section-title reveal">Analysis pipeline</h2>
        <div class="detail__pipeline reveal">
          <AnalysisPipeline />
        </div>
      </section>

      <section v-if="project.paymentFlow" class="detail__section">
        <h2 class="detail__section-title reveal">Subscription flow</h2>
        <div class="detail__pipeline reveal">
          <PaymentFlow />
        </div>
      </section>

      <section v-if="project.architectureImages?.length" class="detail__section">
        <h2 class="detail__section-title reveal">Architecture</h2>
        <div class="detail__arch">
          <figure v-for="(src, i) in project.architectureImages" :key="src" class="arch reveal">
            <img
              :src="archSrc(src)"
              :alt="project.architectureCaptions?.[i] || `${project.title} 아키텍처 ${i + 1}`"
              loading="lazy"
              @click="openLightbox(archLightboxSrc(src), project.architectureCaptions?.[i] || '')"
            />
            <figcaption v-if="project.architectureCaptions?.[i]">
              {{ project.architectureCaptions[i] }}
            </figcaption>
            <p v-if="project.architectureNotes?.[i]" class="arch__note">
              {{ project.architectureNotes[i] }}
            </p>
          </figure>
        </div>
      </section>

      <section v-if="project.photos?.length" class="detail__section">
        <h2 class="detail__section-title reveal">On-site</h2>
        <div class="detail__photos reveal">
          <figure v-for="(src, i) in project.photos" :key="src" class="photo">
            <img
              :src="src"
              :alt="`${project.title} 현장 ${i + 1}`"
              loading="lazy"
              @click="openLightbox(src, project.photosNote?.[0] || '')"
            />
          </figure>
          <div v-if="project.photosNote?.length" class="detail__photos-info">
            <p v-for="(p, i) in project.photosNote" :key="i" class="detail__photos-note">{{ p }}</p>
          </div>
        </div>
      </section>

      <section v-if="project.presentationImages?.length" class="detail__section">
        <h2 class="detail__section-title reveal">Presentation</h2>
        <div class="detail__pres">
          <ImageSlider
            class="detail__deck reveal"
            :images="project.presentationImages"
            :alt="`${project.title} 발표 자료`"
            :autoplay="false"
            wide
            zoomable
          />
          <p v-if="project.presentationNote" class="detail__pres-note reveal">
            {{ project.presentationNote }}
          </p>
        </div>
      </section>

      <section v-if="relatedProjects.length" class="detail__section">
        <h2 class="detail__section-title reveal">Part of the same system</h2>
        <div class="detail__sysgraph reveal">
          <SystemGraph
            :current="{ slug: project.slug, title: project.title }"
            :related="relatedProjects"
            :hub="project.systemHub?.label ?? 'Shared backend'"
            :hub-sub="project.systemHub?.sub ?? ''"
          />
        </div>
      </section>

      <a class="detail__next reveal" :href="`#/project/${next.slug}`">
        <span class="eyebrow">Next project →</span>
        <span class="detail__next-title">{{ next.title }}</span>
      </a>
    </div>
  </article>
</template>

<style scoped src="../styles/ProjectDetail.css"></style>
