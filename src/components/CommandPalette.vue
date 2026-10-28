<script setup lang="ts">
// ⌘K / Ctrl+K 커맨드 팔레트 — 프로젝트 점프·섹션 이동·테마/언어·링크.
// <dialog> 로 열어 포커스 가두기·ESC·배경 비활성(inert)을 브라우저에 맡긴다.
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { commandOpen, closeCommand, toggleCommand } from '../command'
import { projects, socials, profile } from '../data'
import { theme, toggleTheme } from '../theme'
import { locale, setLocale } from '../i18n'

type Cmd = { id: string; label: string; hint?: string; keywords?: string; run: () => void }

const query = ref('')
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const dialogEl = ref<HTMLDialogElement | null>(null)

function go(hash: string) {
  window.location.hash = hash
  closeCommand()
}

const commands = computed<Cmd[]>(() => {
  const list: Cmd[] = [
    { id: 'home', label: 'Home', hint: 'section', keywords: '홈 top', run: () => go('#top') },
    { id: 'about', label: 'About', hint: 'page', keywords: '소개', run: () => go('#/about') },
    { id: 'works', label: 'Works', hint: 'section', keywords: '프로젝트 projects', run: () => go('#works') },
    { id: 'archive', label: 'All projects', hint: 'page', keywords: '전체 프로젝트 archive 아카이브', run: () => go('#/archive') },
    { id: 'contact', label: 'Contact', hint: 'section', keywords: '연락', run: () => go('#contact') },
    ...projects.value.map((p) => ({
      id: 'p-' + p.slug,
      label: p.title,
      hint: 'project',
      keywords: p.slug + ' ' + p.tags.join(' '),
      run: () => go('#/project/' + p.slug),
    })),
    {
      id: 'theme',
      label: theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
      hint: 'action',
      keywords: '테마 다크 라이트 dark light mode',
      run: () => toggleTheme(),
    },
    {
      id: 'lang',
      label: locale.value === 'ko' ? 'Switch to English' : '한국어로 전환',
      hint: 'action',
      keywords: 'language 언어 ko en',
      run: () => setLocale(locale.value === 'ko' ? 'en' : 'ko'),
    },
    ...socials.value.map((s) => ({
      id: 's-' + s.label,
      label: 'Open ' + s.label,
      hint: 'link',
      keywords: s.label + (s.label === 'Blog' ? ' 블로그 writing 글' : ''),
      run: () => {
        window.open(s.url, s.url.startsWith('mailto') ? '_self' : '_blank')
        closeCommand()
      },
    })),
  ]
  if (profile.value.resumeUrl) {
    list.push({
      id: 'resume',
      label: 'Download résumé',
      hint: 'link',
      keywords: '이력서 resume cv',
      run: () => {
        window.open(profile.value.resumeUrl, '_blank')
        closeCommand()
      },
    })
  }
  return list
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands.value
  return commands.value.filter((c) => (c.label + ' ' + (c.keywords || '')).toLowerCase().includes(q))
})

watch(filtered, () => {
  active.value = 0
})

const activeId = computed(() => (filtered.value[active.value] ? `cmdk-opt-${filtered.value[active.value].id}` : undefined))

watch(commandOpen, async (open) => {
  const d = dialogEl.value
  if (open) {
    query.value = ''
    active.value = 0
    await nextTick()
    if (d && !d.open) d.showModal()
    document.body.style.overflow = 'hidden'
    inputEl.value?.focus()
  } else {
    document.body.style.overflow = ''
    if (d?.open) d.close()
  }
})

function onListKey(e: KeyboardEvent) {
  const n = filtered.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = n ? (active.value + 1) % n : 0
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = n ? (active.value - 1 + n) % n : 0
  } else if (e.key === 'Enter') {
    e.preventDefault()
    filtered.value[active.value]?.run()
  }
}

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault()
    toggleCommand()
  }
}

// 바깥(backdrop) 클릭 — dialog 자신이 타깃일 때만 바깥이다
function onDialogClick(e: MouseEvent) {
  if (e.target === dialogEl.value) closeCommand()
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <dialog
    ref="dialogEl"
    class="cmdk"
    aria-label="Command menu"
    @cancel.prevent="closeCommand()"
    @close="closeCommand()"
    @click="onDialogClick"
  >
    <div class="cmdk__panel">
      <div class="cmdk__search">
        <span class="cmdk__prompt" aria-hidden="true">›</span>
        <input
          ref="inputEl"
          v-model="query"
          class="cmdk__input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-autocomplete="list"
          :aria-activedescendant="activeId"
          placeholder="Jump to a project, toggle theme…"
          spellcheck="false"
          autocomplete="off"
          @keydown="onListKey"
        />
        <span class="cmdk__badge" aria-hidden="true">esc</span>
      </div>
      <ul id="cmdk-list" class="cmdk__list" role="listbox">
        <li
          v-for="(c, i) in filtered"
          :id="`cmdk-opt-${c.id}`"
          :key="c.id"
          class="cmdk__item"
          role="option"
          :aria-selected="i === active"
          :class="{ 'is-active': i === active }"
          @pointerenter="active = i"
          @click="c.run()"
        >
          <span class="cmdk__label">{{ c.label }}</span>
          <span v-if="c.hint" class="cmdk__tag">{{ c.hint }}</span>
        </li>
        <li v-if="!filtered.length" class="cmdk__empty" role="presentation">No matches</li>
      </ul>
    </div>
  </dialog>
</template>

<style scoped src="../styles/CommandPalette.css"></style>
