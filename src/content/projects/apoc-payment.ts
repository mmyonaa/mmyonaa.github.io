import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "팀 협업 · 결제 시스템 담당",
  "status": "참여 종료 (2025.05)",
  "title": "자사 결제 시스템 · Toss · PayPal 연동",
  "description": "Toss · PayPal 결제 모듈을 연동하고 단건/정기 구독 결제와 요금제 업·다운그레이드, 자동 갱신 배치까지 설계·개발했습니다.",
  "mediaNote": "실제 운영 데이터가 포함되어 화면은 비공개합니다.",
  "overview": [
    "APOC 플랫폼의 단건·정기 구독 결제 기능을 개발했습니다. 기존 결제·구독·취소 이력 스키마를 인수인계받아 활용했고, Toss와 PayPal의 서로 다른 과금 방식에 맞춰 결제·요금제 변경·자동 갱신을 구현했습니다."
  ],
  "highlights": [
    "Toss·PayPal 단건·정기 구독 결제와 PayPal 처리 흐름 구현",
    "업그레이드 차액 결제 · 다운그레이드 다음 주기 반영",
    "기존 이력 테이블 연동 · 자동 갱신 배치 · Jest 테스트"
  ],
  "techNotes": [
    {
      "title": "결제 데이터 모델 · PayPal 플로우",
      "body": "결제 시스템은 모든 결제 발생 이력(Toss · PayPal 등 여러 PG를 하나로 통합 기록), 구독 정보(결제와 별개로 저장), 취소·환불 이력을 관심사별 테이블로 분리해 관리합니다. 기존 스키마를 인수인계받아 파악한 뒤 그 위에 결제 기능을 구현했고, PayPal은 주문 생성 → 결제정보 저장 → 결제 완료 후 반영까지의 플로우를 단건 결제와 정기 구독으로 나눠 설계했습니다."
    },
    {
      "title": "구독 업/다운그레이드 & 정산(proration)",
      "body": "요금제 전환을 업그레이드와 다운그레이드로 나눠 설계했습니다. 업그레이드는 전환 시점에 남은 기간의 차액을 billing key로 즉시 결제하고 다음 주기부터 상향 금액으로 청구하며, 다운그레이드는 즉시 환불 없이 다음 결제 주기부터 하향 금액을 반영하고 전환 전 요금제 정보를 이력으로 남깁니다. 결제 전 차액을 미리 계산해 반환하는 API로 사용자가 전환 금액을 확인한 뒤 결제하도록 했고, 구독 취소 API도 함께 설계했습니다."
    },
    {
      "title": "멀티 PG 추상화 (Toss · PayPal)",
      "body": "Toss는 요금제(plan) 개념 없이 billing key(결제수단)–사용자 매칭으로 청구되는 구조라, 금액 계산을 서비스가 직접 수행해 billing key로 과금하도록 구현했습니다. plan 기반으로 동작하는 PayPal과는 결제·갱신 로직을 분리해 각 PG 모델에 맞게 추상화했고, 정기 구독은 자동 갱신 배치로 결제 주기마다 청구되도록 구성했습니다."
    },
    {
      "title": "결제·취소 오류 수정과 API 문서화",
      "body": "단건 결제·취소에서 PG 코드가 고정값으로 전달되던 오류를 수정해 결제수단에 따라 처리하도록 했습니다. 구독 취소 API의 반환값 누락 문제를 수정하고, 결과 코드와 설명을 API 문서에 정리했습니다. 어드민에서도 구독 취소·요금제 변경 API를 호출하도록 연결했습니다."
    }
  ]
}

export const en: ProjectText = {
  "team": "Team · owned the payment system",
  "status": "My involvement ended (May 2025)",
  "title": "In-house Payment System · Toss & PayPal",
  "description": "Integrated Toss and PayPal payment modules and designed/built one-time and recurring subscription payments, plan up/downgrades, and an auto-renewal batch.",
  "mediaNote": "Screens are withheld as they contain live operational data.",
  "overview": [
    "The payment system of the apoc platform — integrating Toss and PayPal for everything from one-time payments to recurring subscriptions. Subscriptions support upgrades, downgrades, and auto-renewal; subscription and payment states are managed as status values, while every change is appended to separate history tables so settlement and audit trails are preserved.",
    "For plan changes I designed the settlement rules — an immediate prorated charge on upgrade, next-cycle application on downgrade — and abstracted two very different billing models per gateway: Toss, which bills through a billing key with no plan concept, and plan-based PayPal."
  ],
  "highlights": [
    "Integrated Toss and PayPal — one-time, multi-item, and recurring subscription payments",
    "Plan upgrade/downgrade settlement — immediate proration on upgrade, next-cycle on downgrade",
    "Unified multi-gateway ledger — payment, subscription, and cancellation history split by concern",
    "Designed and built a batch system for automatic subscription renewal",
    "Set up payment scenarios and a test environment with Jest"
  ],
  "techNotes": [
    {
      "title": "Payment data model · PayPal flow",
      "body": "The payment system separates concerns across tables: an all-payments ledger (unifying Toss, PayPal, and other gateways), subscription info (stored independently of payments), and a cancellation/refund history. I picked up the existing schema through handover and built payment features on top of it, and designed the PayPal flow — order creation → saving payment info → post-completion reconciliation — split into one-time and recurring subscription paths."
    },
    {
      "title": "Subscription up/downgrade & proration",
      "body": "Plan changes are split into upgrades and downgrades. An upgrade charges the prorated difference for the remaining period immediately via the billing key and bills the higher amount from the next cycle; a downgrade applies the lower amount from the next billing cycle (no immediate refund) and records the pre-change plan as history. A separate endpoint computes the prorated difference before charging so users can confirm the amount first, and a subscription-cancellation API is provided as well."
    },
    {
      "title": "Multi-gateway abstraction (Toss · PayPal)",
      "body": "Because Toss bills via a billing-key (payment method)–user match with no plan concept, the service computes amounts itself and charges through the billing key. Payment and renewal logic is kept separate from PayPal, which operates on plans, and abstracted per gateway; recurring subscriptions are billed each cycle by an auto-renewal batch."
    },
    {
      "title": "Payment and cancellation fixes",
      "body": "Fixed a hard-coded gateway value in one-time payment and cancellation requests so processing follows the selected gateway. Corrected a missing return value in the subscription-cancellation API and documented result codes. Connected cancellation and plan-change APIs to the admin interface."
    }
  ]
}
