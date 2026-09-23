import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "10인 이하 팀 · 단독 설계·개발",
  "status": "PoC · 데모 (진행 중)",
  "title": "SIEM AI 분석 서버 · 보안 인시던트 자동 분석",
  "description": "보안 인시던트를 자동 분석하고 관제 화면에 결과를 전달하는 Fastify 기반 AI 서버입니다.",
  "mediaNote": "출시 전 제품으로 화면은 비공개합니다.",
  "presentationNote": "고객사를 대상으로 SIEM 솔루션을 소개한 발표 자료입니다. 제품 개요와 핵심 기능, 도입 효과를 중심으로 구성했고, 국내 고객에게는 한국어로 해외 고객에게는 영문으로 직접 발표와 데모·질의응답까지 진행했습니다. 위협 탐지 → AI 자동 분석 → 호스트 격리 대응 → 다국어 리포트 생성으로 이어지는 end-to-end 데모 시나리오를 직접 구성해 제품의 실제 운영 흐름을 보여줬습니다.",
  "overview": [
    "SIEM 보안 플랫폼에서 오케스트레이터·LLM 게이트웨이·테넌트별 모델 관리를 단독 설계·개발했습니다. 다른 구성원이 수집·정규화한 실제 XDR 데이터를 받아 분석하며, 고객사 데모에도 이 데이터를 활용했습니다."
  ],
  "highlights": [
    "역할별 에이전트 8종과 Redis 큐 기반 자동 분석 파이프라인 개발",
    "LLM 호출 통합 · 테넌트별 모델 관리와 BYOK 접근 제어",
    "분석 결과의 구조화 출력 · SSE 스트리밍 · 비동기 리포트 생성"
  ],
  "techNotes": [
    {
      "title": "수집 계층과 분석 워커 분리",
      "body": "별도 계층에서 XDR 데이터를 OCSF로 정규화하고 Kafka를 거쳐 OpenSearch에 적재합니다. 저는 Redis 큐 이후의 분석 파이프라인을 개발했습니다. 입력 규격과 분석 처리를 분리해 분석 워커를 독립적으로 증설할 수 있도록 구성했습니다."
    },
    {
      "title": "분석 근거 수집과 LLM 추론 분리",
      "body": "Triage가 우선순위에 따라 실행 범위를 정하고, 코드 기반 IOC·MITRE·Network 에이전트가 병렬로 근거를 수집합니다. SecurityIntel은 추가 판단이 필요할 때만 실행하며, 마지막에 Correlation이 결과를 종합합니다. kill-chain 그래프·위협 점수·신뢰도의 출력 형식을 zod로 정의·검증해 웹과 리포트에서 활용하도록 했습니다."
    },
    {
      "title": "진행 상황 스트리밍과 수동 재분석",
      "body": "SSE로 진행률·부분 결과·완료·오류 이벤트를 전달합니다. 이전 분석 맥락을 반영하는 수동 재분석도 자동 분석과 같은 파이프라인을 사용합니다. 컴플라이언스 분석과 번역은 백그라운드로, 리포트 생성은 BullMQ·Redis 비동기 작업으로 분리했습니다."
    },
    {
      "title": "LLM 호출과 장애 대비 정책 통합",
      "body": "공급자별 SDK 호출을 LiteLLM의 OpenAI 호환 경로로 통합했습니다. 자동 폴백, 공급자별 동시성, 토큰 사용량을 공통 계층에서 제어하고 429·5xx 응답에는 Retry-After를 우선한 지수 백오프를 적용했습니다. 공급자 상태는 10초 TTL 캐시로 확인합니다."
    },
    {
      "title": "테넌트별 모델 관리와 BYOK",
      "body": "LiteLLM Admin API로 모델을 생성·검증·삭제하고, 가상 키와 팀별 허용목록으로 접근 범위를 제한했습니다. 모델 검증에는 가상 키와 별칭을 사용한 호출을 적용하고, 삭제 중 허용목록 동기화가 실패하면 롤백하도록 구성했습니다."
    },
    {
      "title": "오류·트래픽 관측",
      "body": "Grafana 대시보드에서 AI 서버와 웹 플랫폼의 오류·트래픽을 확인하도록 구성했습니다. 배포 후 오류율·트래픽 변화를 통해 서버와 웹 플랫폼의 동작 상태를 점검했습니다."
    },
    {
      "title": "실제 데이터 기반 고객사 데모",
      "body": "실제 XDR 데이터를 활용해 탐지 → AI 분석 → 대응 → 리포트 생성으로 이어지는 데모를 구성했습니다. 고객사 대상 제품 발표를 한국어 2회·영문 1회 진행하며 기능 설명과 시연·질의응답을 맡았습니다."
    }
  ]
}

