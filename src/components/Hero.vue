<script setup lang="ts">
import { profile, about } from '../data'
</script>

<template>
  <section id="top" class="hero">
    <span class="hero__ghost" aria-hidden="true">PORTFOLIO</span>
    <div class="hero__inner">
      <p class="hero__role reveal">{{ profile.role }} · {{ profile.location }}</p>
      <h1 class="hero__title reveal">{{ profile.fullName }}</h1>
      <p class="hero__lead reveal">{{ about.paragraphs[0] }}</p>
      <p class="hero__now reveal">
        <span class="hero__now-label">Now</span>
        <span class="hero__now-text">{{ profile.now }}</span>
      </p>
      <a href="#works" class="scrolldown reveal">
        <span class="scrolldown__label">[ Scroll down ]</span>
        <span class="mouse" aria-hidden="true"><span /></span>
      </a>
    </div>
  </section>
</template>

<style scoped src="../styles/Hero.css"></style>
