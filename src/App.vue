<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Stars from './components/Stars.vue'
import CursorFollower from './components/CursorFollower.vue'
import Lightbox from './components/Lightbox.vue'
import CommandPalette from './components/CommandPalette.vue'
import BootIntro from './components/BootIntro.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Works from './components/Works.vue'
import Contact from './components/Contact.vue'
import BackToTop from './components/BackToTop.vue'
import SubBar from './components/SubBar.vue'
import { profile, projects } from './data'
import { locale } from './i18n'
import { splitTitle } from './title'

// 하위 페이지는 첫 로드에 필요 없으므로 따로 청크로 나눈다
const ProjectDetail = defineAsyncComponent(() => import('./components/ProjectDetail.vue'))
const AboutDetail = defineAsyncComponent(() => import('./components/AboutDetail.vue'))
const Archive = defineAsyncComponent(() => import('./components/Archive.vue'))

type Route =
  | { name: 'project'; slug: string }
  | { name: 'about' }
  | { name: 'archive' }
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
  if (hash === '/archive') return { name: 'archive' }
  const anchor = hash && !hash.startsWith('/') ? hash : ''
  return { name: 'home', anchor }
}

const route = ref<Route>(getRoute())
const project = computed(() => {
  const r = route.value
  return r.name === 'project' ? projects.value.find((p) => p.slug === r.slug) ?? null : null
})
const isAbout = computed(() => route.value.name === 'about')
const isArchive = computed(() => route.value.name === 'archive')
const isHome = computed(() => route.value.name === 'home')
// 하위 페이지의 '돌아가기' 목적지 — 왔던 자리로 가깝게 돌려보낸다
const backTo = computed(() => (isAbout.value ? '#about' : isArchive.value ? '#works' : '#/'))

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

// 라우트·언어별 문서 제목과 설명. 해시 라우팅이라 크롤러는 못 보지만
// 탭 제목·방문 기록·북마크는 이 값을 쓴다.
const BASE_TITLE = 'Hyonah Lim · Full-stack Developer'
const docMeta = computed(() => {
  const p = project.value
  if (p) {
    const t = splitTitle(p.title)
    return { title: `${t.main} · Hyonah Lim`, description: p.description }
  }
  if (isAbout.value) return { title: `About · Hyonah Lim`, description: profile.value.tagline }
  if (isArchive.value) {
    return {
      title: `${locale.value === 'ko' ? '전체 프로젝트' : 'All projects'} · Hyonah Lim`,
      description: profile.value.tagline,
    }
  }
  return { title: BASE_TITLE, description: profile.value.tagline }
})
watch(
  docMeta,
  (m) => {
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
  },
  { immediate: true },
)

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

// 비동기 청크가 마운트된 뒤에도 reveal 을 다시 묶는다 (라우트 watch 는 청크 도착 전에 끝날 수 있다)
function onSubpageMounted() {
  bindReveal()
}

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
  <a class="skip" href="#main">Skip to content</a>
  <Stars />
  <CursorFollower />
  <Lightbox />
  <CommandPalette />
  <BootIntro />
  <Navbar v-if="isHome" />
  <SubBar v-else :back="backTo" />
  <main id="main" tabindex="-1">
    <ProjectDetail v-if="project" :key="project.slug" :project="project" @vue:mounted="onSubpageMounted" />
    <AboutDetail v-else-if="isAbout" @vue:mounted="onSubpageMounted" />
    <Archive v-else-if="isArchive" @vue:mounted="onSubpageMounted" />
    <template v-else>
      <Hero />
      <About />
      <Works />
      <Contact />
    </template>
  </main>
  <BackToTop v-if="isHome" />
</template>
