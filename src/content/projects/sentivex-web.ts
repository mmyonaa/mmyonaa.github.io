import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'SentiveX 웹 플랫폼',
  description:
    '멀티테넌트 SIEM 보안 플랫폼의 Next.js 15 풀스택 웹. SIEM 대시보드·인시던트 관리·AI 리포트 에디터를 팀과 협업으로 개발했습니다.',
  mediaNote: '실제 운영 데이터가 포함되어 화면은 비공개합니다.',
  overview: [
    'SentiveX 플랫폼의 웹 축인 Next.js 15(App Router) 풀스택 앱입니다. 팀 협업 프로젝트에서 주요 기여자로 참여해, UI·서버 컴포넌트부터 API 라우트·DB 레이어(Prisma/PostgreSQL 멀티스키마)까지 인시던트·리포트·엔드포인트 등 여러 도메인의 화면과 API를 개발했습니다.',
    '가장 공들인 부분은 BlockNote 기반 AI 보안 리포트 에디터입니다. 차트·상태카드 등 커스텀 블록을 만들고, AI 편집 제안을 블록/표/문자 단위 diff 하이라이팅으로 미리보고 커밋하는 흐름과 한/영/일 다국어 리포트 저장, PDF·DOCX·CSV/XLSX 익스포트를 구현했습니다. 이 외에 SIEM 대시보드 차트(Recharts)와 MITRE ATT&CK 킬체인 토폴로지 그래프(XY Flow·dagre), BullMQ 워커·크론 자동화를 담당했고, 무거운 분석·생성은 AI 서버(REST·SSE)에 위임하도록 연동 흐름을 구성했습니다.',
  ],
  highlights: [
    'Next.js 15 App Router 풀스택(UI + API 라우트 + Prisma/PostgreSQL) 협업 개발',
    'SIEM 대시보드·인시던트/경고 관리(severity·MITRE ATT&CK)·엔드포인트 격리·위협 인텔리전스',
    'BlockNote 기반 AI 리포트 에디터 — 블록 단위 AI 편집·diff 하이라이팅·미리보기·다국어(한/영/일)·PDF/DOCX/CSV·XLSX 익스포트',
    'Recharts 대시보드 차트 + XY Flow·dagre 킬체인(MITRE ATT&CK) 토폴로지 그래프',
    'BullMQ·Redis 워커·크론 스케줄링 — 데이터 보존·알림·정기 리포트 자동화',
    'OpenSearch SIEM 검색·실시간 모니터링(SSE) + AI 서버(REST·SSE) 연동',
  ],
  techNotes: [
    {
      title: 'Next.js 15 풀스택 협업 개발',
      body: 'App Router로 UI·서버 컴포넌트와 수백 개의 API 라우트, Prisma 멀티스키마(PostgreSQL) DB 레이어까지 한 앱에서 구성했습니다. 팀 협업 레포에서 주요 기여자로 참여해 인시던트·리포트·엔드포인트 등 여러 도메인의 화면과 API를 개발했습니다.',
    },
    {
      title: 'AI 리포트 에디터 (BlockNote)',
      body: 'BlockNote에 차트·상태카드·프로그레스 등 커스텀 블록을 더하고, 블록/표/문자 단위 diff 비교(compareBlockNoteContent)로 AI 편집 결과를 하이라이팅해 미리보고 커밋하게 했습니다. 리포트는 한/영/일 언어별로 저장·미리보기되며, 완성본은 PDF(Puppeteer 서버 렌더 — 차트 이미지화·웹폰트 로딩·다국어 파일명)·DOCX(표지·머리말/꼬리말·표 스타일 보존)·CSV/XLSX로 내보냅니다.',
    },
    {
      title: 'SIEM 연동 · 실시간',
      body: 'OpenSearch로 SIEM 로그를 검색·집계합니다. comprehensive-monitoring SSE로 대시보드를 라이브 업데이트하고, 무거운 AI 분석·리포트 생성은 AI 서버(REST·SSE)에 위임합니다.',
    },
    {
      title: '데이터 시각화 · 킬체인 그래프',
      body: 'Recharts로 대시보드 차트(영역·막대·도넛·게이지 등)를 구성하고, XY Flow와 dagre 자동 레이아웃으로 MITRE ATT&CK 킬체인 토폴로지 그래프를 구현했습니다. 노드·엣지 커스터마이징, 미니맵·줌·검색, 다크/라이트 테마를 지원합니다.',
    },
    {
      title: '백그라운드 잡 · 스케줄링',
      body: 'BullMQ와 Redis로 데이터 보존·알림 발송을 워커에서 비동기 처리하고, 크론 기반 리포트 스케줄링(재시도 포함)으로 정기 리포트 생성을 자동화했습니다. 무거운 작업을 요청 흐름과 분리해 응답 지연 없이 처리합니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'SentiveX Web Platform',
  description:
    'The Next.js 15 full-stack web of a multi-tenant SIEM security platform. I co-developed the SIEM dashboard, incident management, and AI report editor with the team.',
  mediaNote: 'Screens are withheld as they contain live operational data.',
  overview: [
    'The web surface of the SentiveX platform — a Next.js 15 (App Router) full-stack app. As one of the main contributors on this team project, I built screens and APIs across the incident, report, and endpoint domains — from UI/server components to API routes and the DB layer (Prisma/PostgreSQL, multi-schema).',
    'The part I invested in most is the BlockNote-based AI security report editor: I built custom blocks (charts, status cards), the preview-before-commit flow that highlights AI edit suggestions with block/table/character-level diffs, multilingual (ko/en/ja) report storage, and PDF/DOCX/CSV·XLSX export. I also owned the SIEM dashboard charts (Recharts), the MITRE ATT&CK kill-chain topology graph (XY Flow/dagre), and BullMQ worker/cron automation, and wired heavy analysis and generation to be delegated to the AI server (REST/SSE).',
  ],
  highlights: [
    'Next.js 15 App Router full-stack (UI + API routes + Prisma/PostgreSQL) — collaborative development',
    'SIEM dashboard, incident/alert management (severity, MITRE ATT&CK), endpoint isolation, threat intelligence',
    'BlockNote-based AI report editor — block-level AI editing, diff highlighting, preview, multilingual (ko/en/ja), PDF/DOCX/CSV·XLSX export',
    'Recharts dashboard charts + XY Flow/dagre kill-chain (MITRE ATT&CK) topology graph',
    'BullMQ/Redis workers & cron scheduling — data retention, notifications, recurring reports',
    'OpenSearch SIEM search & real-time monitoring (SSE) + AI-server (REST/SSE) integration',
  ],
  techNotes: [
    {
      title: 'Next.js 15 full-stack (collaborative)',
      body: 'Built in one app with the App Router — UI/server components, hundreds of API routes, and a Prisma multi-schema (PostgreSQL) DB layer. On a collaborative team repo I was among the top contributors, building screens and APIs across the incident, report, and endpoint domains.',
    },
    {
      title: 'AI report editor (BlockNote)',
      body: 'Added custom blocks (charts, status cards, progress bars) to BlockNote and highlighted AI edits with block/table/character-level diffing (compareBlockNoteContent) for preview-before-commit. Reports are stored and previewed per language (ko/en/ja), and the finished report exports to PDF (server-side Puppeteer render — charts rasterized, web-font loading, multilingual filenames), DOCX (cover page, headers/footers, table-style preservation), and CSV/XLSX.',
    },
    {
      title: 'SIEM integration & real time',
      body: 'OpenSearch powers SIEM log search/aggregation. A comprehensive-monitoring SSE stream updates dashboards live, while heavy AI analysis and report generation are delegated to the AI server (REST/SSE).',
    },
    {
      title: 'Data visualization & kill-chain graph',
      body: 'Built dashboard charts (area, bar, donut, gauge, etc.) with Recharts and implemented a MITRE ATT&CK kill-chain topology graph using XY Flow with dagre auto-layout — custom nodes/edges, minimap, zoom, search, and dark/light theming.',
    },
    {
      title: 'Background jobs & scheduling',
      body: 'Processed data retention and notification delivery asynchronously in BullMQ/Redis workers, and automated recurring report generation with cron-based scheduling (with retries). Heavy work is decoupled from the request path so responses stay fast.',
    },
  ],
}
