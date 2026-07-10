// 언어 공통 데이터 (기술명·링크·날짜·연락처 등 번역이 필요 없는 항목)

import type { ContactItem, Project, SkillGroup, Social, SystemMap } from './types'

export const profileBase = {
  name: 'Hyonah',
  role: 'Full-stack Developer',
  location: 'Seoul, Korea',
  email: 'apddfhsajrwk@gmail.com',
  resumeUrl: '/resume.pdf', // public/resume.pdf 에 파일을 두면 다운로드됨 (없으면 Navbar 버튼도 자동 숨김)
}

export const contacts: ContactItem[] = [
  { icon: '✉️', label: 'Email', value: 'apddfhsajrwk@gmail.com', href: 'mailto:apddfhsajrwk@gmail.com' },
  { icon: '👩🏻‍💻', label: 'GitHub', value: 'github.com/mmyonaa', href: 'https://github.com/mmyonaa' },
  { icon: '🫴', label: 'LinkedIn', value: 'linkedin.com/in/hyona-lim', href: 'https://www.linkedin.com/in/hyona-lim-a3a626319/' },
]

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['Vue.js', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Pinia', 'SCSS', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Koa', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'REST API'],
  },
  {
    category: 'Infra · Tooling',
    items: ['AWS EC2', 'Nginx', 'PM2', 'Vite', 'Git'],
  },
  {
    category: 'AI',
    items: ['LiteLLM', 'OpenAI · Azure · Gemini'],
  },
]

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/mmyonaa' },
  { label: 'Email', url: 'mailto:apddfhsajrwk@gmail.com' },
]

// 프로젝트 공통(언어 무관) 필드. 최신 → 과거 순.
export type ProjectText = Pick<
  Project,
  | 'title'
  | 'description'
  | 'highlights'
  | 'overview'
  | 'techNotes'
  | 'mediaNote'
  | 'imageNote'
  | 'qa'
  | 'presentationNote'
  | 'photosNote'
  | 'architectureCaptions'
  | 'architectureNotes'
>
type ProjectBase = Omit<Project, 'title' | 'description' | 'highlights'>

