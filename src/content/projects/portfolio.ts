import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '포트폴리오 사이트',
  description:
    '기획·디자인·개발·배포까지 직접 진행한 개인 포트폴리오 사이트. 코드와 작업 이력 전체가 공개되어 있습니다.',
  overview: [
    '프로젝트를 소개하는 사이트인 만큼 콘텐츠 관리가 핵심이라고 봤습니다. 별도 CMS 없이 프로젝트 설명·이력을 타입이 잡힌 TypeScript 모듈로 관리하고, 한/영 텍스트를 프로젝트 파일 안에 나란히 두고 slug 기준으로 병합하는 구조를 설계해 언어 전환과 콘텐츠 수정이 코드 리뷰만으로 이뤄지게 했습니다.',
    '런타임 의존성은 Vue 하나로 유지했습니다. 해시 라우팅·한/영 i18n·다크/라이트 테마·커맨드 팔레트(⌘K)를 라이브러리 없이 반응형 모듈로 직접 구현했고, 프로젝트 간 실제 구조를 보여주는 레이어형 시스템 다이어그램, 분석 파이프라인 라이브 다이어그램, 기기 목업 슬라이더 같은 인터랙티브 컴포넌트도 직접 만들었습니다.',
    '이력서도 같은 레포에서 관리합니다. HTML로 작성한 국/영문 이력서를 headless Chrome으로 PDF 변환해 사이트 언어에 맞는 파일이 다운로드되고, GitHub Actions로 main 푸시 시 자동 배포되도록 구성했습니다. 작업은 GitHub 이슈·프로젝트 보드로 관리해 과정까지 공개되어 있습니다.',
  ],
  highlights: [
    '기획·디자인·개발·배포 1인 진행 — 코드·작업 이력 전체 공개',
    '콘텐츠를 코드로 — 타입 기반 콘텐츠 모듈, 한/영 병렬 구조(slug 병합)',
    '런타임 의존성 Vue 하나 — 라우팅·i18n·테마·커맨드 팔레트(⌘K) 직접 구현',
    '레이어형 시스템 다이어그램·라이브 파이프라인 등 인터랙티브 컴포넌트',
    '국/영문 이력서 HTML→PDF 파이프라인 — 사이트 언어별 다운로드',
    'GitHub Actions 자동 배포 구성 + 이슈·프로젝트 보드 기반 작업 관리',
  ],
  techNotes: [
    {
      title: '콘텐츠를 코드로 관리',
      body: '프로젝트 텍스트를 projects/<slug>.ts 파일에 ko·en 나란히 두고, 언어 무관 공통 필드(기간·태그·이미지)는 shared.ts 에서 slug 기준으로 병합합니다. 콘텐츠 스키마가 TypeScript 타입으로 강제되어 필드 누락·오타가 빌드에서 잡히고, 번역 누락도 구조적으로 방지됩니다.',
    },
    {
      title: '의존성 최소화 — 직접 구현',
      body: '런타임 의존성을 Vue 하나로 유지하고 해시 라우팅, localStorage 연동 i18n·테마, 커맨드 팔레트(⌘K)를 각각 작은 반응형 모듈로 직접 구현했습니다. 시스템 다이어그램은 층 기반 좌표 계산 + SVG 엣지로, 프로젝트 간 실제 아키텍처(클라이언트→API→인프라)를 시스템 단위 데이터로 정의해 렌더링합니다.',
    },
    {
      title: '이력서 PDF 파이프라인 · 배포',
      body: '국/영문 이력서를 A4 인쇄용 HTML로 작성하고 headless Chrome으로 PDF를 생성해, 사이트 언어에 따라 해당 언어 PDF가 다운로드됩니다. GitHub Actions 워크플로가 main 푸시 시 타입체크 포함 빌드 후 GitHub Pages로 배포하도록 구성했습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'Portfolio Site',
  description:
    'My personal portfolio site — planned, designed, built, and deployed myself. The code and full work history are public.',
  overview: [
    'Since this site exists to present projects, I treated content management as the core problem. Instead of a CMS, project copy and career data live in typed TypeScript modules — Korean and English side by side in each project file, merged by slug — so language switching and content edits happen through code review alone.',
    'The runtime dependency is Vue, and only Vue. Hash routing, KO/EN i18n, dark/light theming, and the command palette (⌘K) are hand-rolled reactive modules rather than libraries, and I also built the interactive components — the layered system diagrams showing how projects actually connect, the live analysis-pipeline diagram, and the device-mockup sliders.',
    'The resume lives in the same repo: KO/EN resumes written as print-ready HTML are converted to PDF with headless Chrome, and the download matches the site language. A GitHub Actions workflow deploys on push to main, and the work itself is tracked on a public GitHub issue/project board.',
  ],
  highlights: [
    'Solo work across planning, design, development, and deployment — code and work history fully public',
    'Content as code — typed content modules with parallel KO/EN structure (merged by slug)',
    'Single runtime dependency (Vue) — hand-rolled routing, i18n, theming, and command palette (⌘K)',
    'Interactive components: layered system diagrams, live pipeline diagram, device mockups',
    'KO/EN resume HTML→PDF pipeline — downloads follow the site language',
    'GitHub Actions deployment + issue/project-board-driven workflow',
  ],
  techNotes: [
    {
      title: 'Content as code',
      body: 'Project text lives in projects/<slug>.ts with ko and en side by side, while language-agnostic fields (period, tags, images) merge in from shared.ts by slug. The content schema is enforced by TypeScript types, so missing fields, typos, and missing translations are caught at build time.',
    },
    {
      title: 'Minimal dependencies — built by hand',
      body: 'With Vue as the only runtime dependency, hash routing, localStorage-backed i18n and theming, and the command palette (⌘K) are each small hand-written reactive modules. The system diagrams compute layer-based coordinates with SVG edges, rendering each system’s real architecture (clients → API → infra) from per-system data definitions.',
    },
    {
      title: 'Resume PDF pipeline & deployment',
      body: 'KO/EN resumes are authored as print-ready A4 HTML and converted to PDF with headless Chrome, and the header button downloads the PDF matching the site language. A GitHub Actions workflow builds (type-check included) and deploys to GitHub Pages on push to main.',
    },
  ],
}
