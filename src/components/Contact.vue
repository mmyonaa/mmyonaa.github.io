<script setup lang="ts">
import { computed, ref } from 'vue'
import { profile, contacts } from '../data'
import { locale } from '../i18n'
import { SITE_REPO } from '../content/shared'

// 빌드 시 vite.config.ts 의 define 으로 채워진다
const version = __APP_VERSION__
const commit = __COMMIT_HASH__

const t = computed(() =>
  locale.value === 'ko'
    ? { copy: '이메일 주소 복사', copied: '복사됨', built: '만든 방법' }
    : { copy: 'Copy email address', copied: 'Copied', built: 'Colophon' },
)

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.value.email)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1800)
  } catch {
    /* 클립보드 권한이 없으면 mailto 링크가 그대로 남아 있다 */
  }
}
</script>

<template>
  <section id="contact" class="contact">
    <h2 class="contact__title reveal">SAY HELLO</h2>

    <ul class="contact__details reveal">
      <li v-for="c in contacts" :key="c.label" class="cinfo">
        <span class="cinfo__icon" aria-hidden="true">{{ c.icon }}</span>
        <span class="cinfo__label">{{ c.label }}</span>
        <span class="cinfo__row">
          <a
            class="cinfo__value"
            :href="c.href"
            :target="c.href.startsWith('http') ? '_blank' : undefined"
            :rel="c.href.startsWith('http') ? 'noreferrer' : undefined"
          >
            {{ c.value }}
          </a>
          <button
            v-if="c.href.startsWith('mailto:')"
            type="button"
            class="cinfo__copy"
            :class="{ 'is-copied': copied }"
            :aria-label="t.copy"
            :title="t.copy"
            @click="copyEmail"
          >
            <span aria-hidden="true">{{ copied ? '✓' : '⧉' }}</span>
          </button>
        </span>
      </li>
    </ul>
    <!-- 복사 결과는 스크린리더에도 읽힌다 — 영역은 미리 있어야 한다 -->
    <p class="contact__status" role="status" aria-live="polite">{{ copied ? t.copied : '' }}</p>

    <a class="badge reveal" :href="`mailto:${profile.email}`" aria-label="이메일 보내기">
      <svg class="badge__ring" viewBox="0 0 200 200">
        <defs>
          <path id="badgePath" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text>
          <textPath href="#badgePath" startOffset="0">
            LET'S TALK ABOUT PROJECT ✦ LET'S TALK ABOUT PROJECT ✦&nbsp;
          </textPath>
        </text>
      </svg>
      <span class="badge__core" aria-hidden="true">↗</span>
    </a>

    <footer class="contact__foot">
      <span>© {{ profile.name }} 2026 · Based in {{ profile.location }}</span>
      <span class="contact__colophon">
        <span class="contact__colophon-label">{{ t.built }}</span>
        Vue 3 · Vite · Manrope / Space Mono · GitHub Pages ·
        <a :href="`${SITE_REPO}/releases/tag/v${version}`" target="_blank" rel="noreferrer">v{{ version }}</a>
        <template v-if="commit">
          · <a :href="`${SITE_REPO}/commit/${commit}`" target="_blank" rel="noreferrer"><code>{{ commit }}</code></a>
        </template>
        · <a :href="SITE_REPO" target="_blank" rel="noreferrer">Source ↗</a>
      </span>
    </footer>
  </section>
</template>

<style scoped src="../styles/Contact.css"></style>
