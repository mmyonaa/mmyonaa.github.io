import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "1인",
  "status": "운영 중 (무인 발행)",
  "title": "blog-mcp · 블로그 발행 MCP 서버",
  "description": "MCP를 학습하기 위해 만든 블로그 자동 발행 서버입니다. 글 생성부터 검증·배포까지 자동화해 100편 이상을 발행했습니다.",
  "overview": [
    "모델 호출은 오케스트레이터가, 글 조회·발행은 MCP 서버가 맡도록 구현했습니다. cron이 주제 선정·집필·검토를 실행하고, 규칙 검증을 통과한 글을 Astro 블로그로 배포합니다."
  ],
  "highlights": [
    "Tool·Resource·Prompt를 제공하는 stdio MCP 서버 직접 구현",
    "발행 규칙·내부 링크 검사와 재시도·중복 발행 방지",
    "조회수 기반 주제 선정 · 옛 글 주소 109건 리디렉션"
  ],
  "techNotes": [
    {
      "title": "모델 호출과 도구 실행 분리",
      "body": "MCP 서버는 모델을 호출하지 않고 글 발행·주제 제안 도구, 글 목록·본문 리소스, 글쓰기 프롬프트를 제공합니다. 오케스트레이터가 모델 호출과 도구 실행 순서를 관리하도록 분리했습니다. 서버와 Astro 사이트는 pnpm 워크스페이스로 관리합니다."
    },
    {
      "title": "발행 실패 감지와 재시도",
      "body": "GitHub Actions cron으로 매일 오케스트레이터를 실행합니다. 파일 변경으로 발행 성공을 판정하고 실패 시 최대 3회 재시도하며, 같은 날 중복 발행을 막습니다. PreToolUse hook은 섹션·slug·태그 규칙 위반 시 발행을 거부하고 사유를 반환합니다. 배포는 workflow_call로 직접 실행하도록 연결했습니다."
    },
    {
      "title": "문서 구조와 링크 검증",
      "body": "본문 최소 길이·소제목·섹션을 검사하고, 관련 글과 본문 내부 링크의 대상이 실제로 존재하는지 확인합니다. 잘못된 주소는 발행 전에 차단합니다. 이는 구조 검증이며 내용의 사실성을 보장하지는 않습니다. 프롬프트에는 미확인 수치를 단정하지 않고 발행 전 내용을 검토하도록 지시했습니다."
    },
    {
      "title": "웹 검색과 출처 기록",
      "body": "보안 이슈와 기술 동향 글에는 Tavily 기반 검색·URL 읽기 도구를 사용합니다. 읽기 길이 상한을 두고 잘린 응답을 표시하며, 참고 출처를 글의 메타데이터에 저장해 본문 하단에 표시합니다. 검색 백엔드는 어댑터로 분리했습니다."
    },
    {
      "title": "조회수를 주제 선정에 반영",
      "body": "먼저 덜 다룬 분야를 선택하고, 동률이면 Supabase 조회수를 경과일로 나눈 값으로 순서를 정합니다. 표본 수와 밀도 조건을 만족할 때만 조회수를 반영하며, 키가 없거나 네트워크 요청이 실패하면 기존 선정 방식으로 동작합니다."
    },
    {
      "title": "블로그 배포와 주소 변경 대응",
      "body": "Astro 정적 사이트에 검색·태그·관련 글·RSS·사이트맵·구조화 데이터를 구성하고, GitHub Actions로 배포합니다. 조회수는 Supabase RPC로 집계합니다. 경로 변경 시 기존 글 109개의 리디렉션 페이지를 자동 생성하고 meta refresh·canonical·noindex를 적용했습니다."
    }
  ]
}

