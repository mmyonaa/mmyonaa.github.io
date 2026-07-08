<script setup lang="ts">
import { profile, contacts } from '../data'
</script>

<template>
  <section id="contact" class="contact">
    <h2 class="contact__title reveal">SAY HELLO</h2>

    <ul class="contact__details reveal">
      <li v-for="c in contacts" :key="c.label" class="cinfo">
        <span class="cinfo__icon" aria-hidden="true">{{ c.icon }}</span>
        <span class="cinfo__label">{{ c.label }}</span>
        <a
          class="cinfo__value"
          :href="c.href"
          :target="c.href.startsWith('http') ? '_blank' : undefined"
          :rel="c.href.startsWith('http') ? 'noreferrer' : undefined"
        >
          {{ c.value }}
        </a>
      </li>
    </ul>

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
      <span>© {{ profile.name }} 2026</span>
      <span>Based in {{ profile.location }}</span>
    </footer>
  </section>
</template>

<style scoped src="../styles/Contact.css"></style>
