import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "팀 협업 · 프론트엔드 주도",
  "status": "참여 종료 (2024.08)",
  "title": "eSIM 판매 서비스",
  "architectureCaptions": [
    "eSIM 플랫폼 구조 — 온라인 판매 채널"
  ],
  "architectureNotes": [
    "이 서비스(온라인 커머스)는 어드민이 관리하는 상품·재고를 공유 백엔드로 받아 웹에서 판매합니다. 키오스크·어드민과 같은 시스템의 한 축입니다."
  ],
  "description": "여행자가 eSIM을 결제하고 설치 QR을 메일로 받는 글로벌 커머스 서비스입니다.",
  "overview": [
    "Vue 3·TypeScript 기반 프론트엔드의 라우팅·상태·API·스타일·다국어 구조를 설계하고 결제 기능을 개발했습니다. 웹과 키오스크를 합쳐 월 100건 규모의 실결제 주문이 오갔으며, 어드민·키오스크와 공유하는 백엔드 개발에도 참여했습니다."
  ],
  "highlights": [
    "다중 결제 수단과 웹·키오스크 공용 결제 흐름 구현",
    "한·영·일 3개 언어와 USD·JPY 통화 처리",
    "공급사 API 연동 · 결제 후 eSIM 발급과 QR·영수증 메일 전송"
  ],
  "techNotes": [
    {
      "title": "다중 게이트웨이 글로벌 결제",
      "body": "Paygent 카드 결제(달러)에 Google Pay · Apple Pay(엔화)를 더해 결제 수단을 통합하고, 카드 브랜드별(VISA · Master · AMEX) 정규식 검증과 Paygent 토큰화, 국가·언어별 통화 코드 전환을 구현했습니다."
    },
    {
      "title": "웹 · 키오스크 겸용 결제 플로우",
      "body": "상품 검증 → 결제 정보 생성 → 카드 상세 → 완료로 이어지는 다단계 흐름을 만들고, orderId 유무로 웹 고객 결제와 키오스크(무로그인) 결제 경로를 분기했습니다. 결제 실패 시 정보 롤백으로 상태 꼬임을 방지했습니다."
    },
    {
      "title": "다국어 · 클라이언트 최적화",
      "body": "vue-i18n 3개 언어(한/영/일) 사전을 직접 구축하고, lz-string으로 localStorage(다국어·결제 정보)를 압축 저장해 저장 용량 한계에 대응했습니다."
    },
    {
      "title": "반응형·PWA & 플랫폼 연동",
      "body": "PC~모바일 반응형과 VitePWA(Workbox 캐싱)로 해외 모바일 사용성을 확보하고, 프로덕션 한정으로 Sentry 에러 추적과 Google Analytics를 적용했습니다. 어드민·키오스크와 공유하는 Koa · PostgreSQL 미들웨어 개발에도 참여해 eSIM 공급사 외부 연동과 결제 후 eSIM 발급·AWS SES 다국어 메일 발송(활성 QR·영수증 첨부)을 담당했습니다."
    }
  ]
}

export const en: ProjectText = {
  team: 'Team · led the frontend',
  status: 'My involvement ended (Aug 2024)',
  title: 'eSIM Sales Service',
  architectureCaptions: ['eSIM platform map — online sales channel'],
  architectureNotes: [
    'This service (online commerce) sells on the web using products and stock managed in the admin, served through the shared backend. It is one surface of the same system as the kiosk and admin.',
  ],
  description:
    'A Vue 3 global eSIM commerce. I led the frontend architecture and built the multi-gateway payments, i18n, and a web/kiosk-shared checkout flow.',
  overview: [
    'A global eSIM commerce where travelers search and compare plans by country, check out, and receive an eSIM QR by email to install instantly. Together with the kiosks it handled roughly 100 real paid orders a month. I designed the initial Vue 3 / TypeScript frontend architecture (routing, state, API layer, styling, i18n) and led frontend development.',
    'Payments are the core. I integrated Paygent card payments (USD) plus Google Pay and Apple Pay (JPY), and built a multi-step checkout — validate cart → create payment info → tokenize card → complete. The same screens serve both web customers and (login-free) kiosk checkout, branching by orderId, with rollback on failure to avoid stuck states.',
    'For international users I built the vue-i18n dictionaries for three languages (KO/EN/JP) and switched currency (USD/JPY) by country and language, with a responsive UI and PWA (Workbox). I also handled client optimizations such as compressing local storage with lz-string. This service forms one eSIM platform together with the admin, kiosk, and a shared backend (middleware).',
  ],
  highlights: [
    'Led the Vue 3 frontend architecture and development',
    'Roughly 100 real payment orders a month across web and kiosk',
    'Multi-gateway payments — Paygent card (USD) + Google Pay / Apple Pay (JPY)',
    'Web/kiosk-shared multi-step checkout (path branching, rollback on failure)',
    'Built vue-i18n dictionaries for three languages + per-country currency',
    'Led the shared backend — eSIM-supplier integration, issuance and email delivery',
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
      body: 'Built the vue-i18n dictionaries for three languages (KO/EN/JP) and compressed localStorage (i18n and payment data) with lz-string to stay within storage limits.',
    },
    {
      title: 'Responsive/PWA & platform integration',
      body: 'Secured overseas mobile usability with a responsive UI and VitePWA (Workbox caching), and added Sentry error tracking and Google Analytics in production only. I also worked on the shared Koa/PostgreSQL middleware used by the admin and kiosk, owning external eSIM-supplier integration and post-payment eSIM issuance with AWS SES multilingual email delivery (active QR / receipt attachment).',
    },
  ],
}
