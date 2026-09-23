import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  stats: [
    {
      "value": "376회",
      "label": "검색 노출"
    },
    {
      "value": "95회",
      "label": "검색 클릭"
    },
    {
      "value": "25.3%",
      "label": "클릭률"
    }
  ],
  statsNote: "Google Search Console · 2026.07.06~09.20, 77일간 · 전체 검색 기준",
  "team": "1인 · 기획부터 인프라까지",
  "status": "운영 중 (2025.11 오픈)",
  "title": "보광극장 · 홍보·대관 안내 사이트",
  "architectureCaptions": [
    "시스템 아키텍처 · 배포 구성 (Nginx · PM2 · PostgreSQL · S3)",
    "백엔드 레이어드 아키텍처 (routes → controller → service → repository)",
    "프론트엔드 모듈 의존 (뷰 → 컴포저블 → API 래퍼 → HTTP)"
  ],
  "architectureNotes": [
    "브라우저 요청은 Nginx 리버스 프록시가 받아 정적 페이지는 vite preview 프론트엔드로, /api 요청은 Koa 백엔드(:3000)로 분기합니다. 두 프로세스는 PM2로 관리되고 백엔드는 PostgreSQL · AWS S3에 연결되며, 지도 스크립트와 업로드 이미지는 브라우저가 카카오·S3에서 직접 로드합니다.",
    "index.ts가 서버를 부트스트랩하고 요청은 routes → controller → service → repository 순으로 흐르며 계층별 책임을 분리했습니다. 저장소 계층은 postgres.js 커넥션 풀로 PostgreSQL에 접근하고, 이미지·파일 업로드는 s3.util로, DB 오류는 CustomError로 감싸 일관되게 처리합니다.",
    "뷰는 API 래퍼(banner · board · perfo)로 데이터를 요청하고, 래퍼는 request.util → axios 인스턴스로 HTTP 호출을 단일화합니다. 목록 화면의 검색·페이지네이션은 useAdminList 컴포저블로 공통화하고, main.ts(ViteSSG)가 라우터 가드에서 페이지별 SEO 설정을 주입합니다."
  ],
  "description": "공연·대관 안내와 관리자 콘텐츠 운영을 제공하는 사이트를 기획부터 배포까지 1인으로 구축했습니다.",
  "overview": [
    "공연·공지·보도자료·배너를 관리하는 홍보 사이트입니다. Vue 3·Koa·PostgreSQL로 공개 사이트와 관리자 기능을 개발하고, AWS EC2에 배포한 뒤 운영 중 발견한 데이터 수정·검색 노출 문제를 개선했습니다."
  ],
  "highlights": [
    "공개 사이트·관리자·API·배포 환경을 단독 구축",
    "SSR 색인 오류 수정 · 기존 URL 301 리디렉션"
  ],
  "techNotes": [
    {
      "title": "1인 풀스택 + 직접 운영",
      "body": "Vue 3 · TypeScript 프론트, Koa · PostgreSQL(postgres.js) 백엔드, AWS S3 업로드, EC2 · PM2 · Nginx 배포까지 직접 구성했습니다. 컬럼 snake_case ↔ camelCase 자동 변환 등 데이터 접근 계층도 직접 설계했고, 오픈 후에는 HTTPS 전환과 OpenAPI(Swagger) 문서·ERD 정비까지 운영자로서 이어가고 있습니다."
    },
    {
      "title": "SSG 기반 SEO 최적화",
      "body": "vite-ssg로 페이지를 정적 생성하고 메타·JSON-LD·사이트맵을 구성했습니다. 상세 페이지가 색인되지 않던 원인은 SSR 라우터 가드가 next() 없이 반환해 프리렌더를 건너뛰는 문제였습니다. 이를 수정하고 옛 URL을 301 리디렉션했습니다. 이후 77일(2026.07.06~09.20) Search Console에서 노출 376·클릭 95·CTR 25.3%를 확인했습니다. 상호 검색은 평균 1.7위·CTR 52.2%였고, 비상호 검색에서는 24클릭이 발생했습니다."
    },
    {
      "title": "데이터 유실 수정과 중복 화면 통합",
      "body": "백엔드·프론트엔드 점검으로 결함 60여 건을 찾아 처리했습니다. 미전송 필드가 NULL로 덮이는 부분 수정, 중복 검색 요청으로 엉뚱한 페이지가 표시되는 문제, 삭제된 글 접근 시 오류를 우선 수정했습니다. 공개·관리자 뷰 20개(동일률 88~99%)를 공용 10개로 통합해 약 4,000줄을 줄이고, 같은 수정이 일부 화면에만 반영되는 문제를 줄였습니다."
    },
    {
      "title": "보안 하드닝",
      "body": "조회수 갱신을 전체 데이터 수정에서 서버의 원자적 증가 연산으로 분리하고, 일반 수정 요청으로 views·삭제 플래그를 바꾸지 못하게 했습니다. 업로드 확장자·이미지 MIME 검사, 내부 오류 메시지 노출 차단, 페이지네이션 상한, 검색어 와일드카드 처리와 DB 제약도 보강했습니다."
    },
    {
      "title": "관리자 콘텐츠 운영",
      "body": "공연(역대/예정)·공지·보도자료·배너를 Quill 에디터로 등록·수정하고, 배너는 노출 순서·전환 시간·활성 상태까지 관리할 수 있습니다. 목록 공통 로직은 useAdminList 컴포저블로 추출해 재사용성을 높였습니다."
    }
  ]
}

