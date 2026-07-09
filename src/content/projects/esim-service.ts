import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'eSIM 판매 서비스',
  architectureCaptions: ['eSIM 플랫폼 구조 — 온라인 판매 채널'],
  architectureNotes: [
    '이 서비스(온라인 커머스)는 어드민이 관리하는 상품·재고를 공유 백엔드로 받아 웹에서 판매합니다. 키오스크·어드민과 같은 시스템의 한 축입니다.',
  ],
  description:
    'Vue 3 글로벌 eSIM 커머스. 프론트엔드 설계 전반을 주도하고 다중 PG 결제·다국어·웹/키오스크 겸용 결제 플로우를 직접 구현했습니다.',
  overview: [
    '여행자가 국가·상품을 검색·비교하고 장바구니·결제 후 eSIM QR을 메일로 받아 바로 설치하는 글로벌 eSIM 커머스입니다. Vue 3·TypeScript 프론트엔드의 초기 아키텍처(라우팅·상태·API·스타일·다국어)를 설계하고, 프로젝트 최다 커밋(전체의 약 1/3)으로 개발을 이끌었습니다.',
    '핵심은 결제입니다. Paygent 카드 결제(달러)에 Google Pay·Apple Pay(엔화)까지 묶은 다중 결제와, 상품 검증 → 결제 정보 생성 → 카드 토큰화 → 완료로 이어지는 다단계 결제 플로우를 구현했습니다. 같은 화면이 웹 고객과 키오스크(무로그인) 결제를 함께 처리하도록 orderId 기준으로 경로를 분기하고, 실패 시 롤백을 두어 상태 꼬임을 막았습니다.',
    '해외 사용자를 위해 vue-i18n 3개 언어(한/영/일) 사전을 직접 구축하고 국가·언어별 통화(USD/JPY)를 전환했으며, PC~모바일 반응형과 PWA(Workbox)를 적용했습니다. lz-string으로 로컬 저장소를 압축하고 html2canvas로 영수증을 이미지로 내려받는 등 클라이언트 최적화도 담당했습니다. 이 서비스는 어드민·키오스크·공유 백엔드(미들웨어)와 함께 하나의 eSIM 플랫폼을 이루며, 저는 그 백엔드에도 최다 기여자로 참여했습니다.',
  ],
  highlights: [
    'Vue 3 프론트엔드 아키텍처 설계·개발 주도 (프로젝트 최다 커밋)',
    '다중 PG 결제 구현 — Paygent 카드(USD) + Google Pay·Apple Pay(JPY)',
    '웹·키오스크 겸용 다단계 결제 플로우 (경로 분기·실패 롤백)',
    'vue-i18n 3개 언어 사전 구축 + 국가·언어별 통화 전환',
    '반응형·PWA + lz-string 저장소 압축·html2canvas 영수증 등 클라이언트 최적화',
    '공유 백엔드(미들웨어) 최다 기여 — eSIM 공급사 외부 연동, 결제 후 eSIM 발급·SES 메일 발송',
  ],
  techNotes: [
    {
      title: '다중 게이트웨이 글로벌 결제',
      body: 'Paygent 카드 결제(달러)에 Google Pay·Apple Pay(엔화)를 더해 결제 수단을 통합하고, 카드 브랜드별(VISA·Master·AMEX) 정규식 검증과 Paygent 토큰화, 국가·언어별 통화 코드 전환을 구현했습니다.',
    },
    {
      title: '웹 · 키오스크 겸용 결제 플로우',
      body: '상품 검증 → 결제 정보 생성 → 카드 상세 → 완료로 이어지는 다단계 흐름을 만들고, orderId 유무로 웹 고객 결제와 키오스크(무로그인) 결제 경로를 분기했습니다. 결제 실패 시 정보 롤백으로 상태 꼬임을 방지했습니다.',
    },
    {
      title: '다국어 · 클라이언트 최적화',
      body: 'vue-i18n 3개 언어(한/영/일) 사전을 직접 구축하고, lz-string으로 localStorage(다국어·결제 정보)를 압축 저장했습니다. html2canvas로 주문 영수증을 이미지로 내려받고, 국가/대륙 기준으로 상품 이미지(webp)를 동적 선택했습니다.',
    },
    {
      title: '반응형·PWA & 플랫폼 연동',
      body: 'PC~모바일 반응형과 VitePWA(Workbox 캐싱)로 해외 모바일 사용성을 확보하고, 프로덕션 한정으로 Sentry 에러 추적과 Google Analytics를 적용했습니다. 어드민·키오스크와 공유하는 Koa·PostgreSQL 미들웨어에도 최다 기여자로 참여해 eSIM 공급사 외부 연동과 결제 후 eSIM 발급·AWS SES 다국어 메일 발송(활성 QR·영수증 첨부)을 담당했습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'eSIM Sales Service',
  architectureCaptions: ['eSIM platform map — online sales channel'],
  architectureNotes: [
    'This service (online commerce) sells on the web using products and stock managed in the admin, served through the shared backend. It is one surface of the same system as the kiosk and admin.',
  ],
  description:
    'A Vue 3 global eSIM commerce. I led the frontend architecture and built the multi-gateway payments, i18n, and a web/kiosk-shared checkout flow.',
  overview: [
    'A global eSIM commerce where travelers search and compare plans by country, check out, and receive an eSIM QR by email to install instantly. I designed the initial Vue 3 / TypeScript frontend architecture (routing, state, API layer, styling, i18n) and led development as the top committer (about a third of the project).',
    'Payments are the core. I integrated Paygent card payments (USD) plus Google Pay and Apple Pay (JPY), and built a multi-step checkout — validate cart → create payment info → tokenize card → complete. The same screens serve both web customers and (login-free) kiosk checkout, branching by orderId, with rollback on failure to avoid stuck states.',
    'For international users I built the vue-i18n dictionaries for three languages (KO/EN/JP) and switched currency (USD/JPY) by country and language, with a responsive UI and PWA (Workbox). I also handled client optimizations — compressing local storage with lz-string and letting users download receipts as images via html2canvas. This service forms one eSIM platform together with the admin, kiosk, and a shared backend (middleware), to which I was also the top contributor.',
  ],
  highlights: [
    'Led the Vue 3 frontend architecture and development (top committer)',
    'Multi-gateway payments — Paygent card (USD) + Google Pay / Apple Pay (JPY)',
    'Web/kiosk-shared multi-step checkout (path branching, rollback on failure)',
    'Built vue-i18n dictionaries for three languages + per-country/language currency',
    'Responsive/PWA + client optimizations (lz-string storage compression, html2canvas receipts)',
    'Top contributor to the shared backend (middleware) — external eSIM-supplier integration, post-payment eSIM issuance & SES email delivery',
  ],
  techNotes: [
    {
      title: 'Multi-gateway global payments',
      body: 'Unified payment methods by adding Google Pay and Apple Pay (JPY) alongside Paygent card payments (USD), with per-brand card regex validation (VISA, Master, AMEX), Paygent tokenization, and currency-code switching by country and language.',
    },
    {
      title: 'Web/kiosk-shared checkout flow',
      body: 'Built a multi-step flow — validate cart → create payment info → card details → complete — and branched web-customer vs (login-free) kiosk checkout by the presence of an orderId. Payment info is rolled back on failure to prevent inconsistent states.',
    },
    {
      title: 'i18n & client optimization',
      body: 'Built the vue-i18n dictionaries for three languages (KO/EN/JP) and compressed localStorage (i18n and payment data) with lz-string. Users can download order receipts as images via html2canvas, and product images (webp) are selected dynamically by country/continent.',
    },
    {
      title: 'Responsive/PWA & platform integration',
      body: 'Secured overseas mobile usability with a responsive UI and VitePWA (Workbox caching), and added Sentry error tracking and Google Analytics in production only. I was also the top contributor to the shared Koa/PostgreSQL middleware used by the admin and kiosk, owning external eSIM-supplier integration and post-payment eSIM issuance with AWS SES multilingual email delivery (active QR / receipt attachment).',
    },
  ],
}
