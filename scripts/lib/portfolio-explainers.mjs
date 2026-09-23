// Print equivalents of the site's interactive flows and existing project descriptions.
// Keep diagrams at the public level: no customer data, internal endpoints, or thresholds.
export function portfolioExplainers(slug, lang, esc) {
  const pick = (ko, en) => lang === 'en' ? en : ko
  const block = (title, body) => `<div class="block explainer"><h3 class="block__title">${esc(title)}</h3>${body}</div>`
  const flow = (steps, note = '') => `<ol class="process-flow">${steps.map(([label, detail]) => `<li><b>${esc(label)}</b><span>${esc(detail)}</span></li>`).join('')}</ol>${note ? `<p class="explainer-note">${esc(note)}</p>` : ''}`
  const table = (headers, rows) => `<table class="comparison"><thead><tr>${headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`

  if (slug === 'siem-ai') return block(pick('인시던트 분석 흐름', 'Incident analysis flow'), flow(pick([
    ['분류·우선순위', 'Triage · 규칙 판정과 LLM'],
    ['분석 근거 수집', 'IOC·MITRE·Network · 코드'],
    ['외부 정보 보강', 'SecurityIntel · 조건부 LLM'],
    ['결과 종합', 'Correlation · LLM'],
    ['후속 처리', '컴플라이언스·번역 · 백그라운드'],
  ], [
    ['Classify & prioritize', 'Triage · rules and LLM'],
    ['Collect evidence', 'IOC / MITRE / Network · code'],
    ['Enrich intelligence', 'SecurityIntel · conditional LLM'],
    ['Synthesize results', 'Correlation · LLM'],
    ['Background work', 'Compliance and translation'],
  ]), pick('개념도입니다. 우선순위에 따라 분석 범위를 조절하며, 외부 정보 보강이 필요하지 않으면 해당 단계를 건너뜁니다.', 'Conceptual flow. Priority controls the analysis scope; external enrichment is skipped when unnecessary.')))

  if (slug === 'siem-web') return block(pick('AI 편집 제안의 검토·반영', 'Reviewing AI editing suggestions'), flow(pick([
    ['편집 제안', 'AI가 리포트 변경안 생성'],
    ['변경 내용 표시', '블록·표·문자 단위 비교'],
    ['사용자 검토', '미리보기 후 변경 반영'],
    ['저장·내보내기', '다국어 저장 · PDF·DOCX 등'],
  ], [
    ['AI suggestion', 'Generate a report edit'],
    ['Show differences', 'Block, table, and text diffs'],
    ['User review', 'Preview before applying'],
    ['Save & export', 'Multilingual · PDF / DOCX etc.'],
  ])))

  if (slug === 'apoc-payment') return block(pick('요금제 전환 정책', 'Plan-change policy'), table(pick(['구분', '전환 시점', '다음 결제 주기'], ['Change', 'At the time of change', 'Next billing cycle']), pick([
    ['업그레이드', '남은 기간의 차액 즉시 결제', '상향 요금 적용'],
    ['다운그레이드', '즉시 결제·환불 없이 변경 이력 기록', '하향 요금 적용'],
  ], [
    ['Upgrade', 'Charge the prorated difference immediately', 'Apply the higher rate'],
    ['Downgrade', 'Record the change without an immediate charge or refund', 'Apply the lower rate'],
  ]))) + block(pick('업그레이드 처리 흐름', 'Upgrade flow'), flow(pick([
    ['구독 조회·검증', '전환할 구독 존재 여부 확인'],
    ['차액 사전 조회', '결제 전에 전환 금액 확인'],
    ['차액 결제', 'billing key로 청구'],
    ['상태·이력 반영', '구독 갱신 · 변경 이력 저장'],
  ], [
    ['Validate subscription', 'Check that it exists'],
    ['Preview proration', 'Confirm the amount before paying'],
    ['Charge difference', 'Bill via the billing key'],
    ['Update & record', 'Subscription state and history'],
  ])))

  if (slug === 'blog-mcp') return block(pick('발행 자동화와 검증 흐름', 'Publishing and validation flow'), flow(pick([
    ['예약 실행', 'GitHub Actions cron'],
    ['주제 선정·집필', '오케스트레이터 · LLM'],
    ['발행 전 검사', '규칙 hook · MCP 링크 검증'],
    ['발행 확인', '파일 변경으로 성공 판정'],
    ['빌드·배포', 'Astro · GitHub Actions'],
  ], [
    ['Schedule', 'GitHub Actions cron'],
    ['Choose & write', 'Orchestrator · LLM'],
    ['Validate', 'Rule hook · MCP link checks'],
    ['Confirm publish', 'Inspect file changes'],
    ['Build & deploy', 'Astro · GitHub Actions'],
  ]), pick('검증 위반 → 사유를 반환해 수정을 유도합니다. 실행 실패 → 최대 3회 재시도합니다. 같은 날 중복 발행은 별도 검사로 막습니다.', 'Validation failure returns reasons for revision. Execution failure triggers up to three retries. A separate check prevents duplicate publication on the same day.')))

  if (slug === 'daily-quiz') return block(pick('채점과 콘텐츠 검증 범위', 'Grading and content checks'), table(pick(['대상', '처리 방식'], ['Target', 'How it is handled']), pick([
    ['단답·계산·코드 출력·SQL', '표기를 정규화한 뒤 문항별 허용 답안과 비교'],
    ['약술형', '모범답안·핵심어를 보고 사용자가 직접 채점'],
    ['문항 형식·주제 참조', '빌드에서 스키마 위반·미존재 주제 참조를 차단'],
    ['연결 글', '빌드 전 존재 여부 검사 · 네트워크 실패 시 경고 후 진행'],
    ['블로그 삭제·개정·미출제 주제', '주간 작업으로 변경을 확인하고 이슈 등록'],
  ], [
    ['Short answers, calculations, code output, SQL', 'Normalize notation and compare with accepted answers'],
    ['Descriptive answers', 'Self-grade against model answers and key points'],
    ['Question format and topic references', 'Reject schema violations and missing topics at build time'],
    ['Linked articles', 'Check existence before build; warn and continue on network failure'],
    ['Deleted / revised articles and uncovered topics', 'Check weekly and create issues for changes'],
  ])))
  return ''
}

export const explainerStyles = `
  .explainer { break-inside: avoid; }
  .process-flow { display: flex; list-style: none; gap: 15px; padding: 3px 0; }
  .process-flow li { flex: 1; min-width: 0; position: relative; padding: 9px 7px; border: 1px solid var(--line); border-radius: 4px; background: #faf9f6; }
  .process-flow li:not(:last-child)::after { content: '→'; position: absolute; right: -13px; top: 50%; transform: translateY(-50%); color: var(--gold); font-size: 12px; }
  .process-flow b { display: block; font-size: 10px; line-height: 1.5; }
  .process-flow span { display: block; margin-top: 4px; color: var(--dim); font-size: 9.5px; line-height: 1.5; word-break: keep-all; }
  .explainer-note { margin-top: 6px; font-size: 9.5px; color: var(--dim); line-height: 1.5; }
  .comparison { border-collapse: collapse; width: 100%; font-size: 10.5px; line-height: 1.5; }
  .comparison th, .comparison td { padding: 7px 9px; border: 1px solid var(--line); text-align: left; vertical-align: top; word-break: keep-all; }
  .comparison thead th { background: #f5f3ed; font-weight: 700; }
  .comparison tbody th { width: 27%; font-weight: 600; background: #faf9f6; }
`
