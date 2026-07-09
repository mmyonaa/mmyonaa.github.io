import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: '국립 생태원 컨텐츠·관리 사이트',
  architectureCaptions: ['시스템 · 데이터 흐름', '카카오 기프티콘 발송 · 재시도/실패 처리 플로우'],
  architectureNotes: [
    '방문자는 회원가입·개인정보 동의 후 iframe 콘텐츠를 플레이하며 활동이 기록되고, 설문까지 참여해 발송 조건을 충족하면 Kakao API로 기프티콘이 자동 발송됩니다. 모든 활동·설문 데이터는 PostgreSQL에 적재되며, 관리자는 콘텐츠·설문·발송을 한 곳에서 운영합니다.',
    '발송 요청 뒤 예약 상태를 1초 간격으로 폴링하고, 응답이 실패하면 최대 10회까지 재요청합니다. 상태가 실패로 확정되면 알림을 노출하고, 완료(GIFT_ENDED)되면 결과 화면에 반영하며 필요 시 배치로 완료 주문을 재조회해 값을 갱신합니다.',
  ],
  description:
    'iframe 콘텐츠 플레이와 활동 기록·설문 시스템, 카카오 기프티콘 자동 발송을 구현한 디지털 콘텐츠 서비스.',
  imageNote:
    '화면 속 해설 콘텐츠(일러스트·교안)는 별도 제작팀의 저작물입니다 — 본 작업 범위는 콘텐츠 플레이·활동 기록·인증 플랫폼 개발입니다.',
  overview: [
    '국립생태원 방문자가 웹에서 콘텐츠를 즐기고 설문에 참여하도록 만든 디지털 콘텐츠 서비스입니다. 콘텐츠 플레이·활동 기록·설문 참여를 거쳐 조건을 충족하면 카카오 기프티콘이 자동 발송되고, 쌓인 활동·설문 데이터는 관리자 시스템에서 운영·집계됩니다.',
    '콘텐츠 서비스와 관리자 시스템의 시스템 설계부터 개발까지 1인으로 맡았고, 기프티콘 발송 실패에 대비한 상태 폴링·재시도 처리로 안정적인 자동 발송을 확보했습니다.',
  ],
  highlights: [
    '콘텐츠 서비스부터 관리자 시스템까지 구축',
    'iframe 기반 콘텐츠 플레이와 활동 기록 저장',
    '설문조사 시스템 연동으로 참여 데이터 수집',
    '카카오 API 연동 설문 참여자 기프티콘 자동 발송',
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
    'A digital content service with iframe-based content playback, activity logging and surveys, and automated KakaoTalk gift sending.',
  imageNote:
    'The interpretive content shown (illustrations · curriculum) was produced by a separate content team — my work covers the playback, activity-logging and verification platform.',
  overview: [
    'A digital content service that lets National Ecology Institute visitors enjoy content and take part in surveys on the web. After content playback, activity logging, and survey participation, a Kakao gifticon is sent automatically once the conditions are met, and the collected activity and survey data is operated and aggregated in the admin system.',
    'I owned both the content service and the admin system solo — from system design through development — and secured reliable automated sending with status polling and retries that handle send failures.',
  ],
  highlights: [
    'Built both the content service and the admin system',
    'iframe-based content playback with activity-log storage',
    'Survey system integration to collect participation data',
    'Automated gift-coupon sending to survey participants via the Kakao API',
  ],
}
