import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '구성초 컨텐츠 플레이·관리 사이트',
  description:
    '학생/교사 권한별 맞춤 UI와 컨텐츠 시청 기록, 교사용 학생 관리 기능을 구현한 초등 디지털 리터러시 컨텐츠 사이트.',
  imageNote:
    '화면 속 수업 콘텐츠(교안·일러스트)는 별도 제작팀의 저작물입니다 — 본 작업 범위는 권한별 플레이·시청 기록·학생 관리 플랫폼 개발입니다.',
  highlights: [
    '학생/교사 권한에 따른 UI·접근 기능 차등 제공',
    '역할별 동적 라우팅으로 교사/학생 화면 분기',
    '컨텐츠 시청 기록 저장으로 학습 데이터 관리',
    '교사용 관리자에서 학생 정보 등록·수정·삭제 구현',
  ],
}

export const en: ProjectText = {
  title: 'Guseong Elementary Content Play & Admin Site',
  description:
    'An elementary digital-literacy content site with role-based UIs for students and teachers, content viewing history, and student management for teachers.',
  imageNote:
    'The lesson content shown (curriculum · illustrations) was produced by a separate content team — my work covers the role-based playback, viewing-history and student-management platform.',
  highlights: [
    'Differentiated UI and access by student/teacher role',
    'Role-based dynamic routing to split teacher/student views',
    'Stored content viewing history to manage learning data',
    'Implemented student create/update/delete in the teacher admin',
  ],
}
