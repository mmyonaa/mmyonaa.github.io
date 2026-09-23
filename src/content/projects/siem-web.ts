import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "10인 이하 팀 · 협업 (AI 리포트 에디터 단독)",
  "status": "PoC · 데모 (진행 중)",
  "title": "SIEM 관제 웹 플랫폼 · 보안 이벤트 모니터링·대응",
  "description": "보안 이벤트 조회부터 인시던트 대응·AI 리포트 작성까지 지원하는 Next.js 웹 플랫폼입니다.",
  "mediaNote": "출시 전 제품으로 화면은 비공개합니다.",
  "overview": [
    "팀과 함께 인시던트·리포트·엔드포인트의 화면과 API, Prisma·PostgreSQL 데이터 계층을 개발했습니다. 이 중 AI 리포트 에디터는 단독으로 맡았습니다."
  ],
  "highlights": [
    "인시던트·엔드포인트 관리 화면과 API 협업 개발",
    "AI 편집 결과 검토 · 다국어 리포트 저장 · PDF·DOCX·CSV/XLSX 내보내기",
    "AI 서버의 구조화 결과와 SSE 이벤트를 관제 화면에 연결"
  ],
  "techNotes": [
    {
      "title": "AI 리포트 에디터 (BlockNote)",
      "body": "BlockNote에 차트·상태카드·진행률 블록을 추가했습니다. AI 편집 제안은 블록·표·문자 단위의 변경 내용을 보여주고 사용자가 검토한 뒤 반영하도록 했습니다. 한·영·일 리포트 저장과 PDF·DOCX·CSV/XLSX 내보내기를 구현했으며, PDF에서는 차트 이미지화·웹폰트 로딩·다국어 파일명을 처리했습니다."
    },
    {
      "title": "SIEM 연동 · 실시간",
      "body": "OpenSearch로 SIEM 로그를 검색·집계합니다. SSE 스트림으로 대시보드를 라이브 업데이트하고, 무거운 AI 분석·리포트 생성은 AI 서버(REST · SSE)에 위임합니다."
    },
    {
      "title": "데이터 시각화 · 킬체인 그래프",
      "body": "Recharts로 대시보드 차트(영역·막대·도넛·게이지 등)를 구성하고, XY Flow와 dagre 자동 레이아웃으로 MITRE ATT&CK 킬체인 토폴로지 그래프를 구현했습니다. 노드·엣지 커스터마이징, 미니맵·줌·검색, 다크/라이트 테마를 지원합니다."
    },
    {
      "title": "백그라운드 잡 · 스케줄링",
      "body": "BullMQ·Redis 워커에서 데이터 보존·알림 발송을 처리하고, 크론과 재시도로 정기 리포트 생성을 자동화했습니다. 분석과 생성처럼 오래 걸리는 작업을 요청 처리에서 분리했습니다."
    }
  ]
}

export const en: ProjectText = {
  team: 'Team under 10 · collaborative (AI report editor solo)',
  status: 'PoC · demo (in progress)',
  title: 'SIEM Operations Web Platform · Security Event Monitoring',
  description:
    'A Next.js 15 full-stack web application for a multi-tenant SIEM security platform. I co-developed the SIEM dashboard and incident management with the team, and independently developed the AI report editor.',
  mediaNote: 'Screens are withheld for this pre-release product.',
  overview: [
    'The web surface of the SIEM platform — a Next.js 15 (App Router) full-stack app. As one of the main contributors on this team project, I built screens and APIs across the incident, report, and endpoint domains — from UI/server components to API routes and the DB layer (Prisma/PostgreSQL, multi-schema).',
    'I independently developed the BlockNote-based AI security report editor: I built custom blocks (charts, status cards), the preview-before-commit flow that highlights AI edit suggestions with block/table/character-level diffs, multilingual (ko/en/ja) report storage, and PDF/DOCX/CSV · XLSX export. I also owned the SIEM dashboard charts (Recharts), the MITRE ATT&CK kill-chain topology graph (XY Flow/dagre), and BullMQ worker/cron automation, and wired heavy analysis and generation to be delegated to the AI server (REST/SSE).',
  ],
  highlights: [
    'Next.js 15 App Router full-stack collaboration (UI, API routes, Prisma)',
    'SIEM dashboard, incident/alert management, endpoint isolation',
    'BlockNote-based AI report editor — block-level AI editing, multilingual, multi-format export',
    'Kill-chain (MITRE ATT&CK) topology graph and dashboard charts',
    'OpenSearch search, real-time SSE monitoring, AI-server integration',
  ],
  techNotes: [
    {
      title: 'Next.js 15 full-stack (collaborative)',
      body: 'Built in one app with the App Router — UI/server components, many API routes, and a Prisma multi-schema (PostgreSQL) DB layer. On a collaborative team repo I was among the top contributors, building screens and APIs across the incident, report, and endpoint domains.',
    },
    {
      title: 'AI report editor (BlockNote)',
      body: 'Added custom blocks (charts, status cards, progress bars) to BlockNote and highlighted AI edits with block/table/character-level diffing for preview-before-commit. Reports are stored and previewed per language (ko/en/ja), and the finished report exports to PDF (server-side Puppeteer render — charts rasterized, web-font loading, multilingual filenames), DOCX (cover page, headers/footers, table-style preservation), and CSV/XLSX.',
    },
    {
      title: 'SIEM integration & real time',
      body: 'OpenSearch powers SIEM log search/aggregation. An SSE stream updates dashboards live, while heavy AI analysis and report generation are delegated to the AI server (REST/SSE).',
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
