<script setup lang="ts">
import { computed } from 'vue'
import { profile, about, aboutDetail, skills, contacts } from '../data'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

const education = computed(() => aboutDetail.value.education)
const languages = computed(() => aboutDetail.value.languages)
</script>

<template>
  <article class="about-detail">
    <header class="detail__bar">
      <a class="detail__back" href="#about">← Back to index</a>
      <div class="detail__bar-right">
        <span class="detail__brand">{{ profile.name.toLowerCase() }}<span>_</span></span>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>

    <div class="detail__wrap">
      <p class="eyebrow reveal">( About me )</p>
      <h1 class="about-detail__title reveal">{{ profile.name }}</h1>
      <p class="about-detail__role reveal">{{ profile.role }} · {{ profile.location }}</p>

      <p class="about-detail__intro reveal">{{ aboutDetail.intro }}</p>

      <div class="about-detail__grid">
        <div class="about-detail__main">
          <p
            v-for="(p, i) in aboutDetail.paragraphs"
            :key="i"
            class="about-detail__para reveal"
          >
            {{ p }}
          </p>
        </div>

        <aside class="about-detail__side reveal">
          <div class="side__block">
            <span class="side__label">In short</span>
            <p class="about-detail__short">{{ about.paragraphs[0] }}</p>
          </div>
          <div class="side__block">
            <span class="side__label">Get in touch</span>
            <div class="side__links">
              <a
                v-for="c in contacts"
                :key="c.label"
                :href="c.href"
                target="_blank"
                rel="noreferrer"
              >
                {{ c.label }} ↗
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section class="about-detail__section">
        <h2 class="about-detail__heading reveal">How I work</h2>
        <ul class="about-detail__principles">
          <li
            v-for="(pr, i) in aboutDetail.principles"
            :key="pr.title"
            class="principle reveal"
          >
            <span class="principle__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="principle__body">
              <h3 class="principle__title">{{ pr.title }}</h3>
              <p class="principle__text">{{ pr.body }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="about-detail__section">
        <h2 class="about-detail__heading reveal">Experience</h2>
        <ul class="about-detail__timeline">
          <li
            v-for="t in aboutDetail.timeline"
            :key="t.period + t.title"
            class="tl reveal"
          >
            <span class="tl__period">{{ t.period }}</span>
            <div class="tl__body">
              <h3 class="tl__title">{{ t.title }}</h3>
              <p class="tl__text">{{ t.body }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="about-detail__section">
        <h2 class="about-detail__heading reveal">Activities</h2>
        <ul class="about-detail__timeline">
          <li
            v-for="a in aboutDetail.activities"
            :key="a.period + a.title"
            class="tl reveal"
          >
            <span class="tl__period">{{ a.period }}</span>
            <div class="tl__body">
              <h3 class="tl__title">{{ a.title }}</h3>
              <p class="tl__text">{{ a.body }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="about-detail__section">
        <h2 class="about-detail__heading reveal">Education</h2>
        <ul class="about-detail__timeline">
          <li
            v-for="e in education"
            :key="e.period + e.school"
            class="tl reveal"
          >
            <span class="tl__period">{{ e.period }}</span>
            <div class="tl__body">
              <h3 class="tl__title">{{ e.school }} · {{ e.degree }}</h3>
              <ul class="tl__notes">
                <li v-for="n in e.notes" :key="n">{{ n }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section v-if="languages.length" class="about-detail__section">
        <h2 class="about-detail__heading reveal">Languages</h2>
        <div class="about-detail__skills">
          <div v-for="l in languages" :key="l.name" class="skillgroup reveal">
            <span class="skillgroup__cat">{{ l.name }}</span>
            <ul class="skillgroup__list">
              <li>{{ l.level }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="about-detail__section">
        <h2 class="about-detail__heading reveal">Skills</h2>
        <div class="about-detail__skills">
          <div v-for="g in skills" :key="g.category" class="skillgroup reveal">
            <span class="skillgroup__cat">{{ g.category }}</span>
            <ul class="skillgroup__list">
              <li v-for="s in g.items" :key="s">{{ s }}</li>
            </ul>
          </div>
        </div>
      </section>

      <a class="detail__next reveal" href="#works">
        <span class="eyebrow">See my work →</span>
        <span class="detail__next-title">Selected projects</span>
      </a>
    </div>
  </article>
</template>

<style scoped src="../styles/AboutDetail.css"></style>
