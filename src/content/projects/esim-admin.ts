import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'eSIM 판매 관리 사이트',
  architectureCaptions: ['eSIM 플랫폼 구조 — 운영·관리 축'],
  architectureNotes: [
    '이 어드민이 상품·재고·업체·유저·정산을 관리하고, 온라인 커머스와 키오스크는 그 데이터를 공유 백엔드(Koa·PostgreSQL)로 받아 판매합니다. 즉 온·오프라인 판매가 하나의 운영·정산 체계로 묶입니다. 키오스크는 여러 공항·장소에 분산 배치되며, 어드민에서 각 기기의 주문·정산을 집계·관리합니다.',
  ],
  description: 'eSIM 어드민과 백엔드 미들웨어를 함께 개발하며 권한·정산·주문·다국어 등 핵심 기능을 담당했습니다.',
  mediaNote: '실제 운영 데이터가 포함되어 화면은 비공개합니다.',
  overview: [
    'eSIM 사업의 관리자(어드민)와 백엔드 미들웨어를 프론트·백엔드 양쪽에서 개발한 프로젝트입니다. Vue 3·TypeScript·Pinia 프론트(80여 개 화면)와 Koa·PostgreSQL 미들웨어(30여 개 컨트롤러)에 걸쳐 상품·주문·정산·회원·업체·키오스크·오프라인·포인트 등 여러 도메인의 핵심 기능을 맡았습니다.',
    '직접 담당한 대표 작업으로는 관리자 권한 시스템(RBAC) 설계, 광고·유입업체 정산 화면·API 추가, 키오스크·사이트 주문관리(주문번호·ICCID·판매업체 검색과 엑셀 내보내기), 통화·기기별 결제 게이트웨이(PG) 동적 선택, 오프라인 판매·포인트 관리 등이 있습니다.',
    '다국가 운영을 위해 vue-i18n 3개 언어(한/영/일)와 상품명·설명 번역 기능, moment-timezone 기반 현지 타임존 처리, 여러 eSIM 공급사와의 외부 연동 주문을 구현했습니다. 온라인 서비스·키오스크와 백엔드를 공유해 온·오프라인 판매가 하나의 운영·정산 체계에서 관리됩니다.',
  ],
  highlights: [
    '관리자 권한 시스템(RBAC) 설계 — 역할 계층 기반 기능 제한',
    '광고·유입업체 정산 화면·API 추가 및 정산 컬럼 확장',
    '키오스크·사이트 주문관리 (주문번호·ICCID·판매업체 검색, 엑셀 내보내기)',
    '다국어(한·영·일) + 상품 번역, 통화·타임존 다국가 대응',
    '여러 eSIM 공급사 외부 연동 주문 처리 (프론트·백엔드 풀스택)',
  ],
  techNotes: [
    {
      title: '관리자 권한 시스템 (RBAC)',
      body: '역할을 최고관리자·업체관리자·키오스크관리자·일반회원 등으로 나누고, 권한을 숫자 인덱스로 매핑해 상위 권한만 하위를 관리하도록 계층 비교로 제한했습니다. 최고관리자만 관리자 계정을 등록·수정할 수 있게 하고, 로그인 가능 범위와 드롭다운 노출도 권한에 따라 필터링했습니다.',
    },
    {
      title: '정산 · 주문 관리 + 엑셀 내보내기',
      body: '광고·유입업체 정산 화면과 조회 API를 추가하고 회원·업체 리스트에 유입업체 컬럼을 확장했습니다. 키오스크·사이트 주문을 주문번호·ICCID·판매업체명으로 검색하게 하고, 조회 결과를 xlsx로 클라이언트에서 엑셀 워크북으로 생성(기간·주문 유형별 컬럼 분기)해 내려받도록 구현했습니다.',
    },
    {
      title: '다국가 · 다통화 운영',
      body: 'vue-i18n으로 한/영/일 3개 언어를 지원하고 상품명·상품설명 번역 기능을 붙였습니다. moment-timezone으로 현지 타임존을 UTC와 변환해 정산·주문 날짜를 처리하고, 통화·기기별로 결제 게이트웨이(PG) 선택지를 동적으로 필터링했으며, 포인트는 통화별 적립율로 관리했습니다.',
    },
    {
      title: '다국어 입력 검증 정규식',
      body: '다국어 입력을 위해 이름 검증에 히라가나·가타카나·CJK 한자·한글을 함께 허용하는 정규식을 설계해, 한·영·일 사용자 입력을 하나의 검증 체계로 처리했습니다.',
    },
    {
      title: '외부 연동 · 풀스택 개발',
      body: '여러 eSIM 공급사 API와 연동해 외부 주문을 조회·처리하고, Koa·PostgreSQL 미들웨어에서 정산·주문·회원 도메인의 컨트롤러·서비스·레포지토리·엔티티를 함께 개발했습니다. lz-string으로 대량 응답을 압축하고 Sentry로 프론트 에러를 수집했습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'eSIM Sales Management Site',
  architectureCaptions: ['eSIM platform map — operations & management'],
  architectureNotes: [
    'This admin manages products, stock, partners, users, and settlement, while the online commerce and kiosk sell using that data through a shared backend (Koa/PostgreSQL). Online and offline sales run on one operations/settlement system. Kiosks are distributed across multiple airports/locations, and the admin aggregates each device’s orders and settlement.',
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
      body: 'For multilingual input I designed name-validation regex that allows Hiragana, Katakana, CJK Han, and Hangul together, handling KO/EN/JA user input in a single validation scheme.',
    },
    {
      title: 'External integration & full-stack work',
      body: 'Integrated with several eSIM supplier APIs to fetch and process external orders, and built the controllers, services, repositories, and entities for the settlement/order/member domains in the Koa/PostgreSQL middleware. Large responses are compressed with lz-string, and frontend errors are captured with Sentry.',
    },
  ],
}
