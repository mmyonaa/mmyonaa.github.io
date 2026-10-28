# CLAUDE.md

개인 포트폴리오 사이트(<https://mmyonaa.github.io/>). Vue 3 + TypeScript + Vite,
정적 사이트. 기능·구조 상세는 `README.md`.

## 검증

`pnpm typecheck` (`vue-tsc --noEmit`). `pnpm build` 도 같은 검사를 먼저 거친다.

## 콘텐츠를 고칠 때

텍스트·프로젝트·연락처는 전부 `src/content/` 한 곳에 있고 `src/data.ts` 가 로케일에
맞춰 병합한다. 스키마는 `src/content/types.ts` 가 강제하므로 **필드·번역 누락은 빌드가
잡는다** — 한쪽 언어만 고치고 넘어갈 수 없다.

- 프로젝트 텍스트 → `src/content/projects/<slug>.ts` (한 파일에 `ko`·`en` 나란히).
  새 프로젝트는 파일 추가 후 `projects/index.ts` 에 등록
- 공통 필드(기간·태그·링크·이미지 경로) → `src/content/shared.ts`.
  **배열 순서가 곧 랜딩 노출 순서다.** 랜딩에는 앞의 `featuredCount`(5)개만, 전체는 `#/archive`
- 사이트 텍스트(소개·히어로 Now·타임라인) → `src/content/site.ts`
- 이미지는 webp 로 `public/projects/` 에 두고 **`node scripts/image-dims.mjs` 를 다시 돌린다** —
  `<img width/height>` 가 이 표에서 나온다. 서체를 바꾸면 `node scripts/fetch-fonts.mjs`

## 함정

- **제목 구분자는 앞뒤 공백이 있어야 한다.** 제목은 `이름 · 부제` 로 쓰고 `src/title.ts`
  가 나누는데, 인정하는 구분자는 `' · '` 와 `' — '` 뿐이다. `홍보·대관` 처럼 붙은
  가운뎃점은 낱말로 남는다(의도된 동작). 이름 쪽은 한 줄을 넘기지 않는다.
- **main 에 push 하면 바로 배포된다.** `.github/workflows/deploy.yml` 의 `push` 트리거가
  켜져 있다(v1.3 에서 자동화). 라이브 사이트라 되돌리려면 재배포가 필요하다.
- **`base` 는 `'/'`** — 사용자 사이트(루트)라서다. 프로젝트 페이지로 옮기면
  `vite.config.ts` 의 `base` 를 함께 바꿔야 링크가 깨지지 않는다.
- **`public/projects/nie/` 는 통째로 gitignore 고 파일별 `!` 예외만 추적된다.** 새 파일을 넣으면
  `.gitignore` 에 예외를 더해야 배포에 실린다.
- **`public/portfolio-*.pdf` 는 gitignore 라 사이트에서 링크하지 않는다.**
- **`apply/` · `4service/` 는 git 에 없다**(로컬 전용 지원 서류·자료). 러너에서도 유효해야
  하는 내용은 여기 두지 않는다.
- PDF 산출물은 `pnpm portfolio:pdf` · `pnpm resume:pdf` (`scripts/build-*.mjs`).
  인쇄 레이아웃은 화면과 따로 논다 — 이력서 쪽은 쪽수(국문 3쪽)가 기준선이다.

## 버전

버전 정본은 `package.json` 의 `version`, 기록은 `CHANGELOG.md`, 릴리스마다 `vX.Y.Z` 태그.
v1.0.0 ~ v1.7.0 은 2026-09-30 에 소급 부여했다("그 버전 기록이 README 에 추가된 커밋" 기준).
