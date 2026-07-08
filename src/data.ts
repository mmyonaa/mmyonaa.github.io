// 포트폴리오 콘텐츠의 공개 API.
// 실제 콘텐츠는 언어별로 src/content/ko.ts, src/content/en.ts 에 있습니다.
// 현재 언어(i18n)에 따라 자동 선택되며, 컴포넌트는 이 파일의 export 만 사용합니다.
//  - 템플릿에서는 ref 가 자동 unwrap, 스크립트에서는 .value 로 접근하세요.

import { computed } from 'vue'
import { locale } from './i18n'
import type { SiteContent } from './content/types'
import { ko } from './content/ko'
import { en } from './content/en'

export type {
  Profile,
  ContactItem,
  AboutContent,
  AboutPrinciple,
  AboutTimelineItem,
  AboutEducationItem,
  AboutDetail,
  SkillGroup,
  Project,
  Social,
  SiteContent,
} from './content/types'

const content = computed<SiteContent>(() => (locale.value === 'en' ? en : ko))

export const profile = computed(() => content.value.profile)
export const contacts = computed(() => content.value.contacts)
export const about = computed(() => content.value.about)
export const aboutDetail = computed(() => content.value.aboutDetail)
export const skills = computed(() => content.value.skills)
export const projects = computed(() => content.value.projects)
export const socials = computed(() => content.value.socials)
