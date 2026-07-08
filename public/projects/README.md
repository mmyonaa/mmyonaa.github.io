# 프로젝트 스크린샷

이 폴더의 이미지는 사이트 루트 경로로 그대로 제공됩니다.
예) `public/projects/bktheater/bk-theater.png` → 코드에서 `/projects/bktheater/bk-theater.png`

## 폴더 구조

프로젝트별로 **서브폴더**를 만들어 이미지를 모아 둡니다. 한 프로젝트가 여러 장을 가질 수 있습니다.

```
public/projects/
├── bktheater/        # 보광극장 (bk-theater)
│   ├── bk-theater.png
│   ├── bk-theater-performance.png
│   └── ...
└── esim-site/        # eSIM 판매 서비스 (esim-service)
    ├── esim-home.png
    └── ...
```

> 폴더·파일명은 자유입니다. 알아보기 쉬운 이름이면 됩니다.

## 연동 방법

이미지는 `src/content/shared.ts` 의 해당 프로젝트 `images` 배열에 경로를 추가하면 연결됩니다.

```ts
// src/content/shared.ts — projectBase
{
  slug: 'bk-theater',
  // ...
  images: [
    '/projects/bktheater/bk-theater.png',
    '/projects/bktheater/bk-theater-performance.png',
    // ...
  ],
}
```

- **랜딩 Works 카드**: 배열의 **앞 3장**만 슬라이더로 노출 (`images.slice(0, 3)`)
- **상세 페이지**: 배열 **전체**를 슬라이더로 노출

→ 배열 순서를 "대표 화면(사용자 화면) 먼저, 부가 화면(관리자 등) 나중"으로 두면, 랜딩엔 대표 화면이 보이고 상세엔 전부 보입니다.

## 권장 사항

- 포맷: `.webp`(용량↓) 또는 `.png` / `.jpg`
- 가로 비율: 카드·상세 슬라이더 모두 `16 / 11` 이므로 **가로형(약 1600×1100)** 캡처 권장
- 너비 1600px 내외면 충분 (그 이상은 용량만 커짐)
- 민감 정보(개인정보·내부 지표·어드민 화면)는 더미 데이터로 교체하거나 가린 뒤 캡처