const projectBase: ProjectBase[] = [
  {
    slug: 'sentivex-ai',
    period: '2025.09 –',
    tags: ['Fastify', 'TypeScript', 'AI SDK', 'LiteLLM', 'OpenAI · Azure · Gemini', 'BullMQ', 'Redis', 'Prisma', 'PostgreSQL'],
    link: '',
    company: '',
    repo: '',
    systemId: 'sentivex',
    analysisPipeline: true,
    presentationImages: [
      '/projects/sentivex/sentivex-slide-01.jpg',
      '/projects/sentivex/sentivex-slide-02.jpg',
    ],
  },
  {
    slug: 'sentivex-web',
    period: '2025.09 –',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'BlockNote', 'Recharts', 'XY Flow', 'BullMQ', 'OpenSearch'],
    link: '',
    company: '',
    repo: '',
    systemId: 'sentivex',
  },
  {
    slug: 'bk-theater',
    period: '2025.09 – 2026.07',
    tags: ['Vue 3', 'TypeScript', 'vite-ssg', 'Koa', 'PostgreSQL', 'AWS S3', 'EC2', 'PM2', 'Nginx', 'SCSS'],
    link: 'https://bktheater.com/',
    company: '',
    repo: 'https://github.com/mmyonaa/outsourcing',
    apiDocs: 'https://bktheater.com/api/docs',
    // 앞 3장은 사용자 화면(랜딩 카드 슬라이더용), 이후는 관리자 화면(상세 페이지용)
    images: [
      '/projects/bktheater/bk-theater.png',
      '/projects/bktheater/bk-theater-performance.png',
      '/projects/bktheater/bk-theater-notice.png',
      '/projects/bktheater/bk-theater-admin-home.png',
      '/projects/bktheater/bk-theater-admin-banner.png',
      '/projects/bktheater/bk-theater-admin-performance.png',
      '/projects/bktheater/bk-theater-admin-notice.png',
      '/projects/bktheater/bk-theater-admin-notice-form.png',
    ],
    // 다크 기본 경로 — 라이트 테마에선 컴포넌트가 '-light' 변형을 사용
    architectureImages: [
      '/projects/bktheater/arch-system.png',
      '/projects/bktheater/arch-backend.png',
      '/projects/bktheater/arch-frontend.png',
    ],
  },
  {
    slug: 'esim-service',
    period: '2023.11 – 2024.08',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'vue-i18n', 'PWA', 'Koa', 'TypeORM', 'PostgreSQL', 'AWS EC2', 'AWS SES', 'AWS S3', 'SCSS'],
    link: 'https://pre-esim.shop/',
    company: '',
    repo: '',
    // 앞 3장은 랜딩 카드 슬라이더용, 전체는 상세 페이지용
    images: [
      '/projects/esim-site/esim-home.png',
      '/projects/esim-site/esim-products.png',
      '/projects/esim-site/esim-product-detail.png',
      '/projects/esim-site/esim-guide.png',
      '/projects/esim-site/esim-login.png',
      '/projects/esim-site/esim-cs.png',
    ],
    architectureImages: ['/projects/esim/system.png'], // 키오스크·어드민과 공유하는 시스템 다이어그램
    systemId: 'esim',
  },
  {
    slug: 'esim-kiosk',
    period: '2024.08 – 2025.04',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'vue-i18n', 'PWA', 'qrcode', 'encoding-japanese', 'Kotlin', 'Android WebView', 'ESC/POS', 'Koa', 'PostgreSQL', 'SCSS'],
    link: '',
    company: '',
    repo: '',
    imageFrame: 'kiosk', // 세로 키오스크 화면 → 키오스크 기기 목업
    images: [
      '/projects/esim-kiosk/esim-kiosk-01.png',
      '/projects/esim-kiosk/esim-kiosk-02.png',
      '/projects/esim-kiosk/esim-kiosk-03.png',
      '/projects/esim-kiosk/esim-kiosk-04.png',
      '/projects/esim-kiosk/esim-kiosk-05.png',
    ],
    photos: ['/projects/esim-kiosk/esim-kiosk-field-01.jpg'], // 일본 현지 매장 배포 현장 사진
    architectureImages: ['/projects/esim/system.png'], // 서비스·어드민과 공유하는 시스템 다이어그램
    systemId: 'esim',
  },
  {
    slug: 'esim-admin',
    period: '2023.11 – 2025.05',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'vue-i18n', 'Quill', 'xlsx', 'moment-timezone', 'Koa', 'TypeORM', 'PostgreSQL', 'AWS EC2', 'SCSS'],
    link: '',
    company: '',
    repo: '',
    architectureImages: ['/projects/esim/system.png'], // 서비스·키오스크와 공유하는 시스템 다이어그램
    systemId: 'esim',
  },
  {
    slug: 'ecology-content',
    period: '2025.07 – 2025.08',
    tags: ['Vue.js', 'Koa', 'PostgreSQL', 'SCSS', 'Kakao API', 'Batch'],
    link: '',
    company: '',
    repo: '',
    imageFrame: 'phone', // 모바일 콘텐츠 → 스마트폰 기기 목업
    images: [
      '/projects/nie/nie-stamp-board.png',
      '/projects/nie/nie-content-detail.png',
      '/projects/nie/nie-code-entry.png',
    ],
    architectureImages: ['/projects/nie/flow.png', '/projects/nie/kakao-flow.png'],
  },
  {
    slug: 'apoc-renewal',
    period: '2024.01 – 2025.05',
    tags: ['Vue.js', 'Koa', 'PostgreSQL', 'SCSS'],
    link: 'https://www.apoc.day/',
    company: '',
    repo: '',
    images: ['/projects/apoc-platform/apoc-home.png'],
    systemId: 'apoc',
  },
  {
    slug: 'apoc-studio',
    period: '2025.04 – 2025.08',
    tags: ['Vue.js', 'Koa', 'PostgreSQL', 'SCSS'],
    link: 'https://studio.apoc.day/#/',
    company: '',
    repo: '',
    imageFrame: 'tablet', // 태블릿 대응이 주제 → 태블릿 기기 목업
    images: ['/projects/apoc-studio/apoc-studio-tablet-editor.png'],
    systemId: 'apoc',
  },
  {
    slug: 'apoc-payment',
    period: '2024.01 – 2025.05',
    tags: ['Vue.js', 'Koa', 'Jest', 'PostgreSQL', 'SCSS'],
    link: '',
    company: '',
    repo: '',
    systemId: 'apoc',
    paymentFlow: true,
  },
]

