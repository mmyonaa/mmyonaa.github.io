import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "1인",
  "status": "운영 중",
  "title": "포트폴리오 사이트",
  "description": "기획·디자인·개발·배포까지 직접 진행한 개인 포트폴리오 사이트. 코드와 작업 이력 전체가 공개되어 있습니다.",
  "overview": [
    "프로젝트 소개·이력서·작업 기록을 한 저장소에서 관리하는 한·영 포트폴리오입니다. 콘텐츠를 TypeScript 모듈로 관리하고, 프로젝트 구조를 설명하는 인터랙티브 다이어그램과 PDF 생성·배포 기능을 직접 개발했습니다."
  ],
  "highlights": [
    "한·영 콘텐츠 타입 정의와 공통 데이터 관리",
    "라우팅·테마·검색 팔레트와 프로젝트 다이어그램 구현",
    "HTML 기반 이력서·포트폴리오 PDF 생성 및 GitHub Actions 배포"
  ],
  "techNotes": [
    {
      "title": "콘텐츠를 코드로 관리",
      "body": "프로젝트별 파일에 한·영 설명을 나란히 두고, 기간·태그·이미지는 공통 데이터로 관리합니다. TypeScript 타입 검사로 필수 필드 누락과 잘못된 필드명을 확인하며, 콘텐츠 변경도 코드 리뷰로 검토합니다."
    },
    {
      "title": "의존성 최소화 — 직접 구현",
      "body": "런타임 의존성을 Vue 하나로 유지하고 해시 라우팅, localStorage 연동 i18n·테마, 커맨드 팔레트(⌘K)를 각각 작은 반응형 모듈로 직접 구현했습니다. 시스템 다이어그램은 층 기반 좌표 계산 + SVG 엣지로, 프로젝트 간 실제 아키텍처(클라이언트→API→인프라)를 시스템 단위 데이터로 정의해 렌더링합니다."
    },
    {
      "title": "이력서 PDF 파이프라인 · 배포",
      "body": "국·영문 이력서는 인쇄용 HTML로, 포트폴리오는 콘텐츠 모듈에서 생성한 HTML로 관리합니다. headless Chrome으로 PDF를 만들고 사이트에서 내려받도록 연결했습니다. GitHub Actions는 main 푸시 시 타입 검사와 빌드를 실행한 뒤 GitHub Pages에 배포합니다."
    },
    {
      "title": "PDF 페이지 분할과 누락 검사",
      "body": "폰트와 이미지가 로드된 뒤 콘텐츠 높이를 측정해 페이지를 나누도록 구현했습니다. 마지막 장에 짧은 항목만 남으면 앞 장과 내용을 재배치하고, 목차의 페이지 번호와 이동 링크를 생성합니다. 분할 전후 본문 순서·이미지 수를 대조하고 페이지 넘침을 검사해 누락과 잘림을 확인합니다."
    }
  ]
}

export const en: ProjectText = {
  "team": "Solo",
  "status": "Live",
  "title": "Portfolio Site",
  "description": "My personal portfolio site — planned, designed, built, and deployed myself. The code and full work history are public.",
  "overview": [
    "Since this site exists to present projects, I treated content management as the core problem. Instead of a CMS, project copy and career data live in typed TypeScript modules — Korean and English side by side in each project file, merged by slug — so language switching and content edits happen through code review alone.",
    "The runtime dependency is Vue, and only Vue. Hash routing, KO/EN i18n, dark/light theming, and the command palette (⌘K) are hand-rolled reactive modules rather than libraries, and I also built the interactive components — the layered system diagrams showing how projects actually connect, the live analysis-pipeline diagram, and the device-mockup sliders.",
    "The resume lives in the same repo: KO/EN resumes written as print-ready HTML are converted to PDF with headless Chrome, and the download matches the site language. A GitHub Actions workflow deploys on push to main, and the work itself is tracked on a public GitHub issue/project board."
  ],
  "highlights": [
    "Solo work across planning, design, development, and deployment — fully public",
    "Content as code — typed content modules with parallel KO/EN structure",
    "Single runtime dependency (Vue) — hand-rolled routing, i18n, theming, ⌘K palette",
    "Interactive components — layered system diagrams and a live pipeline diagram",
    "KO/EN resume HTML→PDF pipeline + GitHub Actions deployment"
  ],
  "techNotes": [
    {
      "title": "Content as code",
      "body": "Project text lives in projects/<slug>.ts with ko and en side by side, while language-agnostic fields (period, tags, images) merge in from shared.ts by slug. The content schema is enforced by TypeScript types, so missing fields, typos, and missing translations are caught at build time."
    },
    {
      "title": "Minimal dependencies — built by hand",
      "body": "With Vue as the only runtime dependency, hash routing, localStorage-backed i18n and theming, and the command palette (⌘K) are each small hand-written reactive modules. The system diagrams compute layer-based coordinates with SVG edges, rendering each system’s real architecture (clients → API → infra) from per-system data definitions."
    },
    {
      "title": "Resume PDF pipeline & deployment",
      "body": "KO/EN resumes are authored as print-ready A4 HTML and converted to PDF with headless Chrome, and the header button downloads the PDF matching the site language. A GitHub Actions workflow builds (type-check included) and deploys to GitHub Pages on push to main."
    },
    {
      "title": "PDF pagination and content checks",
      "body": "Waits for fonts and images, then measures content to paginate it. Rebalances short final pages, generates page numbers and contents links, and compares text order and image counts before and after pagination. An overflow check prevents content from extending beyond the printable area."
    }
  ]
}
