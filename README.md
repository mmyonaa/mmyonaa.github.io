# Hyonah · Portfolio

Vue 3 + TypeScript + Vite로 만든 개인 포트폴리오. 다크/라이트 테마, 한/영 다국어, 해시 기반 프로젝트 상세 페이지, 스크롤 인터랙션을 갖춘 정적 사이트입니다.

**🔗 Live — [mmyonaa.github.io](https://mmyonaa.github.io/)**

## ✨ 특징

- **다크 미니멀 디자인** — 골드 액센트, 거대 타이포그래피
- **⌘K 커맨드 팔레트** — 프로젝트 점프·섹션 이동·테마/언어 토글을 키보드로 (Mac `⌘K` / 그 외 `Ctrl K` 자동 표시)
- **커서 반응형 별자리** — 커서 근처 별들이 얇은 선으로 연결되는 constellation 배경(캔버스, 라이트=골드 점)
- **터미널 부팅 인트로** — 첫 로드 시 mono 타이핑 시퀀스 (세션당 1회, 클릭/키로 스킵)
- **다크 / 라이트 테마 토글** — 선택값을 `localStorage`에 저장, 첫 페인트 전 적용으로 깜빡임 없음
- **한 / 영 다국어(i18n)** — 라이브러리 없이 반응형 로케일 전환, 선택값 `localStorage` 저장
- **프로젝트 상세 페이지** — 해시 라우팅(`#/project/<slug>`)으로 정적 호스팅에서도 새로고침·직접 링크 안전
- **아키텍처 다이어그램** — 프로젝트별 구조도를 다크/라이트·한/영 변형으로 표시, 클릭 시 확대(라이트박스)
- **시스템 그래프** — 함께 이루는 시스템(관련 프로젝트)을 인터랙티브 노드 그래프로 표시(호버 강조·클릭 이동)
- **스크롤 모션** — 등장(reveal) 애니메이션, Works 타임라인 스크럽 (외부 라이브러리 없이 IntersectionObserver + CSS)
- **반응형** + `prefers-reduced-motion` 대응
- **콘텐츠 분리** — 모든 텍스트·프로젝트·연락처를 [`src/content/`](src/content) 한 곳에서 언어별로 관리

## 🛠 기술 스택

- [Vue 3](https://vuejs.org/) (`<script setup lang="ts">`)
- [TypeScript](https://www.typescriptlang.org/) (+ `vue-tsc` 타입 체크)
- [Vite 6](https://vite.dev/)
- 순수 CSS (변수 기반 테마) — 컴포넌트별 스타일은 [`src/styles/`](src/styles)로 분리
- 라우팅·테마·i18n·라이트박스·커맨드 팔레트는 외부 라이브러리 없이 직접 구현
- 패키지 매니저: **pnpm**

## 🚀 시작하기

요구사항: **Node 20+**, **pnpm**

```bash
pnpm install      # 의존성 설치
pnpm dev          # 개발 서버 (http://localhost:5173)
pnpm build        # 타입 체크 후 프로덕션 빌드 → dist/
pnpm preview      # 빌드 결과 미리보기
pnpm typecheck    # 타입 체크만 실행 (vue-tsc --noEmit)
```

> `pnpm build`는 `vue-tsc --noEmit && vite build`로 동작하여, 타입 에러가 있으면 빌드가 실패합니다.

## 📁 프로젝트 구조

```
portfolio/
├─ index.html                # 진입 HTML (+ 테마 사전 적용 스크립트)
├─ vite.config.ts
├─ src/
│  ├─ main.ts                # 앱 부트스트랩
│  ├─ App.vue                # 해시 라우팅 + reveal 옵저버
│  ├─ theme.ts               # 테마 상태 + localStorage
│  ├─ i18n.ts                # 로케일(ko/en) 상태 + localStorage
│  ├─ tints.ts               # 프로젝트별 색조
│  ├─ lightbox.ts            # 이미지 라이트박스 상태
│  ├─ command.ts             # ⌘K 커맨드 팔레트 상태 + 플랫폼별 단축키 라벨
│  ├─ data.ts                # ★ 콘텐츠 파사드 — 언어별 콘텐츠를 현재 로케일로 병합해 반응형 export
│  ├─ content/               # 콘텐츠 소스
│  │  ├─ types.ts            #   콘텐츠 타입 정의
│  │  ├─ shared.ts           #   언어 공통 (slug·기간·태그·링크·이미지/다이어그램·스킬·연락처)
│  │  └─ ko.ts / en.ts       #   언어별 텍스트 (제목·설명·overview·techNotes 등)
│  ├─ components/            # Navbar·Hero·About(Detail)·Works·Contact·ProjectDetail
│  │                         # ImageSlider·Lightbox·CommandPalette·BootIntro·SystemGraph
│  │                         # ThemeToggle·LanguageToggle·CursorFollower·Stars
│  └─ styles/                # 컴포넌트별 추출 CSS
└─ public/projects/          # 프로젝트 스크린샷·아키텍처 다이어그램(PNG)
```

## ✏️ 콘텐츠 수정

콘텐츠는 [`src/content/`](src/content)에서 관리합니다. 컴포넌트는 [`src/data.ts`](src/data.ts)가 현재 로케일에 맞춰 병합·제공하는 값을 사용합니다.

- [`src/content/shared.ts`](src/content/shared.ts) — **언어 공통**: 프로필·스킬·연락처, 프로젝트의 `slug`·기간·태그·링크(`link`/`company`/`repo`)·이미지/다이어그램 경로
- [`src/content/ko.ts`](src/content/ko.ts) · [`src/content/en.ts`](src/content/en.ts) — **언어별 텍스트**: 제목·설명·소개·overview·techNotes·다이어그램 캡션 등
- [`src/content/types.ts`](src/content/types.ts) — 콘텐츠 타입

주요 항목:

- `profile` — 이름, 역할, 위치, 이메일 등
- `about` / `aboutDetail` — 소개 문단, About 페이지 상세(원칙·타임라인·활동·학력)
- `skills` — 카테고리별 스택
- `projects` — 프로젝트 목록(랜딩 노출 순서 = 배열 순서). `slug`로 상세 페이지와 연결되며 `link`/`company`/`repo`가 있으면 상세에 링크가 노출됩니다. `related`로 관련 프로젝트를 상호 연결할 수 있습니다
- `contacts` — Contact 섹션 연락처

## 🌗 테마 · 🌐 다국어

- **테마**: 기본은 다크. 우상단 토글로 전환하며 값은 `localStorage`에 저장됩니다. `index.html`의 인라인 스크립트가 첫 페인트 전에 테마를 적용해 깜빡임을 막고, `?theme=light` 쿼리로도 강제할 수 있습니다.
- **언어**: 한국어/영어 토글([`src/i18n.ts`](src/i18n.ts)). 콘텐츠는 [`src/content/ko.ts`](src/content/ko.ts)·[`src/content/en.ts`](src/content/en.ts)에서 로케일별로 제공되며, 선택값은 `localStorage`에 저장됩니다. 다이어그램도 `-light` / `-en` 변형을 자동 선택합니다.

## 📦 배포

**GitHub Pages(사용자 사이트)** 로 배포됩니다 — <https://mmyonaa.github.io/>

- [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)가 `pnpm build` 후 `dist/`를 Pages에 업로드합니다.
- 현재는 수동 트리거(`workflow_dispatch`): **Actions 탭 → Deploy to GitHub Pages → Run workflow**.
  `deploy.yml`의 `push:` 트리거 주석을 해제하면 `main` push마다 자동 배포됩니다.
- 사용자 사이트(루트)라 [`vite.config.ts`](vite.config.ts)의 `base`는 `'/'`. 프로젝트 페이지(`/<repo>/`)로 옮기면 `base`를 그에 맞게 변경하세요.

## 📝 커밋 규칙

Conventional Commits를 따릅니다.

## 🗓 버전 기록

### v1.0 — 2026-07-12
첫 정식 배포 (GitHub Actions → GitHub Pages, <https://mmyonaa.github.io/>).

- 다크/라이트 테마 · 한/영 i18n · 해시 라우팅 기반 프로젝트 상세 페이지
- ⌘K 커맨드 팔레트 · 커서 반응형 별자리 배경 · 터미널 부팅 인트로
- 프로젝트별 아키텍처 다이어그램(테마·언어 변형 + 라이트박스) · 관련 프로젝트 시스템 그래프
- 콘텐츠를 `src/content/`(공통 `shared` + 언어별 `ko`/`en`)로 분리, `data.ts` 반응형 파사드
- 라우팅·테마·i18n·라이트박스·커맨드 팔레트를 외부 라이브러리 없이 직접 구현
