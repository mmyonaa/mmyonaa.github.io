import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '자사 서비스 결제 시스템',
  description:
    'Toss·PayPal 결제 모듈을 연동하고 단건/정기 구독 결제와 요금제 업·다운그레이드, 자동 갱신 배치까지 설계·개발했습니다.',
  mediaNote: '실제 운영 데이터가 포함되어 화면은 비공개합니다.',
  overview: [
    'apoc 플랫폼의 결제 시스템으로, Toss·PayPal을 연동해 단건 결제부터 정기 구독까지 담당했습니다. 구독은 요금제 간 업그레이드·다운그레이드와 자동 갱신을 지원하며, 구독·결제 상태는 상태 값으로 관리하고 모든 변경은 별도 히스토리 테이블(구독/결제 이력)에 적재해 정산과 감사 추적이 가능하도록 설계했습니다.',
    '업그레이드는 전환 시점에 남은 기간의 차액을 즉시 결제(proration)하고 다음 결제 주기부터 상향된 금액으로 청구하며, 다운그레이드는 즉시 환불 없이 다음 주기부터 하향 금액을 반영합니다. Toss는 요금제(plan) 개념 없이 billing key(결제수단)–사용자 매칭으로 청구되는 구조라 금액 계산을 서비스 측에서 수행해 billing key로 과금하도록 설계했고, plan 기반으로 동작하는 PayPal과는 로직을 분리해 각 PG 모델에 맞게 추상화했습니다.',
  ],
  highlights: [
    'Toss·PayPal 결제 모듈 연동',
    '단건/다건·정기 구독 결제 기능 설계·개발',
    'PayPal 결제 플로우(주문 생성→결제정보 저장→완료 반영) 단건·구독 설계',
    '요금제 업/다운그레이드 — 업그레이드 즉시 차액 정산(proration), 다운그레이드 다음 주기 반영',
    '업그레이드 차액 계산 API·구독 취소 API 설계·개발',
    '결제 전체·구독·취소 이력을 관심사별 테이블로 분리 (멀티 PG 통합 기록)',
    '구독 자동 갱신용 Batch 시스템 설계·개발',
    'Jest 기반 결제 시나리오·테스트 환경 구성',
  ],
  techNotes: [
    {
      title: '결제 데이터 모델 · PayPal 플로우',
      body: '결제 시스템은 모든 결제 발생 이력(Toss·PayPal 등 여러 PG를 하나로 통합 기록), 구독 정보(결제와 별개로 저장), 취소·환불 이력을 관심사별 테이블로 분리해 관리합니다. 기존 스키마를 인수인계받아 파악한 뒤 그 위에 결제 기능을 구현했고, PayPal은 주문 생성 → 결제정보 저장 → 결제 완료 후 반영까지의 플로우를 단건 결제와 정기 구독으로 나눠 설계했습니다.',
    },
    {
      title: '구독 업/다운그레이드 & 정산(proration)',
      body: '요금제 전환을 업그레이드와 다운그레이드로 나눠 설계했습니다. 업그레이드는 전환 시점에 남은 기간의 차액을 billing key로 즉시 결제하고 다음 주기부터 상향 금액으로 청구하며, 다운그레이드는 즉시 환불 없이 다음 결제 주기부터 하향 금액을 반영하고 전환 전 요금제 정보를 이력으로 남깁니다. 결제 전 차액을 미리 계산해 반환하는 API로 사용자가 전환 금액을 확인한 뒤 결제하도록 했고, 구독 취소 API도 함께 설계했습니다. 구독·결제 상태는 상태 값 업데이트로 관리하고 변경 내역은 별도 히스토리 테이블에 적재해 정산·감사 추적이 가능하도록 했습니다.',
    },
    {
      title: '멀티 PG 추상화 (Toss·PayPal)',
      body: 'Toss는 요금제(plan) 개념 없이 billing key(결제수단)–사용자 매칭으로 청구되는 구조라, 금액 계산을 서비스가 직접 수행해 billing key로 과금하도록 구현했습니다. plan 기반으로 동작하는 PayPal과는 결제·갱신 로직을 분리해 각 PG 모델에 맞게 추상화했고, 정기 구독은 자동 갱신 배치로 결제 주기마다 청구되도록 구성했습니다.',
    },
  ],
  related: [
    { slug: 'apoc-renewal', role: '플랫폼(apoc.day) UI 리뉴얼' },
    { slug: 'apoc-studio', role: '저작도구(studio.apoc.day) 고도화' },
  ],
}

export const en: ProjectText = {
  title: 'In-house Service Payment System',
  description:
    'Integrated Toss and PayPal payment modules and designed/built one-time and recurring subscription payments, plan up/downgrades, and an auto-renewal batch.',
  mediaNote: 'Screens are withheld as they contain live operational data.',
  overview: [
    'The payment system of the apoc platform — integrating Toss and PayPal for everything from one-time payments to recurring subscriptions. Subscriptions support upgrades, downgrades, and auto-renewal; subscription and payment states are managed as status values, while every change is appended to separate history tables so settlement and audit trails are preserved.',
    'Upgrades charge the prorated difference for the remaining period immediately and bill the higher amount from the next cycle; downgrades apply the lower amount from the next cycle (no immediate refund) and keep the pre-change plan as history. Since Toss bills via a billing-key (payment method)–user match with no plan concept, the service computes the amount itself and charges through the billing key — logic kept separate from PayPal, which operates on plans, and abstracted per gateway.',
  ],
  highlights: [
    'Integrated Toss and PayPal payment modules',
    'Designed and built single/multiple and recurring subscription payments',
    'Designed the PayPal flow (order creation → save payment info → post-completion reconciliation) for one-time and subscription',
    'Plan upgrade/downgrade — immediate prorated charge on upgrade, next-cycle application on downgrade',
    'Designed and built a proration-preview API and a subscription-cancellation API',
    'Separated all-payments, subscription, and cancellation history into concern-specific tables (unified multi-gateway ledger)',
    'Designed and built a batch system for automatic subscription renewal',
    'Set up payment scenarios and a test environment with Jest',
  ],
  techNotes: [
    {
      title: 'Payment data model · PayPal flow',
      body: 'The payment system separates concerns across tables: an all-payments ledger (unifying Toss, PayPal, and other gateways), subscription info (stored independently of payments), and a cancellation/refund history. I picked up the existing schema through handover and built payment features on top of it, and designed the PayPal flow — order creation → saving payment info → post-completion reconciliation — split into one-time and recurring subscription paths.',
    },
    {
      title: 'Subscription up/downgrade & proration',
      body: 'Plan changes are split into upgrades and downgrades. An upgrade charges the prorated difference for the remaining period immediately via the billing key and bills the higher amount from the next cycle; a downgrade applies the lower amount from the next billing cycle (no immediate refund) and records the pre-change plan as history. A separate endpoint computes the prorated difference before charging so users can confirm the amount first, and a subscription-cancellation API is provided as well. Subscription and payment states are managed by status updates, with every change appended to dedicated history tables for settlement and audit trails.',
    },
    {
      title: 'Multi-gateway abstraction (Toss·PayPal)',
      body: 'Because Toss bills via a billing-key (payment method)–user match with no plan concept, the service computes amounts itself and charges through the billing key. Payment and renewal logic is kept separate from PayPal, which operates on plans, and abstracted per gateway; recurring subscriptions are billed each cycle by an auto-renewal batch.',
    },
  ],
  related: [
    { slug: 'apoc-renewal', role: 'Platform (apoc.day) UI renewal' },
    { slug: 'apoc-studio', role: 'Authoring tool (studio.apoc.day) enhancements' },
  ],
}
