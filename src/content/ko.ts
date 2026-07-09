// 한국어 콘텐츠 (조립) — 실제 텍스트는 site.ts, projects/<slug>.ts 에 있습니다.

import type { SiteContent } from './types'
import { buildProjects, contacts, profileBase, skills, socials } from './shared'
import { siteKo } from './site'
import { projectTextKo } from './projects'

export const ko: SiteContent = {
  profile: { ...profileBase, tagline: siteKo.tagline },
  contacts,
  skills,
  socials,
  about: siteKo.about,
  aboutDetail: siteKo.aboutDetail,
  projects: buildProjects(projectTextKo),
}
