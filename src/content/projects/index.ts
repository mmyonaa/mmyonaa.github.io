// 프로젝트 텍스트 모듈 집계. 각 프로젝트 파일은 ko·en 두 언어를 나란히 export 하고,
// 여기서 slug 기준 Record 로 모아 buildProjects 에 전달합니다.

import type { ProjectText } from '../shared'
import * as sentivexAi from './sentivex-ai'
import * as sentivexWeb from './sentivex-web'
import * as bkTheater from './bk-theater'
import * as ecologyContent from './ecology-content'
import * as apocStudio from './apoc-studio'
import * as apocRenewal from './apoc-renewal'
import * as apocPayment from './apoc-payment'
import * as esimAdmin from './esim-admin'
import * as esimKiosk from './esim-kiosk'
import * as esimService from './esim-service'
import * as portfolio from './portfolio'

// slug → 프로젝트 모듈 (표시 순서와 무관 — buildProjects 가 shared 의 순서를 따름)
const modules: Record<string, { ko: ProjectText; en: ProjectText }> = {
  'sentivex-ai': sentivexAi,
  'sentivex-web': sentivexWeb,
  'bk-theater': bkTheater,
  'ecology-content': ecologyContent,
  'apoc-studio': apocStudio,
  'apoc-renewal': apocRenewal,
  'apoc-payment': apocPayment,
  'esim-admin': esimAdmin,
  'esim-kiosk': esimKiosk,
  'esim-service': esimService,
  portfolio,
}

export const projectTextKo: Record<string, ProjectText> = Object.fromEntries(
  Object.entries(modules).map(([slug, m]) => [slug, m.ko]),
)

export const projectTextEn: Record<string, ProjectText> = Object.fromEntries(
  Object.entries(modules).map(([slug, m]) => [slug, m.en]),
)
