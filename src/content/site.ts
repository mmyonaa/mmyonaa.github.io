// 사이트 텍스트(프로젝트 외) — 프로필 태그라인 · About · About 상세. ko·en 나란히.

import type { AboutContent, AboutDetail } from './types'

export interface SiteText {
  tagline: string
  about: AboutContent
  aboutDetail: AboutDetail
}

export const siteKo: SiteText = {
  tagline: '사용자 중심의 안정적이고 확장 가능한 웹 서비스를 구현하는 풀스택 개발자입니다.',
  about: {
    paragraphs: [
      '사용자 중심의 안정적이고 확장 가능한 웹 서비스를 만드는 풀스택 개발자입니다.',
      '프론트엔드부터 백엔드, 인프라까지 폭넓게 다루며, 작은 디테일이 만드는 사용성의 차이를 중요하게 생각합니다.',
    ],
  },
  aboutDetail: {
    intro:
      '기획 단계의 요구사항부터 배포 후 운영까지, 서비스의 한 사이클 전체를 책임지는 풀스택 개발자입니다.',
    paragraphs: [
      '프론트엔드부터 백엔드, 그리고 인프라 구성까지 폭넓게 다룹니다. 한 영역에 머무르지 않고 서비스 전반을 보면서, 어디에 병목이 있고 어떤 결정이 사용자 경험과 유지보수성에 영향을 주는지 판단하는 것을 좋아합니다.',
      '여러 프로젝트를 1인 또는 소수 인원으로 주도하며, 설계·개발·테스트·배포·현장 대응까지 직접 챙겼습니다. 그 과정에서 “끝까지 동작하게 만드는 것”과 “다음 사람이 이어받기 좋게 만드는 것”을 모두 중요하게 생각하게 됐습니다.',
      '작은 디테일이 만드는 사용성의 차이를 놓치지 않으려 합니다. 로딩 한 번, 깜빡임 한 번, 한 번의 클릭이 줄어드는 경험이 결국 서비스의 인상을 결정한다고 믿습니다.',
    ],
    principles: [
      {
        title: '사용자 중심으로 판단합니다',
        body: '기능의 완성도보다 “실제로 쓰기 편한가”를 먼저 봅니다. 화면 흐름과 마이크로 인터랙션까지 사용자의 동선을 기준으로 다듬습니다.',
      },
      {
        title: '안정성과 확장성을 함께 봅니다',
        body: '당장 동작하는 코드보다, 트래픽과 요구사항이 늘어도 무너지지 않는 구조를 우선합니다. 컴포넌트화와 테스트로 변경에 강한 코드를 지향합니다.',
      },
      {
        title: '끝까지 책임집니다',
        body: '개발에서 끝내지 않고 배포·운영·장애 대응까지 직접 챙깁니다. 해외 현장 키오스크 이슈처럼 코드 밖의 문제도 현장에서 해결해 왔습니다.',
      },
      {
        title: '디테일이 차이를 만든다고 믿습니다',
        body: '로딩, 깜빡임, 불필요한 클릭 하나까지 줄이려 합니다. 작은 개선들이 모여 서비스의 인상과 신뢰를 만든다고 생각합니다.',
      },
    ],
    timeline: [
      {
        period: '2025.09 – 현재',
        title: 'InBridge · SentiveX 보안 플랫폼 (AI 서버·웹)',
        body: 'InBridge의 멀티테넌트 SIEM 보안 플랫폼. Fastify AI 서버의 멀티 에이전트 인시던트 분석 파이프라인과 LiteLLM 게이트웨이·멀티테넌트 BYOK 설계·개발을 주도하고, Next.js 15 풀스택 웹(대시보드·리포트 에디터)에도 협업으로 참여했습니다.',
      },
      {
        period: '2023.11 – 2025.05',
        title: 'eSIM 판매 플랫폼 (서비스·키오스크·어드민)',
        body: '온라인 서비스·키오스크·어드민·공유 미들웨어로 이뤄진 eSIM 플랫폼에 핵심 개발자로 참여(대부분 영역 최다 기여). 다중 PG 결제(Paygent·Google/Apple Pay), RBAC 권한·정산, eSIM 발급·SES 메일 발송, 키오스크 프린터·다국어 인코딩 등 하드웨어 연동까지 담당하고 일본 현지 실운영을 대응했습니다.',
      },
      {
        period: '2024.01 – 2025.05',
        title: '자사 SaaS 저작도구 (apoc)',
        body: '플랫폼 리뉴얼, 결제 시스템(Toss·PayPal), 3D·인터랙티브 저작도구 고도화를 담당. 컴포넌트 기반 리팩토링으로 유지보수성과 확장성을 높였습니다.',
      },
      {
        period: '2024.08 – 2025.08',
        title: '팜피 · 국립 생태원 콘텐츠 서비스',
        body: '팜피 재직 중 회사 프로젝트로 진행. 국립생태원 해설 프로그램 참여 인증제(현장 이미지 인식 인증·단계별 인증서·카카오 기프티콘 자동/일괄 발송·관리자 통계)의 콘텐츠 서비스와 관리자 시스템을 1인으로 개발했습니다.',
      },
      {
        period: '2025.09 – 2026.07',
        title: '외주 · 보광 극장 홍보·대관 사이트',
        body: '보광 극장 홍보·대관 사이트를 기획·설계·개발·인프라까지 1인으로 완성했습니다. vite-ssg 기반 SSG와 동적 메타/JSON-LD로 SEO를 최적화하고 AWS·PM2·Nginx로 배포·운영합니다.',
      },
    ],
    activities: [
      {
        period: '2026.05 – 06',
        title: '고객사 대상 제품 프리젠테이션',
        body: 'SentiveX 제품을 고객사 대상으로 한국어·영문 발표 (글로벌 IT 기업, 대기업 계열사).',
      },
      {
        period: '2026',
        title: 'RSAC 2026 참관',
        body: '글로벌 보안 컨퍼런스(RSA Conference) 참관 — 최신 보안 트렌드·솔루션 리서치.',
      },
    ],
    education: [
      {
        period: '2020.03 – 2025.02',
        school: '아주대학교',
        degree: '사이버보안학과 학사',
        notes: ['Cloud/Bigdata 보안 트랙 이수'],
      },
    ],
    languages: [
      { name: '한국어', level: '모국어' },
      { name: 'English', level: '업무 회화 · 영문 제품 데모·발표' },
    ],
  },
}

