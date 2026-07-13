import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '자사 서비스 저작도구 태블릿 대응',
  description:
    '3D·인터랙티브 저작도구의 태블릿(768~1023px) 대응 기준을 세우고, 터치 UX와 크로스브라우징을 고도화해 태블릿에서 안정적인 저작 경험을 확보했습니다.',
  overview: [
    'APOC Studio(studio.apoc.day)는 APOC Play에 올릴 3D·인터랙티브 콘텐츠를 만드는 블록형 저작도구입니다. 데스크톱 위주로 설계돼 태블릿에서는 저작 흐름이 끊기던 이 도구의 태블릿 대응을 맡아, 사용 기준(768~1023px)을 세우고 화면 줌·레이어 스크롤·캔버스 위치·팝업 위치 등 터치 환경 특유의 문제를 기기 6종 × 브라우저 6종으로 검증·개선했습니다.',
  ],
  highlights: [
    '태블릿 대응 기준(768~1023px) 수립과 QA 기반 UI/기능 개선 — 이슈 39건 발견·추적',
    '화면 줌·레이어 스크롤·캔버스 위치 등 태블릿 터치 UX 전면 개선',
    '기기 6종 × 브라우저 6종 크로스브라우징 검증·대응',
    '터치·터치펜 입력 기준 테스트 케이스 61항목 설계·수행',
  ],
  qa: {
    stats: [
      { value: '6', label: '태블릿 기기' },
      { value: '6', label: '브라우저' },
      { value: '61', label: '테스트 케이스' },
      { value: '1,400+', label: '케이스 실행' },
      { value: '39', label: '기록 이슈' },
    ],
    findings: [
      {
        title: '화면 줌 개선',
        media: '/projects/apoc-studio/apoc-studio-qa-zoom.webp',
        body: '제스처당 확대 폭이 1% 수준에 그치던 화면 줌을 배율 변화가 즉각 반영되도록 개선하고, 현재 배율을 표시하는 토스트 팝업을 추가했습니다.',
      },
      {
        title: '레이어 영역 터치 스크롤',
        media: '/projects/apoc-studio/apoc-studio-qa-layer-scroll.webp',
        body: '스크롤이 요소 드래그로 인식되던 레이어 영역의 터치 이벤트를 분리해 스크롤을 정상화하고, 롱프레스로 레이어 순서를 변경하는 동작을 지원했습니다.',
      },
      {
        title: '좌우 탭 연동 캔버스 위치',
        media: '/projects/apoc-studio/apoc-studio-qa-canvas.webp',
        body: '사이드 탭이 열리면 캔버스 일부가 가려지던 문제를 탭 상태에 따라 캔버스 위치가 이동하도록 개선해 작업 영역 가림을 최소화했습니다.',
      },
      {
        title: '팝업 위치 동적 처리',
        media: '/projects/apoc-studio/apoc-studio-qa-popup.webp',
        body: '값·화면효과 팝업이 캔버스 위치에 따라 잘리던 문제를 가용 여백 기준으로 열림 방향이 전환되도록 개선하고, 재생구간·볼륨 드래그 값 미저장 등 입력 결함을 수정했습니다.',
      },
    ],
    note: '갤럭시 탭 S9 FE·S6·A8, iPad Air 3·4, Xiaomi Pad 4에서 Chrome·Safari·Whale·Firefox·Edge·삼성인터넷, 터치·터치펜 입력으로 검증 — 원본 테스트 시트는 사내 문서로 비공개입니다.',
  },
}

export const en: ProjectText = {
  title: 'In-house Authoring Tool Tablet Support',
  description:
    'Established tablet support criteria (768–1023px) for the 3D/interactive authoring tool and refined touch UX and cross-browser behavior for a stable authoring experience on tablets.',
  overview: [
    'APOC Studio (studio.apoc.day) is a block-based authoring tool for creating the 3D/interactive content published on APOC Play. Designed desktop-first, its authoring flow broke down on tablets; I took on its tablet support — setting usage criteria (768–1023px) and verifying and fixing touch-specific issues (screen zoom, layer scrolling, canvas position, popup position) across 6 devices × 6 browsers.',
  ],
  highlights: [
    'Set tablet support criteria (768–1023px) and improved UI/features from QA — 39 issues identified and tracked',
    'Overhauled tablet touch UX — screen zoom, layer scrolling, canvas positioning',
    'Verified and fixed cross-browser behavior across 6 devices × 6 browsers',
    'Designed and ran 61 test cases covering touch and stylus input',
  ],
  qa: {
    stats: [
      { value: '6', label: 'tablet devices' },
      { value: '6', label: 'browsers' },
      { value: '61', label: 'test cases' },
      { value: '1,400+', label: 'case runs' },
      { value: '39', label: 'issues logged' },
    ],
    findings: [
      {
        title: 'Screen zoom',
        media: '/projects/apoc-studio/apoc-studio-qa-zoom.webp',
        body: 'Improved the screen zoom, which previously advanced only about 1% per gesture, so scale changes apply immediately, and added a toast indicating the current zoom level.',
      },
      {
        title: 'Touch scrolling in the layer panel',
        media: '/projects/apoc-studio/apoc-studio-qa-layer-scroll.webp',
        body: 'Separated touch events in the layer panel, where scrolling was misinterpreted as element dragging, restoring normal scrolling and adding long-press reordering of layers.',
      },
      {
        title: 'Canvas position tied to side tabs',
        media: '/projects/apoc-studio/apoc-studio-qa-canvas.webp',
        body: 'Resolved the canvas being partially covered when side tabs opened by shifting its position based on tab state, keeping the work area visible.',
      },
      {
        title: 'Dynamic popup positioning',
        media: '/projects/apoc-studio/apoc-studio-qa-popup.webp',
        body: 'Fixed value and screen-effect popups being clipped depending on canvas position by switching their opening direction based on available space, and corrected input defects such as drag values (playback range, volume) not being saved.',
      },
    ],
    note: 'Verified on Galaxy Tab S9 FE · S6 · A8, iPad Air 3 · 4 and Xiaomi Pad 4 across Chrome · Safari · Whale · Firefox · Edge · Samsung Internet with touch and stylus input — the original test sheet is an internal document and not public.',
  },
}
