// 언어 공통 데이터 (기술명·링크·날짜·연락처 등 번역이 필요 없는 항목)

import type { ContactItem, Project, SkillGroup, Social } from './types'

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
  | 'presentationNote'
  | 'photosNote'
  | 'architectureCaptions'
  | 'architectureNotes'
  | 'related'
>
type ProjectBase = Omit<Project, 'title' | 'description' | 'highlights'>

const projectBase: ProjectBase[] = [
  {
    slug: 'sentivex-ai',
    period: '2025.09 –',
    tags: ['Fastify', 'TypeScript', 'AI SDK', 'LiteLLM', 'OpenAI · Azure · Gemini', 'BullMQ', 'Redis', 'Prisma', 'PostgreSQL', 'Kubernetes'],
    link: '',
    company: '',
    repo: '',
    systemHub: { label: 'SentiveX platform', sub: 'REST · SSE' },
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
    systemHub: { label: 'SentiveX platform', sub: 'REST · SSE' },
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
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'vue-i18n', 'PWA', 'Koa', 'TypeORM', 'PostgreSQL', 'Redis', 'AWS EC2', 'AWS SES', 'AWS S3', 'SCSS'],
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
    systemHub: { label: 'Shared backend', sub: 'Koa · PostgreSQL' },
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
    systemHub: { label: 'Shared backend', sub: 'Koa · PostgreSQL' },
  },
  {
    slug: 'esim-admin',
    period: '2023.11 – 2025.05',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'vue-i18n', 'Quill', 'xlsx', 'moment-timezone', 'Koa', 'TypeORM', 'PostgreSQL', 'AWS EC2', 'SCSS'],
    link: '',
    company: '',
    repo: '',
    architectureImages: ['/projects/esim/system.png'], // 서비스·키오스크와 공유하는 시스템 다이어그램
    systemHub: { label: 'Shared backend', sub: 'Koa · PostgreSQL' },
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
    systemHub: { label: 'apoc', sub: 'product ecosystem' },
  },
  {
    slug: 'apoc-studio',
    period: '2025.04 – 2025.08',
    tags: ['Vue.js', 'Koa', 'PostgreSQL', 'SCSS', 'Phaser', 'Three.js'],
    link: 'https://studio.apoc.day/#/',
    company: '',
    repo: '',
    images: ['/projects/apoc-studio/apoc-studio-3d-mapping.png'],
    systemHub: { label: 'apoc', sub: 'product ecosystem' },
  },
  {
    slug: 'apoc-payment',
    period: '2024.01 – 2025.05',
    tags: ['Vue.js', 'Koa', 'Jest', 'PostgreSQL', 'SCSS'],
    link: '',
    company: '',
    repo: '',
    systemHub: { label: 'apoc', sub: 'product ecosystem' },
  },
  {
    slug: 'guseong-content',
    period: '2024.08 – 2024.09',
    tags: ['Vue.js', 'Koa', 'PostgreSQL', 'SCSS'],
    link: '',
    company: '',
    repo: '',
    imageFrame: 'tablet', // 태블릿용 콘텐츠 → 태블릿 기기 목업
    images: [
      '/projects/gs/guseong-content-play.png',
      '/projects/gs/guseong-content-search.png',
      '/projects/gs/guseong-content-suno.png',
    ],
  },
]

// 공통 필드 + 언어별 텍스트를 slug 기준으로 합쳐 Project[] 생성
export function buildProjects(text: Record<string, ProjectText>): Project[] {
  return projectBase.map((b) => ({ ...b, ...text[b.slug] }))
}