export const siteEn: SiteText = {
  tagline: 'A full-stack developer building user-centered, stable, and scalable web services.',
  about: {
    paragraphs: [
      'A full-stack developer who builds user-centered, stable, and scalable web services.',
      'I work across the stack — frontend, backend, and infrastructure — and care about the small details that make a real difference in usability.',
    ],
  },
  aboutDetail: {
    intro:
      'A full-stack developer who owns the entire service cycle — from gathering requirements to post-launch operations.',
    paragraphs: [
      'I work broadly across frontend, backend, and infrastructure. Rather than staying in one area, I like to see the whole service — spotting where the bottlenecks are and how each decision affects user experience and maintainability.',
      'I have led many projects solo or in small teams, handling design, development, testing, deployment, and on-site support myself. Along the way I came to value both “making it actually work end to end” and “making it easy for the next person to take over.”',
      'I try never to overlook the difference small details make. I believe one less load, one less flicker, one fewer click is what ultimately shapes the impression a service leaves.',
    ],
    principles: [
      {
        title: 'I decide with the user in mind',
        body: 'Before feature completeness, I ask “is this actually easy to use?” I refine everything — from screen flow to micro-interactions — around the user’s path.',
      },
      {
        title: 'I balance stability and scalability',
        body: 'I prioritize structures that hold up as traffic and requirements grow, over code that merely works right now. Componentization and tests keep the code resilient to change.',
      },
      {
        title: 'I see it through to the end',
        body: 'I don’t stop at development — I handle deployment, operations, and incident response myself. I’ve solved problems beyond the code too, like kiosk issues on-site overseas.',
      },
      {
        title: 'I believe details make the difference',
        body: 'I try to cut every unnecessary load, flicker, and click. Small improvements add up to the impression and trust a service earns.',
      },
    ],
    timeline: [
      {
        period: '2025.09 – Present',
        title: 'InBridge · SentiveX Security Platform (AI server & web)',
        body: 'A multi-tenant SIEM security platform at InBridge. I led the design and development of the Fastify AI server’s multi-agent incident-analysis pipeline, LiteLLM gateway, and multi-tenant BYOK, and also contributed to the Next.js 15 full-stack web (dashboard, report editor).',
      },
      {
        period: '2023.11 – 2025.05',
        title: 'eSIM Sales Platform (service · kiosk · admin)',
        body: 'A key developer (top contributor in most areas) across an eSIM platform of the online service, kiosk, admin, and shared middleware. Owned multi-gateway payments (Paygent, Google/Apple Pay), RBAC and settlement, eSIM issuance with SES email delivery, and kiosk hardware integration (printers, multilingual encoding), and handled live operations on-site in Japan.',
      },
      {
        period: '2024.01 – 2025.05',
        title: 'In-house SaaS Authoring Tool (apoc)',
        body: 'Led the platform renewal, payment system (Toss·PayPal), and enhancements to the 3D/interactive authoring tool. Improved maintainability and scalability through component-based refactoring.',
      },
      {
        period: '2024.08 – 2025.08',
        title: 'Famppy · National Ecology Institute',
        body: 'A company project at Famppy. Solo-built the content service and admin for the National Ecology Institute participation-certification program — on-site image-recognition certification, tiered certificates, automatic/bulk KakaoTalk gifticons, and admin stats.',
      },
      {
        period: '2025.09 – 2026.07',
        title: 'Freelance · Bogwang Theater Promotion & Booking Site',
        body: 'Single-handedly delivered the Bogwang Theater promotion/booking site from planning and design to development and infrastructure. Optimized SEO with vite-ssg SSG and dynamic meta/JSON-LD, deployed and operated on AWS with PM2 and Nginx.',
      },
    ],
    activities: [
      {
        period: '2026.05 – 06',
        title: 'Client Product Presentations',
        body: 'Presented and demoed SentiveX to enterprise clients in both Korean and English (a global IT firm and a large-enterprise affiliate).',
      },
      {
        period: '2026',
        title: 'RSAC 2026 (attended)',
        body: 'Attended the RSA Conference to research the latest security trends and solutions.',
      },
    ],
    education: [
      {
        period: '2020.03 – 2025.02',
        school: 'Ajou University',
        degree: 'B.S. in Cyber Security',
        notes: ['Completed the Cloud/Big Data Security track'],
      },
    ],
    languages: [
      { name: 'Korean', level: 'Native' },
      { name: 'English', level: 'Business proficiency · product demos & presentations' },
    ],
  },
}
