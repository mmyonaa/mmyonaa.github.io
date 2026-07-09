import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '자사 서비스 결제 시스템',
  description:
    'Toss·PayPal 결제 모듈을 연동하고 단건/정기 구독 결제와 자동 갱신 배치, 테스트 환경까지 설계·개발했습니다.',
  highlights: [
    'Toss·PayPal 결제 모듈 연동',
    '단건/다건·정기 구독 결제 기능 설계·개발',
    '구독 자동 갱신용 Batch 시스템 설계·개발',
    'Jest 기반 결제 시나리오·테스트 환경 구성',
  ],
  related: [
    { slug: 'apoc-renewal', role: '플랫폼(apoc.day) UI 리뉴얼' },
    { slug: 'apoc-studio', role: '저작도구(studio.apoc.day) 고도화' },
  ],
}

export const en: ProjectText = {
  title: 'In-house Service Payment System',
  description:
    'Integrated Toss and PayPal payment modules and designed/built one-time and recurring subscription payments, an auto-renewal batch, and the test environment.',
  highlights: [
    'Integrated Toss and PayPal payment modules',
    'Designed and built single/multiple and recurring subscription payments',
    'Designed and built a batch system for automatic subscription renewal',
    'Set up payment scenarios and a test environment with Jest',
  ],
  related: [
    { slug: 'apoc-renewal', role: 'Platform (apoc.day) UI renewal' },
    { slug: 'apoc-studio', role: 'Authoring tool (studio.apoc.day) enhancements' },
  ],
}
