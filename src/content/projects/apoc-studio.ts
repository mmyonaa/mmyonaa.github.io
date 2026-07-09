import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '자사 서비스 저작도구 고도화',
  description:
    '3D·인터랙티브 저작도구의 QA 이슈를 대응하고 반응형·크로스브라우징을 고도화해 다양한 디바이스에서 안정적인 동작을 확보했습니다.',
  highlights: [
    'QA 피드백 기반 UI 이슈 수정',
    '3D 매핑 사용 시 동영상 재생 불가 이슈 개선',
    '다양한 해상도·태블릿 레이아웃 일관성 및 UX 최적화',
    '반응형 개선과 크로스브라우징 대응',
  ],
  qa: {
    stats: [
      { value: '6', label: '태블릿 기기' },
      { value: '6', label: '브라우저' },
      { value: '61', label: '테스트 케이스' },
      { value: '1,400+', label: '케이스 실행' },
      { value: '39', label: '발견 이슈' },
    ],
    findings: [
      {
        title: '입력 컨트롤 크로스브라우징',
        body: '속성창의 재생구간·볼륨 드래그 값이 일부 브라우저에서 저장되지 않는 등 터치 입력 결함을 기기 × 브라우저 조합별로 추적해 대응했습니다.',
      },
      {
        title: '캔버스 리사이즈·회전 대응',
        body: '진입 시점이나 가로/세로 전환 시 캔버스 리사이즈가 늦거나 동작하지 않는 케이스를 저사양 기기 중심으로 확인해 개선했습니다.',
      },
      {
        title: '해상도 의존 레이아웃 이슈',
        body: '캔버스 위치에 따른 팝업 잘림, 안내 텍스트 겹침 등 해상도·기기별 레이아웃 이슈를 정리해 일관성을 확보했습니다.',
      },
    ],
    note: '갤럭시 탭 S9 FE·S6·A8, iPad Air 3·4, Xiaomi Pad 4에서 Chrome·Safari·Whale·Firefox·Edge·삼성인터넷으로 검증 — 원본 테스트 시트는 사내 문서로 비공개입니다.',
  },
  related: [
    { slug: 'apoc-renewal', role: '플랫폼(apoc.day) UI 리뉴얼' },
    { slug: 'apoc-payment', role: '서비스 전반의 결제·정기구독' },
  ],
}

export const en: ProjectText = {
  title: 'In-house Service Authoring Tool Enhancement',
  description:
    'Resolved QA issues in the 3D/interactive authoring tool and improved responsiveness and cross-browser support to ensure stable behavior across devices.',
  highlights: [
    'Fixed UI issues based on QA feedback',
    'Fixed a bug where video would not play when 3D mapping was used',
    'Optimized layout consistency and UX across resolutions and tablets',
    'Improved responsiveness and cross-browser compatibility',
  ],
  qa: {
    stats: [
      { value: '6', label: 'tablet devices' },
      { value: '6', label: 'browsers' },
      { value: '61', label: 'test cases' },
      { value: '1,400+', label: 'case runs' },
      { value: '39', label: 'issues found' },
    ],
    findings: [
      {
        title: 'Cross-browser input controls',
        body: 'Tracked touch-input defects per device × browser combination, such as drag values (playback range, volume) not being saved in some browsers.',
      },
      {
        title: 'Canvas resize & rotation handling',
        body: 'Identified and fixed cases where the canvas resized late or not at all on entry or when rotating between portrait and landscape, mainly on lower-end devices.',
      },
      {
        title: 'Resolution-dependent layout issues',
        body: 'Resolved popup clipping by canvas position, overlapping guide text, and other per-resolution layout issues to keep the editor consistent.',
      },
    ],
    note: 'Verified on Galaxy Tab S9 FE · S6 · A8, iPad Air 3 · 4 and Xiaomi Pad 4 across Chrome · Safari · Whale · Firefox · Edge · Samsung Internet — the original test sheet is an internal document and not public.',
  },
  related: [
    { slug: 'apoc-renewal', role: 'Platform (apoc.day) UI renewal' },
    { slug: 'apoc-payment', role: 'Cross-service payments & subscriptions' },
  ],
}
