import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'daily.quiz · 자격증 문제 연습장',
  description:
    '정보처리기사·정보보안기사를 필기 4지선다와 실기 필답으로 풀고 즉시 채점·해설을 받는 정적 연습장. blog-mcp 블로그의 자매 프로젝트로, 문항의 해설이 블로그 개념 글로 이어집니다.',
  overview: [
    'blog-mcp가 매일 쌓는 개념 글을 "읽고 끝나지 않게" 만들려고 붙인 자매 프로젝트입니다. 같은 주제를 문항으로 다시 풀게 하고, 틀리면 해설에서 블로그 개념 글로 넘깁니다. 현재 필기 875문항(정처기 515 · 정보보안기사 360), 실기 67문항, 개념 주제 137개를 담고 있습니다.',
    '서버 없이 도는 구조입니다. 문항·정답·해설을 빌드 타임에 HTML로 굽고 출제·채점은 전부 브라우저에서 끝냅니다. 사용자 데이터(북마크·오답 기록)만 Supabase에 두고 Google 로그인 + RLS로 사용자별 격리했습니다. 문제 은행은 Astro 콘텐츠 컬렉션 + zod 스키마가 발행 게이트라, 스키마를 어기거나 존재하지 않는 주제를 가리키는 문항이 들어오면 빌드가 실패합니다.',
    '까다로웠던 축은 두 가지입니다. 하나는 보기가 없는 실기 필답을 자동 채점하는 것, 다른 하나는 형식이 서로 다른 두 시험을 화면 한 벌로 여는 것이었습니다.',
  ],
  highlights: [
    '필기 875문항 · 실기 67문항 · 개념 주제 137개 — 기출 복제 없이 자체 제작, 전 문항 난이도 라벨',
    '실기 필답 자동 채점 — 표기 요동(대소문자·띄어쓰기·전각·하이픈)을 정규화로 흡수하고 동의어는 허용 표기 목록으로 처리',
    '시험 2종을 화면 한 벌로 — 라우트를 rest 파라미터로 공유하고 채점 형식·영역·저장 키만 시험별로 분기',
    '간격 반복 오답노트 — 맞혀도 바로 지우지 않고 1일 → 3일 → 7일로 미루며, 마지막 단계를 통과해야 졸업',
    'zod 스키마 발행 게이트 — 스키마 위반·미존재 주제 참조는 빌드 실패로 차단',
    'Supabase Google 로그인 + RLS 사용자별 격리, 무료 플랜 일시정지를 막는 keepalive cron',
    '블로그 동기화 스크립트 — 죽은 링크·문항 커버리지 갭을 주간 리포트로 점검',
  ],
  techNotes: [
    {
      title: '실기 필답 자동 채점',
      body: '보기가 없으니 "정답 판정"이 통째로 문제였습니다. 같은 답도 대소문자·띄어쓰기·전각 문자·낱말 하이픈에서 흔들리는데, 이걸 정규화로 흡수한 뒤 뜻이 같은 다른 낱말은 문항이 허용 표기 목록으로 나열하도록 했습니다. 그래도 새는 표기는 사용자가 "이 표기도 정답 처리"로 로컬에 덧붙입니다. 단답·계산·코드 출력·SQL은 자동 채점하고, 약술형만 모범답안·핵심어를 펴 놓고 자가 채점하게 남겼습니다 — 자동화할 수 없는 구간을 억지로 자동화하지 않고 경계를 그은 선택입니다.',
    },
    {
      title: '시험 2종을 화면 한 벌로 — 확장 축 설계',
      body: '정처기와 정보보안기사는 과목·영역·실기 형식이 모두 다릅니다. 문항이 시험을 직접 갖지 않고 주제를 통해 물려받게 해서, 시험 축을 데이터에 두고 화면은 공유했습니다. 라우트는 rest 파라미터 한 벌을 정처기(접두어 없음)와 정보보안기사(/sec)가 함께 쓰고, 갈라지는 것은 채점기·영역 목록·브라우저 저장 키뿐입니다. 저장 키를 시험별로 나눈 건 오답노트와 중단 세션이 시험을 넘어 서로 덮어쓰지 않게 하기 위해서입니다.',
    },
    {
      title: '간격 반복 오답노트',
      body: '오답은 자동으로 쌓이고, 맞혔다고 바로 지우지 않습니다. 1일 → 3일 → 7일로 다시 볼 시점을 미루며 마지막 단계를 통과해야 졸업합니다. 홈이 "쌓인 오답 N개"가 아니라 "오늘 복습할 오답 N개"를 먼저 말하도록 만든 것도 같은 의도입니다 — 쌓인 양은 부담이지만 오늘 할 양은 실행 가능한 목표라서요.',
    },
    {
      title: '빌드가 막는 콘텐츠 품질',
      body: '문항·주제를 Astro 콘텐츠 컬렉션 + zod 스키마로 묶어 발행 게이트를 만들었습니다. 스키마를 어긴 문항, 존재하지 않는 주제를 가리키는 문항은 빌드가 실패합니다. 코드 출력 문항은 실제로 실행해 정답을 검산했습니다. blog-sync 스크립트가 prebuild에서 블로그 링크를 검증하고, 주간 리포트로 죽은 링크·글 개정·문항 커버리지 갭을 알려줍니다.',
    },
    {
      title: '정적 사이트 + 최소한의 서버 상태',
      body: '출제·채점은 브라우저에서 끝나고, 서버에 두는 건 사용자 데이터뿐입니다. Supabase Google 로그인으로 북마크·오답 기록을 계정에 묶고 RLS로 사용자별 격리했습니다. 무료 플랜은 7일간 DB 활동이 없으면 프로젝트를 멈추는데, 헬스체크 엔드포인트는 활동으로 집계되지 않아 실제 테이블을 매일 한 번 읽는 keepalive cron으로 막았습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'daily.quiz · Certification Practice',
  description:
    'A static practice ground for two Korean IT certifications — multiple-choice written exams and short-answer practical exams with instant grading and explanations. A sister project to the blog-mcp blog: each explanation links back to the concept post.',
  overview: [
    'A sister project built so the concept posts blog-mcp publishes daily do not end at "read and done." The same topics come back as questions, and a wrong answer leads from the explanation to the blog post. It currently holds 875 written questions (515 + 360 across the two exams), 67 practical questions, and 137 concept topics.',
    'It runs without a server. Questions, answers, and explanations are baked into HTML at build time, and generating and grading a set happens entirely in the browser. Only user data (bookmarks, wrong-answer history) lives in Supabase, behind Google sign-in and RLS isolation per user. The question bank sits behind an Astro content collection with a zod schema as the publish gate — a question that breaks the schema or points at a nonexistent topic fails the build.',
    'Two axes were genuinely hard: grading free-form practical answers with no choices to compare against, and opening two exams with different formats through a single set of screens.',
  ],
  highlights: [
    '875 written + 67 practical questions and 137 concept topics — all original, never copied from past papers, every item difficulty-labeled',
    'Automatic grading for free-form practical answers — normalizes notation drift (case, spacing, full-width characters, hyphens); synonyms are declared per question as an accepted-form list',
    'Two exams through one set of screens — routes shared via a rest parameter, with only the grader, area list, and storage keys branching per exam',
    'Spaced-repetition wrong-answer notebook — a correct answer defers review to 1 → 3 → 7 days rather than clearing it; only the last stage graduates',
    'zod schema as a publish gate — schema violations and dangling topic references fail the build',
    'Supabase Google sign-in with per-user RLS isolation, plus a keepalive cron that prevents free-tier project suspension',
    'Blog-sync script — weekly report on dead links and question-coverage gaps',
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
      title: 'Content quality enforced by the build',
      body: 'Questions and topics sit in an Astro content collection with a zod schema acting as a publish gate. A question that violates the schema or references a nonexistent topic fails the build. Code-output questions were verified by actually running the code. A blog-sync script validates blog links during prebuild and reports dead links, revised posts, and question-coverage gaps weekly.',
    },
    {
      title: 'Static site with minimal server state',
      body: 'Generating and grading happen in the browser; the only thing on the server is user data. Supabase Google sign-in ties bookmarks and wrong-answer history to an account, isolated per user by RLS. The free tier suspends a project after seven days without database activity, and health-check endpoints do not count as activity — so a keepalive cron reads an actual table once a day to prevent it.',
    },
  ],
}
