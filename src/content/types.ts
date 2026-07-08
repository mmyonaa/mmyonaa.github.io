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

export interface AboutDetail {
  intro: string
  paragraphs: string[]
  principles: AboutPrinciple[]
  timeline: AboutTimelineItem[]
  activities: AboutTimelineItem[]
  education: AboutEducationItem[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ProjectTechNote {
  title: string
  body: string
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
  mediaNote?: string // 이미지 비공개 사유 (값이 있으면 이미지 자리에 '비공개' 플레이스홀더 표시)
  presentationImages?: string[] // 상세 하단 'Presentation' 갤러리 슬라이드 (16:9)
  presentationNote?: string // Presentation 섹션 설명 문구
  architectureImages?: string[] // 'Architecture' 섹션 다이어그램 이미지 경로 (다크 기본, '-light' 변형 지원)
  architectureCaptions?: string[] // 각 다이어그램 캡션 (images 와 같은 순서)
  architectureNotes?: string[] // 각 다이어그램 아래 설명 문단 (images 와 같은 순서)
  related?: { slug: string; role: string }[] // 함께 이루는 시스템의 관련 프로젝트 (slug + 이 시스템에서의 역할)
  systemHub?: { label: string; sub?: string } // SystemGraph 중앙 허브 라벨 (예: 공유 백엔드 / 플랫폼 연동)
  analysisPipeline?: boolean // 'Analysis pipeline' 라이브 다이어그램 섹션 표시 (sentivex-ai 전용)
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
