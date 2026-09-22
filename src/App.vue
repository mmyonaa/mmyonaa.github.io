<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Stars from './components/Stars.vue'
import CursorFollower from './components/CursorFollower.vue'
import Lightbox from './components/Lightbox.vue'
import CommandPalette from './components/CommandPalette.vue'
import BootIntro from './components/BootIntro.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import AboutDetail from './components/AboutDetail.vue'
import Works from './components/Works.vue'
import Contact from './components/Contact.vue'
import BackToTop from './components/BackToTop.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import { projects } from './data'

type Route =
  | { name: 'project'; slug: string }
  | { name: 'about' }
  | { name: 'home'; anchor: string }

function getRoute(): Route {
  const hash = window.location.hash.replace(/^#/, '')
  const m = hash.match(/^\/project\/(.+)$/)
  if (m) {
    if (projects.value.some((p) => p.slug === m[1])) return { name: 'project', slug: m[1] }
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#works`)
    return { name: 'home', anchor: 'works' }
  }
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

// 목록을 떠나기 직전의 스크롤 위치. 해시 변경이 라우트가 바뀌는 유일한 경로라
// 여기서만 기록하면 '떠난 순간의 자리' 가 항상 최신으로 남는다.
let homeScroll = 0

function onHash() {
  if (route.value.name === 'home') homeScroll = window.scrollY
  route.value = getRoute()
}

// 라우트 전환은 애니메이션 없이 즉시 — html 의 scroll-behavior: smooth 를 덮는다
function jumpTo(top: number) {
  window.scrollTo({ top, behavior: 'instant' })
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

// 라우트 전환 시 스크롤 + reveal 재바인딩.
// 상세는 언제나 맨 위에서 열리고, 목록으로 돌아오면 보던 자리로 되돌린다.
watch(route, async (r) => {
  await nextTick() // 되돌릴 높이가 생긴 뒤에 스크롤해야 위치가 잘리지 않는다
  if (r.name !== 'home') {
    jumpTo(0)
  } else if (r.anchor) {
    document.getElementById(r.anchor)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    jumpTo(homeScroll)
    // 이미지·폰트가 늦게 자리를 잡아 첫 시도가 짧게 잘렸으면 한 프레임 뒤 다시 맞춘다
    requestAnimationFrame(() => {
      if (Math.round(window.scrollY) !== Math.round(homeScroll)) jumpTo(homeScroll)
    })
  }
  bindReveal()
})

onMounted(async () => {
  // 브라우저가 렌더 전 옛 위치로 되돌리는 것을 막고 복원을 위 로직이 전담한다
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
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
  <CommandPalette />
  <BootIntro />
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
    <BackToTop />
  </template>
</template>
