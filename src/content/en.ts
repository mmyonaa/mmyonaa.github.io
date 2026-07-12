// English content (assembly) — actual text lives in site.ts and projects/<slug>.ts.

import type { SiteContent } from './types'
import { buildProjects, contacts, profileBase, skills, socials } from './shared'
import { siteEn } from './site'
import { projectTextEn } from './projects'

export const en: SiteContent = {
  profile: { ...profileBase, tagline: siteEn.tagline, resumeUrl: '/resume-en.pdf' },
  contacts,
  skills,
  socials,
  about: siteEn.about,
  aboutDetail: siteEn.aboutDetail,
  projects: buildProjects(projectTextEn),
}
