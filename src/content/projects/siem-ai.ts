import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'SIEM AI 분석 서버 · 보안 인시던트 자동 분석',
  description:
    "SIEM 보안 인시던트 분석용 Fastify AI 서버. 별도 수집·정규화 계층의 데이터를 받아 분석 파이프라인을 개발하고, 오케스트레이터·LiteLLM 게이트웨이·테넌트별 모델 관리를 단독 설계·개발했습니다.",
  mediaNote: '출시 전 제품으로 화면은 비공개합니다.',
  presentationNote:
    '고객사를 대상으로 SIEM 솔루션을 소개한 발표 자료입니다. 제품 개요와 핵심 기능, 도입 효과를 중심으로 구성했고, 국내 고객에게는 한국어로 해외 고객에게는 영문으로 직접 발표와 데모·질의응답까지 진행했습니다. 위협 탐지 → AI 자동 분석 → 호스트 격리 대응 → 다국어 리포트 생성으로 이어지는 end-to-end 데모 시나리오를 직접 구성해 제품의 실제 운영 흐름을 보여줬습니다.',
  overview: [
    "10인 이하 팀에서 개발하는 SIEM 플랫폼의 AI 서버입니다. 멀티 에이전트 오케스트레이터·LiteLLM 게이트웨이·멀티테넌트 모델 관리를 단독 설계·개발했습니다.",
    "입력은 다른 구성원이 수집·정규화한 CrowdStrike · SentinelOne · Cortex 등의 실제 XDR 데이터입니다. 별도 계층이 OCSF 정규화·Kafka 수집·OpenSearch 적재를 담당하며, 저는 이 데이터를 받아 Redis 큐 이후의 분석 파이프라인을 개발하고, 실제 XDR 데이터를 활용해 고객사 데모·시연을 진행했습니다.",
    '큐에서 꺼낸 인시던트는 역할별 에이전트 8종이 정해진 순서로 처리합니다. Triage 에이전트가 인시던트를 분류·우선순위 산정해 이후 실행을 게이팅하고, IOC · MITRE · Network 에이전트 병렬 실행 → 조건부 외부 위협 인텔(SecurityIntel) → Correlation 종합으로 이어집니다. 종합 결과는 kill-chain 그래프·위협 점수(0–100)·신뢰도로 구조화 출력(generateObject)하고, 컴플라이언스(ISMS-P · ISO 27001 · GDPR) 분석은 백그라운드로 분리했으며, 우선순위에 따라 실행 에이전트를 가지쳐 LLM 비용을 조절하도록 만들었습니다.',
    '흩어져 있던 provider별 LLM 호출은 LiteLLM(OpenAI 호환) 게이트웨이 단일 경로로 통합해 폴백·동시성·토큰 제어를 한 계층으로 모았고, LiteLLM Admin API 기반 테넌트별 모델 CRUD와 BYOK(가상 키 허용목록) 격리를 구현했습니다. 분석 결과는 SSE로 실시간 스트리밍하고, 리포트는 BullMQ · Redis 비동기 잡으로 생성하도록 구성했습니다.',
  ],
  highlights: [
    '멀티 에이전트 인시던트 분석 오케스트레이터 설계 — 역할별 에이전트 8종',
    'OCSF 수집 계층 연동 → Redis 큐 기반 자동 분석 파이프라인 개발',
    'Correlation 구조화 출력 — kill-chain 그래프 · 위협 점수 · 신뢰도',
    'LiteLLM 게이트웨이 통합 — 멀티 provider 호출 · 폴백 · 토큰 제어 단일화',
    '테넌트별 모델 관리 · BYOK 가상 키 격리',
  ],
  techNotes: [
    {
      title: '수집 데이터 연동 → 자동 분석 파이프라인',
      body: "별도 계층이 XDR 텔레메트리를 OCSF로 정규화하고 Kafka를 거쳐 OpenSearch에 적재합니다. 저는 해당 데이터를 받아 Redis 큐의 작업을 멀티 에이전트 분석으로 넘기는 파이프라인을 개발했습니다. 입력 규격과 분석 처리를 분리해 분석 워커를 독립적으로 증설할 수 있도록 구성했습니다.",
    },
    {
      title: '멀티 에이전트 분석 파이프라인 (역할별 에이전트 8종)',
      body: '파이프라인을 역할별 에이전트로 나눈 것은 LLM 호출을 꼭 필요한 곳에만 쓰기 위해서입니다. Triage가 인시던트를 분류·우선순위 산정해 이후 실행 범위를 게이팅하고, 1단계는 코드 기반 에이전트(IOC · MITRE · Network)를 병렬 실행(Promise.allSettled)해 LLM 비용 없이 분석 근거를 먼저 확보합니다. LLM을 쓰는 SecurityIntel은 판정이 서지 않을 때만 조건부로 실행하고(IOC 매칭·화이트리스트·낮은 우선순위면 건너뜀), Correlation 종합은 마지막에 한 번만 수행합니다. 결과를 generateObject(zod) 구조화 출력으로 만든 것도 후속 화면·리포트가 파싱 없이 바로 소비하게 하려는 선택입니다.',
    },
    {
      title: 'SSE 스트리밍 · 수동 재분석',
      body: '분석 파이프라인을 SSE로 노출해 진행률·부분결과·완료·오류 이벤트를 실시간 전달하고, 실행 단위로 에이전트 완료 수를 추적합니다. 특정 인시던트를 이전 분석 컨텍스트와 함께 다시 돌리는 수동 재분석 경로를 자동(큐) 경로와 공용으로 제공합니다.',
    },
    {
      title: 'LiteLLM 게이트웨이 통합',
      body: 'provider별 SDK 분기를 OpenAI 호환 클라이언트로 통합해 모든 호출이 LiteLLM을 경유하도록 했습니다. 폴백 모델·provider별 세마포어 동시성·429/5xx 지수 백오프(Retry-After 우선)·토큰 budget을 게이트웨이/미들웨어 계층으로 옮기고, provider 상태는 10초 TTL 캐시로 헬스 체크합니다. tool 멀티스텝을 위해 Chat Completions API를 사용합니다.',
    },
    {
      title: '멀티테넌트 AI 모델 · BYOK',
      body: 'LiteLLM Admin API로 테넌트별 모델 deployment를 생성·검증(virtual key + alias ping)·삭제(허용목록 동기화 실패 시 롤백)합니다. 테넌트 격리는 가상 키 + 팀 단위 허용목록으로 처리해 크로스테넌트 접근을 차단합니다. 번역은 별도 엔드포인트로 위임하고, 헬스 엔드포인트를 live/readiness로 분리했습니다.',
    },
    {
      title: '운영 관측',
      body: 'Grafana 대시보드를 구성해 AI 서버와 웹 플랫폼의 오류·트래픽을 한 화면에서 봅니다. 파이프라인이 무인으로 도는 구조라 “분석이 실패했는지”를 사람이 알아채는 경로가 따로 필요했고, 배포 이후 오류율·트래픽 변화를 지표로 확인해 장애·성능 저하를 잡습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'SIEM AI Analysis Server · Automated Incident Analysis',
  description:
    "A Fastify AI server for SIEM security incident analysis. I built the analysis pipeline on data from a separately developed ingestion and normalization layer, independently developing the orchestrator, LiteLLM gateway, and tenant model management.",
  mediaNote: 'Screens are withheld for this pre-release product.',
  presentationNote:
    'Slides from presentations introducing the SIEM solution to enterprise clients. Structured around the product overview, core capabilities, and business value, I delivered the presentations, demos, and Q&A myself — in Korean for domestic clients and in English for overseas clients. I designed an end-to-end demo scenario — threat detection → automated AI analysis → host isolation response → multilingual report generation — to show the product’s real operational flow.',
  overview: [
    "The AI server of a SIEM platform developed by a team of no more than ten people. I independently designed and developed the multi-agent orchestrator, LiteLLM gateway, and multi-tenant model management.",
    "Input consists of actual XDR data collected from CrowdStrike, SentinelOne, Cortex, and other vendors. Other team members developed OCSF normalization, Kafka ingestion, and OpenSearch indexing. I built the analysis pipeline consuming that data via Redis jobs and conducted client demonstrations using actual XDR data.",
    'Incidents pulled off the queue are processed by eight role-specific agents in a fixed order: a Triage agent classifies each incident and assigns a priority that gates execution, followed by IOC/MITRE/Network agents running in parallel, a conditional external threat-intel (SecurityIntel) agent, and a Correlation agent that synthesizes the results. I structured that synthesis as a kill-chain graph, threat score (0–100), and confidence via structured output (generateObject), moved compliance (ISMS-P, ISO 27001, GDPR) analysis to the background, and pruned agents by priority to control LLM cost.',
    'I consolidated scattered per-provider LLM calls onto a single LiteLLM (OpenAI-compatible) gateway path — fallback, concurrency, and token control in one layer — and implemented per-tenant model CRUD and BYOK (virtual-key allow-list) isolation via the LiteLLM Admin API. Analysis results stream in real time over SSE, and reports are generated via async BullMQ/Redis jobs.',
  ],
  highlights: [
    'Designed the multi-agent incident-analysis orchestrator — 8 role-specific agents',
    'Built the automated analysis pipeline downstream of the Redis queue, on the OCSF ingestion layer',
    'Correlation structured output — kill-chain graph, threat score, confidence',
    'LiteLLM gateway consolidation — unified multi-provider calls, fallback, token control',
    'Per-tenant model management and BYOK virtual-key isolation',
  ],
  techNotes: [
    {
      title: 'Collected data integration → automated analysis pipeline',
      body: "A separately developed layer normalizes XDR telemetry into OCSF, ingests it over Kafka, and indexes it in OpenSearch. I built the downstream pipeline that takes this data and sends Redis jobs through multi-agent analysis, separating analysis workers from ingestion.",
    },
    {
      title: 'Multi-agent analysis pipeline (8 role-specific agents)',
      body: 'The pipeline is split across role-specific agents to spend LLM calls only where they matter. Triage classifies each incident and assigns a priority that gates what runs next; stage 1 runs code-based agents (IOC, MITRE, Network) in parallel (Promise.allSettled) to gather grounding evidence at zero LLM cost. The LLM-backed SecurityIntel agent runs conditionally only when the verdict is still open (skipped on an IOC match, a trusted allow-list hit, or low priority), and Correlation synthesis runs once at the end. Structured output via generateObject (zod) is likewise a deliberate choice — downstream screens and reports consume results without parsing.',
    },
    {
      title: 'SSE streaming & manual re-analysis',
      body: 'The pipeline is exposed over SSE, delivering progress, partial results, complete, and error events in real time, tracking completed-agent counts per run. A manual re-analysis path re-runs a specific incident with prior analysis context, sharing the same code as the automatic (queue) path.',
    },
    {
      title: 'LiteLLM gateway consolidation',
      body: 'Per-provider SDK branches were consolidated behind an OpenAI-compatible client so every call goes through the LiteLLM gateway. Fallback models, per-provider semaphore concurrency, 429/5xx exponential backoff (Retry-After first), and token budgets moved into the gateway/middleware layer, and provider status is health-checked with a 10s TTL cache. Chat Completions API is used for multi-step tool calls.',
    },
    {
      title: 'Multi-tenant AI models & BYOK',
      body: 'Per-tenant model deployments are created, verified (virtual key + alias ping), and deleted (with rollback on allow-list sync failure) via the LiteLLM Admin API. Tenant isolation uses a virtual key + team-level allow-list to block cross-tenant access. Translation is delegated to a separate endpoint, and health endpoints are split into live/readiness.',
    },
    {
      title: 'Operational observability',
      body: 'I built Grafana dashboards that show errors and traffic across the AI server and the web platform on one screen. Because the pipeline runs unattended, there had to be a separate path for a human to notice "did an analysis fail?" — and comparing error-rate and traffic shifts after a deploy is how outages and performance regressions get caught.',
    },
  ],
}
