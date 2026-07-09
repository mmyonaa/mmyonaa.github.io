import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '자사 서비스 저작도구 고도화',
  description:
    '3D·인터랙티브 저작도구의 태블릿(768~1023px) 대응 기준을 세우고 터치 UX·크로스브라우징을 고도화했으며, 템플릿 리스트 페이지를 신규 개발해 다양한 디바이스에서 안정적인 저작 경험을 확보했습니다.',
  highlights: [
    '태블릿 대응 기준(768~1023px) 수립과 QA 기반 UI/기능 개선 — 이슈 39건 처리',
    '3D 매핑 사용 시 동영상 재생 불가 이슈 개선',
    '화면 줌·레이어 스크롤·캔버스 위치 등 태블릿 터치 UX 전면 개선',
    '템플릿 리스트 페이지(카테고리별 탐색) 신규 개발',
    '기기 6종 × 브라우저 6종 크로스브라우징 검증·대응',
  ],
  qa: {
    stats: [
      { value: '6', label: '태블릿 기기' },
      { value: '6', label: '브라우저' },
      { value: '61', label: '테스트 케이스' },
      { value: '1,400+', label: '케이스 실행' },
      { value: '39', label: '처리 이슈' },
    ],
    findings: [
      {
        title: '화면 줌 개선',
        media: '/projects/apoc-studio/apoc-studio-qa-zoom.webp',
        body: '확대해도 1%씩 겨우 커지던 화면 줌을 시원하게 동작하도록 개선하고, 현재 배율이 바로 보이도록 토스트 팝업을 추가했습니다.',
      },
      {
        title: '레이어 영역 터치 스크롤',
        media: '/projects/apoc-studio/apoc-studio-qa-layer-scroll.webp',
        body: '스크롤하면 요소가 드래그돼 버리던 레이어 영역을 스크롤 가능하게 고치고, 아이템을 길게 눌러 순서를 바꾸는 동작까지 지원했습니다.',
      },
      {
        title: '좌우 탭 연동 캔버스 위치',
        media: '/projects/apoc-studio/apoc-studio-qa-canvas.webp',
        body: '탭이 열려도 중앙에 고정돼 가려지던 캔버스가 탭 상태에 따라 이동하도록 개선해 작업 영역 가려짐을 최소화했습니다.',
      },
      {
        title: '팝업 위치 동적 처리',
        media: '/projects/apoc-studio/apoc-studio-qa-popup.webp',
        body: '값·화면효과 팝업이 캔버스 위치에 따라 잘리던 문제를 남은 여백에 맞춰 열리는 방향이 바뀌도록 개선하고, 재생구간·볼륨 드래그 값 미저장 등 입력 결함도 함께 수정했습니다.',
      },
    ],
    note: '갤럭시 탭 S9 FE·S6·A8, iPad Air 3·4, Xiaomi Pad 4에서 Chrome·Safari·Whale·Firefox·Edge·삼성인터넷, 터치·터치펜 입력으로 검증 — 원본 테스트 시트는 사내 문서로 비공개입니다.',
  },
  related: [
    { slug: 'apoc-renewal', role: '플랫폼(apoc.day) UI 리뉴얼' },
    { slug: 'apoc-payment', role: '서비스 전반의 결제·정기구독' },
  ],
}

export const en: ProjectText = {
  title: 'In-house Service Authoring Tool Enhancement',
  description:
    'Established tablet support criteria (768–1023px) for the 3D/interactive authoring tool, refined touch UX and cross-browser behavior, and built a new template list page for a stable authoring experience across devices.',
  highlights: [
    'Set tablet support criteria (768–1023px) and improved UI/features from QA — 39 issues resolved',
    'Fixed a bug where video would not play when 3D mapping was used',
    'Overhauled tablet touch UX — screen zoom, layer scrolling, canvas positioning',
    'Built a new template list page with category browsing',
    'Verified and fixed cross-browser behavior across 6 devices × 6 browsers',
  ],
  qa: {
    stats: [
      { value: '6', label: 'tablet devices' },
      { value: '6', label: 'browsers' },
      { value: '61', label: 'test cases' },
      { value: '1,400+', label: 'case runs' },
      { value: '39', label: 'issues resolved' },
    ],
    findings: [
      {
        title: 'Screen zoom',
        media: '/projects/apoc-studio/apoc-studio-qa-zoom.webp',
        body: 'Zoom barely moved 1% per gesture; reworked it to zoom smoothly and added a toast popup showing the current scale.',
      },
      {
        title: 'Touch scrolling in the layer panel',
        media: '/projects/apoc-studio/apoc-studio-qa-layer-scroll.webp',
        body: 'Scrolling used to drag elements instead; fixed the layer panel to scroll properly and added long-press reordering of layer items.',
      },
      {
        title: 'Canvas position tied to side tabs',
        media: '/projects/apoc-studio/apoc-studio-qa-canvas.webp',
        body: 'The canvas stayed centered and got covered when side tabs opened; it now shifts with tab state to keep the work area visible.',
      },
      {
        title: 'Dynamic popup positioning',
        media: '/projects/apoc-studio/apoc-studio-qa-popup.webp',
        body: 'Value and screen-effect popups were clipped depending on canvas position; they now open toward the available space. Also fixed input defects such as drag values (playback range, volume) not being saved.',
      },
    ],
    note: 'Verified on Galaxy Tab S9 FE · S6 · A8, iPad Air 3 · 4 and Xiaomi Pad 4 across Chrome · Safari · Whale · Firefox · Edge · Samsung Internet with touch and stylus input — the original test sheet is an internal document and not public.',
  },
  related: [
    { slug: 'apoc-renewal', role: 'Platform (apoc.day) UI renewal' },
    { slug: 'apoc-payment', role: 'Cross-service payments & subscriptions' },
  ],
}
