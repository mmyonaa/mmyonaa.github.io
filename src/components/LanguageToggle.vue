<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { LOCALES, locale, setLocale, type Locale } from '../i18n'

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const current = computed(() => LOCALES.find((l) => l.value === locale.value) ?? LOCALES[0])

function toggle() {
  open.value = !open.value
}
function choose(l: Locale) {
  setLocale(l)
  open.value = false
}

// 바깥 클릭 / ESC 로 닫기
function onPointer(e: PointerEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointer)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointer)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="lang">
    <button
      type="button"
      class="lang__btn"
      :class="{ 'is-open': open }"
      aria-haspopup="listbox"
      :aria-expanded="open"
      aria-label="Select language"
      @click="toggle"
    >
      <span class="lang__code">{{ current.short }}</span>
      <span class="lang__caret" aria-hidden="true">▾</span>
    </button>

    <ul v-if="open" class="lang__menu" role="listbox">
      <li v-for="l in LOCALES" :key="l.value" role="option" :aria-selected="l.value === locale">
        <button
          type="button"
          class="lang__item"
          :class="{ 'is-active': l.value === locale }"
          @click="choose(l.value)"
        >
          <span class="lang__item-label">{{ l.label }}</span>
          <span class="lang__item-code">{{ l.short }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped src="../styles/LanguageToggle.css"></style>
