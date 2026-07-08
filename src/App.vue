<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Stars from './components/Stars.vue'
import CursorFollower from './components/CursorFollower.vue'
import Lightbox from './components/Lightbox.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import AboutDetail from './components/AboutDetail.vue'
import Works from './components/Works.vue'
import Contact from './components/Contact.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import { projects } from './data'

type Route =
  | { name: 'project'; slug: string }
  | { name: 'about' }
  | { name: 'home'; anchor: string }

function getRoute(): Route {
  const hash = window.location.hash.replace(/^#/, '')
  const m = hash.match(/^\/project\/(.+)$/)
  if (m) return { name: 'project', slug: m[1] }
  if (hash === '/about') return { name: 'about' }
  const anchor = hash && !hash.startsWith('/') ? hash : ''
  return { name: 'home', anchor }
}

const route = ref<Route>(getRoute())
const project = computed(() => {
  const r = route.value
  return r.name === 'project' ? projects.value.find((p) => p.slug === r.slug) ?? null : null
})
const isAbout = computed(() => route.value.name === 'about')

function onHash() {
  route.value = getRoute()
}

let observer: IntersectionObserver | null = null
function bindReveal() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          observer!.unobserve(e.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => observer!.observe(el))
}

// 라우트 전환 시 스크롤 + reveal 재바인딩
watch(route, async (r) => {
  if (r.name === 'project' || r.name === 'about') window.scrollTo(0, 0)
  await nextTick()
  if (r.name === 'home' && r.anchor) {
    document.getElementById(r.anchor)?.scrollIntoView({ behavior: 'smooth' })
  }
  bindReveal()
})

onMounted(async () => {
  window.addEventListener('hashchange', onHash)
  await nextTick()
  bindReveal()
})
onUnmounted(() => {
  window.removeEventListener('hashchange', onHash)
  observer?.disconnect()
})
</script>

<template>
  <Stars />
  <CursorFollower />
  <Lightbox />
  <ProjectDetail v-if="project" :key="project.slug" :project="project" />
  <AboutDetail v-else-if="isAbout" />
  <template v-else>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Works />
      <Contact />
    </main>
  </template>
</template>
