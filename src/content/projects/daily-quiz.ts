import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  "team": "1인",
  "status": "운영 중",
  "title": "daily.quiz · 자격증 문제 연습장",
  "description": "정보처리기사·정보보안기사의 필기와 실기 문항을 풀고 채점·해설을 확인하는 학습 사이트입니다.",
  "overview": [
    "blog-mcp의 개념 글을 바탕으로 LLM이 생성한 필기 875문항·실기 67문항과 주제 137개를 제공합니다. 해설에서 관련 개념 글로 이동할 수 있으며, 출제·채점은 브라우저에서 처리합니다."
  ],
  "highlights": [
    "실기 단답의 표기 정규화와 허용 답안 기반 자동 채점",
    "1·3·7일 간격 복습과 계정별 오답·북마크 저장",
    "문항 스키마·주제 참조 검증과 블로그 변경 사항 자동 점검"
  ],
  "techNotes": [
    {
      "title": "실기 답안 채점",
      "body": "대소문자·띄어쓰기·전각 문자·하이픈을 정규화하고 문항별 허용 답안과 비교합니다. 사용자가 허용 표기를 로컬에 추가할 수도 있습니다. 단답·계산·코드 출력·SQL은 자동 채점하고, 약술형은 모범답안·핵심어를 보고 직접 채점하도록 했습니다."
    },
    {
      "title": "두 시험의 화면과 로직 공유",
      "body": "문항이 속한 주제로 시험을 구분하고 라우트와 화면을 공유합니다. 시험별로 채점기·영역 목록·저장 키를 분리해 오답노트와 중단 기록이 섞이지 않도록 했습니다."
    },
    {
      "title": "간격 반복 복습",
      "body": "오답을 1일·3일·7일 간격으로 복습하고 마지막 단계를 통과하면 복습 대상에서 제외합니다. 홈에는 전체 오답 수 대신 오늘 복습할 문항 수를 표시했습니다."
    },
    {
      "title": "빌드 검증과 블로그 동기화",
      "body": "Astro·zod로 문항 스키마와 주제 참조를 검증하고, 코드 출력 문항은 실제 실행해 정답을 확인했습니다. 빌드 전에 RSS로 연결 글의 존재 여부를 검사하되 네트워크 실패 시에는 경고 후 진행합니다. 주간 작업은 GitHub 트리의 변경을 비교해 삭제·개정된 글과 미출제 주제를 이슈로 등록하며 중복 보고를 방지합니다."
    },
    {
      "title": "사용자 데이터 저장",
      "body": "문항·해설은 정적 HTML로 제공하고 북마크·오답 기록만 Supabase에 저장합니다. Google 로그인과 RLS로 사용자별 데이터를 분리했습니다. 사용 중인 무료 플랜의 비활성 일시 중지에 대응해 테이블을 주기적으로 조회하는 작업도 구성했습니다."
    }
  ]
}

export const en: ProjectText = {
  team: 'Solo',
  status: 'Live',
  title: 'daily.quiz · Certification Practice',
  description:
    'A static practice ground for two Korean IT certifications — multiple-choice written exams and short-answer practical exams with instant grading and explanations. A sister project to the blog-mcp blog: each explanation links back to the concept post.',
  overview: [
    'A sister project built so the concept posts blog-mcp publishes daily do not end at "read and done." The same topics come back as questions, and a wrong answer leads from the explanation to the blog post. It currently holds 875 written questions (515 + 360 across the two exams), 67 practical questions, and 137 concept topics.',
    'It runs without a server. Questions, answers, and explanations are baked into HTML at build time, and generating and grading a set happens entirely in the browser. Only user data (bookmarks, wrong-answer history) lives in Supabase, behind Google sign-in and RLS isolation per user. The question bank sits behind an Astro content collection with a zod schema as the publish gate — a question that breaks the schema or points at a nonexistent topic fails the build.',
    'Two axes were genuinely hard: grading free-form practical answers with no choices to compare against, and opening two exams with different formats through a single set of screens.',
  ],
  highlights: [
    '875 written and 67 practical questions, 137 concept topics — LLM-generated from the blog concept posts',
    'Automatic grading for free-form practical answers — notation normalization, accepted-form synonym lists',
    'Spaced-repetition wrong-answer notebook — 1 → 3 → 7 days to graduate',
    'Two exams through one set of screens — only grader, area list, and storage keys branch',
    'zod schema as a publish gate — violations and dangling topic references fail the build',
  ],
  techNotes: [
    {
      title: 'Automatic grading for free-form answers',
      body: 'With no choices to compare against, "is this correct?" was the whole problem. The same answer drifts across case, spacing, full-width characters, and word hyphens, so normalization absorbs that first, and genuinely different wording that means the same thing is declared per question as an accepted-form list. Anything that still leaks, the user appends locally via "accept this form too." Short answers, calculations, code output, and SQL grade automatically; only descriptive answers are left to self-grading against a model answer and key terms — a deliberate boundary rather than forcing automation where it does not hold.',
    },
    {
      title: 'Two exams, one set of screens',
      body: 'The two certifications differ in subjects, areas, and practical format. Questions do not carry an exam directly — they inherit it through their topic — so the exam axis lives in data while the screens stay shared. One set of routes built on a rest parameter serves both (no prefix for one, /sec for the other), and only the grader, the area list, and browser storage keys branch. Splitting the storage keys per exam keeps wrong-answer notebooks and interrupted sessions from overwriting each other across exams.',
    },
    {
      title: 'Spaced-repetition wrong-answer notebook',
      body: 'Wrong answers accumulate automatically and are not cleared the moment you get one right. Review is deferred 1 → 3 → 7 days, and only clearing the last stage graduates an item. The home screen leads with "N wrong answers to review today" rather than "N accumulated" for the same reason — the accumulated pile is a burden, while today\'s list is an achievable target.',
    },
    {
      title: 'Coupling with the blog — public artifacts, no API',
      body: 'Neither site exposes an API to the other. daily.quiz reads only the blog\'s RSS feed and GitHub tree to keep the links aligned. Before each build it verifies through RSS that every question\'s relatedPost actually exists (a missing post fails the build) and regenerates post titles into post-titles.json so link text never drifts when a title changes; if the network is down it warns and passes rather than blocking an offline build. Every Monday it compares blob SHAs in the blog repo tree against the previous state to surface dead links, revised posts (explanations worth re-reading), and coverage gaps — topics with a post but no questions — and opens a GitHub issue. The state is committed back so the same change is reported once, not every week.',
    },
    {
      title: 'Content quality enforced by the build',
      body: 'Questions and topics sit in an Astro content collection with a zod schema acting as a publish gate. A question that violates the schema or references a nonexistent topic fails the build. Code-output questions were verified by actually running the code. A blog-sync script validates blog links during prebuild and reports dead links, revised posts, and question-coverage gaps weekly.',
    },
    {
      title: 'Static site with minimal server state',
      body: 'Generating and grading happen in the browser; the only thing on the server is user data. Supabase Google sign-in ties bookmarks and wrong-answer history to an account, isolated per user by RLS. The free tier suspends a project after seven days without database activity, and health-check endpoints do not count as activity — so a keepalive cron reads an actual table once a day to prevent it.',
    },
  ],
}
