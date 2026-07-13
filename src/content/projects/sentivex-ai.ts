import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'SentiveX AI 서버',
  description:
    'SIEM 보안 인시던트를 자동 분석하는 Fastify AI 서버. 멀티 에이전트 분석 파이프라인과 모든 LLM 호출을 통합하는 LiteLLM 게이트웨이의 설계·개발을 주도했습니다.',
  mediaNote: '실제 운영 데이터가 포함되어 화면은 비공개합니다.',
  presentationNote:
    '고객사를 대상으로 SentiveX 솔루션을 소개한 발표 자료입니다. 제품 개요와 핵심 기능, 도입 효과를 중심으로 구성했고, 국내 고객에게는 한국어로 해외 고객에게는 영문으로 직접 발표와 데모·질의응답까지 진행했습니다. 위협 탐지 → AI 자동 분석 → 호스트 격리 대응 → 다국어 리포트 생성으로 이어지는 end-to-end 데모 시나리오를 직접 구성해 제품의 실제 운영 흐름을 보여줬습니다.',
  overview: [
    'SentiveX 플랫폼의 AI 축으로, 보안 인시던트를 실시간 자동 분석하는 Fastify 서버입니다. 저는 이 서버의 핵심인 멀티 에이전트 오케스트레이터와 LiteLLM 게이트웨이, 멀티테넌트 모델 관리의 설계·개발을 주도했습니다(레포 최다 커밋 기여).',
    '분석 파이프라인은 Triage + 3-스테이지 구조로 설계했습니다. Triage 에이전트가 인시던트를 분류·우선순위 산정해 이후 실행을 게이팅하고, IOC·MITRE·Network 에이전트 병렬 실행 → 조건부 외부 위협 인텔(SecurityIntel) → Correlation 종합으로 이어집니다. 종합 결과는 kill-chain 그래프·위협 점수(0–100)·신뢰도로 구조화 출력(generateObject)하고, 컴플라이언스(ISMS-P·ISO 27001·GDPR) 분석은 백그라운드로 분리했으며, 우선순위에 따라 실행 에이전트를 가지쳐 LLM 비용을 조절하도록 만들었습니다.',
    '흩어져 있던 provider별 LLM 호출은 LiteLLM(OpenAI 호환) 게이트웨이 단일 경로로 통합해 폴백·동시성·토큰 제어를 한 계층으로 모았고, LiteLLM Admin API 기반 테넌트별 모델 CRUD와 BYOK(가상 키 허용목록) 격리를 구현했습니다. 분석 결과는 SSE로 실시간 스트리밍하고, 리포트는 BullMQ·Redis 비동기 잡으로 생성하도록 구성했습니다.',
  ],
  highlights: [
    '멀티 에이전트 인시던트 분석 오케스트레이터(역할별 에이전트 8종) 설계 — Triage(분류·우선순위) + 3-스테이지(병렬 grounding → 조건부 LLM → 종합)·우선순위 기반 가지치기',
    'Correlation 구조화 출력 — kill-chain 그래프·위협 점수(0–100)·신뢰도 (generateObject·zod)',
    'SSE 실시간 진행률·부분결과 스트리밍 + 수동 재분석 API',
    'LiteLLM 게이트웨이 통합 — provider SDK 분기 제거, 폴백·provider 동시성·429/5xx 백오프·토큰 budget을 게이트웨이 계층으로 이전',
    'LiteLLM Admin API 기반 테넌트별 모델 CRUD·BYOK(가상 키 격리)·저장 직후 검증 + BullMQ 리포트',
  ],
  techNotes: [
    {
      title: '멀티 에이전트 분석 파이프라인 (Triage + 3-스테이지)',
      body: '파이프라인을 Triage + 3-스테이지로 나눈 것은 LLM 호출을 꼭 필요한 곳에만 쓰기 위해서입니다. Triage가 인시던트를 분류·우선순위 산정해 이후 실행 범위를 게이팅하고, 1단계는 코드 기반 에이전트(IOC·MITRE·Network)를 병렬 실행(Promise.allSettled)해 LLM 비용 없이 분석 근거를 먼저 확보합니다. LLM을 쓰는 SecurityIntel은 근거가 부족할 때만 조건부로 실행하고, Correlation 종합은 마지막에 한 번만 수행합니다. 결과를 generateObject(zod) 구조화 출력으로 만든 것도 후속 화면·리포트가 파싱 없이 바로 소비하게 하려는 선택입니다.',
    },
    {
      title: 'SSE 스트리밍 · 수동 재분석',
      body: '분석 파이프라인을 SSE로 노출해 progress·부분결과(analysis_chunk)·complete·error 이벤트를 실시간 전달하고, analysis_pipeline_runs로 에이전트 완료 수를 추적합니다. 특정 인시던트를 이전 분석 컨텍스트와 함께 다시 돌리는 수동 재분석 경로를 자동(큐) 경로와 공용으로 제공합니다.',
    },
    {
      title: 'LiteLLM 게이트웨이 통합',
      body: 'provider별 SDK 분기를 createOpenAI({ baseURL })로 통합해 모든 호출이 LiteLLM(OpenAI 호환)을 경유하도록 했습니다. 폴백 모델·provider별 세마포어 동시성·429/5xx 지수 백오프(Retry-After 우선)·토큰 budget을 게이트웨이/미들웨어 계층으로 옮기고, provider 상태는 10초 TTL 캐시로 헬스 체크합니다. tool 멀티스텝을 위해 Chat Completions API를 사용합니다.',
    },
    {
      title: '멀티테넌트 AI 모델 · BYOK',
      body: 'LiteLLM Admin API로 테넌트별 모델 deployment를 생성·검증(virtual key + alias ping)·삭제(허용목록 동기화 실패 시 롤백)합니다. 테넌트 격리는 virtual key + team_id 허용목록으로 처리해 크로스테넌트 접근을 차단합니다. 번역은 별도 엔드포인트로 위임하고, 헬스 엔드포인트를 live/readiness로 분리했습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'SentiveX AI Server',
  description:
    'A Fastify AI server that automatically analyzes SIEM security incidents. I led the design and development of the multi-agent analysis pipeline and the LiteLLM gateway that unifies all LLM calls.',
  mediaNote: 'Screens are withheld as they contain live operational data.',
  presentationNote:
    'Slides from presentations introducing the SentiveX solution to enterprise clients. Structured around the product overview, core capabilities, and business value, I delivered the presentations, demos, and Q&A myself — in Korean for domestic clients and in English for overseas clients. I designed an end-to-end demo scenario — threat detection → automated AI analysis → host isolation response → multilingual report generation — to show the product’s real operational flow.',
  overview: [
    'The AI backbone of the SentiveX platform — a Fastify server that analyzes security incidents in real time. I led the design and development of its core: the multi-agent orchestrator, the LiteLLM gateway, and multi-tenant model management (top committer on the repo).',
    'I designed the analysis pipeline as Triage + three stages: a Triage agent classifies each incident and assigns a priority that gates execution, followed by IOC/MITRE/Network agents running in parallel, a conditional external threat-intel (SecurityIntel) agent, and a Correlation agent that synthesizes the results. I structured that synthesis as a kill-chain graph, threat score (0–100), and confidence via structured output (generateObject), moved compliance (ISMS-P, ISO 27001, GDPR) analysis to the background, and pruned agents by priority to control LLM cost.',
    'I consolidated scattered per-provider LLM calls onto a single LiteLLM (OpenAI-compatible) gateway path — fallback, concurrency, and token control in one layer — and implemented per-tenant model CRUD and BYOK (virtual-key allow-list) isolation via the LiteLLM Admin API. Analysis results stream in real time over SSE, and reports are generated via async BullMQ/Redis jobs.',
  ],
  highlights: [
    'Designed the multi-agent incident-analysis orchestrator (8 role-specific agents) — Triage (classify/priority) + 3 stages (parallel grounding → conditional LLM → synthesis) with priority-based pruning',
    'Correlation structured output — kill-chain graph, threat score (0–100), confidence (generateObject/zod)',
    'Real-time SSE progress/partial-result streaming + manual re-analysis API',
    'LiteLLM gateway consolidation — removed per-provider SDK branches; fallback, provider concurrency, 429/5xx backoff, and token budgets moved into the gateway layer',
    'Per-tenant model CRUD via the LiteLLM Admin API, BYOK (virtual-key isolation), post-save verification, plus BullMQ reports',
  ],
  techNotes: [
    {
      title: 'Multi-agent analysis pipeline (Triage + 3 stages)',
      body: 'The pipeline is split into Triage + three stages to spend LLM calls only where they matter. Triage classifies each incident and assigns a priority that gates what runs next; stage 1 runs code-based agents (IOC, MITRE, Network) in parallel (Promise.allSettled) to gather grounding evidence at zero LLM cost. The LLM-backed SecurityIntel agent runs conditionally only when evidence is insufficient, and Correlation synthesis runs once at the end. Structured output via generateObject (zod) is likewise a deliberate choice — downstream screens and reports consume results without parsing.',
    },
    {
      title: 'SSE streaming & manual re-analysis',
      body: 'The pipeline is exposed over SSE, delivering progress, partial results (analysis_chunk), complete, and error events in real time, with analysis_pipeline_runs tracking completed-agent counts. A manual re-analysis path re-runs a specific incident with prior analysis context, sharing the same code as the automatic (queue) path.',
    },
    {
      title: 'LiteLLM gateway consolidation',
      body: 'Per-provider SDK branches were consolidated into createOpenAI({ baseURL }) so every call goes through the LiteLLM (OpenAI-compatible) gateway. Fallback models, per-provider semaphore concurrency, 429/5xx exponential backoff (Retry-After first), and token budgets moved into the gateway/middleware layer, and provider status is health-checked with a 10s TTL cache. Chat Completions API is used for multi-step tool calls.',
    },
    {
      title: 'Multi-tenant AI models & BYOK',
      body: 'Per-tenant model deployments are created, verified (virtual key + alias ping), and deleted (with rollback on allow-list sync failure) via the LiteLLM Admin API. Tenant isolation uses a virtual key + team_id allow-list to block cross-tenant access. Translation is delegated to a separate endpoint, and health endpoints are split into live/readiness.',
    },
  ],
}
