import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'SentiveX AI 서버',
  description:
    'SIEM 보안 인시던트를 자동 분석하는 Fastify AI 서버. 멀티 에이전트 분석 파이프라인과 모든 LLM 호출을 통합하는 LiteLLM 게이트웨이를 최다 기여자로 주도 개발했습니다.',
  mediaNote: '실제 운영 데이터가 포함되어 화면은 비공개합니다.',
  presentationNote:
    '고객사를 대상으로 SentiveX 솔루션을 소개한 발표 자료입니다. 제품 개요와 핵심 기능, 도입 효과를 중심으로 구성했고, 국내 고객에게는 한국어로 해외 고객에게는 영문으로 직접 발표와 데모·질의응답까지 진행했습니다. 위협 탐지 → AI 자동 분석 → 호스트 격리 대응 → 다국어 리포트 생성으로 이어지는 end-to-end 데모 시나리오를 직접 구성해 제품의 실제 운영 흐름을 보여줬습니다.',
  overview: [
    'SentiveX 플랫폼의 AI 축으로, 보안 인시던트를 실시간 자동 분석하는 상태 비저장 Fastify 서버입니다. 여러 EDR 벤더의 인시던트를 공통 타입(OCSF lite)으로 정규화하고, 역할별 보안 에이전트를 오케스트레이터로 실행해 위협을 다각도로 분석한 뒤 결과를 SSE로 스트리밍합니다. 이 서버의 최다 기여자로 오케스트레이터·LiteLLM 게이트웨이·멀티테넌트 모델 관리·배포 전반을 맡았습니다.',
    '먼저 Triage 에이전트가 인시던트를 분류하고 우선순위를 산정해 이후 파이프라인 실행을 게이팅합니다. 분석은 3-스테이지로 구성됩니다. 1단계는 IOC·MITRE·Network 에이전트를 병렬 실행하고, 2단계는 조건을 만족할 때만 외부 위협 인텔(SecurityIntel) 에이전트를, 3단계는 Correlation 에이전트가 결과를 종합해 kill-chain 그래프·위협 점수(0–100)·신뢰도를 구조화 출력(generateObject)으로 만들고 컴플라이언스(ISMS-P·ISO 27001·GDPR) 분석을 백그라운드로 처리합니다. 우선순위에 따라 실행 에이전트를 가지쳐 비용을 조절합니다.',
    '모든 LLM 호출은 LiteLLM(OpenAI 호환) 게이트웨이 단일 경로로 통합해 provider 무관 폴백·동시성·토큰 제어를 한 계층에서 처리하고, LiteLLM Admin API로 테넌트별 모델 CRUD와 BYOK(가상 키 허용목록) 격리를 구현했습니다. 리포트는 BullMQ·Redis 비동기 잡으로 BlockNote JSON을 생성하고, Kubernetes(EKS)에 API·워커·리포트워커 3개 서비스로 배포합니다.',
  ],
  highlights: [
    '멀티 에이전트 인시던트 분석 오케스트레이터 설계 — Triage(분류·우선순위) + 3-스테이지(병렬 grounding → 조건부 LLM → 종합)·우선순위 기반 가지치기',
    'Correlation 구조화 출력 — kill-chain 그래프·위협 점수(0–100)·신뢰도 (generateObject·zod)',
    'SSE 실시간 진행률·부분결과 스트리밍 + 수동 재분석 API',
    '여러 보안 벤더의 EDR/XDR 데이터를 OCSF lite 공통 타입으로 정규화',
    'LiteLLM 게이트웨이 통합 — provider SDK 분기 제거, 폴백·provider 동시성·429/5xx 백오프·토큰 budget을 게이트웨이 계층으로 이전',
    'LiteLLM Admin API 기반 테넌트별 모델 CRUD·BYOK(가상 키 격리)·저장 직후 검증 + BullMQ 리포트·Kubernetes 3서비스 배포',
  ],
  techNotes: [
    {
      title: '멀티 에이전트 분석 파이프라인 (Triage + 3-스테이지)',
      body: '먼저 Triage 에이전트가 인시던트를 분류·우선순위 산정해 파이프라인을 게이팅합니다. 이후 IOC·MITRE·Network 에이전트를 병렬 실행(Promise.allSettled)하고, 조건에 따라 SecurityIntel(LLM)을 선택 실행합니다. Correlation 에이전트가 결과를 종합해 kill-chain 그래프·위협 점수·신뢰도를 generateObject(zod)로 구조화 출력하고, 컴플라이언스(ISMS-P·ISO 27001·GDPR)는 백그라운드로 돌립니다. 우선순위에 따라 실행 에이전트를 가지쳐 비용을 조절합니다.',
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
      body: 'LiteLLM Admin API로 테넌트별 모델 deployment를 생성·검증(virtual key + alias ping)·삭제(허용목록 동기화 실패 시 롤백)합니다. 테넌트 격리는 virtual key + team_id 허용목록으로 처리해 크로스테넌트 접근을 차단합니다. 번역은 별도 엔드포인트로 위임하고, k8s(EKS)에 API·BullMQ 워커·리포트 워커 3개 서비스로 배포하며 헬스를 live/readiness로 분리했습니다.',
    },
  ],
  related: [{ slug: 'sentivex-web', role: '같은 플랫폼의 웹·풀스택 (대시보드·리포트 에디터)' }],
}

