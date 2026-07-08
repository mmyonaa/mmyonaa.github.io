<script setup lang="ts">
import { computed } from 'vue'
import { theme, toggleTheme } from '../theme'

const next = computed(() => (theme.value === 'dark' ? 'light' : 'dark'))
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="`${next} 모드로 전환`"
    title="테마 전환"
    @click="toggleTheme"
  >
    <span aria-hidden="true">{{ theme === 'dark' ? '☀︎' : '☾' }}</span>
  </button>
</template>

<style scoped src="../styles/ThemeToggle.css"></style>
