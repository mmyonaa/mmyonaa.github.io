// 콘텐츠 타입 정의 (언어 공통)

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  resumeUrl: string
}

export interface ContactItem {
  icon: string
  label: string
  value: string
  href: string
}

export interface AboutContent {
  paragraphs: string[]
}

export interface AboutPrinciple {
  title: string
  body: string
}

export interface AboutTimelineItem {
  period: string
  title: string
  body: string
}

export interface AboutEducationItem {
  period: string
  school: string
  degree: string
  notes: string[]
}

export interface AboutLanguageItem {
  name: string
  level: string
}

export interface AboutDetail {
  intro: string
  paragraphs: string[]
  principles: AboutPrinciple[]
  timeline: AboutTimelineItem[]
  activities: AboutTimelineItem[]
  education: AboutEducationItem[]
  languages: AboutLanguageItem[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ProjectTechNote {
  title: string
  body: string
}

// 'Part of the same system' 레이어 다이어그램 (시스템 단위로 shared.ts systemMaps 에 정의)
export interface SystemNode {
  id: string
  label: string
  sub?: string // 부제 (기술 스택 등)
  slug?: string // 포트폴리오 프로젝트 slug — 있으면 해당 상세 페이지로 링크
  layer: number // 층 인덱스 (SystemMap.layers 기준, 위 → 아래)
  x?: number // 가로 위치(%) 수동 지정 — 생략 시 층 내 균등 배치
}

export interface SystemEdge {
  from: string // SystemNode.id
  to: string // SystemNode.id
  label?: string // 엣지 중앙 라벨 (REST · SSE 등 프로토콜)
}

export interface SystemMap {
  layers: string[] // 층 라벨 (위 → 아래 순서)
  nodes: SystemNode[]
  edges: SystemEdge[]
}

export interface Project {
  slug: string
  title: string
  period: string
  description: string
  tags: string[]
  highlights: string[]
  link: string
  company: string
  repo?: string
  apiDocs?: string // API 문서(Swagger 등) 링크 — 상세 페이지 Links 블록에 표시
  images?: string[] // 상세 페이지 히어로에 슬라이드로 표시되는 스크린샷 경로
  imageFrame?: 'kiosk' | 'tablet' | 'phone' // 스크린샷을 기기 목업 프레임으로 표시 (kiosk: 세로 9:16, tablet: 가로 16:9, phone: 세로 3:5)
  imageNote?: string // 슬라이더 아래 한 줄 캡션 — 화면 속 콘텐츠의 저작·기여 범위 명시용
  overview?: string[] // 상세 페이지 Overview 문단 (포트폴리오용 상세 설명)
  techNotes?: ProjectTechNote[] // 상세 페이지 Technical notes (기술 포인트/문제 해결)
  qa?: {
    stats: { value: string; label: string }[] // 요약 지표 (기기 수·케이스 수 등)
    findings?: { title: string; body: string; media?: string }[] // 대표 개선 사항 (media: 개선 동작 애니메이션 webp)
    note?: string // 원본 문서 비공개 등 부가 설명
  } // 'QA & Testing' 섹션 — 테스트 시트에서 추출한 지표·대표 이슈
  mediaNote?: string // 이미지 비공개 사유 (값이 있으면 이미지 자리에 '비공개' 플레이스홀더 표시)
  presentationImages?: string[] // 상세 하단 'Presentation' 갤러리 슬라이드 (16:9)
  presentationNote?: string // Presentation 섹션 설명 문구
  photos?: string[] // 'On-site' 현장 사진 갤러리 (기기 프레임 없이 원본 비율, 라이트박스)
  photosNote?: string[] // On-site 섹션 설명 문단(들)
  architectureImages?: string[] // 'Architecture' 섹션 다이어그램 이미지 경로 (다크 기본, '-light' 변형 지원)
  architectureCaptions?: string[] // 각 다이어그램 캡션 (images 와 같은 순서)
  architectureNotes?: string[] // 각 다이어그램 아래 설명 문단 (images 와 같은 순서)
  related?: { slug: string; role: string }[] // 함께 이루는 시스템의 관련 프로젝트 (slug + 이 시스템에서의 역할)
  systemId?: string // 소속 시스템 (shared.ts systemMaps 키) — 'Part of the same system' 레이어 다이어그램 표시
  analysisPipeline?: boolean // 'Analysis pipeline' 라이브 다이어그램 섹션 표시 (sentivex-ai 전용)
  paymentFlow?: boolean // 'Subscription flow' 업/다운그레이드 플로우 다이어그램 표시 (apoc-payment 전용)
}

export interface Social {
  label: string
  url: string
}

export interface SiteContent {
  profile: Profile
  contacts: ContactItem[]
  about: AboutContent
  aboutDetail: AboutDetail
  skills: SkillGroup[]
  projects: Project[]
  socials: Social[]
}