export const en: ProjectText = {
  "team": "Team under 10 · sole design & build",
  "status": "PoC · demo (in progress)",
  "title": "SIEM AI Analysis Server · Automated Incident Analysis",
  "description": "A Fastify AI server for SIEM security incident analysis. I built the analysis pipeline on data from a separately developed ingestion and normalization layer, independently developing the orchestrator, LiteLLM gateway, and tenant model management.",
  "mediaNote": "Screens are withheld for this pre-release product.",
  "presentationNote": "Slides from presentations introducing the SIEM solution to enterprise clients. Structured around the product overview, core capabilities, and business value, I delivered the presentations, demos, and Q&A myself — in Korean for domestic clients and in English for overseas clients. I designed an end-to-end demo scenario — threat detection → automated AI analysis → host isolation response → multilingual report generation — to show the product’s real operational flow.",
  "overview": [
    "The AI server of a SIEM platform developed by a team of no more than ten people. I independently designed and developed the multi-agent orchestrator, LiteLLM gateway, and multi-tenant model management.",
    "Input consists of actual XDR data collected from CrowdStrike, SentinelOne, Cortex, and other vendors. Other team members developed OCSF normalization, Kafka ingestion, and OpenSearch indexing. I built the analysis pipeline consuming that data via Redis jobs and conducted client demonstrations using actual XDR data.",
    "Incidents pulled off the queue are processed by eight role-specific agents in a fixed order. Triage sets the execution scope, IOC/MITRE/Network analysis runs in parallel, and Correlation synthesizes the result as a kill-chain graph, threat score (0–100), and confidence. Compliance analysis (ISMS-P, ISO 27001, GDPR) runs in the background.",
    "I consolidated scattered per-provider LLM calls onto a single LiteLLM (OpenAI-compatible) gateway path, with per-tenant model management and BYOK isolation on top. Analysis results stream in real time over SSE, and reports are generated via async BullMQ/Redis jobs."
  ],
  "highlights": [
    "Designed the multi-agent incident-analysis orchestrator — 8 role-specific agents",
    "Built the automated analysis pipeline downstream of the Redis queue, on the OCSF ingestion layer",
    "Correlation structured output — kill-chain graph, threat score, confidence",
    "LiteLLM gateway consolidation — unified multi-provider calls, fallback, token control",
    "Per-tenant model management and BYOK virtual-key isolation"
  ],
  "techNotes": [
    {
      "title": "Collected data integration → automated analysis pipeline",
      "body": "A separately developed layer normalizes XDR telemetry into OCSF, ingests it over Kafka, and indexes it in OpenSearch. I built the downstream pipeline that takes this data and sends Redis jobs through multi-agent analysis, separating analysis workers from ingestion."
    },
    {
      "title": "Multi-agent analysis pipeline (8 role-specific agents)",
      "body": "The pipeline is split across role-specific agents to spend LLM calls only where they matter. Triage classifies each incident and assigns a priority that gates what runs next; stage 1 runs code-based agents (IOC, MITRE, Network) in parallel (Promise.allSettled) to gather grounding evidence at zero LLM cost. The LLM-backed SecurityIntel agent runs conditionally only when the verdict is still open (skipped on an IOC match, a trusted allow-list hit, or low priority), and Correlation synthesis runs once at the end. Structured output via generateObject (zod) is likewise a deliberate choice — downstream screens and reports consume results without parsing."
    },
    {
      "title": "SSE streaming & manual re-analysis",
      "body": "The pipeline is exposed over SSE, delivering progress, partial results, complete, and error events in real time, tracking completed-agent counts per run. A manual re-analysis path re-runs a specific incident with prior analysis context, sharing the same code as the automatic (queue) path."
    },
    {
      "title": "LiteLLM gateway consolidation",
      "body": "Per-provider SDK branches were consolidated behind an OpenAI-compatible client so every call goes through the LiteLLM gateway. Fallback models, per-provider semaphore concurrency, 429/5xx exponential backoff (Retry-After first), and token budgets moved into the gateway/middleware layer, and provider status is health-checked with a 10s TTL cache. Chat Completions API is used for multi-step tool calls."
    },
    {
      "title": "Multi-tenant AI models & BYOK",
      "body": "Per-tenant model deployments are created, verified (virtual key + alias ping), and deleted (with rollback on allow-list sync failure) via the LiteLLM Admin API. Tenant isolation uses a virtual key + team-level allow-list to block cross-tenant access. Translation is delegated to a separate endpoint, and health endpoints are split into live/readiness."
    },
    {
      "title": "Operational observability",
      "body": "I built Grafana dashboards that show errors and traffic across the AI server and the web platform on one screen. Because the pipeline runs unattended, there had to be a separate path for a human to notice \"did an analysis fail?\" — and comparing error-rate and traffic shifts after a deploy is how outages and performance regressions get caught."
    },
    {
      "title": "Client demonstrations with actual XDR data",
      "body": "Designed a demonstration from threat detection through AI analysis and response to report generation using actual XDR data. Delivered three client presentations—two in Korean and one in English—including live demos and Q&A."
    }
  ]
}
