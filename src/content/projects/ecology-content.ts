import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '국립 생태원 콘텐츠·관리 사이트',
  architectureCaptions: ['시스템 · 데이터 흐름', '카카오 기프티콘 발송 · 재시도/실패 처리 플로우'],
  architectureNotes: [
    '방문자는 회원가입·개인정보 동의 후 iframe 콘텐츠를 플레이하며 활동이 기록되고, 설문까지 참여해 발송 조건을 충족하면 Kakao API로 기프티콘이 자동 발송됩니다. 모든 활동·설문 데이터는 PostgreSQL에 적재되며, 관리자는 콘텐츠·설문·발송을 한 곳에서 운영합니다.',
    '발송 요청 뒤 예약 상태를 1초 간격으로 폴링하고, 응답이 실패하면 최대 10회까지 재요청합니다. 상태가 실패로 확정되면 알림을 노출하고, 완료(GIFT_ENDED)되면 결과 화면에 반영하며 필요 시 배치로 완료 주문을 재조회해 값을 갱신합니다.',
  ],
  description:
    '현장 해설 프로그램 참여를 이미지 인식으로 인증하고, 단계별 인증서·카카오 기프티콘 발송과 관리자 통계·정산까지 구현한 참여 인증제 디지털 콘텐츠 서비스.',
  imageNote:
    '화면 속 해설 콘텐츠(일러스트·교안)는 별도 제작팀의 저작물입니다 — 본 작업 범위는 콘텐츠 플레이·활동 기록·인증 플랫폼 개발입니다.',
  overview: [
    '국립생태원 방문자가 현장 해설 프로그램에 참여하고 이를 인증받는 "참여 인증제" 디지털 콘텐츠 서비스입니다. 방문자는 해설을 들은 뒤 현장 이미지 인식으로 완료를 인증하고, 누적 인증 수에 따라 단계(새싹·나무)가 올라가며 단계별 인증서를 받습니다. 콘텐츠 플레이·활동 기록·설문 참여 데이터는 모두 저장돼 관리자에서 운영·집계됩니다.',
    '콘텐츠 서비스와 관리자 시스템을 1인으로 설계·개발했습니다. 조건을 충족하면 카카오 기프티콘이 자동 발송되고 관리자에서 선택 참여자에게 일괄 발송도 가능하며, 발송 실패에 대비한 상태 폴링·재시도로 안정성을 확보했습니다. 관리자는 월별 방문·당첨 통계와 만족도 엑셀 내보내기까지 한 곳에서 운영합니다.',
  ],
  highlights: [
    '콘텐츠 서비스부터 관리자 시스템까지 1인 구축',
    '이미지 인식 기반 해설 완료 인증 — 미인식 시 직원 코드 입력 폴백',
    '누적 인증 단계(해설 3개=새싹·5개=나무)·스탬프 말판·단계별 인증서 발급',
    'APOC 콘텐츠 iframe 연동(origin 검증 postMessage 이벤트 브리지)·활동 기록, 설문 연동으로 참여 데이터 수집',
    '카카오·네이버·인스타 인앱 브라우저 감지 → 외부 브라우저 유도(실사용 안정화)',
    '카카오 API 기프티콘 — 조건 충족 자동 발송·관리자 일괄 발송(카카오비즈니스), 상태 폴링·재시도로 안정화',
    '관리자 월별 통계 대시보드(총/첫/재방문·당첨 대상·발송 상태) + 만족도 엑셀 다운로드',
  ],
  techNotes: [
    {
      title: '이미지 인식 인증 & 단계 시스템',
      body: '방문자는 현장 해설 프로그램을 들은 뒤 현장에 설치된 이미지(또는 해설사가 지참한 이미지)를 스캔해 완료를 인증합니다. 인식이 안 되는 특이 케이스를 대비해 직원이 4자리 코드를 입력하는 폴백을 뒀습니다. 누적 인증 수에 따라 3개=새싹·5개=나무 2단계로 올라가고, 스탬프 말판에 진행 상황을 보여주며 단계별 인증서를 발급·다운로드하게 했습니다. 2단계 상품은 현장 제공 후 직원 확인 코드로 수령을 인증합니다.',
    },
    {
      title: '관리자 운영·정산 (통계·일괄 발송·엑셀)',
      body: '관리자에서 월별로 총 참여자·첫 방문/재방문·당첨 대상자(누적 3개 이상)·상품 발송 상태를 집계해 보여주고, 참여자별 완료 해설/만족도 수와 프로그램별 참여 현황을 상세로 제공합니다. 상품은 카카오비즈니스(기프티콘)로 선택 참여자에게 일괄 발송하고, 만족도 조사 결과는 엑셀로 내보냅니다. 경량 회원 식별(이름·연락처·4자리 비밀번호)과 14세 이상 개인정보 동의를 함께 처리했습니다.',
    },
    {
      title: 'iframe 콘텐츠 연동 (이벤트 브리지)',
      body: '해설·활동 콘텐츠는 별도로 제작된 APOC 콘텐츠를 iframe으로 임베드해 재생합니다. 콘텐츠 내부 요소가 발생시키는 이벤트를 origin을 검증한 postMessage로 수신해 미리 등록한 uuid–콜백으로 매칭 처리하고, 필요한 값은 GLOBAL_VALUE 요청으로 조회합니다. 이를 통해 콘텐츠 진행·완료를 활동 기록으로 남기고, 모바일 키보드로 화면이 바뀌는 상황은 visualViewport 리사이즈로 대응했습니다.',
    },
    {
      title: '인앱 브라우저 우회',
      body: '방문자는 주로 카카오 기프티콘 링크로 진입하고 완료 인증에 이미지 인식(카메라)을 쓰는데, 카카오·네이버·인스타그램 인앱 브라우저에서는 이런 기능이 제한될 수 있습니다. userAgent로 인앱 환경을 감지하면 외부 브라우저로 열도록 유도했고(카카오는 kakaotalk://web/openExternal 스킴), 안드로이드/iOS를 분기해 안내 UI를 함께 노출했습니다. 실사용 안정성에 직접 영향을 주는 처리입니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'National Ecology Institute Content & Admin Site',
  architectureCaptions: ['System & data flow', 'Kakao gifticon send · retry / failover flow'],
  architectureNotes: [
    'Visitors sign up (with privacy consent), play iframe content while their activity is logged, and completing the survey triggers an automatic gifticon send via the Kakao API once conditions are met. All activity and survey data is persisted to PostgreSQL, and admins run content, surveys, and sending from one place.',
    'After a send request, the reservation status is polled every second and retried up to 10 times on failure. A confirmed failure surfaces an alert, completion (GIFT_ENDED) updates the result screen, and an optional batch re-poll of completed orders reconciles the final values.',
  ],
  description:
    'A participation-certification content service: visitors certify on-site guided programs via image recognition, earn tiered certificates, receive KakaoTalk gifticons, and admins run stats and settlement.',
  imageNote:
    'The interpretive content shown (illustrations · curriculum) was produced by a separate content team — my work covers the playback, activity-logging and verification platform.',
  overview: [
    'A "participation-certification" digital content service where National Ecology Institute visitors join on-site guided programs and certify their attendance. After a program, a visitor certifies completion via on-site image recognition; cumulative certifications raise their tier (sprout, tree) and issue a tier certificate. Content playback, activity logs, and survey participation are all stored and aggregated in the admin system.',
    'I designed and built both the content service and the admin system solo. A Kakao gifticon is sent automatically once conditions are met, admins can bulk-send to selected participants, and status polling with retries secures reliable delivery against failures. Admins run monthly visit/eligibility stats and satisfaction-survey Excel exports all in one place.',
  ],
  highlights: [
    'Built both the content service and the admin system solo',
    'Image-recognition certification of program completion — staff code-entry fallback when recognition fails',
    'Cumulative tiers (3 = sprout, 5 = tree), a stamp board, and per-tier certificate issuance',
    'APOC content embedded via iframe (origin-checked postMessage event bridge) with activity logging, plus survey integration',
    'In-app browser detection (KakaoTalk, Naver, Instagram) → redirect to an external browser for real-world reliability',
    'Kakao gifticons — automatic send on conditions met + admin bulk send (Kakao Business), stabilized with send-status polling and retries',
    'Admin monthly stats dashboard (total/first/return visitors, eligibility, send status) + satisfaction Excel export',
  ],
  techNotes: [
    {
      title: 'Image-recognition certification & tier system',
      body: 'After attending an on-site guided program, a visitor certifies completion by scanning an image installed on-site (or carried by the guide). For edge cases where recognition fails, a staff 4-digit code-entry fallback is provided. Cumulative certifications raise a 2-tier level (3 = sprout, 5 = tree), shown on a stamp board, with a downloadable certificate issued per tier; tier-2 prizes are handed out on-site and confirmed with a staff code.',
    },
    {
      title: 'Admin operations & settlement (stats, bulk send, Excel)',
      body: 'The admin aggregates monthly totals — total/first/return visitors, prize-eligible participants (3+ cumulative certs), and send status — and provides per-participant detail (completed programs, survey completions) and per-program participation. Prizes are bulk-sent as KakaoTalk gifticons (Kakao Business) to selected participants, and survey results export to Excel. It also handles lightweight member identification (name, phone, 4-digit password) with 14+ privacy consent.',
    },
    {
      title: 'iframe content integration (event bridge)',
      body: 'The interpretive/activity content is separately produced APOC content, embedded and played in an iframe. Events fired by elements inside the content are received over origin-checked postMessage and matched to pre-registered uuid–callbacks, with values fetched via a GLOBAL_VALUE request. This drives activity logging of content progress/completion, and mobile keyboard/viewport changes are handled via visualViewport resize.',
    },
    {
      title: 'In-app browser bypass',
      body: 'Visitors mostly arrive through a Kakao gifticon link and use image recognition (camera) for completion — both of which can be restricted inside in-app browsers. Detecting the in-app environment via userAgent, the app guides users to open in an external browser (KakaoTalk via the kakaotalk://web/openExternal scheme), branching Android/iOS with accompanying guidance UI. This directly affects real-world reliability.',
    },
  ],
}
