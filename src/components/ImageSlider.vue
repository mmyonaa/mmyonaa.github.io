<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { openLightbox } from '../lightbox'
import { theme } from '../theme'
import { imageDims } from '../content/image-dims'

const props = withDefaults(
  defineProps<{
    images: string[]
    alt?: string
    href?: string // 지정 시 이미지가 해당 경로로 이동하는 링크가 됨
    autoplay?: boolean
    frame?: 'kiosk' | 'tablet' | 'phone' // 기기 목업 프레임 (kiosk: 세로 스탠딩 기기, tablet: 가로 태블릿, phone: 세로 스마트폰)
    tall?: boolean // 키오스크 기기를 세로로 길게 (상세 페이지용)
    wide?: boolean // 16:9 비율 (발표 슬라이드 등)
    zoomable?: boolean // 클릭 시 라이트박스로 확대 (링크(href)가 없을 때만)
    themed?: boolean // 이미지가 다크 기본 + '-light' 변형 쌍으로 존재 — 사이트 테마에 맞춰 스왑
    eager?: boolean // 첫 장을 바로 받는다 — 화면 상단의 큰 이미지(LCP)에만 쓴다
  }>(),
  { alt: '', href: '', autoplay: true, frame: undefined, tall: false, wide: false, zoomable: false, themed: false, eager: false },
)

// 테마 스왑: base = 다크. 라이트 테마면 '-light' 변형 사용 (아키텍처 다이어그램의 archSrc 와 같은 컨벤션)
const shownImages = computed(() =>
  props.themed && theme.value === 'light'
    ? props.images.map((src) => src.replace(/(\.\w+)$/, '-light$1'))
    : props.images,
)

// 고유 크기 — 로딩 중 자리를 미리 잡는다. 라이트 변형은 원본과 같은 크기라 원본 키로 찾는다
function dims(src: string) {
  const d = imageDims[src] ?? imageDims[src.replace(/-light(\.\w+)$/, '$1')]
  return d ? { width: d[0], height: d[1] } : {}
}

// 목업 프레임별 기기 라벨 (좌상단 표시)
const frameLabel = computed(
  () => props.frame && { kiosk: 'Kiosk', tablet: 'Tablet', phone: 'Mobile' }[props.frame],
)

// 목업 화면 비율 — 캡처의 실제 비율을 그대로 쓴다. 기기 틀에 맞춰 잘라내면
// 화면 가장자리(상단 바·하단 버튼)가 깎이므로, 첫 이미지의 비율로 화면을 세운다.
// 크기 표에 있으면 바로 쓰고, 없을 때만 이미지를 따로 재본다.
const screenAr = ref('')
watchEffect((onCleanup) => {
  const src = props.frame ? shownImages.value[0] : ''
  screenAr.value = ''
  if (!src) return
  const known = dims(src)
  if (known.width && known.height) {
    screenAr.value = `${known.width} / ${known.height}`
    return
  }
  const probe = new Image()
  const apply = () => {
    if (probe.naturalWidth && probe.naturalHeight) {
      screenAr.value = `${probe.naturalWidth} / ${probe.naturalHeight}`
    }
  }
  probe.addEventListener('load', apply)
  probe.src = src
  if (probe.complete) apply() // 캐시 적중 — load 없이 이미 크기를 안다
  onCleanup(() => probe.removeEventListener('load', apply))
})

const canZoom = computed(() => props.zoomable && !props.href)
function onImgClick(src: string) {
  if (canZoom.value) openLightbox(src, props.alt)
}

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
  // 모션 최소화면 자동 넘김도 하지 않는다 — 화살표·점으로만 넘긴다
  if (props.autoplay && !reduced && props.images.length > 1) {
    timer = setInterval(() => {
      if (!document.hidden) slideNext()
    }, 5000)
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

function loading(i: number): 'eager' | 'lazy' {
  return props.eager && i === 0 ? 'eager' : 'lazy'
}
</script>

<template>
  <div
    class="slider"
    :class="[frame && `slider--${frame}`, { 'is-tall': tall, 'slider--wide': wide, 'is-zoomable': canZoom }]"
    :style="screenAr ? { '--screen-ar': screenAr } : undefined"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
  >
    <!-- 기기 목업: 기기 1대 고정, 화면 안에서만 슬라이드 -->
    <div v-if="frame" :class="`slider__${frame}`">
      <span :class="`slider__${frame}-screen`">
        <div class="slider__track" :style="{ transform: `translateX(-${slide * 100}%)` }">
          <figure v-for="(src, i) in shownImages" :key="src" class="slider__slide">
            <component
              :is="canZoom ? 'button' : 'div'"
              :type="canZoom ? 'button' : undefined"
              :class="canZoom ? 'slider__zoom' : undefined"
              :aria-label="canZoom ? `${alt} 스크린샷 ${i + 1} — 확대 보기` : undefined"
              @click="onImgClick(src)"
            >
              <img
                :src="src"
                :alt="`${alt} 스크린샷 ${i + 1}`"
                v-bind="dims(src)"
                :loading="loading(i)"
                :fetchpriority="loading(i) === 'eager' ? 'high' : undefined"
                decoding="async"
                draggable="false"
              />
            </component>
          </figure>
        </div>
      </span>
    </div>

    <!-- 일반: 트랙이 통째로 슬라이드 -->
    <div v-else class="slider__track" :style="{ transform: `translateX(-${slide * 100}%)` }">
      <figure v-for="(src, i) in shownImages" :key="src" class="slider__slide">
        <component
          :is="canZoom ? 'button' : 'div'"
          :type="canZoom ? 'button' : undefined"
          :class="canZoom ? 'slider__zoom' : undefined"
          :aria-label="canZoom ? `${alt} 스크린샷 ${i + 1} — 확대 보기` : undefined"
          @click="onImgClick(src)"
        >
          <img
            :src="src"
            :alt="`${alt} 스크린샷 ${i + 1}`"
            v-bind="dims(src)"
            :loading="loading(i)"
            :fetchpriority="loading(i) === 'eager' ? 'high' : undefined"
            decoding="async"
            draggable="false"
          />
        </component>
      </figure>
    </div>

    <!-- 목업 프레임일 때 기기 종류 라벨 -->
    <span v-if="frameLabel" class="slider__device">{{ frameLabel }}</span>

    <!-- href 지정 시 슬라이더 전체를 덮는 이동 링크 (화살표·점은 그 위에 위치) -->
    <a v-if="href" class="slider__link" :href="href" :aria-label="`${alt} 자세히 보기`"></a>
    <span v-if="href" class="slider__cta">View project ↗</span>

    <template v-if="hasMany">
      <button class="slider__arrow slider__arrow--prev" type="button" aria-label="이전 이미지" @click="slidePrev">‹</button>
      <button class="slider__arrow slider__arrow--next" type="button" aria-label="다음 이미지" @click="slideNext">›</button>
      <div class="slider__dots">
        <button
          v-for="(src, i) in shownImages"
          :key="src"
          type="button"
          class="slider__dot"
          :class="{ 'is-active': i === slide }"
          :aria-label="`${i + 1}번째 이미지로 이동`"
          :aria-current="i === slide"
          @click="go(i)"
        />
      </div>
      <span class="slider__count" role="status" aria-live="polite">{{ String(slide + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}</span>
    </template>
  </div>
</template>

<style scoped src="../styles/ImageSlider.css"></style>
