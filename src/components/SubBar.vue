<script setup lang="ts">
// 하위 페이지(프로젝트 상세 · About 상세 · Archive) 공용 상단 바.
// 랜딩 Navbar 와 같은 도구(Resume · ⌘K · 언어 · 테마)를 그대로 제공해 어느 페이지에서든 막히지 않게 한다.
import { profile } from '../data'
import { openCommand, cmdKLabel } from '../command'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

defineProps<{
  back: string // 돌아갈 해시 (#/ · #about · #works)
  backLabel?: string
}>()
</script>

<template>
  <header class="subbar">
    <a class="subbar__back" :href="back">
      ← <span class="subbar__back-full">{{ backLabel ?? 'Back to index' }}</span><span class="subbar__back-short">Back</span>
    </a>
    <div class="subbar__right">
      <a href="#top" class="subbar__brand">{{ profile.name.toLowerCase() }}<span>_</span></a>
      <a
        v-if="profile.resumeUrl"
        class="subbar__resume"
        :href="profile.resumeUrl"
        target="_blank"
        rel="noreferrer"
        download
      >
        Resume ↓
      </a>
      <button
        type="button"
        class="subbar__cmdk"
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
</template>

<style scoped src="../styles/SubBar.css"></style>
