import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'blog-mcp · 블로그 발행 MCP 서버',
  description:
    '블로그 글을 자동으로 쓰고 발행하는 것을 목표로, MCP(Model Context Protocol) 서버를 직접 만들며 배우는 학습 프로젝트. stdio MCP 서버(도구·리소스·프롬프트)와 Astro 블로그로 구성했습니다.',
  overview: [
    '“매일 블로그 글을 자동 발행한다”를 목표로 잡되, 진짜 목적은 결과물이 아니라 MCP를 제대로 익히는 데 뒀습니다. 그래서 발행 파이프라인은 최대한 단순하게 두고 MCP 서버 설계에 집중했고, server(MCP 서버)·site(Astro 블로그)를 pnpm 워크스페이스로 묶은 모노레포로 만들었습니다.',
    '핵심 학습 포인트는 “MCP 서버는 스스로 글을 쓰지 않는다”는 원칙입니다. 서버는 LLM을 호출하지 않고 순수 함수로 도구·리소스·프롬프트만 노출하며, 실제 동작은 트리거(cron)·오케스트레이터(LLM 루프)·MCP 서버 세 조각의 협업으로 나눴습니다. 모델 호출은 오케스트레이터에서만 일어나고, 서버는 그냥 함수를 실행합니다 — 이 경계를 직접 그어 보는 것이 목표였습니다.',
    'Phase 1에서 MCP의 3대 primitive를 한 서버에 모두 구현했습니다. 발행된 글은 Astro SSG 블로그로 렌더되며, 목차·스크롤스파이, Shiki 듀얼테마 코드 하이라이팅, 클라이언트 검색(⌘K), 태그·섹션·관련 글, RSS·사이트맵·글별 JSON-LD, 주제 그래프·발행 히트맵 같은 고유 비주얼을 갖췄습니다. GitHub Actions로 main 푸시 시 GitHub Pages에 자동 배포됩니다.',
  ],
  highlights: [
    'MCP 3대 primitive 전부 직접 구현 — Tool·Resource·Prompt를 갖춘 stdio 서버',
    'LLM 미호출 순수 함수 원칙 — 트리거·오케스트레이터·MCP 서버 3조각으로 책임 분리',
    '결정론적 구조 검증으로 발행 게이트 — follows/related 실존 검증으로 링크 할루시네이션 차단',
    '섹션 레지스트리(topics.ts) 한 줄로 주제 축 확장 — 하드코딩 없는 단일 출처',
    'Astro SSG 블로그 — 검색(⌘K)·태그/섹션·관련 글·RSS·JSON-LD·Shiki 듀얼테마',
  ],
  techNotes: [
    {
      title: 'MCP 3대 primitive 직접 구현',
      body: '@modelcontextprotocol/sdk(stdio transport, zod 스키마)로 tool·resource·prompt를 한 서버에 모두 노출했습니다. Tool은 글을 프론트매터와 함께 발행하는 publish_post와 미발행 주제를 결정론적으로 제안하는 suggest_topic, Resource는 발행 글 목록·본문(blog://posts, blog://posts/{slug}), Prompt는 “오늘의 글쓰기” 워크플로 전체(주제 선정→집필→자기 검토→발행)를 재사용 가능하게 패키징한 write_daily_post입니다.',
    },
    {
      title: 'LLM 없는 서버 · 3조각 아키텍처',
      body: 'MCP 서버는 LLM을 호출하지 않고 순수 함수로 도구만 노출합니다. 실제 자동화는 매일 1회 도는 트리거(GitHub Actions cron), 글을 실제로 쓰는 오케스트레이터(Claude Agent SDK 기반 LLM 루프, Phase 3), 그리고 도구·리소스·프롬프트를 제공하는 MCP 서버로 분리했습니다. 모델 호출을 오케스트레이터 한 곳으로 몰아 서버를 무상태·무모델로 유지하는 경계 설계가 학습의 핵심이었습니다.',
    },
    {
      title: '할루시네이션 방지 · 품질 게이트',
      body: '서버가 LLM을 부르지 않으므로 사실 검증 주체가 없어, 품질을 두 겹으로 지킵니다. 구조적 검증(강제)은 publish_post가 결정론적으로 막습니다 — 섹션 정합성, 본문 최소 분량(minChars), ## 소제목 존재, 그리고 follows/related가 실존하지 않는 글을 가리키면 발행을 거부해 끊긴 간선·링크 할루시네이션을 차단합니다. 서술 접지(유도)는 write_daily_post 프롬프트가 잡습니다 — 미검증 수치·API를 단정하지 않기, 발행 전 편집자 관점의 자기 검토 1회.',
    },
    {
      title: 'Astro 블로그 & 자동 배포',
      body: 'publish_post가 쓴 마크다운을 Astro Content Collection(프론트매터 스키마)으로 렌더합니다. 목차+스크롤스파이, Shiki 라이트/다크 이중 테마 코드블록, remark-cjk-friendly로 한글 강조 처리, 클라이언트 검색(⌘K), 태그·섹션 페이지, 관련 글·이전/다음, RSS·사이트맵·JSON-LD를 갖췄고, giscus 댓글과 익명 피드백 폼을 붙였습니다. GitHub Actions가 main 푸시 시 pnpm 워크스페이스를 빌드해 GitHub Pages로 배포합니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'blog-mcp · Blog Publishing MCP Server',
  description:
    'A learning project building an MCP (Model Context Protocol) server from scratch, aimed at automatically writing and publishing blog posts. It comprises a stdio MCP server (tools, resources, prompts) and an Astro blog.',
  overview: [
    'The stated goal is "auto-publish a blog post every day," but the real point was to learn MCP properly rather than the output itself. So I kept the publishing pipeline as simple as possible and focused on MCP server design, building it as a pnpm-workspace monorepo — server (the MCP server) plus site (the Astro blog).',
    'The core lesson is the principle that "the MCP server never writes posts itself." The server makes no LLM calls and exposes only tools, resources, and prompts as pure functions; the actual behavior is split across three pieces — a trigger (cron), an orchestrator (the LLM loop), and the MCP server. Model calls happen only in the orchestrator while the server just runs functions — drawing that boundary by hand was the objective.',
    'In Phase 1 I implemented all three MCP primitives in one server. Published posts render through an Astro SSG blog with a table of contents + scrollspy, Shiki dual-theme code highlighting, client-side search (⌘K), tag/section pages, related posts, RSS, sitemap, per-post JSON-LD, and custom visuals like a topic graph and a publish heatmap. GitHub Actions deploys to GitHub Pages on push to main.',
  ],
  highlights: [
    'Implemented all three MCP primitives by hand — a stdio server with Tools, Resources, and Prompts',
    'No-LLM pure-function principle — responsibilities split across trigger, orchestrator, and MCP server',
    'Deterministic structural validation as a publish gate — blocks link hallucination via follows/related existence checks',
    'Extensible topic axis from a one-line section registry (topics.ts) — a single source of truth, no hardcoding',
    'Astro SSG blog — search (⌘K), tags/sections, related posts, RSS, JSON-LD, Shiki dual theme',
  ],
  techNotes: [
    {
      title: 'All three MCP primitives, hand-built',
      body: 'Using @modelcontextprotocol/sdk (stdio transport, zod schemas), I exposed tools, resources, and prompts from a single server. Tools are publish_post (publishes a post with generated front matter) and suggest_topic (deterministically proposes an unwritten topic); resources are the published-post list and body (blog://posts, blog://posts/{slug}); and the prompt is write_daily_post, which packages the entire "write today\'s post" workflow (pick topic → write → self-review → publish) into a reusable prompt.',
    },
    {
      title: 'A server with no LLM · three-piece architecture',
      body: 'The MCP server makes no LLM calls — it exposes tools as pure functions. The actual automation is split into a trigger that runs once daily (GitHub Actions cron), an orchestrator that actually writes posts (an LLM loop on the Claude Agent SDK, Phase 3), and the MCP server that provides the tools, resources, and prompts. Concentrating all model calls in the orchestrator so the server stays stateless and model-free was the key boundary to learn.',
    },
    {
      title: 'Hallucination guards · quality gate',
      body: 'Since the server never calls an LLM, there is no fact-checker, so quality is protected in two layers. Structural validation (enforced) is a deterministic gate in publish_post — section consistency, a minimum body length (minChars), the presence of ## subheadings, and rejecting a publish whenever follows/related point to a post that does not exist, which blocks dangling edges and link hallucination. Narrative grounding (guided) comes from the write_daily_post prompt — do not assert unverified numbers or APIs, and run one editor-perspective self-critique before publishing.',
    },
    {
      title: 'Astro blog & auto-deploy',
      body: 'Markdown written by publish_post renders through an Astro Content Collection (front-matter schema). It has a table of contents + scrollspy, Shiki light/dark dual-theme code blocks, Korean emphasis handling via remark-cjk-friendly, client-side search (⌘K), tag/section pages, related and prev/next posts, RSS, sitemap, and JSON-LD, plus giscus comments and an anonymous feedback form. GitHub Actions builds the pnpm workspace and deploys to GitHub Pages on push to main.',
    },
  ],
}