export const en: ProjectText = {
  stats: [
    {
      "value": "376",
      "label": "Search impressions"
    },
    {
      "value": "95",
      "label": "Search clicks"
    },
    {
      "value": "25.3%",
      "label": "Click-through rate"
    }
  ],
  statsNote: "Google Search Console · Jul 6–Sep 20, 2026 (77 days) · All search queries",
  team: 'Solo · from planning to infrastructure',
  status: 'Live (opened Nov 2025)',
  title: 'Bogwang Theater · Promotion & Booking Site',
  architectureCaptions: [
    'System architecture & deployment (Nginx · PM2 · PostgreSQL · S3)',
    'Backend layered architecture (routes → controller → service → repository)',
    'Frontend module dependencies (views → composables → API wrapper → HTTP)',
  ],
  architectureNotes: [
    'Browser requests hit the Nginx reverse proxy, which routes static pages to the vite-preview frontend and /api calls to the Koa backend (:3000). Both processes run under PM2, the backend connects to PostgreSQL and AWS S3, and the browser loads map scripts and uploaded images directly from Kakao and S3.',
    'index.ts bootstraps the server, and each request flows routes → controller → service → repository with clear separation of concerns. The repository layer reaches PostgreSQL through a postgres.js connection pool, image/file uploads go through s3.util, and DB errors are wrapped in a CustomError for consistent handling.',
    'Views request data through API wrappers (banner, board, perfo), which funnel every HTTP call through request.util into a single axios instance. List screens share search and pagination via the useAdminList composable, and main.ts (ViteSSG) injects per-page SEO config in the router guard.',
  ],
  description:
    'A theater promotion and booking site built solo — from planning and design to development and infrastructure. Implemented theater browsing and reservations, admin content management, and map integration.',
  overview: [
    'A promotional site to showcase Bogwang Theater’s performances and venue rentals and to drive online inquiries and bookings. I owned the entire process solo — planning, design, frontend, backend, and infrastructure — and run it in production.',
    'Because search traffic matters for a promotional site, I chose static site generation (SSG) with vite-ssg over a typical SPA, with dynamic meta tags, JSON-LD, and a build-time sitemap for search visibility.',
    'Admins manage performances, notices, press releases, and banners through Quill-based CRUD with S3 uploads. It runs on AWS EC2 with PM2 and Nginx.',
  ],
  highlights: [
    'Solo development covering planning, design, development, and infrastructure',
    'SEO optimization via vite-ssg static generation, dynamic meta/JSON-LD, and a sitemap',
    'Theater browsing and reservation with an optimized booking flow',
    'Admin registration of performances and notices for content operations',
    'Ongoing post-launch operation — review sprints (60+ defects), security hardening',
    'Merged 20 near-duplicate views (88–99% identical) into 10 shared pages — ~4,000 lines net removed',
    '20 pages indexed after the SEO regression fix — brand query at avg. position 1.7, 52% CTR (Search Console)',
  ],
  techNotes: [
    {
      title: 'Solo full-stack + operations',
      body: 'I set up everything myself: a Vue 3 / TypeScript frontend, a Koa / PostgreSQL (postgres.js) backend, AWS S3 uploads, and EC2 / PM2 / Nginx deployment — including the data-access layer with automatic snake_case ↔ camelCase conversion. Since launch I have kept operating it hands-on, migrating to HTTPS and maintaining OpenAPI (Swagger) docs and an ERD.',
    },
    {
      title: 'SEO via static site generation',
      body: 'Built statically with vite-ssg to improve initial render and indexing, injecting per-page meta/OG/JSON-LD (NewsArticle, TheaterEvent) after data load. The build collects all articles and performances from the API to auto-generate a sitemap.xml that includes individual URLs. When detail pages stopped being indexed in production, I traced the regression to its root cause — a router guard returning without next() during SSR, which silently skipped prerendering entirely — restored it, and added 301 redirects from legacy ?id= URLs to the new path format to clean up duplicate indexing. In the 77 days after the fix (6 Jul – 20 Sep 2026), Google Search Console shows 20 indexed pages drawing 376 impressions and 95 clicks (25.3% CTR). The brand query itself sits at an average position of 1.7 with a 52.2% CTR and accounts for 75% of those clicks; the remaining 24 came from non-brand searches.',
    },
    {
      title: 'Recurring maintenance sprints',
      body: 'I run recurring code-review sprints across the whole stack after launch. The most recent round swept backend and frontend together, surfacing and resolving 60+ defects, prioritized by what actually corrupts data — an update bug where omitted fields were overwritten with NULL and article bodies were lost, a search race that fired the same request twice and showed the wrong page depending on response order, and crashes when entering deleted posts. Fixing them one at a time kept letting the same defects return, so I diagnosed the cause as a duplicated structure where fixing one place never reached the others. Twenty public/admin views (measured 88–99% identical) were consolidated into ten shared pages — a net reduction of about 4,000 lines that removes the path by which "only one copy got fixed" drift bugs recur.',
    },
    {
      title: 'Security hardening',
      body: 'Replaced the view-count mechanism — previously a full-entity update from the client (open to arbitrary value tampering and body overwrites) — with a dedicated endpoint that increments atomically on the server, and blocked views/delete-flag changes in update. Uploads are locked down with an extension whitelist (blocking html/svg/executables) and double MIME validation for images; internal error messages are hidden, pagination is capped, search wildcards are escaped, and DDL constraints (NOT NULL, CHECK) were strengthened.',
    },
    {
      title: 'Admin content operations',
      body: 'Performances (past/upcoming), notices, press releases, and banners are created and edited through a Quill editor; banners also expose display order, transition time, and active state. Shared list logic was extracted into a useAdminList composable for reuse.',
    },
  ],
}
