import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  stats: [
    {
      "value": "994문항",
      "label": "필기 문제"
    },
    {
      "value": "154문항",
      "label": "실기 문제"
    },
    {
      "value": "137개",
      "label": "개념 주제"
    },
    {
      "value": "79장",
      "label": "암기 카드"
    }
  ],
  "statsNote": "2026년 10월 기준 · 정보처리기사와 정보보안기사 두 시험의 합계입니다.",
  "team": "1인",
  "status": "운영 중",
  "title": "daily.quiz · 자격증 문제 연습장",
  "description": "정보처리기사·정보보안기사의 필기와 실기 문항을 풀고 채점·해설을 확인하는 학습 사이트입니다.",
  "overview": [
    "blog-mcp의 개념 글을 바탕으로 LLM이 생성한 필기 994문항·실기 154문항과 주제 137개를 제공합니다. 연습·모의고사·오답 복습·암기 노트를 홈에서 고르고, 해설에서 관련 개념 글로 이동할 수 있으며, 출제·채점은 브라우저에서 처리합니다."
  ],
  "highlights": [
    "실기 단답의 표기 정규화와 허용 답안 기반 자동 채점",
    "실제 시험 형식의 모의고사 — 필기 100문항·150분, 실기 20문항·150분",
    "1·3·7일 간격 복습과 계정별 오답·북마크 저장",
    "외울 값만 모은 암기 노트 79장과 값을 덮는 가리기 모드",
    "문항 스키마·주제 참조 검증과 블로그 글 연결 자동화"
  ],
  "techNotes": [
    {
      "title": "실기 답안 채점",
      "body": "대소문자·띄어쓰기·전각 문자·하이픈을 정규화하고 문항별 허용 답안과 비교합니다. 사용자가 허용 표기를 로컬에 추가할 수도 있습니다. 단답·계산·코드 출력·SQL은 자동 채점하고, 약술형은 모범답안·핵심어를 보고 직접 채점하도록 했습니다."
    },
    {
      "title": "두 시험의 화면과 로직 공유",
      "body": "문항이 속한 주제로 시험을 구분하고, 하나의 라우트 묶음이 두 시험을 받습니다(정보처리기사는 접두어 없이, 정보보안기사는 /sec). 시험별로 채점기·영역 목록·저장 키를 분리해 오답노트와 중단 기록이 섞이지 않도록 했습니다."
    },
    {
      "title": "모의고사",
      "body": "필기는 실제 시험 비중대로 5과목 100문항을 150분에 풀고 과목별 과락 40점·평균 60점으로 합격을 판정하며, 실제 OMR과 같은 답안 표기란을 둡니다. 실기는 20문항·150분·문항당 5점으로 채점합니다. 연습 모드는 '제출 후 한꺼번에'와 '고르면 바로 확인' 중 고를 수 있지만 모의고사는 항상 제출 후 채점합니다."
    },
    {
      "title": "간격 반복 복습",
      "body": "오답을 1일·3일·7일 간격으로 복습하고 마지막 단계를 통과하면 복습 대상에서 제외합니다. 홈에는 전체 오답 수 대신 오늘 복습할 문항 수를 표시했습니다. 최근 7일의 푼 문항 수·정답률은 별도로 브라우저에만 쌓아 홈에서 보여 줍니다."
    },
    {
      "title": "암기 노트와 가리기 모드",
      "body": "개념 노트가 설명을 읽는 자리라면 암기 노트는 외울 값만 모은 자리입니다. 줄글 없이 두문자·대조표·순서 흐름·계층 스택·타일로 카드 79장을 구성했고, 카드는 시험·영역을 직접 갖지 않고 개념 주제에서 물려받아 본문 한 벌이 두 시험 93자리에 함께 섭니다. 가리기 모드는 외울 값을 덮어 눌러서 하나씩 확인하도록 했습니다. 카드별 '외웠다' 표시는 채점이 아니라 사용자 선언이라 오답노트와 분리해 저장합니다."
    },
    {
      "title": "빌드 검증과 콘텐츠 게이트",
      "body": "Astro·zod로 문항 스키마와 주제 참조를 검증하고, 코드 출력 문항은 실제 실행해 정답을 확인했습니다. 본문 강조 표기도 같은 게이트가 봅니다 — 강조가 없거나 과한 도입부, 길이를 넘긴 강조, 짝이 맞지 않는 백틱은 빌드를 중단시킵니다. 보기에서 답이 유도되는 경우는 둘로 나눠, 답을 직접 쓰는 실기는 발문에 정답 표기가 있으면 병합 도구가 차단하고, 보기가 있는 필기는 정답 위치 분포·정답지 길이 편중 같은 지표를 리포트로 보여 줍니다."
    },
    {
      "title": "블로그 글 연결 자동화",
      "body": "블로그가 매일 자동 발행되는 데 비해 개념 주제와 글의 연결은 손으로 쓰고 있었습니다. 먼저 블로그 시드 id를 주제 키로 옮기는 번역표를 두어 등록된 글은 임계 없이 연결하고, 없으면 제목 유사도가 기준과 2위 격차를 함께 넘는 경우에만 연결하며, 나머지는 후보 목록으로 남깁니다. 자동 연결은 전부 검증 이슈로 보고하고, 손으로 이은 글을 역채점해 기준 위에서 오답이 나오면 주간 작업이 연결 전에 멈추도록 했습니다."
    },
    {
      "title": "사용자 데이터 저장",
      "body": "문항·해설은 정적 HTML로 제공하고 북마크·오답 기록만 Supabase에 저장합니다. Google 로그인과 RLS로 사용자별 데이터를 분리했습니다. 사용 중인 무료 플랜의 비활성 일시 중지에 대응해 테이블을 주기적으로 조회하는 작업도 구성했습니다."
    }
  ]
}

