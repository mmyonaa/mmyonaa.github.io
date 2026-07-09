import type { ProjectText } from '../shared'

export const ko: ProjectText = {
  title: 'eSIM 판매 키오스크',
  photosNote: [
    '일본 현지 매장에 실제 배포된 무인 eSIM 키오스크입니다. 여행자가 대륙·국가·상품 선택부터 결제, eSIM QR 발급, 영수증 출력·이메일 전송까지 직원 없이 스스로 완료합니다.',
    '결제 단말(카드·QR·NFC)과 영수증 프린터를 앱에 연동하고, 부팅 자동 실행·기기 잠금(Device Admin)으로 무인 운영을 구성했습니다.',
    '개발 후 일본 현지에서 초기 운영과 용지 부족·네트워크 끊김 같은 현장 이슈의 실시간 대응까지 직접 담당했습니다.',
  ],
  architectureCaptions: ['eSIM 플랫폼 구조 — 오프라인 판매 채널'],
  architectureNotes: [
    '이 키오스크는 어드민이 관리하는 상품·재고를 공유 백엔드로 받아 일본 매장에서 오프라인으로 판매합니다. 온라인 커머스·어드민과 같은 시스템의 한 축입니다.',
  ],
  related: [
    { slug: 'esim-admin', role: '상품·기기·정산 운영 관리' },
    { slug: 'esim-service', role: '같은 백엔드의 온라인 판매 채널' },
  ],
  description:
    '무인 eSIM 판매 키오스크. Vue 키오스크 웹을 주도 개발하고, Android 앱의 프린터·결제·다국어 인코딩 등 하드웨어 연동 기능을 담당했습니다.',
  overview: [
    '일본 현지 매장에 설치돼 여행자가 직접 eSIM을 구매·발급받는 무인 키오스크입니다. 대륙·국가·상품 선택부터 결제, eSIM QR 발급, 영수증 출력·이메일 전송까지의 흐름을 키오스크 환경에 맞게 구현했습니다. 판매 eSIM 상품은 30개국 이상을 커버하지만 키오스크 자체는 일본 매장 전용(JPY)이며, 결제 단말로 카드·QR·NFC 태그 결제를 지원합니다. 개발 후 일본 현지에서 초기 약 5대 규모로 운영까지 담당했습니다.',
    '화면은 Vue 3 PWA로 만들어 키오스크 웹을 주도 개발했고, 이를 Android(Kotlin) WebView 앱으로 감싸 단말에서 구동합니다. 앱 기반은 팀이 함께 만들었고, 저는 그 위에서 프린터·결제·인코딩·무인 운영 관련 하드웨어 기능을 개선·확장하는 역할을 맡았습니다.',
    '특히 구형·신형 영수증 프린터를 자동 감지해 호환 처리하고, 일본어·한국어 다중 인코딩(Shift-JIS ↔ UTF-8), 결제 단말 상태·오류 처리, 용지 부족 실시간 감지, 와이파이 자동 재연결 같은 무인 운영 안정화를 담당했습니다. 일본 현지에서 직접 점검·실시간 대응했습니다.',
  ],
  highlights: [
    '키오스크 웹(Vue 3 PWA) 주도 개발',
    '구형·신형 영수증 프린터 이중 드라이버 자동 감지·호환 (SII ↔ Epson)',
    '일본어·한국어 다중 인코딩(Shift-JIS ↔ UTF-8) 자동 선택',
    '결제 단말 카드·QR·NFC 태그 결제 타입별 응답·오류 처리 및 웹 전달',
    '용지 부족 실시간 모니터링·와이파이 자동 재연결 등 무인 운영 안정화',
    '일본 매장 전용(JPY)·현지 초기 약 5대 운영, 판매 eSIM 상품 30개국+',
  ],
  techNotes: [
    {
      title: '프린터 이중 드라이버 통합',
      body: '구형 SII RP-F10/G10(USB 시리얼·ESC/POS·Shift-JIS)과 신형 Epson TM-m30III(EPOS SDK·UTF-8)를 USB vendorId로 자동 감지해, 런타임에 드라이버·명령어·인코딩을 선택하도록 구현했습니다. 상품명·QR·가격·주문번호·매장 QR로 구성된 영수증을 서로 다른 두 프린터에서 동일하게 출력합니다.',
    },
    {
      title: '다국어 인코딩 처리',
      body: '일본어·한자·엔화(¥) 등 특수문자를 정규식으로 감지해 Shift-JIS와 UTF-8을 선택하고, 구형 프린터에서 한국어가 출력되지 않던 문제를 다국어 문자셋 적용으로 해결했습니다.',
    },
    {
      title: '결제 단말 연동 · 상태 처리',
      body: 'salo-01 결제 단말(USB)에서 카드·QR·전자화폐 결제 타입별 응답(승인번호·거래ID·오류코드)을 파싱하고, 결제 상태 확인과 실패 시 오류를 JSON으로 웹에 안전하게 전달하도록 개선했습니다. 결제 성공은 eSIM QR 발급·이메일 전송으로 이어집니다.',
    },
    {
      title: 'JS↔네이티브 브리지 · 무인 운영',
      body: 'WebView의 @JavascriptInterface(doPayment·doPrintImage·checkPayment 등)로 웹이 하드웨어를 호출하고, 용지 부족 상태를 브로드캐스트로 실시간 전달합니다. 부팅 자동실행(BootReceiver)·Device Admin 잠금과 와이파이 자동 재연결·오프라인 페이지로 무인 안정성을 확보했으며, 일본 현지에서 직접 점검·대응했습니다.',
    },
  ],
}