export const en: ProjectText = {
  team: 'Solo',
  status: 'Live (unattended publishing)',
  title: 'blog-mcp · Blog Publishing MCP Server',
  description:
    'A learning project building an MCP (Model Context Protocol) server from scratch, aimed at automatically writing and publishing blog posts. It comprises a stdio MCP server (tools, resources, prompts) and an Astro blog, and a cron orchestrator now rotates through six sections to publish a post unattended every day (100+ posts so far).',
  overview: [
    'The stated goal is "auto-publish a blog post every day," but the real point was to learn MCP properly rather than the output itself. So I kept the publishing pipeline as simple as possible and focused on MCP server design, building it as a pnpm-workspace monorepo — server (the MCP server) plus site (the Astro blog).',
    'The core lesson is the principle that "the MCP server never writes posts itself." The server makes no LLM calls and exposes only tools, resources, and prompts as pure functions; the actual behavior is split across three pieces — a trigger (cron), an orchestrator (the LLM loop), and the MCP server. Model calls happen only in the orchestrator while the server just runs functions — drawing that boundary by hand was the objective.',
    'In Phase 1 I implemented all three MCP primitives in one server, and in Phase 3 the unattended publishing pipeline went live — a daily cron (14:23 KST) drives the orchestrator to write a post in the order set by a five-slot section rotation, and only posts that pass the publish gate (hook) get deployed. The topic axis spans six sections — Building MCP & agents, Building blogs & web, Engineer Information Processing, Information Security Engineer, Algorithms, and Security — and posts that need research (security incidents, MCP ecosystem news) are published through Mode R, which gathers evidence with web-search tools. An LLM agent writes the posts while the server only exposes tools, and a gate inspects each publish deterministically just before it lands — over 100 posts have shipped without a human in the loop. Published posts render through an Astro SSG blog with a table of contents + scrollspy, Shiki dual-theme code highlighting, client-side search (⌘K), tag/section pages, related posts, RSS, sitemap, per-post JSON-LD, and custom visuals like a topic graph and a publish heatmap. GitHub Actions deploys to GitHub Pages on push to main.',
  ],
  highlights: [
    'Implemented all three MCP primitives by hand — a stdio server with Tools, Resources, Prompts',
    'No-LLM pure-function principle — trigger, orchestrator, and MCP server as three separate pieces',
    'Unattended publishing pipeline in production — 100+ posts published automatically',
    'Deterministic structural validation as a publish gate, blocking link hallucination',
    'Closed the content loop — view counts weight topic selection',
    'Migrated 109 already-indexed URLs broken by a repo rename — redirect pages generated automatically',
  ],
  techNotes: [
    {
      title: 'All three MCP primitives, hand-built',
      body: 'Using @modelcontextprotocol/sdk (stdio transport, zod schemas), I exposed tools, resources, and prompts from a single server. Tools are publish_post (publishes a post with generated front matter) and suggest_topic (deterministically proposes an unwritten topic); resources are the published-post list and body (blog://posts, blog://posts/{slug}); and the prompt is write_daily_post, which packages the entire "write today\'s post" workflow (pick topic → write → self-review → publish) into a reusable prompt.',
    },
    {
      title: 'A server with no LLM · three-piece architecture',
      body: 'The MCP server makes no LLM calls — it exposes tools as pure functions. The actual automation is split into a trigger that runs once daily (GitHub Actions cron), an orchestrator that actually writes posts (a wrapper script plus the publish-gate hook), and the MCP server that provides the tools, resources, and prompts. Concentrating all model calls in the orchestrator so the server stays stateless and model-free was the key boundary to learn.',
    },
    {
      title: 'Unattended publishing pipeline (Phase 3)',
      body: 'A GitHub Actions cron runs the orchestrator wrapper (daily-post.sh) every day at 14:23 KST. The wrapper does not trust the model\'s self-report — it judges success by filesystem changes, retries up to three times on failure, and rotates topics through a five-slot section rotation (mcp → jeongcheogi → security → mcp-trend → boangisa). A duplicate-publish guard in the workflow keeps it from running twice in one day. Right before publishing, a PreToolUse hook deterministically inspects the publish_post call (section consistency, slug format, tag count) and returns exit 2 with a reason on violation, making the model correct itself. The gotcha that GITHUB_TOKEN pushes cannot trigger other workflows was solved by invoking the deploy workflow directly via workflow_call, and observations from every run accumulate in a learnings document that feeds the next round of improvements.',
    },
    {
      title: 'Mode R · research publishing',
      body: 'A research mode for posts that cannot be written from concepts alone — security incidents and ecosystem news. The server gains search_web and read_url tools with the Tavily backend hidden behind an adapter for swappability, and read_url caps output (maxChars) with truncation notices to avoid wasting context. The write_research_post prompt drives evidence gathering → writing, and consulted sources are published as sources metadata rendered as a references section under the post. When the rotation lands on a security/news slot, the orchestrator branches into this mode automatically.',
    },
    {
      title: 'Hallucination guards · quality gate',
      body: 'Since the server never calls an LLM, there is no fact-checker, so quality is protected in two layers. Structural validation (enforced) is a deterministic gate in publish_post — section consistency, a minimum body length (minChars), the presence of ## subheadings, and — for follows/related as well as links inside the body — checking both that the target exists and that the address is well formed (/blog/<slug>/), rejecting the publish when a post is missing or a date prefix is dropped. That blocks dangling edges, link hallucination, and live 404s before they ship. Narrative grounding (guided) comes from the write_daily_post prompt — do not assert unverified numbers or APIs, and run one editor-perspective self-critique before publishing.',
    },
    {
      title: 'Performance-signal feedback — closing the content loop',
      body: 'I made publishing results feed back into the next topic choice. suggest_topic reads Supabase view counts and weights ordering by each area\'s average "views ÷ days since publication." The primary key stays diversification — areas covered less come first — and performance only breaks ties, so exploration is never starved. To keep a handful of clicks from flipping the order while the sample is small, there are two cold-start gates (absolute and density), and if the key is unset or the network fails it degrades quietly to the previous behavior. Even here the server calls no LLM — only deterministic arithmetic.',
    },
    {
      title: 'Astro blog & auto-deploy',
      body: 'Markdown written by publish_post renders through an Astro Content Collection (front-matter schema). It has a table of contents + scrollspy, Shiki light/dark dual-theme code blocks, Korean emphasis handling via remark-cjk-friendly, client-side search (⌘K), tag/section pages, related and prev/next posts, RSS, sitemap, and JSON-LD, plus giscus comments and an anonymous feedback form. Though statically hosted, view counts are tallied by the browser calling a Supabase RPC directly (with per-session dedup), and a cron accumulates daily snapshots that power the live total-views stat in the hero. When a repo rename left /blog/ duplicated in post URLs, I flattened them to /blog/<slug>/ and carried over 109 already-indexed old addresses with redirect pages generated automatically from the content directory (GitHub Pages cannot issue server-side 301s, so Astro emits meta refresh + canonical + noindex). A /changelog page that renders CHANGELOG.md verbatim also lives on the site. GitHub Actions builds the pnpm workspace and deploys to GitHub Pages on push to main.',
    },
  ],
}