// 'Part of the same system' 레이어 다이어그램 — 시스템 단위로 실제 구조를 정의.
// slug 있는 노드는 해당 프로젝트 상세로 링크, 없는 노드는 표시용(인프라·외부 화면).
export const systemMaps: Record<string, SystemMap> = {
  // 프론트 3종(서비스 웹·키오스크·어드민)이 Koa API 하나를 공유
  esim: {
    layers: ['Clients', 'API', 'Infra'],
    nodes: [
      { id: 'service', label: 'Service Web', sub: 'Vue 3 · PWA', slug: 'esim-service', layer: 0 },
      { id: 'kiosk', label: 'Kiosk', sub: 'WebView · ESC/POS', slug: 'esim-kiosk', layer: 0 },
      { id: 'admin', label: 'Admin', sub: 'Vue 3 · i18n', slug: 'esim-admin', layer: 0 },
      { id: 'api', label: 'Shared API', sub: 'Koa · Node.js', layer: 1 },
      { id: 'pg', label: 'PostgreSQL', sub: 'TypeORM', layer: 2 },
      { id: 'aws', label: 'S3 · SES', sub: 'upload · mail', layer: 2 },
    ],
    edges: [
      { from: 'service', to: 'api', label: 'REST' },
      { from: 'kiosk', to: 'api', label: 'REST' },
      { from: 'admin', to: 'api', label: 'REST' },
      { from: 'api', to: 'pg' },
      { from: 'api', to: 'aws' },
    ],
  },
  // 웹(Next.js 풀스택) ↔ AI 서버(Fastify)가 PostgreSQL 을 공유 (AI 서버는 read-only 동기화)
  sentivex: {
    layers: ['Services', 'Infra'],
    nodes: [
      { id: 'web', label: 'Web', sub: 'Next.js · full-stack', slug: 'sentivex-web', layer: 0, x: 28 },
      { id: 'ai', label: 'AI Server', sub: 'Fastify · BullMQ', slug: 'sentivex-ai', layer: 0, x: 72 },
      { id: 'os', label: 'OpenSearch', sub: 'SIEM logs', layer: 1 },
      { id: 'pg', label: 'PostgreSQL', sub: 'shared', layer: 1 },
      { id: 'redis', label: 'Redis', sub: 'queue', layer: 1 },
      { id: 'llm', label: 'LLM Gateway', sub: 'LiteLLM', layer: 1 },
    ],
    edges: [
      { from: 'web', to: 'ai', label: 'REST · SSE' },
      { from: 'web', to: 'os' },
      { from: 'web', to: 'pg' },
      { from: 'ai', to: 'pg' },
      { from: 'ai', to: 'redis' },
      { from: 'ai', to: 'llm' },
    ],
  },
  // platform·studio 웹은 middleware(공유 API), 결제 페이지(별도 웹)는 payment API 사용
  apoc: {
    layers: ['Web', 'API', 'Data'],
    nodes: [
      { id: 'platform', label: 'Platform Web', sub: 'Vue.js', slug: 'apoc-renewal', layer: 0, x: 20 },
      { id: 'studio', label: 'Studio Web', sub: 'Vue.js · Three.js', slug: 'apoc-studio', layer: 0, x: 50 },
      { id: 'payweb', label: 'Payment Pages', sub: 'separate web', layer: 0, x: 80 },
      { id: 'mw', label: 'Middleware API', sub: 'Koa', layer: 1, x: 35 },
      { id: 'payment', label: 'Payment API', sub: 'Koa', slug: 'apoc-payment', layer: 1, x: 80 },
      { id: 'pg', label: 'PostgreSQL', layer: 2, x: 57 },
    ],
    edges: [
      { from: 'platform', to: 'mw', label: 'REST' },
      { from: 'studio', to: 'mw', label: 'REST' },
      { from: 'payweb', to: 'payment', label: 'REST' },
      { from: 'mw', to: 'pg' },
      { from: 'payment', to: 'pg' },
    ],
  },
}

// 공통 필드 + 언어별 텍스트를 slug 기준으로 합쳐 Project[] 생성
export function buildProjects(text: Record<string, ProjectText>): Project[] {
  return projectBase.map((b) => ({ ...b, ...text[b.slug] }))
}