export const en: ProjectText = {
  title: 'eSIM Sales Kiosk',
  photosNote: [
    'The unattended eSIM kiosk actually deployed at a store in Japan. Travelers complete everything themselves — choosing continent, country, and plan, paying, receiving the eSIM QR, and getting a printed/emailed receipt — with no staff.',
    'I integrated the payment terminal (card/QR/NFC) and receipt printer into the app and set up unattended operation with auto-boot and Device Admin lockdown.',
    'After development, I handled the initial on-site operation and real-time response to field issues such as paper-outs and network drops, in Japan.',
  ],
  architectureCaptions: ['eSIM platform map — offline sales channel'],
  architectureNotes: [
    'This kiosk sells in-store in Japan using products and stock managed in the admin, served through the shared backend. It is one surface of the same system as the online commerce and admin.',
  ],
  related: [
    { slug: 'esim-admin', role: 'Manages products, devices, and settlement' },
    { slug: 'esim-service', role: 'Online sales channel on the same backend' },
  ],
  description:
    'An unattended eSIM kiosk. I led the Vue kiosk web and owned hardware-facing features of the Android app — printers, payment, and multilingual encoding.',
  overview: [
    'A self-service kiosk installed at stores in Japan where travelers buy and issue eSIMs themselves. I implemented the kiosk flow — from selecting continent, country, and plan to payment, eSIM QR issuance, receipt printing, and email delivery. The eSIM catalog covers 30+ countries, but the kiosk itself is Japan-only (JPY) and takes card, QR, and NFC-tag payments through the terminal. After development, I also ran the initial on-site operation in Japan (about 5 units).',
    'The UI is a Vue 3 PWA — which I led as the primary contributor — wrapped in an Android (Kotlin) WebView app running on the hardware. The app foundation was built by the team; on top of it I owned and extended the hardware-facing features: printing, payment, encoding, and unattended-operation stability.',
    'In particular I auto-detected and supported both legacy and new receipt printers, handled Japanese/Korean multi-encoding (Shift-JIS ↔ UTF-8), payment-terminal status/error handling, real-time paper-low detection, and Wi-Fi auto-reconnect for unattended reliability — inspecting and supporting it in real time on-site in Japan.',
  ],
  highlights: [
    'Led development of the kiosk web (Vue 3 PWA)',
    'Dual-driver auto-detection across legacy and new receipt printers (SII ↔ Epson)',
    'Japanese/Korean multi-encoding (Shift-JIS ↔ UTF-8) with automatic selection',
    'Payment-terminal card/QR/NFC-tag per-type response and error handling relayed back to the web',
    'Unattended-ops hardening: real-time paper-low monitoring and Wi-Fi auto-reconnect',
    'Japan-only (JPY), ~5 units in initial on-site operation; eSIM catalog covers 30+ countries',
  ],
  techNotes: [
    {
      title: 'Dual printer-driver integration',
      body: 'Auto-detect legacy SII RP-F10/G10 (USB serial, ESC/POS, Shift-JIS) and new Epson TM-m30III (EPOS SDK, UTF-8) by USB vendor ID and pick the driver, commands, and encoding at runtime. The same receipt — product, QR, price, order number, store QR — prints identically on two very different printers.',
    },
    {
      title: 'Multilingual encoding',
      body: 'Detect Japanese, Han characters, and special symbols (e.g. the yen sign ¥) via regex to choose between Shift-JIS and UTF-8, and fixed Korean not printing on the legacy printer by applying a multilingual character set.',
    },
    {
      title: 'Payment terminal & status handling',
      body: 'Parse per-type responses (approval number, transaction ID, error code) for card/QR/e-money on the salo-01 terminal (USB), and improved payment-status checks and safe JSON error relay to the web on failure. A successful payment leads into eSIM QR issuance and email delivery.',
    },
    {
      title: 'JS-to-native bridge & unattended ops',
      body: 'The web calls hardware through WebView @JavascriptInterface methods (doPayment, doPrintImage, checkPayment, …), and paper-low status is broadcast back to the web in real time. Auto-launch on boot (BootReceiver), Device Admin lockdown, Wi-Fi auto-reconnect, and an offline page keep it stable unattended — supported on-site in Japan.',
    },
  ],
}
