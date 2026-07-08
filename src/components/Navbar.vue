<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { profile } from '../data'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

const links = [
  { href: '#/about', label: 'About me' },
  { href: '#works', label: 'Works' },
  { href: '#contact', label: 'Contacts' },
]

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header :class="['nav', { 'nav--scrolled': scrolled }]">
    <div class="nav__inner">
      <a href="#top" class="nav__brand">{{ profile.name.toLowerCase() }}<span>_</span></a>
      <div class="nav__right">
        <nav class="nav__links">
          <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
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
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped src="../styles/Navbar.css"></style>
