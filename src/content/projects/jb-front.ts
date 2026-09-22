import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  team: '팀 3~4인 · 프론트엔드 단독 (11일)',
  status: '해커톤 제출 후 종료',
  title: '자취방정식 · 라이프스타일 기반 주거 매물 추천',
  description:
    '통근 효율성과 생활 환경 가중치를 결합해 100점 만점 매칭 점수를 내는 주거 매물 추천 모바일 웹앱. 2026 Wanted 해커톤 제출작으로, 팀 기획에 함께 참여하고 11일 동안 프론트엔드를 단독으로 맡았습니다.',
  imageNote:
    '화면의 매물 사진·가격·점수는 해커톤 기간에 쓴 샘플 데이터입니다. 실기기 캡처에서 브라우저 주소창과 하단 툴바만 잘라냈습니다.',
  overview: [
    '거점까지의 이동 효율성으로 1차 거르고, 채광·치안·소음·편의 인프라에 사용자가 직접 매긴 가중치로 2차 정렬해 개인화된 매칭 점수를 보여주는 서비스입니다. 기획은 팀 3~4인이 함께 했고, 거기서 나온 피그마 디자인을 기반으로 화면을 개발했습니다.',
    '프론트엔드 구현을 단독으로 맡으면서 백엔드 ERD·API 명세 설계에도 참여했고, 개발 중에는 백엔드·디자이너와 회의하며 디자인을 함께 조정했습니다. 도메인 모델과 매칭 점수 계산은 백엔드(Spring Boot · MySQL)에 두고 프론트는 입력 UI·요청·결과 표시를 맡는 경계를 먼저 합의했습니다.',
    '작업 시작 시점의 백엔드에는 인증 컨트롤러 하나뿐이어서, 화면·상태·흐름을 목(mock)으로 먼저 세우고 계약이 생길 때마다 데이터 출처만 갈아끼웠습니다. 11일 동안 179커밋 · src 11,205줄로 마감했고, 배포는 Cloudflare Workers에 정적 에셋과 API 프록시를 함께 올렸습니다.',
  ],
  highlights: [
    '11일 · 179커밋 · src 11,205줄 — 프론트엔드 단독 · 기획과 ERD·API 명세 설계 참여',
    '목으로 먼저 짓고 계약이 생기면 걷어내는 구조 — 컴포넌트는 항상 스토어 경유',
    '브레이크포인트 없는 480px 앱 셸 — 폭 분기 없이 320px 예산 안에서 설계',
    '비로그인 추천 — 추천 ID 자체가 열람 권한(capability token)',
    '인증을 권한·소유권 두 축으로 분리하고 스토어 게이트로 대기 처리',
  ],
  techNotes: [
    {
      title: '목으로 먼저 짓고, 계약이 생기면 걷어낸다',
      body: '백엔드에 컨트롤러가 없는 동안 응답 모양을 추측해 타입을 만들면 나중에 전부 거짓이 됩니다. 컴포넌트가 API 모듈을 직접 부르지 않고 항상 스토어를 거치게 해서, 매물 → 거점·찜 → 추천 순으로 계약이 생길 때마다 화면은 그대로 두고 데이터 출처만 잘라냈습니다. 목을 다 걷어낸 뒤에는 목이 늘 성공으로 받아주던 실패 경로를 다시 훑어, 역지오코딩이 실패하면 로딩이 풀리지 않던 문제까지 함께 정리했습니다.',
    },
    {
      title: '브레이크포인트를 쓰지 않는 모바일 전용 셸',
      body: '모바일 전용 서비스인데 데스크톱에서 열면 덜 만든 화면으로 보이는 게 문제였습니다. 반응형으로 풀면 폭마다 레이아웃을 따로 관리해야 하므로, 회색 바탕 위에 480px 흰 셸을 중앙 고정해 “모바일 앱을 데스크톱에서 보는 중”으로 읽히게 했습니다. 폭에 따라 바뀔 레이아웃이 없으니 화면을 추가할 때 고려할 축이 하나 줄고, 대신 320px 예산이 기준이 됩니다 — 매물 카드는 썸네일 80px + 점수 도넛 64px + 여백으로 168px 을 고정으로 쓰고 본문에 112px 을 남깁니다.',
    },
    {
      title: '비로그인 추천 — 추천 ID가 곧 열람 권한',
      body: '첫 방문자에게 로그인을 요구하면 서비스의 핵심 가치를 보기 전에 이탈합니다. “이 사용자가 누구인가”가 아니라 “이 결과를 볼 자격이 있는가”만 판정하면 되므로, 서버가 발급한 추측 불가능한 추천 ID와 클라이언트 세션 토큰 헤더를 신원으로 삼았습니다. ID 자체가 권한이라 ID 형식이 곧 보안 요구사항이 되고, 덕분에 다른 화면을 보다 완료 토스트로 돌아오는 비동기 추천이 비로그인에서도 그대로 동작합니다.',
    },
    {
      title: '인증을 권한·소유권 두 축으로 나누기',
      body: '토큰을 메모리에만 두어 새로고침마다 재발급받는데, 화면의 초기 요청은 복원이 끝나기 전에 나갑니다. 서버는 토큰이 없으면 소유자를 클라이언트 세션으로 가르므로 요청이 실패하지 않고 조용히 익명 사용자의 데이터를 돌려줬습니다 — 딥링크로 들어온 사용자만 빈 기록을 보는 종류의 문제입니다. “부를 자격이 있나”만 보던 기존 가드로는 비로그인도 부를 수 있는 경로를 막지 못해, 인증 상태가 정해질 때까지 기다리는 관문을 스토어에 두고 서버 호출 전에 통과시켰습니다. 이미 정해진 상태면 즉시 통과하므로 비로그인 경로는 느려지지 않습니다.',
    },
    {
      title: '배포 환경에서만 드러나는 것들',
      body: '정적 에셋과 API 프록시를 한 Worker에 올렸습니다. 기본 설정은 에셋을 먼저 찾아 /api/* 가 SPA 폴백에 걸리고 Workers의 fetch는 IP 목적지를 거부하는데, 둘 다 로컬 개발 서버에서는 드러나지 않아 배포한 뒤에야 잡혔습니다. 응답 시각이 오프셋 없는 문자열로 내려오던 것은 소비처가 절대 시각 타입을 요구하게 바꿔, 9시간 어긋나던 날짜 표기와 미처 몰랐던 두 번째 유입 지점까지 컴파일 단계에서 막았습니다.',
    },
  ],
}

