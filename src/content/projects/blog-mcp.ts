import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'blog-mcp · 블로그 발행 MCP 서버',
  description:
    '블로그 글을 자동으로 쓰고 발행하는 것을 목표로, MCP(Model Context Protocol) 서버를 직접 만들며 배우는 학습 프로젝트. stdio MCP 서버(도구·리소스·프롬프트)와 Astro 블로그로 구성했고, 현재는 cron 오케스트레이터가 매일 무인으로 글을 발행합니다.',
  overview: [
    '“매일 블로그 글을 자동 발행한다”를 목표로 잡되, 진짜 목적은 결과물이 아니라 MCP를 제대로 익히는 데 뒀습니다. 그래서 발행 파이프라인은 최대한 단순하게 두고 MCP 서버 설계에 집중했고, server(MCP 서버)·site(Astro 블로그)를 pnpm 워크스페이스로 묶은 모노레포로 만들었습니다.',
    '핵심 학습 포인트는 “MCP 서버는 스스로 글을 쓰지 않는다”는 원칙입니다. 서버는 LLM을 호출하지 않고 순수 함수로 도구·리소스·프롬프트만 노출하며, 실제 동작은 트리거(cron)·오케스트레이터(LLM 루프)·MCP 서버 세 조각의 협업으로 나눴습니다. 모델 호출은 오케스트레이터에서만 일어나고, 서버는 그냥 함수를 실행합니다 — 이 경계를 직접 그어 보는 것이 목표였습니다.',
    'Phase 1에서 MCP의 3대 primitive를 한 서버에 모두 구현했고, Phase 3에서 무인 발행 파이프라인을 가동했습니다 — 매일 KST 14시 cron이 오케스트레이터를 돌려 글을 쓰고, 발행 관문(hook)이 통과시킨 글만 자동 배포됩니다. 리서치가 필요한 보안 이슈·생태계 동향 글은 웹 검색 도구로 근거를 수집하는 Mode R로 발행합니다. 발행된 글은 Astro SSG 블로그로 렌더되며, 목차·스크롤스파이, Shiki 듀얼테마 코드 하이라이팅, 클라이언트 검색(⌘K), 태그·섹션·관련 글, RSS·사이트맵·글별 JSON-LD, 주제 그래프·발행 히트맵 같은 고유 비주얼을 갖췄습니다. GitHub Actions로 main 푸시 시 GitHub Pages에 자동 배포됩니다.',
  ],
  highlights: [
    'MCP 3대 primitive 전부 직접 구현 — Tool·Resource·Prompt를 갖춘 stdio 서버',
    'LLM 미호출 순수 함수 원칙 — 트리거·오케스트레이터·MCP 서버 3조각으로 책임 분리',
    '무인 발행 파이프라인 가동 — cron + claude -p 오케스트레이터 + PreToolUse 발행 관문',
    '결정론적 구조 검증으로 발행 게이트 — follows/related 실존 검증으로 링크 할루시네이션 차단',
    'Mode R 리서치 발행 — search_web·read_url 도구로 근거 수집, 출처 메타를 글과 함께 렌더',
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
      body: 'MCP 서버는 LLM을 호출하지 않고 순수 함수로 도구만 노출합니다. 실제 자동화는 매일 1회 도는 트리거(GitHub Actions cron), 글을 실제로 쓰는 오케스트레이터(claude -p 헤드리스 루프), 그리고 도구·리소스·프롬프트를 제공하는 MCP 서버로 분리했습니다. 모델 호출을 오케스트레이터 한 곳으로 몰아 서버를 무상태·무모델로 유지하는 경계 설계가 학습의 핵심이었습니다.',
    },
    {
      title: '무인 발행 파이프라인 (Phase 3)',
      body: '매일 KST 14시 GitHub Actions cron이 claude -p 래퍼(daily-post.sh)를 실행합니다. 래퍼는 모델의 자기 보고를 믿지 않고 파일시스템 변화로 성공을 판정하며, 실패 시 3회 재시도하고 섹션 로테이션으로 주제를 순환합니다. 발행 직전에는 PreToolUse hook이 publish_post 호출을 결정론적으로 검문해(섹션 정합·slug 형식·태그 수) 위반 시 exit 2와 사유를 돌려줘 모델이 스스로 고치게 만듭니다. GITHUB_TOKEN 푸시는 다른 워크플로를 깨우지 못한다는 함정은 배포 워크플로를 workflow_call로 직접 호출해 풀었고, 매 실행의 관측치를 학습 기록 문서에 누적해 다음 개선의 입력으로 씁니다.',
    },
    {
      title: 'Mode R · 리서치 발행',
      body: '개념 정리만으로는 쓸 수 없는 보안 이슈·생태계 동향 글을 위한 리서치 모드입니다. 서버에 search_web·read_url 도구를 추가하되 Tavily 백엔드를 어댑터 뒤에 두어 교체 가능하게 했고, read_url은 절단 상한(maxChars)과 잘림 안내로 컨텍스트 낭비를 막습니다. write_research_post 프롬프트가 근거 수집→집필을 이끌고, 참고한 출처는 sources 메타로 글과 함께 발행돼 본문 하단에 참고 자료로 렌더됩니다. 로테이션에서 보안·동향 차례가 오면 오케스트레이터가 자동으로 이 모드로 분기합니다.',
    },
    {
      title: '할루시네이션 방지 · 품질 게이트',
      body: '서버가 LLM을 부르지 않으므로 사실 검증 주체가 없어, 품질을 두 겹으로 지킵니다. 구조적 검증(강제)은 publish_post가 결정론적으로 막습니다 — 섹션 정합성, 본문 최소 분량(minChars), ## 소제목 존재, 그리고 follows/related가 실존하지 않는 글을 가리키면 발행을 거부해 끊긴 간선·링크 할루시네이션을 차단합니다. 서술 접지(유도)는 write_daily_post 프롬프트가 잡습니다 — 미검증 수치·API를 단정하지 않기, 발행 전 편집자 관점의 자기 검토 1회.',
    },
    {
      title: 'Astro 블로그 & 자동 배포',
      body: 'publish_post가 쓴 마크다운을 Astro Content Collection(프론트매터 스키마)으로 렌더합니다. 목차+스크롤스파이, Shiki 라이트/다크 이중 테마 코드블록, remark-cjk-friendly로 한글 강조 처리, 클라이언트 검색(⌘K), 태그·섹션 페이지, 관련 글·이전/다음, RSS·사이트맵·JSON-LD를 갖췄고, giscus 댓글과 익명 피드백 폼을 붙였습니다. 정적 사이트지만 조회수는 브라우저가 Supabase RPC를 직접 호출해 집계하고(세션 중복 방지), cron이 일일 스냅샷을 쌓아 히어로의 라이브 총 조회 스탯으로 보여줍니다. GitHub Actions가 main 푸시 시 pnpm 워크스페이스를 빌드해 GitHub Pages로 배포합니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'blog-mcp · Blog Publishing MCP Server',
  description:
    'A learning project building an MCP (Model Context Protocol) server from scratch, aimed at automatically writing and publishing blog posts. It comprises a stdio MCP server (tools, resources, prompts) and an Astro blog, and a cron orchestrator now publishes a post unattended every day.',
  overview: [
    'The stated goal is "auto-publish a blog post every day," but the real point was to learn MCP properly rather than the output itself. So I kept the publishing pipeline as simple as possible and focused on MCP server design, building it as a pnpm-workspace monorepo — server (the MCP server) plus site (the Astro blog).',
    'The core lesson is the principle that "the MCP server never writes posts itself." The server makes no LLM calls and exposes only tools, resources, and prompts as pure functions; the actual behavior is split across three pieces — a trigger (cron), an orchestrator (the LLM loop), and the MCP server. Model calls happen only in the orchestrator while the server just runs functions — drawing that boundary by hand was the objective.',
    'In Phase 1 I implemented all three MCP primitives in one server, and in Phase 3 the unattended publishing pipeline went live — a daily cron (14:00 KST) drives the orchestrator to write a post, and only posts that pass the publish gate (hook) get deployed. Posts that need research — security incidents, ecosystem news — are published through Mode R, which gathers evidence with web-search tools. Published posts render through an Astro SSG blog with a table of contents + scrollspy, Shiki dual-theme code highlighting, client-side search (⌘K), tag/section pages, related posts, RSS, sitemap, per-post JSON-LD, and custom visuals like a topic graph and a publish heatmap. GitHub Actions deploys to GitHub Pages on push to main.',
  ],
  highlights: [
    'Implemented all three MCP primitives by hand — a stdio server with Tools, Resources, and Prompts',
    'No-LLM pure-function principle — responsibilities split across trigger, orchestrator, and MCP server',
    'Unattended publishing pipeline in production — cron + claude -p orchestrator + PreToolUse publish gate',
    'Deterministic structural validation as a publish gate — blocks link hallucination via follows/related existence checks',
    'Mode R research publishing — evidence gathered via search_web/read_url tools, sources rendered with the post',
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
      body: 'The MCP server makes no LLM calls — it exposes tools as pure functions. The actual automation is split into a trigger that runs once daily (GitHub Actions cron), an orchestrator that actually writes posts (a headless claude -p loop), and the MCP server that provides the tools, resources, and prompts. Concentrating all model calls in the orchestrator so the server stays stateless and model-free was the key boundary to learn.',
    },
    {
      title: 'Unattended publishing pipeline (Phase 3)',
      body: 'A GitHub Actions cron runs the claude -p wrapper (daily-post.sh) every day at 14:00 KST. The wrapper does not trust the model\'s self-report — it judges success by filesystem changes, retries up to three times on failure, and rotates topics through a section rotation. Right before publishing, a PreToolUse hook deterministically inspects the publish_post call (section consistency, slug format, tag count) and returns exit 2 with a reason on violation, making the model correct itself. The gotcha that GITHUB_TOKEN pushes cannot trigger other workflows was solved by invoking the deploy workflow directly via workflow_call, and observations from every run accumulate in a learnings document that feeds the next round of improvements.',
    },
    {
      title: 'Mode R · research publishing',
      body: 'A research mode for posts that cannot be written from concepts alone — security incidents and ecosystem news. The server gains search_web and read_url tools with the Tavily backend hidden behind an adapter for swappability, and read_url caps output (maxChars) with truncation notices to avoid wasting context. The write_research_post prompt drives evidence gathering → writing, and consulted sources are published as sources metadata rendered as a references section under the post. When the rotation lands on a security/news slot, the orchestrator branches into this mode automatically.',
    },
    {
      title: 'Hallucination guards · quality gate',
      body: 'Since the server never calls an LLM, there is no fact-checker, so quality is protected in two layers. Structural validation (enforced) is a deterministic gate in publish_post — section consistency, a minimum body length (minChars), the presence of ## subheadings, and rejecting a publish whenever follows/related point to a post that does not exist, which blocks dangling edges and link hallucination. Narrative grounding (guided) comes from the write_daily_post prompt — do not assert unverified numbers or APIs, and run one editor-perspective self-critique before publishing.',
    },
    {
      title: 'Astro blog & auto-deploy',
      body: 'Markdown written by publish_post renders through an Astro Content Collection (front-matter schema). It has a table of contents + scrollspy, Shiki light/dark dual-theme code blocks, Korean emphasis handling via remark-cjk-friendly, client-side search (⌘K), tag/section pages, related and prev/next posts, RSS, sitemap, and JSON-LD, plus giscus comments and an anonymous feedback form. Though statically hosted, view counts are tallied by the browser calling a Supabase RPC directly (with per-session dedup), and a cron accumulates daily snapshots that power the live total-views stat in the hero. GitHub Actions builds the pnpm workspace and deploys to GitHub Pages on push to main.',
    },
  ],
}
