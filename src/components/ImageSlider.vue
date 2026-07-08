<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { openLightbox } from '../lightbox'

const props = withDefaults(
  defineProps<{
    images: string[]
    alt?: string
    href?: string // 지정 시 이미지가 해당 경로로 이동하는 링크가 됨
    autoplay?: boolean
    frame?: 'kiosk' // 세로 화면을 키오스크 기기 목업 프레임으로 표시
    tall?: boolean // 키오스크 기기를 세로로 길게 (상세 페이지용)
    wide?: boolean // 16:9 비율 (발표 슬라이드 등)
    zoomable?: boolean // 클릭 시 라이트박스로 확대 (링크(href)가 없을 때만)
  }>(),
  { alt: '', href: '', autoplay: true, frame: undefined, tall: false, wide: false, zoomable: false },
)

const canZoom = computed(() => props.zoomable && !props.href)
function onImgClick(src: string) {
  if (canZoom.value) openLightbox(src, props.alt)
}

const slide = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function stopAuto() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
function startAuto() {
  stopAuto()
  if (props.autoplay && props.images.length > 1) {
    timer = setInterval(() => slideNext(), 5000)
  }
}
function go(i: number) {
  slide.value = (i + props.images.length) % props.images.length
}
function slideNext() {
  go(slide.value + 1)
}
function slidePrev() {
  go(slide.value - 1)
}

// 이미지 목록이 바뀌면 첫 장으로 리셋
watch(
  () => props.images,
  () => {
    slide.value = 0
  },
)
// 자동재생 on/off (active 패널 전환 등)에 반응
watch(() => props.autoplay, startAuto, { immediate: true })
onBeforeUnmount(stopAuto)

const hasMany = computed(() => props.images.length > 1)
</script>

<template>
  <div
    class="slider"
    :class="{ 'slider--kiosk': frame === 'kiosk', 'is-tall': tall, 'slider--wide': wide, 'is-zoomable': canZoom }"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
  >
    <!-- 키오스크: 기기 1대 고정, 화면 안에서만 슬라이드 -->
    <div v-if="frame === 'kiosk'" class="slider__kiosk">
      <span class="slider__kiosk-screen">
        <div class="slider__track" :style="{ transform: `translateX(-${slide * 100}%)` }">
          <figure v-for="(src, i) in images" :key="src" class="slider__slide">
            <img :src="src" :alt="`${alt} 스크린샷 ${i + 1}`" loading="lazy" draggable="false" @click="onImgClick(src)" />
          </figure>
        </div>
      </span>
    </div>

    <!-- 일반: 트랙이 통째로 슬라이드 -->
    <div v-else class="slider__track" :style="{ transform: `translateX(-${slide * 100}%)` }">
      <figure v-for="(src, i) in images" :key="src" class="slider__slide">
        <img :src="src" :alt="`${alt} 스크린샷 ${i + 1}`" loading="lazy" draggable="false" @click="onImgClick(src)" />
      </figure>
    </div>

    <!-- href 지정 시 슬라이더 전체를 덮는 이동 링크 (화살표·점은 그 위에 위치) -->
    <a v-if="href" class="slider__link" :href="href" :aria-label="`${alt} 자세히 보기`"></a>
    <span v-if="href" class="slider__cta">View project ↗</span>

    <template v-if="hasMany">
      <button class="slider__arrow slider__arrow--prev" type="button" aria-label="이전 이미지" @click="slidePrev">‹</button>
      <button class="slider__arrow slider__arrow--next" type="button" aria-label="다음 이미지" @click="slideNext">›</button>
      <div class="slider__dots">
        <button
          v-for="(src, i) in images"
          :key="src"
          type="button"
          class="slider__dot"
          :class="{ 'is-active': i === slide }"
          :aria-label="`${i + 1}번째 이미지로 이동`"
          :aria-current="i === slide"
          @click="go(i)"
        />
      </div>
      <span class="slider__count">{{ String(slide + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}</span>
    </template>
  </div>
</template>

<style scoped src="../styles/ImageSlider.css"></style>
