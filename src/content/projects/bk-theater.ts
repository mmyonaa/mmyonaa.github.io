import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '보광 극장 홍보·대관 사이트',
  architectureCaptions: [
    '시스템 아키텍처 · 배포 구성 (Nginx · PM2 · PostgreSQL · S3)',
    '백엔드 레이어드 아키텍처 (routes → controller → service → repository)',
    '프론트엔드 모듈 의존 (뷰 → 컴포저블 → API 래퍼 → HTTP)',
  ],
  architectureNotes: [
    '브라우저 요청은 Nginx 리버스 프록시가 받아 정적 페이지는 vite preview 프론트엔드로, /api 요청은 Koa 백엔드(:3000)로 분기합니다. 두 프로세스는 PM2로 관리되고 백엔드는 PostgreSQL·AWS S3에 연결되며, 지도 스크립트와 업로드 이미지는 브라우저가 카카오·S3에서 직접 로드합니다.',
    'index.ts가 서버를 부트스트랩하고 요청은 routes → controller → service → repository 순으로 흐르며 계층별 책임을 분리했습니다. 저장소 계층은 postgres.js 커넥션 풀로 PostgreSQL에 접근하고, 이미지·파일 업로드는 s3.util로, DB 오류는 CustomError로 감싸 일관되게 처리합니다.',
    '뷰는 API 래퍼(banner·board·perfo)로 데이터를 요청하고, 래퍼는 request.util → axios 인스턴스로 HTTP 호출을 단일화합니다. 목록 화면의 검색·페이지네이션은 useAdminList 컴포저블로 공통화하고, main.ts(ViteSSG)가 라우터 가드에서 페이지별 SEO 설정을 주입합니다.',
  ],
  description:
    '기획부터 설계·개발·인프라까지 1인으로 만든 극장 홍보·대관 사이트. 극장 조회와 예약, 관리자 콘텐츠 운영, 지도 연동을 구현했습니다.',
  overview: [
    '보광극장의 공연·대관 정보를 알리고 온라인 문의·예약 흐름을 만들기 위한 홍보 사이트입니다. 기획·디자인·프론트엔드·백엔드·인프라까지 전 과정을 단독으로 맡아 구축하고 운영했습니다.',
    '검색 유입이 중요한 홍보 사이트 특성을 고려해, 일반적인 SPA 대신 vite-ssg 기반 정적 사이트 생성(SSG)을 선택했습니다. 페이지를 미리 렌더링하고 글·공연별 동적 메타태그와 JSON-LD 구조화 데이터, 빌드 타임 사이트맵까지 갖춰 검색 노출을 최적화했습니다.',
    '관리자가 공연·공지·보도자료·배너를 직접 운영할 수 있도록 Quill 에디터 기반 CRUD와 이미지/파일 업로드(S3)를 제공하고, AWS EC2에 PM2·Nginx로 배포해 안정적으로 운영 중입니다.',
  ],
  highlights: [
    '기획·설계·개발·인프라 구성까지 1인 개발',
    'vite-ssg 정적 사이트 생성(SSG) + 동적 메타·JSON-LD·사이트맵으로 SEO 최적화',
    '극장 조회·예약 기능과 예약 흐름 최적화',
    '관리자 공연·공지 등록으로 콘텐츠 운영 편의 향상',
    '오픈 후 지속 운영 — 전면 코드 리뷰 스프린트(버그 60여 건)·보안 하드닝·색인 회귀 복구',
  ],
  techNotes: [
    {
      title: 'SSG 기반 SEO 최적화',
      body: 'vite-ssg로 정적 빌드해 초기 렌더링과 색인을 개선하고, 상세 페이지마다 데이터 로드 후 메타·OG·JSON-LD(NewsArticle·TheaterEvent)를 주입했습니다. 빌드 시 API에서 전체 글·공연을 수집해 개별 URL까지 포함한 sitemap.xml을 자동 생성합니다. 운영 중 상세 페이지가 색인되지 않던 회귀는 라우터 가드가 SSR에서 next() 없이 반환해 프리렌더 전체가 조용히 스킵되던 것이 원인이었는데, 이를 근본 원인까지 추적해 복구하고 옛 URL(?id= 쿼리) → 새 경로 301 리디렉션으로 중복 색인까지 정리했습니다. 그 결과 2026년 7월 기준 Google Search Console 최근 12개월간 누적 클릭 254·노출 902, 평균 CTR 28.2%, 평균 게재순위 3.9위로 검색 결과 상단 노출과 높은 유입을 확보했습니다.',
    },
    {
      title: '1인 풀스택 + 직접 운영',
      body: 'Vue 3·TypeScript 프론트, Koa·PostgreSQL(postgres.js) 백엔드, AWS S3 업로드, EC2·PM2·Nginx 배포까지 직접 구성했습니다. 컬럼 snake_case ↔ camelCase 자동 변환 등 데이터 접근 계층도 직접 설계했고, 오픈 후에는 HTTPS 전환과 OpenAPI(Swagger) 문서·ERD 정비까지 운영자로서 이어가고 있습니다.',
    },
    {
      title: '관리자 콘텐츠 운영',
      body: '공연(역대/예정)·공지·보도자료·배너를 Quill 에디터로 등록·수정하고, 배너는 노출 순서·전환 시간·활성 상태까지 관리할 수 있습니다. 목록 공통 로직은 useAdminList 컴포저블로 추출해 재사용성을 높였습니다.',
    },
    {
      title: '전면 코드 리뷰 스프린트',
      body: '오픈 후에도 정기적으로 정비 스프린트를 돌립니다. 최근에는 백엔드·프론트 전 계층을 코드 리뷰해 버그 60여 건을 수정했습니다 — 부분 수정 시 미전송 필드가 NULL로 덮여 본문이 유실되던 update 버그, 검색 시 같은 요청이 두 번 나가 응답 순서에 따라 엉뚱한 페이지가 표시되던 레이스, 삭제된 글 진입 시 크래시 등 데이터가 실제로 깨지는 문제들입니다. 동일률 88~99%로 복붙돼 있던 공개·관리자 뷰 20개는 공용 페이지 10개로 통합해 약 4,000줄을 순감소시키고, “한 파일만 고쳐지는” 드리프트 버그의 재발을 구조적으로 차단했습니다.',
    },
    {
      title: '보안 하드닝',
      body: '조회수를 전체 엔티티 update로 보내던 구조(임의 값 조작·본문 덮어쓰기 위험)를 폐기하고 서버가 원자적으로 +1 하는 조회수 전용 엔드포인트로 교체했으며, update에서는 views·삭제 플래그 수정을 차단했습니다. 업로드는 확장자 화이트리스트(html·svg·실행파일 차단)와 이미지 MIME 이중 검증으로 잠갔고, 에러 응답의 내부 메시지 노출 차단, 페이지네이션 상한, 검색어 와일드카드 이스케이프, DDL 제약(NOT NULL·CHECK) 보강에 더해 git 히스토리에 남아 있던 시크릿도 filter-repo로 완전히 제거했습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'Bogwang Theater Promotion & Booking Site',
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
    'Because search traffic matters for a promotional site, I chose static site generation (SSG) with vite-ssg over a typical SPA. Pages are pre-rendered, and each article/performance gets dynamic meta tags, JSON-LD structured data, and a build-time sitemap to optimize search visibility.',
    'For content operations, admins can manage performances, notices, press releases, and banners through Quill-based CRUD with image/file uploads (S3). It is deployed on AWS EC2 with PM2 and Nginx for stable operation.',
  ],
  highlights: [
    'Solo development covering planning, design, development, and infrastructure',
    'SEO optimization via vite-ssg static generation, dynamic meta/JSON-LD, and a sitemap',
    'Theater browsing/reservation features with an optimized booking flow',
    'Admin registration of performances and notices for easier content operations',
    'Ongoing post-launch operation — full code-review sprint (60+ bug fixes), security hardening, indexing-regression recovery',
  ],
  techNotes: [
    {
      title: 'SEO via static site generation',
      body: 'Built statically with vite-ssg to improve initial render and indexing, injecting per-page meta/OG/JSON-LD (NewsArticle, TheaterEvent) after data load. The build collects all articles and performances from the API to auto-generate a sitemap.xml that includes individual URLs. When detail pages stopped being indexed in production, I traced the regression to its root cause — a router guard returning without next() during SSR, which silently skipped prerendering entirely — restored it, and added 301 redirects from legacy ?id= URLs to the new path format to clean up duplicate indexing. As of July 2026, this translated into 254 clicks and 902 impressions with a 28.2% average CTR and a 3.9 average position over the trailing twelve months in Google Search Console — strong top-of-results visibility and click-through.',
    },
    {
      title: 'Solo full-stack + operations',
      body: 'I set up everything myself: a Vue 3 / TypeScript frontend, a Koa / PostgreSQL (postgres.js) backend, AWS S3 uploads, and EC2 / PM2 / Nginx deployment — including the data-access layer with automatic snake_case ↔ camelCase conversion. Since launch I have kept operating it hands-on, migrating to HTTPS and maintaining OpenAPI (Swagger) docs and an ERD.',
    },
    {
      title: 'Admin content operations',
      body: 'Performances (past/upcoming), notices, press releases, and banners are created and edited through a Quill editor; banners also expose display order, transition time, and active state. Shared list logic was extracted into a useAdminList composable for reuse.',
    },
    {
      title: 'Full-stack code-review sprint',
      body: 'I run regular maintenance sprints post-launch. Most recently, a full review across the backend and frontend fixed 60+ bugs — including a data-destroying update bug where omitted fields were overwritten with NULL and article bodies were lost, a search race that fired the same request twice and showed the wrong page depending on response order, and crashes when entering deleted posts. Twenty copy-pasted public/admin views (measured 88–99% identical) were consolidated into ten shared pages, a net reduction of about 4,000 lines that structurally prevents the "only one copy got fixed" class of drift bugs.',
    },
    {
      title: 'Security hardening',
      body: 'Replaced the view-count mechanism — previously a full-entity update from the client (open to arbitrary value tampering and body overwrites) — with a dedicated endpoint that increments atomically on the server, and blocked views/delete-flag changes in update. Uploads are locked down with an extension whitelist (blocking html/svg/executables) and double MIME validation for images; on top of hiding internal error messages, capping pagination, escaping search wildcards, and strengthening DDL constraints (NOT NULL, CHECK), I also purged leaked secrets from the git history with filter-repo.',
    },
  ],
}
