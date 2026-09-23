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
      "title": "보안 리포트용 커스텀 블록과 문서 저장",
      "body": "텍스트와 함께 분석 차트·상태 요약·대응 내용을 편집할 수 있도록 BlockNote에 차트·진행률·상태카드·섹션·인시던트 대응 블록을 추가했습니다. 사용자가 인시던트와 언어를 선택하면 AI 서버에서 생성한 결과를 BlockNote JSON으로 저장하고, 에디터에서 이어서 편집하도록 연결했습니다. 분석 내용·판단 근거·컴플라이언스 결과는 한·영·일 언어별로 저장했습니다."
    },
    {
      "title": "AI 편집 제안의 변경 내용 비교",
      "body": "AI가 제안한 재작성·확장·설명 보완을 사용자가 검토한 뒤 반영하도록 구현했습니다. 블록 단위 변경뿐 아니라 표의 셀과 문장 안의 문자 단위 차이도 비교해 강조했습니다. 변경 전후를 미리보기에서 확인하고 반영하거나 거절할 수 있도록 해, AI 편집 결과의 적용 여부를 사용자가 결정하게 했습니다."
    },
    {
      "title": "리포트 형식별 내보내기",
      "body": "리포트를 PDF·DOCX·CSV/XLSX로 내보내도록 구현했습니다. PDF는 Puppeteer로 서버에서 렌더링하면서 차트를 이미지로 변환하고 웹폰트 로딩과 다국어 파일명을 처리했습니다. DOCX에는 표지·머리말·꼬리말과 표 스타일을 반영하고, CSV/XLSX로는 표 데이터를 내보내도록 구성했습니다."
    },
    {
      "title": "분석 출력·SSE 규격 설계와 서버·웹 연동",
      "body": "분석 출력 스키마와 SSE 이벤트 규격을 직접 정하고 AI 서버·웹 양쪽에 구현했습니다. 진행률·부분 결과·완료·오류 상태를 관제 화면에 연결하고, 로그 검색·집계는 OpenSearch로 처리했습니다. 오래 걸리는 분석·리포트 생성은 REST·SSE로 AI 서버에 위임했습니다."
    },
    {
      "title": "데이터 시각화 · 킬체인 그래프",
      "body": "Recharts로 대시보드 차트(영역·막대·도넛·게이지 등)를 구성하고, XY Flow와 dagre 자동 레이아웃으로 MITRE ATT&CK 킬체인 토폴로지 그래프를 구현했습니다. 노드·엣지 커스터마이징, 미니맵·줌·검색, 다크/라이트 테마를 지원합니다."
    },
    {
      "title": "백그라운드 잡 · 스케줄링",
      "body": "BullMQ·Redis 워커에서 데이터 보존·알림 발송을 처리하고, 크론과 재시도로 정기 리포트 생성을 자동화했습니다. 분석과 생성처럼 오래 걸리는 작업을 요청 처리에서 분리했습니다."
    },
    {
      "title": "개발 일감과 코드 변경 이력 연결",
      "body": "Jira·Confluence로 개발 일감과 스프린트·장기 일정을 관리하고, 티켓에 진행 상황과 논의를 기록했습니다. 일감 ID를 Git 브랜치명에 연결해 어떤 작업에서 코드가 변경됐는지 추적했습니다."
    }
  ]
}

export const en: ProjectText = {
  "team": "Team under 10 · collaborative (AI report editor solo)",
  "status": "PoC · demo (in progress)",
  "title": "SIEM Operations Web Platform · Security Event Monitoring",
  "description": "A Next.js 15 full-stack web application for a multi-tenant SIEM security platform. I co-developed the SIEM dashboard and incident management with the team, and independently developed the AI report editor.",
  "mediaNote": "Screens are withheld for this pre-release product.",
  "overview": [
    "The web surface of the SIEM platform — a Next.js 15 (App Router) full-stack app. As one of the main contributors on this team project, I built screens and APIs across the incident, report, and endpoint domains — from UI/server components to API routes and the DB layer (Prisma/PostgreSQL, multi-schema).",
    "I independently developed the BlockNote-based AI security report editor: I built custom blocks (charts, status cards), the preview-before-commit flow that highlights AI edit suggestions with block/table/character-level diffs, multilingual (ko/en/ja) report storage, and PDF/DOCX/CSV · XLSX export. I also owned the SIEM dashboard charts (Recharts), the MITRE ATT&CK kill-chain topology graph (XY Flow/dagre), and BullMQ worker/cron automation, and wired heavy analysis and generation to be delegated to the AI server (REST/SSE)."
  ],
  "highlights": [
    "Next.js 15 App Router full-stack collaboration (UI, API routes, Prisma)",
    "SIEM dashboard, incident/alert management, endpoint isolation",
    "BlockNote-based AI report editor — block-level AI editing, multilingual, multi-format export",
    "Kill-chain (MITRE ATT&CK) topology graph and dashboard charts",
    "OpenSearch search, real-time SSE monitoring, AI-server integration"
  ],
  "techNotes": [
    {
      "title": "Next.js 15 full-stack (collaborative)",
      "body": "Built in one app with the App Router — UI/server components, many API routes, and a Prisma multi-schema (PostgreSQL) DB layer. On a collaborative team repo I was among the top contributors, building screens and APIs across the incident, report, and endpoint domains."
    },
    {
      "title": "Custom report blocks and document storage",
      "body": "Added chart, progress, status-card, section, and incident-action blocks to BlockNote so reports can combine editable text with analysis visuals and response details. After the user selects incidents and a language, the AI-server output is stored as BlockNote JSON for further editing. Analysis, reasoning, and compliance content are stored per language: Korean, English, and Japanese."
    },
    {
      "title": "Comparing AI editing suggestions",
      "body": "Implemented review before applying AI rewrites, expansions, and clarifications. Differences are highlighted at block, table-cell, and inline-character levels. Users preview the changes and accept or reject the suggestion, retaining control over whether AI edits are applied."
    },
    {
      "title": "Format-specific report export",
      "body": "Implemented PDF, DOCX, and CSV/XLSX export. PDF generation uses server-side Puppeteer rendering with chart-to-image conversion, webfont loading, and multilingual filenames. DOCX includes a cover, headers, footers, and table styling; tabular data can also be exported as CSV/XLSX."
    },
    {
      "title": "Shared analysis schema and SSE contract",
      "body": "Defined the analysis output schema and SSE event contract and implemented both the AI-server and web sides. Connected progress, partial results, completion, and errors to the monitoring UI; OpenSearch handles log search and aggregation. Long-running analysis and report generation are delegated to the AI server through REST and SSE."
    },
    {
      "title": "Data visualization & kill-chain graph",
      "body": "Built dashboard charts (area, bar, donut, gauge, etc.) with Recharts and implemented a MITRE ATT&CK kill-chain topology graph using XY Flow with dagre auto-layout — custom nodes/edges, minimap, zoom, search, and dark/light theming."
    },
    {
      "title": "Background jobs & scheduling",
      "body": "Processed data retention and notification delivery asynchronously in BullMQ/Redis workers, and automated recurring report generation with cron-based scheduling (with retries). Heavy work is decoupled from the request path so responses stay fast."
    },
    {
      "title": "Connecting work items to code changes",
      "body": "Managed work items, sprint plans, and longer-term schedules in Jira and Confluence, recording progress and discussions on tickets. Included work-item IDs in Git branch names to connect changes with their implementation context."
    }
  ]
}
