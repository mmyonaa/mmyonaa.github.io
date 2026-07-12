import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '자사 서비스 플랫폼 리뉴얼',
  description:
    'APOC Play(3D·인터랙티브 콘텐츠 공유 플랫폼)의 리뉴얼을 맡아 홈·검색·콘텐츠 상세·마이페이지 등 주요 화면을 새 디자인에 맞춰 전면 개선하고, 컴포넌트 기반으로 재구성했습니다.',
  overview: [
    'APOC Play(apoc.day)는 크리에이터가 APOC Studio로 만든 3D·인터랙티브 콘텐츠를 게시하고 이용자가 탐색·감상하며 상호작용하는 콘텐츠 공유 플랫폼입니다. 저는 이 플랫폼의 리뉴얼을 맡아 홈 피드·검색·콘텐츠 상세·마이페이지·작가 페이지·내 콘텐츠 관리까지 이용자 흐름 전반의 인터페이스를 새 디자인에 맞춰 전면 개선하고 기능을 재구현했습니다.',
    '리뉴얼에서 특히 공들인 부분은 반복 UI의 공통 컴포넌트화와 디자인 시스템 정립, 그리고 기존 로직과의 충돌을 최소화하는 마이그레이션 중심 리팩토링입니다. 콘텐츠 편집이 APOC Studio로 이어지는 연동 흐름을 구성했고, 한/영 다국어를 지원합니다.',
  ],
  highlights: [
    'APOC Play 플랫폼 전면 리뉴얼 — 홈·검색·콘텐츠 상세·마이페이지·작가·내 콘텐츠 관리',
    '리뉴얼 디자인에 맞춰 인터페이스 전면 개선·기능 재구현',
    '반복 UI를 공통 컴포넌트로 추출, 디자인 시스템·컴포넌트 가이드로 일관성 확보',
    '콘텐츠 상호작용(팔로우·알림·좋아요·저장·댓글·공유) 화면 재구성',
    'APOC Studio 연동 — 콘텐츠 편집으로 이어지는 이동 흐름',
    '신규 기능 도입 시 기존 로직 충돌 최소화·마이그레이션 고려',
  ],
  techNotes: [
    {
      title: '컴포넌트 기반 리뉴얼·리팩토링',
      body: '리뉴얼 디자인에 맞춰 홈·검색·콘텐츠 상세·마이페이지 등 주요 화면의 인터페이스를 전면 개선하고 기능을 재구현했습니다. 반복되는 카드·리스트·모달 등 UI를 공통 컴포넌트로 추출하고 디자인 시스템·컴포넌트 가이드를 세워 화면 간 일관성과 유지보수성을 높였으며, 신규 기능 도입 시 기존 로직과의 충돌을 최소화하도록 마이그레이션을 고려해 리팩토링했습니다.',
    },
    {
      title: '콘텐츠 플랫폼 화면 구성',
      body: 'APOC Play의 이용자 흐름 전반을 리뉴얼 범위로 다뤘습니다. 홈 피드·검색 결과·콘텐츠 상세(크리에이터 팔로우·좋아요·저장·공유·댓글/대댓글·관련 콘텐츠), 마이페이지(조회·저장·팔로잉), 작가 페이지, 내 콘텐츠 관리(공개 범위·정렬·통계·삭제)까지 화면을 재구성했고, 콘텐츠 편집은 APOC Studio로 이어지도록 연동 흐름을 구성했습니다. 한/영 다국어를 지원합니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'In-house Service Platform Renewal',
  description:
    'Led the renewal of APOC Play (a 3D/interactive content-sharing platform), overhauling the home, search, content detail, and my-page screens to match the new design and restructuring them around reusable components.',
  overview: [
    'APOC Play (apoc.day) is a content-sharing platform where creators publish 3D/interactive content built in APOC Studio and users browse, view, and interact with it. I led its renewal — overhauling the interfaces across the entire user flow, from the home feed, search, and content detail to my page, creator pages, and my-content management, to match the new design and reimplementing their features.',
    'What I invested in most were extracting repeated UI into shared components, establishing the design system, and refactoring around migration to minimize conflicts with existing logic. I also wired content editing to flow into APOC Studio, with Korean/English support.',
  ],
  highlights: [
    'Full renewal of the APOC Play platform — home, search, content detail, my page, creator, my-content management',
    'Overhauled interfaces and reimplemented features to match the renewed design',
    'Extracted repeated UI into shared components; ensured consistency with a design system and component guide',
    'Restructured content-interaction screens (follow, notifications, likes, saves, comments, share)',
    'APOC Studio integration — navigation flow into content editing',
    'Minimized conflicts with existing logic and planned migrations when adding new features',
  ],
  techNotes: [
    {
      title: 'Component-based renewal & refactoring',
      body: 'Overhauled the interfaces of the main screens (home, search, content detail, my page, …) to match the renewed design and reimplemented their features. Repeated UI — cards, lists, modals — was extracted into shared components, and a design system and component guide raised cross-screen consistency and maintainability; refactoring accounted for migration to minimize conflicts with existing logic when adding new features.',
    },
    {
      title: 'Content-platform screen composition',
      body: 'The renewal covered the platform’s user flows end to end: the home feed, search results, content detail (creator follow, likes, saves, share, comments/replies, related content), my page (viewed/saved/following), creator pages, and my-content management (visibility, sorting, stats, deletion) — with content editing flowing into APOC Studio. Korean/English are supported.',
    },
  ],
}
