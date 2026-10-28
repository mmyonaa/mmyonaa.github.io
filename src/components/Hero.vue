<script setup lang="ts">
import { profile } from '../data'
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__inner">
      <p class="hero__role reveal">{{ profile.role }} · {{ profile.location }}</p>
      <h1 class="hero__title reveal">PORTFOLIO</h1>
      <a href="#works" class="scrolldown reveal">
        <span class="scrolldown__label">[ Scroll down ]</span>
        <span class="mouse" aria-hidden="true"><span /></span>
      </a>
    </div>
  </section>
</template>

<style scoped src="../styles/Hero.css"></style>
