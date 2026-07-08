// English content

import type { SiteContent } from './types'
import { buildProjects, contacts, profileBase, skills, socials, type ProjectText } from './shared'

const projectText: Record<string, ProjectText> = {
  sentivex: {
    title: 'SentiveX — Integrated Security Platform',
    description:
      'An enterprise multi-tenant SIEM security platform built with a Next.js full-stack app and a Fastify AI server. I owned the multi-agent AI pipeline for automated incident analysis and the LiteLLM gateway that unifies all LLM calls.',
    mediaNote: 'Screens are withheld as they contain live operational data.',
    presentationNote:
      'Slides from presentations introducing the SentiveX solution to enterprise clients. Structured around the product overview, core capabilities, and business value, I delivered the presentations, demos, and Q&A myself — in Korean for domestic clients and in English for overseas clients. I designed an end-to-end demo scenario — threat detection → automated AI analysis → host isolation response → multilingual report generation — to show the product’s real operational flow.',
    overview: [
      'An enterprise integrated security (SIEM) platform at InBridge. It consolidates features previously spread across multiple security tools — covering everything from security-event monitoring to incident response, automated AI analysis, and report generation in a multi-tenant environment. Within it, I owned the AI incident-analysis pipeline and the LiteLLM gateway.',
      'The main app is a Next.js (App Router) full-stack service — from the UI to API routes, server logic, and the database layer (Prisma/PostgreSQL). Built with TypeScript, Tailwind, and shadcn/ui for the SIEM dashboard and incident management, with NextAuth authentication & RBAC and multilingual support (ko/en/ja).',
      'The AI server (a stateless Fastify service) runs role-specific security agents (Triage, IOC, MITRE, Correlation, Compliance, SecurityIntel) in parallel via an orchestrator to analyze a single incident from multiple angles, streaming progress and results in real time over SSE. Several EDR vendors are abstracted behind a common NormalizedIncident type so agents stay vendor-agnostic, and every LLM call is consolidated onto a single LiteLLM (OpenAI-compatible) gateway path that handles provider-agnostic fallback, concurrency, token controls, per-tenant model configuration, and BYOK in one layer.',
    ],
    highlights: [
      'Designed and built a multi-agent AI pipeline for automated incident analysis (Triage, IOC, MITRE, Correlation, Compliance, SecurityIntel)',
      'Orchestrated parallel execution with real-time SSE streaming, progress tracking, and a manual re-analysis API',
      'Abstracted multi-vendor EDR behind a common NormalizedIncident type (CrowdStrike, SentinelOne, Symantec, Cortex XDR)',
      'Consolidated per-provider SDK branches onto a single LiteLLM (OpenAI-compatible) gateway path — fallback, concurrency, and token budgets moved into the gateway layer',
      'Per-tenant AI model CRUD via the LiteLLM Admin API, BYOK (virtual-key isolation), post-save verification, and a translation-delegation endpoint',
      'SIEM dashboard and endpoint management (3-tier RBAC, network isolation)',
    ],
    techNotes: [
      {
        title: 'Multi-tenant SIEM platform (Next.js full-stack)',
        body: 'A Next.js App Router full-stack app implementing the UI plus API routes/server logic and the database layer (Prisma/PostgreSQL). Dashboards, incidents, endpoints (scan, network isolation), charts, and maps, with NextAuth 3-tier RBAC and next-intl i18n (ko/en/ja).',
      },
      {
        title: 'Multi-agent AI analysis pipeline',
        body: 'Role-specific security agents — Triage, IOC, MITRE, Correlation, Compliance, SecurityIntel — run in parallel via an orchestrator to analyze a single incident from multiple angles. Each agent returns structured output, and the orchestrator aggregates them and streams progress and partial results in real time over SSE. A manual re-analysis API for re-running a specific incident plus worker-pool exception handling keep long-running analyses stable.',
      },
      {
        title: 'Multi-vendor EDR integration',
        body: 'CrowdStrike, SentinelOne, Symantec, and Cortex XDR are abstracted behind a common NormalizedIncident type with per-vendor index routing, so the analysis agent pipeline behaves identically regardless of vendor differences.',
      },
      {
        title: 'LiteLLM gateway consolidation',
        body: 'Consolidated LLM calls that were scattered across per-provider SDK branches (azure, gemini, bedrock, plus dynamic imports and Azure api-version handling) into a single createOpenAI({ apiKey, baseURL }) path. Since all traffic goes through the LiteLLM (OpenAI-compatible) gateway, per-provider SDKs were dropped (@ai-sdk/anthropic, google, groq, bedrock removed) and incident-analysis agents call by alias without knowing the underlying model. Fallback default models, concurrency caps, 429/5xx retries, and token budget guards moved into the gateway layer, removing provider hardcoding.',
      },
      {
        title: 'Multi-tenant AI model management & BYOK',
        body: 'Per-tenant AI model CRUD is delegated through the LiteLLM Admin API. The admin key lives only on the ai-server while the client calls this endpoint with an internal key, with post-save verification (verifyModel) and retries for deployment-propagation delay. Tenant isolation is handled via a virtual key’s model allow-list (BYOK) instead of team_id, and a health-ping cache and translation-delegation endpoint round out stable multi-tenant operations.',
      },
    ],
  },
  'bk-theater': {
    title: 'Bogwang Theater Promotion & Booking Site',
    architectureCaptions: [
      'System architecture & deployment (Nginx · PM2 · PostgreSQL · S3)',
      'Backend layered architecture (routes → controller → service → repository)',
      'Frontend module dependencies (views → composables → API wrapper → HTTP)',
    ],
    architectureNotes: [
      'Browser requests hit the Nginx reverse proxy, which routes static pages to the vite-preview frontend and /api calls to the Koa backend (:3000). Both processes run under PM2, the backend connects to PostgreSQL and AWS S3, and the browser loads map scripts and uploaded images directly from Kakao and S3.',
      'index.ts bootstraps the server, and each request flows routes → controller → service → repository with clear separation of concerns. The repository layer reaches PostgreSQL through a postgres.js connection pool, image/file uploads go through s3.util, and DB errors are wrapped in a CustomError for consistent handling.',
      'Views request data through API wrappers (banner, board, perfo), which funnel every HTTP call through request.util into a single axios instance. List screens share search and pagination via the useAdminList composable, and main.ts (ViteSSG) injects per-page SEO config in the router guard.',
    ],
    description:
      'A theater promotion and booking site built solo — from planning and design to development and infrastructure. Implemented theater browsing and reservations, admin content management, and map integration.',
    overview: [
      'A promotional site to showcase Bogwang Theater’s performances and venue rentals and to drive online inquiries and bookings. I owned the entire process solo — planning, design, frontend, backend, and infrastructure — and run it in production.',
      'Because search traffic matters for a promotional site, I chose static site generation (SSG) with vite-ssg over a typical SPA. Pages are pre-rendered, and each article/performance gets dynamic meta tags, JSON-LD structured data, and a build-time sitemap to optimize search visibility.',
      'For content operations, admins can manage performances, notices, press releases, and banners through Quill-based CRUD with image/file uploads (S3). It is deployed on AWS EC2 with PM2 and Nginx for stable operation.',
    ],
    highlights: [
      'Solo development covering planning, design, development, and infrastructure',
      'Theater browsing/reservation features with an optimized booking flow',
      'Admin registration of performances and notices for easier content operations',
      'Location info via Kakao Map API integration',
      'Responsive UI from desktop to mobile',
    ],
    techNotes: [
      {
        title: 'SEO via static site generation',
        body: 'Built statically with vite-ssg to improve initial render and indexing, injecting per-page meta/OG/JSON-LD (NewsArticle, TheaterEvent) after data load. The build collects all articles and performances from the API to auto-generate a sitemap.xml that includes individual URLs.',
      },
      {
        title: 'Solo full-stack + operations',
        body: 'I set up everything myself: a Vue 3 / TypeScript frontend, a Koa / PostgreSQL (postgres.js) backend, AWS S3 uploads, and EC2 / PM2 / Nginx deployment — including the data-access layer with automatic snake_case ↔ camelCase conversion.',
      },
      {
        title: 'Admin content operations',
        body: 'Performances (past/upcoming), notices, press releases, and banners are created and edited through a Quill editor; banners also expose display order, transition time, and active state. Shared list logic was extracted into a useAdminList composable for reuse.',
      },
      {
        title: 'Post-launch maintenance sprint',
        body: 'Unified detail-page layouts and introduced design tokens (gray, radius, shadow, z-index), fixed mobile layout bugs, added a share button (Web Share API with copy-link fallback), and hardened security by hiding internal error messages and capping pagination.',
      },
    ],
  },
  'ecology-content': {
    title: 'National Ecology Institute Content & Admin Site',
    architectureCaptions: ['System & data flow', 'Kakao gifticon send · retry / failover flow'],
    architectureNotes: [
      'Visitors sign up (with privacy consent), play iframe content while their activity is logged, and completing the survey triggers an automatic gifticon send via the Kakao API once conditions are met. All activity and survey data is persisted to PostgreSQL, and admins run content, surveys, and sending from one place.',
      'After a send request, the reservation status is polled every second and retried up to 10 times on failure. A confirmed failure surfaces an alert, completion (GIFT_ENDED) updates the result screen, and an optional batch re-poll of completed orders reconciles the final values.',
    ],
    description:
      'A digital content service with iframe-based content playback, activity logging and surveys, and automated KakaoTalk gift sending.',
    overview: [
      'A digital content service that lets National Ecology Institute visitors enjoy content and take part in surveys on the web. After content playback, activity logging, and survey participation, a Kakao gifticon is sent automatically once the conditions are met, and the collected activity and survey data is operated and aggregated in the admin system.',
      'I owned both the content service and the admin system solo — from system design through development — and secured reliable automated sending with status polling and retries that handle send failures.',
    ],
    highlights: [
      'Built both the content service and the admin system',
      'iframe-based content playback with activity-log storage',
      'Survey system integration to collect participation data',
      'Automated gift-coupon sending to survey participants via the Kakao API',
    ],
  },
  'apoc-studio': {
    title: 'In-house Service Authoring Tool Enhancement',
    description:
      'Resolved QA issues in the 3D/interactive authoring tool and improved responsiveness and cross-browser support to ensure stable behavior across devices.',
    highlights: [
      'Fixed UI issues based on QA feedback',
      'Fixed a bug where video would not play when 3D mapping was used',
      'Optimized layout consistency and UX across resolutions and tablets',
      'Improved responsiveness and cross-browser compatibility',
    ],
  },
  'apoc-renewal': {
    title: 'In-house Service Platform Renewal',
    description:
      'Overhauled the interface to match the renewed design and improved maintainability and scalability through component-based refactoring.',
    highlights: [
      'Fully revamped the interface and reimplemented features for the renewed UI',
      'Improved maintainability and scalability via component-based refactoring',
      'Ensured UI consistency with a design system and component guide',
      'Minimized conflicts with existing logic and planned migrations when adding new features',
    ],
  },
  'apoc-payment': {
    title: 'In-house Service Payment System',
    description:
      'Integrated Toss and PayPal payment modules and designed/built one-time and recurring subscription payments, an auto-renewal batch, and the test environment.',
    highlights: [
      'Integrated Toss and PayPal payment modules',
      'Designed and built single/multiple and recurring subscription payments',
      'Designed and built a batch system for automatic subscription renewal',
      'Set up payment scenarios and a test environment with Jest',
    ],
  },
  'esim-admin': {
    title: 'eSIM Sales Management Site',
    architectureCaptions: ['eSIM platform map — operations & management'],
    architectureNotes: [
      'This admin manages products, stock, partners, users, and settlement, while the online commerce and kiosk sell using that data through a shared backend (Koa/PostgreSQL). Online and offline sales run on one operations/settlement system. Kiosks are distributed across multiple airports/locations (1–2 operating partners), and the admin aggregates each device’s orders and settlement.',
    ],
    related: [
      { slug: 'esim-service', role: 'Online sales channel on the same backend' },
      { slug: 'esim-kiosk', role: 'Offline kiosk channel on the same backend' },
    ],
    description:
      'Built both the eSIM admin and its backend middleware, owning core features like permissions, settlement, orders, and i18n.',
    mediaNote: 'Screens are withheld as they contain live operational data.',
    overview: [
      'A project where I worked across both the frontend admin and the backend middleware of an eSIM business. Spanning a Vue 3 / TypeScript / Pinia frontend (~80 screens) and a Koa / PostgreSQL middleware (~30 controllers), I owned core features across products, orders, settlement, members, partners, kiosks, offline sales, and points.',
      'Work I drove directly includes designing the admin permission system (RBAC), adding advertising/inflow-partner settlement screens and APIs, kiosk/site order management (search by order number, ICCID, and reseller, plus Excel export), dynamic payment-gateway (PG) selection per currency and device, and offline sales and points management.',
      'For multi-country operations I implemented vue-i18n in three languages (KO/EN/JP) with product name/description translation, local time-zone handling via moment-timezone, and external order integration with several eSIM suppliers. Sharing the backend with the online service and kiosks keeps online and offline sales in one operations/settlement system.',
    ],
    highlights: [
      'Designed the admin permission system (RBAC) — role-hierarchy-based access control',
      'Added advertising/inflow-partner settlement screens & APIs and extended settlement columns',
      'Kiosk/site order management (search by order no., ICCID, reseller; Excel export)',
      'i18n (KO/EN/JP) + product translation, multi-currency/time-zone support',
      'External order integration with multiple eSIM suppliers (full-stack, front & back)',
    ],
    techNotes: [
      {
        title: 'Admin permission system (RBAC)',
        body: 'Split roles into master, partner, kiosk admin, and regular user, mapping each to a numeric index so only higher roles can manage lower ones via hierarchy comparison. Only the master can create/edit admin accounts, and login scope and dropdown visibility are filtered by role.',
      },
      {
        title: 'Settlement & order management + Excel export',
        body: 'Added advertising/inflow-partner settlement screens and query APIs and extended member/partner lists with inflow-partner columns. Orders (kiosk and site) are searchable by order number, ICCID, and reseller, and results are exported by building an Excel workbook client-side with xlsx (columns branched by period and order type).',
      },
      {
        title: 'Multi-country, multi-currency operations',
        body: 'Supported three languages (KO/EN/JP) with vue-i18n and added product name/description translation. Used moment-timezone to convert local time zones to/from UTC for settlement and order dates, dynamically filtered payment-gateway (PG) options per currency and device, and managed points by per-currency accrual rates.',
      },
      {
        title: 'Multilingual input-validation regex',
        body: 'For multilingual input I wrote name-validation regex that allows Hiragana, Katakana, CJK Han, and Hangul together, and assembled shared validation utilities for passwords (8–16 chars with a special character), auto-formatting of card/phone/business numbers, and expiry-date range checks.',
      },
      {
        title: 'External integration & full-stack work',
        body: 'Integrated with several eSIM supplier APIs to fetch and process external orders, and built the controllers, services, repositories, and entities for the settlement/order/member domains in the Koa/PostgreSQL middleware. Large responses are compressed with lz-string, and frontend errors are captured with Sentry.',
      },
    ],
  },
  'esim-kiosk': {
    title: 'eSIM Sales Kiosk',
    architectureCaptions: ['eSIM platform map — offline sales channel'],
    architectureNotes: [
      'This kiosk sells in-store in Japan using products and stock managed in the admin, served through the shared backend. It is one surface of the same system as the online commerce and admin.',
    ],
    related: [
      { slug: 'esim-admin', role: 'Manages products, devices, and settlement' },
      { slug: 'esim-service', role: 'Online sales channel on the same backend' },
    ],
    description:
      'An unattended eSIM kiosk. I led the Vue kiosk web and owned hardware-facing features of the Android app — printers, payment, and multilingual encoding.',
    overview: [
      'A self-service kiosk installed at stores in Japan where travelers buy and issue eSIMs themselves. I implemented the kiosk flow — from selecting continent, country, and plan to payment, eSIM QR issuance, receipt printing, and email delivery. The eSIM catalog covers 30+ countries, but the kiosk itself is Japan-only (JPY) and takes card, QR, and NFC-tag payments through the terminal. After development, I also ran the initial on-site operation in Japan (about 5 units).',
      'The UI is a Vue 3 PWA — which I led as the primary contributor — wrapped in an Android (Kotlin) WebView app running on the hardware. The app foundation was built by the team; on top of it I owned and extended the hardware-facing features: printing, payment, encoding, and unattended-operation stability.',
      'In particular I auto-detected and supported both legacy and new receipt printers, handled Japanese/Korean multi-encoding (Shift-JIS ↔ UTF-8), payment-terminal status/error handling, real-time paper-low detection, and Wi-Fi auto-reconnect for unattended reliability — inspecting and supporting it in real time on-site in Japan.',
    ],
    highlights: [
      'Led development of the kiosk web (Vue 3 PWA)',
      'Dual-driver auto-detection across legacy and new receipt printers (SII ↔ Epson)',
      'Japanese/Korean multi-encoding (Shift-JIS ↔ UTF-8) with automatic selection',
      'Payment-terminal card/QR/NFC-tag per-type response and error handling relayed back to the web',
      'Unattended-ops hardening: real-time paper-low monitoring and Wi-Fi auto-reconnect',
      'Japan-only (JPY), ~5 units in initial on-site operation; eSIM catalog covers 30+ countries',
    ],
    techNotes: [
      {
        title: 'Dual printer-driver integration',
        body: 'Auto-detect legacy SII RP-F10/G10 (USB serial, ESC/POS, Shift-JIS) and new Epson TM-m30III (EPOS SDK, UTF-8) by USB vendor ID and pick the driver, commands, and encoding at runtime. The same receipt — product, QR, price, order number, store QR — prints identically on two very different printers.',
      },
      {
        title: 'Multilingual encoding',
        body: 'Detect Japanese, Han characters, and special symbols (e.g. the yen sign ¥) via regex to choose between Shift-JIS and UTF-8, and fixed Korean not printing on the legacy printer by applying a multilingual character set.',
      },
      {
        title: 'Payment terminal & status handling',
        body: 'Parse per-type responses (approval number, transaction ID, error code) for card/QR/e-money on the salo-01 terminal (USB), and improved payment-status checks and safe JSON error relay to the web on failure. A successful payment leads into eSIM QR issuance and email delivery.',
      },
      {
        title: 'JS-to-native bridge & unattended ops',
        body: 'The web calls hardware through WebView @JavascriptInterface methods (doPayment, doPrintImage, checkPayment, …), and paper-low status is broadcast back to the web in real time. Auto-launch on boot (BootReceiver), Device Admin lockdown, Wi-Fi auto-reconnect, and an offline page keep it stable unattended — supported on-site in Japan.',
      },
    ],
  },
  'esim-service': {
    title: 'eSIM Sales Service',
    architectureCaptions: ['eSIM platform map — online sales channel'],
    architectureNotes: [
      'This service (online commerce) sells on the web using products and stock managed in the admin, served through the shared backend. It is one surface of the same system as the kiosk and admin.',
    ],
    related: [
      { slug: 'esim-admin', role: 'Manages products, stock, and settlement' },
      { slug: 'esim-kiosk', role: 'Offline kiosk channel on the same backend' },
    ],
    description:
      'A Vue 3 global eSIM commerce. I led the frontend architecture and built the multi-gateway payments, i18n, and a web/kiosk-shared checkout flow.',
    overview: [
      'A global eSIM commerce where travelers search and compare plans by country, check out, and receive an eSIM QR by email to install instantly. I designed the initial Vue 3 / TypeScript frontend architecture (routing, state, API layer, styling, i18n) and led development as the top committer (about a third of the project).',
      'Payments are the core. I integrated Paygent card payments (USD) plus Google Pay and Apple Pay (JPY), and built a multi-step checkout — validate cart → create payment info → tokenize card → complete. The same screens serve both web customers and (login-free) kiosk checkout, branching by orderId, with rollback on failure to avoid stuck states.',
      'For international users I built the vue-i18n dictionaries for three languages (KO/EN/JP) and switched currency (USD/JPY) by country and language, with a responsive UI and PWA (Workbox). I also handled client optimizations — compressing local storage with lz-string and letting users download receipts as images via html2canvas. This service forms one eSIM platform together with the admin, kiosk, and a shared backend (middleware), to which I was also the top contributor.',
    ],
    highlights: [
      'Led the Vue 3 frontend architecture and development (top committer)',
      'Multi-gateway payments — Paygent card (USD) + Google Pay / Apple Pay (JPY)',
      'Web/kiosk-shared multi-step checkout (path branching, rollback on failure)',
      'Built vue-i18n dictionaries for three languages + per-country/language currency',
      'Responsive/PWA + client optimizations (lz-string storage compression, html2canvas receipts)',
      'Top contributor to the shared backend (middleware) — external eSIM-supplier integration, post-payment eSIM issuance & SES email delivery',
    ],
    techNotes: [
      {
        title: 'Multi-gateway global payments',
        body: 'Unified payment methods by adding Google Pay and Apple Pay (JPY) alongside Paygent card payments (USD), with per-brand card regex validation (VISA, Master, AMEX), Paygent tokenization, and currency-code switching by country and language.',
      },
      {
        title: 'Web/kiosk-shared checkout flow',
        body: 'Built a multi-step flow — validate cart → create payment info → card details → complete — and branched web-customer vs (login-free) kiosk checkout by the presence of an orderId. Payment info is rolled back on failure to prevent inconsistent states.',
      },
      {
        title: 'i18n & client optimization',
        body: 'Built the vue-i18n dictionaries for three languages (KO/EN/JP) and compressed localStorage (i18n and payment data) with lz-string. Users can download order receipts as images via html2canvas, and product images (webp) are selected dynamically by country/continent.',
      },
      {
        title: 'Responsive/PWA & platform integration',
        body: 'Secured overseas mobile usability with a responsive UI and VitePWA (Workbox caching), and added Sentry error tracking and Google Analytics in production only. I was also the top contributor to the shared Koa/PostgreSQL middleware used by the admin and kiosk, owning external eSIM-supplier integration and post-payment eSIM issuance with AWS SES multilingual email delivery (active QR / receipt attachment).',
      },
    ],
  },
  'guseong-content': {
    title: 'Guseong Elementary Content Play & Admin Site',
    description:
      'An elementary digital-literacy content site with role-based UIs for students and teachers, content viewing history, and student management for teachers.',
    highlights: [
      'Differentiated UI and access by student/teacher role',
      'Role-based dynamic routing to split teacher/student views',
      'Stored content viewing history to manage learning data',
      'Implemented student create/update/delete in the teacher admin',
    ],
  },
}