export const en: ProjectText = {
  stats: [
    {
      "value": "994",
      "label": "Written questions"
    },
    {
      "value": "154",
      "label": "Practical questions"
    },
    {
      "value": "137",
      "label": "Concept topics"
    },
    {
      "value": "79",
      "label": "Memo cards"
    }
  ],
  statsNote: 'As of October 2026 · totals across both certifications.',
  team: 'Solo',
  status: 'Live',
  title: 'daily.quiz · Certification Practice',
  description:
    'A static practice ground for two Korean IT certifications — multiple-choice written exams and short-answer practical exams with instant grading and explanations. A sister project to the blog-mcp blog: each explanation links back to the concept post.',
  overview: [
    'A sister project built so the concept posts blog-mcp publishes daily do not end at "read and done." The same topics come back as questions, and a wrong answer leads from the explanation to the blog post. It currently holds 994 written questions (515 + 479 across the two exams), 154 practical questions, 137 concept topics, and 79 memo cards.',
    'It runs without a server. Questions, answers, and explanations are baked into HTML at build time, and generating and grading a set happens entirely in the browser. Only user data (bookmarks, wrong-answer history) lives in Supabase, behind Google sign-in and RLS isolation per user. The question bank sits behind an Astro content collection with a zod schema as the publish gate — a question that breaks the schema or points at a nonexistent topic fails the build.',
    'Two axes were genuinely hard: grading free-form practical answers with no choices to compare against, and opening two exams with different formats through a single set of screens.',
  ],
  highlights: [
    '994 written and 154 practical questions, 137 concept topics — LLM-generated from the blog concept posts',
    'Automatic grading for free-form practical answers — notation normalization, accepted-form synonym lists',
    'Mock exams in the real format — 100 questions / 150 min written, 20 questions / 150 min practical',
    'Spaced-repetition wrong-answer notebook — 1 → 3 → 7 days to graduate',
    'A second notebook of 79 memo cards with a mask mode that covers the values to memorize',
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
      title: 'Mock exams in the real format',
      body: 'The written mock reproduces the real weighting — 5 subjects, 100 questions, 150 minutes — and passes only on an average of 60 with no subject below 40, with an answer sheet that marks choices the way a real OMR form does. The practical mock runs 20 questions in 150 minutes at 5 points each. Practice mode lets you choose between grading on submit and revealing each answer as you pick it; a mock is always graded on submit, because showing the answer mid-exam defeats the point of reproducing the real thing.',
    },
    {
      title: 'Spaced-repetition wrong-answer notebook',
      body: 'Wrong answers accumulate automatically and are not cleared the moment you get one right. Review is deferred 1 → 3 → 7 days, and only clearing the last stage graduates an item. The home screen leads with "N wrong answers to review today" rather than "N accumulated" for the same reason — the accumulated pile is a burden, while today\'s list is an achievable target. Separately, a browser-only log of the last seven days (questions answered, accuracy, streak) renders as an attendance strip on the home screen.',
    },
    {
      title: 'A second notebook — memo cards and mask mode',
      body: 'The concept notes are where you read why; the memo notes are where only the values to memorize live. Prose is dropped entirely in favor of mnemonics, comparison tables, step flows, layer stacks, and tiles across 79 cards. Cards do not carry an exam or area directly either — they inherit both from the concept topic, so one body of text stands in 93 slots across the two exams instead of being copied per exam. Mask mode covers the memorized values like a red sheet and reveals them one tap at a time, and a per-card "memorized" flag is stored apart from the wrong-answer notebook: it is a user declaration, not a grade, and mixing it in would blur what "N to review today" means.',
    },
    {
      title: 'Coupling with the blog — public artifacts, no API',
      body: 'Neither site exposes an API to the other. daily.quiz reads only the blog\'s RSS feed and GitHub tree to keep the links aligned. Before each build it verifies through RSS that every linked post actually exists (a missing post fails the build) and regenerates post titles so link text never drifts when a title changes; if the network is down it warns and passes rather than blocking an offline build. Every Monday it compares blob SHAs in the blog repo tree against the previous state to surface dead links, revised posts, and coverage gaps — topics with a post but no questions. The weekly issue carries only what happened that week, while the still-open gaps overwrite one standing issue, and the reported state is committed back so the same change is never reported twice.',
    },
    {
      title: 'Automating the post links — a translation table over similarity',
      body: 'The blog publishes daily while the topic-to-post links were written by hand, so they fell behind. Matching names only gets halfway: the leftovers differ not in spelling but in unit of grouping (a blog seed is one post, a quiz topic is one exam subject). So a translation table maps blog seed ids to topic keys, and a hit there links deterministically with no threshold; a miss falls back to title bigram similarity, which links only when it clears both an absolute floor and a margin over the runner-up, and anything still ambiguous is left as a top-3 candidate list for a human. Every automatic link is reported as a verification issue — a wrong link passes the existence check precisely because the post exists — and a backtest against the hand-made links stops the weekly job before it links at all if an error appears above the threshold.',
    },
    {
      title: 'Content quality enforced by the build',
      body: 'Questions and topics sit in an Astro content collection with a zod schema acting as a publish gate. A question that violates the schema or references a nonexistent topic fails the build. Code-output questions were verified by actually running the code. The same gate also enforces the three-layer emphasis notation used across intros, explanations, and stems — an intro with no emphasis or too much of it, an over-long highlight, or unbalanced backticks all fail the build, and a report shows per-area emphasis density since the gate can only count, not judge. Answer leakage is split by whether the answer is already on screen: on the practical side, where the answer is typed, a stem containing the answer is blocked at merge time; on the written side, where one choice is the answer by definition, a report surfaces bank-level skew instead — answer position distribution, choices that are uniquely long or short, negated stems with absolutes in the key.',
    },
    {
      title: 'Static site with minimal server state',
      body: 'Generating and grading happen in the browser; the only thing on the server is user data. Supabase Google sign-in ties bookmarks and wrong-answer history to an account, isolated per user by RLS. The free tier suspends a project after seven days without database activity, and health-check endpoints do not count as activity — so a keepalive cron reads an actual table once a day to prevent it.',
    },
  ],
}
