<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { profile } from '../data'
import { BLOG_URL } from '../content/shared'
import { openCommand, cmdKLabel } from '../command'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

const links = [
  { href: '#/about', label: 'About me' },
  { href: '#works', label: 'Works' },
  { href: BLOG_URL, label: 'Blog', external: true },
  { href: '#contact', label: 'Contacts' },
]

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 40
}

// 좁은 화면에서는 링크를 메뉴 버튼 뒤로 접는다 (CSS 가 폭에 따라 보이기/숨기기를 결정)
const menuOpen = ref(false)
function closeMenu() {
  menuOpen.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header :class="['nav', { 'nav--scrolled': scrolled, 'nav--open': menuOpen }]">
    <div class="nav__inner">
      <a href="#top" class="nav__brand">{{ profile.name.toLowerCase() }}<span>_</span></a>
      <div class="nav__right">
        <nav id="nav-links" class="nav__links" aria-label="Site">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            :target="l.external ? '_blank' : undefined"
            :rel="l.external ? 'noreferrer' : undefined"
            @click="closeMenu"
          >
            {{ l.label }}<span v-if="l.external" aria-hidden="true"> ↗</span>
          </a>
          <a
            v-if="profile.resumeUrl"
            class="nav__links-resume"
            :href="profile.resumeUrl"
            target="_blank"
            rel="noreferrer"
            download
            @click="closeMenu"
          >
            Resume ↓
          </a>
        </nav>
        <a
          v-if="profile.resumeUrl"
          class="nav__resume"
          :href="profile.resumeUrl"
          target="_blank"
          rel="noreferrer"
          download
        >
          Resume ↓
        </a>
        <button
          type="button"
          class="nav__cmdk"
          :title="`Command menu — ${cmdKLabel}`"
          aria-label="Open command menu"
          @click="openCommand"
        >
          <span aria-hidden="true">{{ cmdKLabel }}</span>
        </button>
        <LanguageToggle />
        <ThemeToggle />
        <button
          type="button"
          class="nav__menu"
          aria-controls="nav-links"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <span aria-hidden="true">{{ menuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped src="../styles/Navbar.css"></style>
