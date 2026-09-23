# Hyonah · Portfolio

Vue 3 + TypeScript + Vite로 만든 개인 포트폴리오. 다크/라이트 테마, 한/영 다국어, 해시 기반 프로젝트 상세 페이지, 스크롤 인터랙션을 갖춘 정적 사이트입니다.

**🔗 Live — [mmyonaa.github.io](https://mmyonaa.github.io/)** · **🗂 [Project board](https://github.com/users/mmyonaa/projects/2)**

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
│  ├─ title.ts              # 프로젝트 제목을 '이름 · 부제' 로 분해 (목록·상세 공용)
│  ├─ data.ts                # ★ 콘텐츠 파사드 — 언어별 콘텐츠를 현재 로케일로 병합해 반응형 export
│  ├─ content/               # 콘텐츠 소스
│  │  ├─ types.ts            #   콘텐츠 타입 정의
│  │  ├─ shared.ts           #   언어 공통 (프로필·스킬·연락처, 프로젝트 slug·기간·태그·링크·이미지, 시스템 그래프)
│  │  ├─ site.ts             #   언어별 사이트 텍스트 (tagline·about·aboutDetail) — siteKo/siteEn
│  │  ├─ ko.ts / en.ts       #   로케일별 SiteContent 조립 (shared + site + projects 병합)
│  │  └─ projects/           #   프로젝트 텍스트 — <slug>.ts 안에 ko·en 나란히 (+ index.ts 집계)
│  ├─ components/            # Navbar·Hero·About(Detail)·Works·Contact·ProjectDetail
│  │                         # ImageSlider·Lightbox·CommandPalette·BootIntro·SystemGraph
│  │                         # ThemeToggle·LanguageToggle·CursorFollower·Stars
│  └─ styles/                # 컴포넌트별 추출 CSS
└─ public/projects/          # 프로젝트 스크린샷·아키텍처 다이어그램(PNG)
```

## ✏️ 콘텐츠 수정

콘텐츠는 [`src/content/`](src/content)에서 관리하고, [`src/data.ts`](src/data.ts)가 현재 로케일에 맞춰 병합·제공합니다. 스키마가 [`types.ts`](src/content/types.ts)로 강제되어 필드·번역 누락이 빌드에서 잡힙니다.

- **프로젝트 텍스트** → [`src/content/projects/<slug>.ts`](src/content/projects) — 한 파일에 `ko`·`en`을 나란히 (제목·설명·overview·techNotes·다이어그램 캡션 등). 새 프로젝트는 파일 추가 후 [`projects/index.ts`](src/content/projects/index.ts)에 등록
  - 제목은 `이름 · 부제` 로 씁니다 — 목록·상세에서 이름은 크게, 부제는 한 줄 아래 작고 여리게 나뉩니다
    ([`title.ts`](src/title.ts)). 구분자는 **앞뒤 공백이 있는** `' · '`·`' — '` 만 인정하므로,
    `홍보·대관` 처럼 붙은 가운뎃점은 낱말로 남습니다. 이름은 한 줄을 넘지 않게 짧게 둡니다
- **프로젝트 공통 필드** → [`src/content/shared.ts`](src/content/shared.ts) — `slug`·기간·태그·링크(`link`/`company`/`repo`)·이미지/다이어그램 경로, 프로필·스킬·연락처, 시스템 그래프. **배열 순서 = 랜딩 노출 순서**
- **사이트 텍스트(소개·타임라인)** → [`src/content/site.ts`](src/content/site.ts) — `tagline`·`about`·`aboutDetail` (`siteKo`/`siteEn`)

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

### v1.7 — 2026-09-23
팀 구성 정정 · 본문에 묻힌 수치를 성과로 승격 · 인쇄 다이어그램 라이트 복구.

- 자취방정식 팀 표기를 어림수 '3~4인' 에서 확정값 '4인(백엔드 2·디자이너 1)' 으로, 국립생태원은 '1인 설계·개발' 에서 '팀 2인(기획·디자인 1) · 개발 단독' 으로 — 기획·디자인 담당이 따로 있었던 사실을 지우지 않는다
- 기술 노트·QA 표에만 있던 수치 6건을 하이라이트로 승격(보광극장 4,000줄 순감소 · Studio 케이스 1,400회 실행 · 어드민 80화면/30컨트롤러 · eSIM 월 100건 실결제와 커밋 1/3 · blog-mcp 색인 109건 이관 · 생태원 1초 폴링/10회 재시도). 새로 만든 숫자는 없다
- 보광극장 검색 성과를 Search Console 원본(2026-07-06~09-20)과 대조해 정정 — 클릭 95·노출 376(CTR 25.3%). '4위권 CTR 25%' 는 상호 검색(클릭의 75% · 1.74위 · CTR 52.2%)이 끌어올린 평균이라 일반 검색 성과처럼 쓰지 않고, 색인 페이지 20개와 상호 검색 실적으로 바꿔 적는다
- 인쇄용 PDF 가 다이어그램의 `-light` 변형을 쓰도록 `asset()` 수정 — 9월 9일 캐시 갱신 이후 다크로 찍히던 회귀 복구
- 이력서 활동에 '국·영문 발표 자료·데모 시나리오 직접 제작' 추가. 이 한 줄로 국문이 4쪽이 되어, 글자 크기는 두고 인쇄 여백·행간만 조여 3쪽 복구

### v1.6 — 2026-09-23
상세 페이지에 팀·역할과 운영 상태 표기 · 랜딩 최상단 이동 버튼.

- 프로젝트 상세 헤드를 `Period · Team · Status` 행으로 확장(14개 ko/en) — 이력서의 '팀 / 단계' 칩과 같은 사실을 사이트에서도 구조화해 노출. 값이 없으면 항목째 생략되므로 모르는 칸은 비워 둔다
- 팀 규모는 근거 있는 것만 숫자 표기(인브릿지 10인 이하), 팜피는 '팀 협업 + 내 담당 범위'로 표기 — 팀 규모만 쓰면 기여도가 흐려진다
- 팜피 7건 상태는 `참여 종료 (YYYY.MM)` — 퇴사 후 서비스 운영 주체를 확인할 수 없어 생존 여부는 주장하지 않되, 기간만으로 모호하던 '프로젝트 종료 vs 내 이탈'은 해소
- 상태 점은 현재 가동 중인 4건(bk-theater·blog-mcp·daily-quiz·portfolio)만 골드(`live`)
- 랜딩 하단에서 최상단으로 돌아가는 플로팅 버튼 추가 — 한 화면 넘겨야 노출, 숨김 상태는 `visibility`·`tabindex`·`aria-hidden`까지 내려 탭 순서·스크린리더에서 제외
- 목록 ↔ 상세 스크롤 복원 — 상세는 언제나 맨 위에서 열리고, 목록으로 돌아오면 보던 자리로 되돌아간다. `history.scrollRestoration`을 `manual`로 두고 복원을 라우팅 로직이 전담 (부수효과: 새로고침은 항상 맨 위에서 시작)

### v1.5 — 2026-09-22
자취방정식(jb-front) 프로젝트 추가 · 목업 화면 비율 정정 · 제목 체계 정리 · About 보강.

- 자취방정식(2026 Wanted 해커톤 제출작) 추가 — 상세 페이지 본문(ko/en)과 실기기 캡처 6종을 모바일 목업으로 연결, 매물 사진·점수가 샘플 데이터임을 명시
- 기기 목업 화면을 캡처의 실제 비율(`--screen-ar`)로 세워 상하·좌우가 깎이던 문제 해결. 비율 측정을 `<img>` load 에서 떼어내 캐시된 이미지에서도 동작하게 수정
- 상세 목업 크기를 낮추고 상하 베젤을 키워 기기 비율을 0.603 → 0.576 으로 조정, 랜딩 카드의 3:5 하드코딩 제거
- 프로젝트 제목을 `이름 · 부제` 로 재편(14개 ko/en) — 목록·상세에서 이름은 한 줄, 부제는 아래 작고 여리게. 분해 규칙은 `src/title.ts` 하나로 공용
- About: 광교 코딩 학원 TEdI 조교·강사(Activities), 코드스테이츠 소프트웨어 엔지니어링 부트캠프(Education) 추가 — 수료증 공식 표기 사용

### v1.4 — 2026-08-19
프로젝트 이미지 테마 스왑 · bk-theater/blog-mcp 콘텐츠 최신화 · 이력서 동기화.

- 프로젝트 이미지 라이트/다크 테마 스왑 — ImageSlider `themed` prop 도입, blog-mcp·portfolio 라이트/다크 캡처 쌍 연결 (기본=다크, `-light` 접미사)
- bk-theater: 전면 코드 리뷰 스프린트·보안 하드닝 테크노트 신설, SEO 색인 회귀 복구 반영, 기간 진행형(2025.09 –)으로 정정
- blog-mcp: Phase 3 무인 발행 파이프라인 가동·Mode R 리서치 발행·Supabase 조회수 반영, 오케스트레이터 서술을 실제 구현(claude -p)으로 정정
- 발표 이력 추가(국내 대기업, 2026.07) 및 About 경력·이력서(ko/en) 동기화, 2페이지 유지 압축, PDF 재생성

### v1.3 — 2026-07-29
blog-mcp 프로젝트 추가 · 민감 정보 정리 · 자동 배포 · SEO 보강.

- blog-mcp(MCP 서버 학습 프로젝트) 추가 — 상세 페이지·이력서(Personal Projects, ko/en)에 반영, 라이브 사이트 캡처 4종 연결
- 센티벡스 민감 정보 정리: 내부 코드 식별자·규모 수치 일반화, 발표 슬라이드(브랜드·도메인 노출) 비배포 처리
- 배포 자동화: main push 시 GitHub Actions 자동 배포 트리거 활성화
- SEO 보강: 96px PNG 파비콘 + WebSite JSON-LD(사이트명), Google Search Console 루트 속성 소유권 확인 태그
- 이력서(ko/en) 2페이지 유지 정리(중복 불릿 정돈·밀도 조정) 및 PDF 재생성
- About 타임라인 섹션 타이틀 아래 이중 선 제거

### v1.2 — 2026-07-21
보광극장 프로젝트 SEO 성과 지표 반영.

- Google Search Console 최근 12개월(2026.07 기준) 실적을 상세 페이지·이력서(ko/en)에 추가
- 누적 클릭 254·노출 902·평균 CTR 28.2%·게재순위 3.9위, PDF 재생성

### v1.1 — 2026-07-13
콘텐츠 정합성 검수 반영 — 사이트 ↔ 이력서 ↔ 내부 작업 기록 3방향 대조.

- 대외비·내부 정보 정리: 코드 주석의 내부 코드명 제거, 공급사 실명·내부 수치 정리
- 사실 정정: 프로젝트 기간 통일(생태원·apoc), QA 이슈 수치 표현(처리→발견·추적), 작업 귀속 명확화(웹훅 수집 제거, 결제 단말 개선·확장), 영문판 과장 완화
- 표기 통일: 영문 이름 Hyonah Lim, 기관 영문명(National Institute of Ecology), 어학 수준, LLM 프로바이더 일반화(Multi-provider LLM), 에이전트 8종 표기
- 이력서(ko/en) 스킬 현행화·PDF 재생성, 시스템 다이어그램 데이터 보정(web→redis 엣지 등)

### v1.0 — 2026-07-12
첫 정식 배포 (GitHub Actions → GitHub Pages, <https://mmyonaa.github.io/>).

- 다크/라이트 테마 · 한/영 i18n · 해시 라우팅 기반 프로젝트 상세 페이지
- ⌘K 커맨드 팔레트 · 커서 반응형 별자리 배경 · 터미널 부팅 인트로
- 프로젝트별 아키텍처 다이어그램(테마·언어 변형 + 라이트박스) · 관련 프로젝트 시스템 그래프
- 콘텐츠를 `src/content/`(공통 `shared` + 언어별 `ko`/`en`)로 분리, `data.ts` 반응형 파사드
- 라우팅·테마·i18n·라이트박스·커맨드 팔레트를 외부 라이브러리 없이 직접 구현
