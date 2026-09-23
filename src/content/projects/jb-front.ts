import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "팀 4인 (백엔드 2 · 디자이너 1) · 프론트엔드 단독 (11일)",
  "status": "해커톤 제출 후 종료",
  "title": "자취방정식 · 라이프스타일 기반 주거 매물 추천",
  "description": "통근 거리와 생활 환경 선호도를 반영하는 주거 매물 추천 웹앱입니다. 4인 팀의 해커톤에서 11일간 프론트엔드를 단독 개발했습니다.",
  "imageNote": "화면의 매물 사진·가격·점수는 해커톤 기간에 쓴 샘플 데이터입니다.",
  "overview": [
    "팀 기획과 ERD·API 명세 설계에 참여하고 디자이너·백엔드 개발자와 화면을 조정했습니다. 매칭 점수 계산은 백엔드가, 입력과 결과 표시는 프론트엔드가 담당했습니다. API 개발 전에는 임시 데이터로 화면을 구현하고 명세가 확정되는 순서대로 연동했습니다."
  ],
  "highlights": [
    "매물 탐색·추천 요청·결과·기록 화면과 API 연동",
    "비로그인 비동기 추천과 인증 복원 후 데이터 조회",
    "Cloudflare Workers 배포 · 프록시와 날짜 표시 오류 수정"
  ],
  "techNotes": [
    {
      "title": "API 개발과 병행한 화면 구현",
      "body": "컴포넌트가 스토어를 통해 데이터를 받도록 구성해 임시 데이터를 실제 API로 교체할 때 화면 변경을 줄였습니다. 매물·거점·찜·추천 순서로 연동한 뒤 실패 경로를 점검했고, 역지오코딩 실패 시 로딩이 끝나지 않던 문제를 수정했습니다."
    },
    {
      "title": "모바일 화면 구성",
      "body": "데스크톱에서는 최대 너비 480px의 앱 화면을 중앙에 배치하고, 작은 화면에서는 너비를 줄이도록 구성했습니다. 최소 너비 320px에서도 썸네일·점수·본문이 잘리지 않도록 카드의 고정 영역과 본문 공간을 조정했습니다."
    },
    {
      "title": "비로그인 추천과 결과 조회",
      "body": "로그인 전에도 추천을 요청하고 결과를 확인할 수 있도록 서버가 발급한 추천 ID와 클라이언트 세션 토큰을 API에 전달합니다. 다른 화면으로 이동한 뒤에도 완료 알림에서 추천 결과로 돌아오도록 구현했습니다."
    },
    {
      "title": "인증 복원과 초기 요청 순서",
      "body": "새로고침 후 인증 복원보다 조회 요청이 먼저 나가 익명 사용자의 빈 기록을 받는 문제가 있었습니다. 스토어에서 인증 상태가 확정된 뒤 API를 호출하도록 수정했습니다. 이미 상태가 확정된 경우에는 바로 요청을 보냅니다."
    },
    {
      "title": "배포와 날짜 처리 오류 수정",
      "body": "Workers 배포 후 /api 요청이 정적 페이지로 처리되는 라우팅 문제와 IP 주소를 사용한 프록시 요청 제약을 확인해 대응했습니다. 시간대 없는 응답으로 날짜가 9시간 어긋나는 문제는 시간대가 명시된 값만 받도록 타입을 변경해 수정하고, 같은 형식이 유입되는 다른 경로도 찾아 정리했습니다."
    }
  ]
}

export const en: ProjectText = {
  team: 'Team of 4 (2 backend, 1 designer) · sole frontend developer (11 days)',
  status: 'Ended after the hackathon',
  title: 'Jachwi Bangjeongsik · Lifestyle-based Housing Recommendations',
  description:
    'A mobile web app that scores rental listings out of 100 by combining commute efficiency with weighted living-environment factors. Submitted to the 2026 Wanted hackathon; I helped shape the product with the team and owned the frontend for eleven days.',
  imageNote:
    'Listing photos, prices, and scores on screen are sample data used during the hackathon.',
  overview: [
    'The service filters first by travel efficiency to the places you actually go, then ranks by living-environment factors — daylight, safety, noise, nearby amenities — using weights the user sets, and shows a personalized match score. All four of us shaped the product together, and the screens were built from the Figma designs that came out of it.',
    'I owned the frontend implementation, took part in designing the backend ERD and the API specification, and adjusted the designs with the backend developer and the designer in meetings as we went. The boundary was agreed up front: the domain model and the match-score calculation live in the backend (Spring Boot, MySQL), while the frontend owns input UI, requests, and presenting results.',
    'When work started the backend had exactly one controller — authentication — so the screens, state, and flows were built against mocks, swapping only the data source as each contract landed. I developed the frontend over eleven days and deployed the static assets and an API proxy together on Cloudflare Workers.',
  ],
  highlights: [
    '11 days — sole frontend developer, plus product, ERD, and API-spec design',
    'Build on mocks, cut them out when the contract lands — components always go through a store',
    'A 480px app shell with zero breakpoints — no width branches, designed inside a 320px budget',
    'Recommendations without sign-in — the recommendation ID itself is the capability token',
    'Identity split into permission and ownership axes, with a store gate that waits for auth',
  ],
  techNotes: [
    {
      title: 'Build on mocks, cut them out when the contract lands',
      body: 'While the backend had no controllers, inventing types from guessed response shapes would have made all of them lies later. Components never call the API modules directly, always going through a store, so as contracts landed — listings, then anchors and favorites, then recommendations — only the data source was cut away while the screens stayed. Once the last mock was gone, the failure paths it had always answered successfully were revisited, including a reverse geocode failure that left the loading state stuck.',
    },
    {
      title: 'A mobile-only shell with no breakpoints',
      body: 'A mobile-only service that opens on a desktop looks unfinished, and solving that responsively means maintaining a layout per width. Instead a 480px white shell sits centered on a grey field, so it reads as a mobile app being viewed on a desktop. With no layout that changes by width, each new screen has one fewer axis to consider, and the 320px budget becomes the constraint instead: a listing card spends a fixed 168px on an 80px thumbnail, a 64px score donut and gaps, leaving 112px for text.',
    },
    {
      title: 'Recommendations without sign-in — the ID is the permission',
      body: 'Demanding a login from a first-time visitor loses them before they see what the service does. There is no need to know who the user is, only whether they are entitled to view this result, so an unguessable server-issued recommendation ID plus a client session token header act as identity. The ID being the permission makes its format a security requirement, and it lets asynchronous recommendations — wander off, come back on a completion toast — work fully signed out.',
    },
    {
      title: 'Splitting identity into permission and ownership',
      body: 'The access token lives in memory only and is reissued on every refresh, but a screen’s initial request fires before that restore finishes. With no token the server resolves ownership from the client session, so the request did not fail — it quietly returned anonymous data, which only users arriving by deep link would ever see. A guard that asked whether the call was allowed could not cover endpoints that are callable while signed out, so a gate that waits until auth settles was placed in the store and awaited before any server call. When the state is already settled it passes through instantly, so the signed-out path stays fast.',
    },
    {
      title: 'What only the deployed environment reveals',
      body: 'The static assets and the API proxy ship in one Worker. Assets are matched first by default, so /api/* fell through to the SPA fallback, and Workers’ fetch refuses an IP literal destination — neither shows up on the local dev server, so both surfaced only after deploying. Response timestamps arriving without an offset were handled by making consumers require an absolute time type, which caught the nine-hour date drift and a second entry point nobody knew about at compile time.',
    },
  ],
}
