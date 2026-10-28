<script setup lang="ts">
// 전체 프로젝트 표 — 랜딩은 앞의 몇 개만 보여주고, 나머지는 여기서 한눈에 훑는다.
import { computed } from 'vue'
import { projects } from '../data'
import { locale } from '../i18n'
import { splitTitle } from '../title'

const MAX_TAGS = 6

const t = computed(() =>
  locale.value === 'ko'
    ? { title: '전체 프로젝트', year: '연도', project: '프로젝트', team: '팀 · 역할', built: '기술', link: '링크', live: '운영 중', more: '개 더' }
    : { title: 'All projects', year: 'Year', project: 'Project', team: 'Team · Role', built: 'Built with', link: 'Link', live: 'Live', more: 'more' },
)

const rows = computed(() =>
  projects.value.map((p) => ({
    ...p,
    year: p.period.slice(0, 4),
    name: splitTitle(p.title),
    tags: p.tags.slice(0, MAX_TAGS),
    moreTags: Math.max(0, p.tags.length - MAX_TAGS),
  })),
)
</script>

<template>
  <article class="archive">
    <div class="archive__wrap">
      <p class="eyebrow reveal">( Archive )</p>
      <h1 class="archive__title reveal">{{ t.title }}</h1>
      <p class="archive__count reveal">{{ String(rows.length).padStart(2, '0') }}</p>

      <div class="archive__scroll reveal">
        <table class="archive__table">
          <thead>
            <tr>
              <th scope="col">{{ t.year }}</th>
              <th scope="col">{{ t.project }}</th>
              <th scope="col">{{ t.team }}</th>
              <th scope="col">{{ t.built }}</th>
              <th scope="col">{{ t.link }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rows" :key="r.slug">
              <td class="archive__year">{{ r.year }}</td>
              <td class="archive__name">
                <a :href="`#/project/${r.slug}`">
                  <span v-if="r.live" class="archive__live" :title="t.live" aria-hidden="true" />
                  {{ r.name.main }}
                </a>
                <span v-if="r.name.sub" class="archive__sub">{{ r.name.sub }}</span>
              </td>
              <td class="archive__team">{{ r.team || '—' }}</td>
              <td class="archive__tags">
                <ul>
                  <li v-for="tag in r.tags" :key="tag">{{ tag }}</li>
                  <li v-if="r.moreTags" class="is-more">+{{ r.moreTags }} {{ t.more }}</li>
                </ul>
              </td>
              <td class="archive__links">
                <a v-if="r.link" :href="r.link" target="_blank" rel="noreferrer">Live ↗</a>
                <a v-if="r.repo" :href="r.repo" target="_blank" rel="noreferrer">GitHub ↗</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<style scoped src="../styles/Archive.css"></style>
