// 프로젝트 제목을 '이름 · 부제' 로 나눈다.
// 구분자는 앞뒤에 공백이 있는 ' · ' · ' — ' 만 인정한다 — '홍보·대관' 처럼 공백 없이
// 붙은 가운뎃점은 낱말의 일부라 건드리지 않는다. 구분자가 여럿이면 첫 번째에서 자른다
// ('자사 결제 시스템 · Toss · PayPal 연동' → 이름 / 'Toss · PayPal 연동').
export function splitTitle(title: string): { main: string; sub: string } {
  const hit = [' — ', ' · ']
    .map((sep) => ({ at: title.indexOf(sep), len: sep.length }))
    .filter((x) => x.at > 0)
    .sort((a, b) => a.at - b.at)[0]
  if (!hit) return { main: title, sub: '' }
  return { main: title.slice(0, hit.at), sub: title.slice(hit.at + hit.len) }
}