export const en: SiteContent = {
  profile: {
    ...profileBase,
    tagline: 'A full-stack developer building user-centered, stable, and scalable web services.',
  },
  contacts,
  skills,
  socials,
  about: {
    paragraphs: [
      'A full-stack developer who builds user-centered, stable, and scalable web services.',
      'I work across the stack — frontend, backend, and infrastructure — and care about the small details that make a real difference in usability.',
    ],
  },
  aboutDetail: {
    intro:
      'A full-stack developer who owns the entire service cycle — from gathering requirements to post-launch operations.',
    paragraphs: [
      'I work broadly across frontend, backend, and infrastructure. Rather than staying in one area, I like to see the whole service — spotting where the bottlenecks are and how each decision affects user experience and maintainability.',
      'I have led many projects solo or in small teams, handling design, development, testing, deployment, and on-site support myself. Along the way I came to value both “making it actually work end to end” and “making it easy for the next person to take over.”',
      'I try never to overlook the difference small details make. I believe one less load, one less flicker, one fewer click is what ultimately shapes the impression a service leaves.',
    ],
    principles: [
      {
        title: 'I decide with the user in mind',
        body: 'Before feature completeness, I ask “is this actually easy to use?” I refine everything — from screen flow to micro-interactions — around the user’s path.',
      },
      {
        title: 'I balance stability and scalability',
        body: 'I prioritize structures that hold up as traffic and requirements grow, over code that merely works right now. Componentization and tests keep the code resilient to change.',
      },
      {
        title: 'I see it through to the end',
        body: 'I don’t stop at development — I handle deployment, operations, and incident response myself. I’ve solved problems beyond the code too, like kiosk issues on-site overseas.',
      },
      {
        title: 'I believe details make the difference',
        body: 'I try to cut every unnecessary load, flicker, and click. Small improvements add up to the impression and trust a service earns.',
      },
    ],
    timeline: [
      {
        period: '2023.11 – 2025.05',
        title: 'eSIM Sales Platform (service · kiosk · admin)',
        body: 'A key developer (top contributor in most areas) across an eSIM platform of the online service, kiosk, admin, and shared middleware. Owned multi-gateway payments (Paygent, Google/Apple Pay), RBAC and settlement, eSIM issuance with SES email delivery, and kiosk hardware integration (printers, multilingual encoding), and handled live operations on-site in Japan.',
      },
      {
        period: '2024.01 – 2025.05',
        title: 'In-house SaaS Authoring Tool (apoc)',
        body: 'Led the platform renewal, payment system (Toss·PayPal), and enhancements to the 3D/interactive authoring tool. Improved maintainability and scalability through component-based refactoring.',
      },
      {
        period: '2024.08 – 2025.08',
        title: 'Famppy · National Ecology Institute & Guseong Elementary',
        body: 'Company projects at Famppy. Built the National Ecology Institute content service (iframe content playback, activity logging, surveys, automated KakaoTalk gift sending) and the Guseong Elementary site (role-based UIs, dynamic routing, viewing history, and student management).',
      },
      {
        period: '2025.09 – 2026.07',
        title: 'Freelance · Bogwang Theater Promotion & Booking Site',
        body: 'Single-handedly delivered the Bogwang Theater promotion/booking site from planning and design to development and infrastructure. Optimized SEO with vite-ssg SSG and dynamic meta/JSON-LD, deployed and operated on AWS with PM2 and Nginx.',
      },
    ],
    activities: [
      {
        period: '2026.05 – 06',
        title: 'Client Product Presentations',
        body: 'Presented and demoed SentiveX to enterprise clients in both Korean and English (a global IT firm and a large-enterprise affiliate).',
      },
      {
        period: '2026',
        title: 'RSAC 2026 (attended)',
        body: 'Attended the RSA Conference to research the latest security trends and solutions.',
      },
    ],
    education: [
      {
        period: '2020.03 – 2025.02',
        school: 'Ajou University',
        degree: 'B.S. in Cyber Security',
        notes: ['Completed the Cloud/Big Data Security track'],
      },
    ],
  },
  projects: buildProjects(projectText),
}
