<script setup lang="ts">
import { computed } from 'vue'
import { about, skills } from '../data'

const services = computed(() => skills.value.flatMap((g) => g.items))
</script>

<template>
  <section id="about" class="about">
    <div class="about__inner">
      <span class="eyebrow reveal">( About me )</span>
      <p class="about__lead reveal">{{ about.paragraphs[0] }}</p>
      <p class="about__sub reveal">{{ about.paragraphs[1] }}</p>
      <ul class="about__services reveal">
        <li v-for="s in services" :key="s">{{ s }}</li>
      </ul>
      <a class="about__more reveal" href="#/about">
        More about me
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped src="../styles/About.css"></style>