export const en: ProjectText = {
  title: 'SentiveX AI Server',
  description:
    'A Fastify AI server that automatically analyzes SIEM security incidents. As the top contributor, I led the multi-agent analysis pipeline and the LiteLLM gateway that unifies all LLM calls.',
  mediaNote: 'Screens are withheld as they contain live operational data.',
  presentationNote:
    'Slides from presentations introducing the SentiveX solution to enterprise clients. Structured around the product overview, core capabilities, and business value, I delivered the presentations, demos, and Q&A myself — in Korean for domestic clients and in English for overseas clients. I designed an end-to-end demo scenario — threat detection → automated AI analysis → host isolation response → multilingual report generation — to show the product’s real operational flow.',
  overview: [
    'The AI backbone of the SentiveX platform — a stateless Fastify server that analyzes security incidents in real time. It normalizes incidents from multiple EDR vendors into a common type (OCSF lite), runs role-specific security agents via an orchestrator to analyze threats from multiple angles, and streams results over SSE. As the top contributor I owned the orchestrator, the LiteLLM gateway, multi-tenant model management, and deployment.',
    'A Triage agent first classifies the incident and assigns a priority that gates the pipeline. Analysis then runs in three stages. Stage 1 runs IOC, MITRE, and Network agents in parallel; Stage 2 runs an external threat-intel (SecurityIntel) agent only when conditions are met; Stage 3 has the Correlation agent synthesize results into a kill-chain graph, threat score (0–100), and confidence as structured output (generateObject), with compliance (ISMS-P, ISO 27001, GDPR) analysis in the background. Agents are pruned by priority to control cost.',
    'Every LLM call is consolidated onto a single LiteLLM (OpenAI-compatible) gateway path that handles provider-agnostic fallback, concurrency, and token control in one layer, and per-tenant model CRUD plus BYOK (virtual-key allow-list) isolation is implemented via the LiteLLM Admin API. Reports are generated as BlockNote JSON via async BullMQ/Redis jobs, and the service is deployed on Kubernetes (EKS) as three services — API, workers, and report worker.',
  ],
  highlights: [
    'Designed the multi-agent incident-analysis orchestrator — Triage (classify/priority) + 3 stages (parallel grounding → conditional LLM → synthesis) with priority-based pruning',
    'Correlation structured output — kill-chain graph, threat score (0–100), confidence (generateObject/zod)',
    'Real-time SSE progress/partial-result streaming + manual re-analysis API',
    'Normalized EDR/XDR data from multiple security vendors into a common OCSF-lite type',
    'LiteLLM gateway consolidation — removed per-provider SDK branches; fallback, provider concurrency, 429/5xx backoff, and token budgets moved into the gateway layer',
    'Per-tenant model CRUD via the LiteLLM Admin API, BYOK (virtual-key isolation), post-save verification, plus BullMQ reports and a 3-service Kubernetes deployment',
  ],
  techNotes: [
    {
      title: 'Multi-agent analysis pipeline (Triage + 3 stages)',
      body: 'A Triage agent first classifies the incident and assigns priority, gating the pipeline. IOC, MITRE, and Network agents then run in parallel (Promise.allSettled), and SecurityIntel (LLM) runs conditionally. The Correlation agent synthesizes results into a kill-chain graph, threat score, and confidence as structured output (generateObject/zod), while compliance (ISMS-P, ISO 27001, GDPR) runs in the background. Agents are pruned by priority to control cost.',
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
      body: 'Per-tenant model deployments are created, verified (virtual key + alias ping), and deleted (with rollback on allow-list sync failure) via the LiteLLM Admin API. Tenant isolation uses a virtual key + team_id allow-list to block cross-tenant access. Translation is delegated to a separate endpoint, and the service ships on k8s (EKS) as three services — API, BullMQ workers, and report worker — with health split into live/readiness.',
    },
  ],
  related: [{ slug: 'sentivex-web', role: 'Web / full-stack of the same platform (dashboard, report editor)' }],
}