export const en: ProjectText = {
  team: 'Team of 3–4 · sole frontend developer (11 days)',
  status: 'Ended after the hackathon',
  title: 'Jachwi Bangjeongsik · Lifestyle-based Housing Recommendations',
  description:
    'A mobile web app that scores rental listings out of 100 by combining commute efficiency with weighted living-environment factors. Submitted to the 2026 Wanted hackathon; I helped shape the product with the team and owned the frontend for eleven days.',
  imageNote:
    'Listing photos, prices, and scores on screen are sample data used during the hackathon. The captures come from a real device, with only the browser address bar and bottom toolbar cropped away.',
  overview: [
    'The service filters first by travel efficiency to the places you actually go, then ranks by living-environment factors — daylight, safety, noise, nearby amenities — using weights the user sets, and shows a personalized match score. All three to four of us shaped the product together, and the screens were built from the Figma designs that came out of it.',
    'I owned the frontend implementation, took part in designing the backend ERD and the API specification, and adjusted the designs with the backend developer and the designer in meetings as we went. The boundary was agreed up front: the domain model and the match-score calculation live in the backend (Spring Boot, MySQL), while the frontend owns input UI, requests, and presenting results.',
    'When work started the backend had exactly one controller — authentication — so the screens, state, and flows were built against mocks, swapping only the data source as each contract landed. It closed at 179 commits and 11,205 lines of src over eleven days, deployed to Cloudflare Workers with the static assets and an API proxy together.',
  ],
  highlights: [
    '11 days, 179 commits, 11,205 lines of src — sole frontend, plus product, ERD, and API-spec design',
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
