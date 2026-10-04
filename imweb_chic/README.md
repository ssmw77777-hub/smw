# CHIC STUDIO — 아임웹 포트폴리오 홈페이지

아임웹 전문 웹 에이전시 콘셉트의 원페이지 홈페이지 코드입니다.
아임웹 **코드 위젯** 하나에 붙여넣으면 바로 동작하도록 CSS·HTML·JS가 한 블록으로 묶여 있습니다.

## 파일 구성

| 경로 | 용도 |
|---|---|
| `dist/imweb-paste.html` | ⭐ **아임웹 코드 위젯에 그대로 붙여넣는 파일** (style + html + script 통합) |
| `dist/index.html` | 브라우저 미리보기용 전체 페이지 (더블클릭으로 열기) |
| `src/style.css` · `src/body.html` · `src/script.js` | 원본 소스 (수정용) |
| `build.py` | `src/` 수정 후 `python3 build.py` 실행 → `dist/` 재생성 |

## 페이지 구성

1. **Header** — 고정 헤더, 스크롤 시 블러/자동 숨김, 모바일 풀스크린 메뉴
2. **Hero** — 대형 타이포 + 단어 로테이션(chic / clear / yours), 핵심 수치
3. **Marquee** — 서비스 키워드 무한 흐름 띠
4. **Featured Work 배너** — 🖼 이전 포트폴리오 슬라이드 배너 (자동재생·스와이프·진행바)
5. **About** — 소개 문구 + 카운트업 수치
6. **Service** — 4개 서비스 리스트 (호버 인터랙션)
7. **Works** — 🖼 카테고리 필터 + 더보기 포트폴리오 그리드
8. **Process** — 5단계 제작 프로세스
9. **Price** — 3단 요금제
10. **Review** — 고객 후기 + 클라이언트 로고 흐름
11. **FAQ** — 아코디언
12. **Contact CTA** — 문의 / 카카오톡 버튼
13. **Footer** — 사업자 정보 + 대형 로고, 플로팅 카카오·TOP 버튼

## 아임웹 적용 방법

1. 아임웹 디자인 모드 → 새 페이지(또는 메인) 생성
2. 섹션 추가 → **코드(HTML) 위젯** 추가
3. `dist/imweb-paste.html` 내용을 **전체 복사 → 붙여넣기**
4. 섹션 설정에서 **여백 0, 가로 폭 100%(풀와이드)** 로 지정
5. 코드에 자체 헤더·푸터가 포함되어 있으므로, 해당 페이지에서는 아임웹 기본 헤더/푸터를 숨김 처리
   (헤더 설정 → 페이지별 헤더 숨김, 또는 아임웹 헤더를 쓰려면 `<header class="ch-header">` 블록 삭제)

> 모든 CSS는 `#chic` 하위로 한정되어 있어 아임웹 기본 스타일과 충돌하지 않습니다.
> 문의 버튼(`/contact`)은 아임웹에서 만든 문의 폼 페이지 주소로 바꿔주세요.

## ✅ 포트폴리오 추가하기 (배너 + 그리드)

`script.js` 상단(붙여넣은 코드에서는 `<script>` 바로 아래)의 `CHIC_WORKS` 배열에 한 줄을 추가하면
**배너 슬라이드와 Works 그리드에 동시에 반영**됩니다.

```js
{ title: 'Project Name', client: '고객사 · 업종', category: 'corporate', year: '2026',
  image: 'https://cdn.imweb.me/.../thumb.jpg', color: '#333333',
  url: 'https://고객사이트.com', desc: '배너에 노출될 한 줄 설명', featured: true },
```

- `image` : 아임웹 파일 업로드 후 이미지 주소. **비워두면 `color`로 목업 썸네일 자동 생성**
- `featured: true` : 상단 배너 슬라이드에도 노출 (없으면 그리드에만 노출)
- `category` : `corporate` / `shop` / `brand` / `landing` — 이름은 `CHIC_CATEGORIES`에서 변경·추가 가능
- 권장 이미지 비율 : 배너 16:8 (예: 1920×960), 그리드 4:3 (예: 1200×900)

## 기타 설정 (`CHIC_CONFIG`)

```js
kakaoUrl: 'https://pf.kakao.com/_xxxxxx', // 카카오톡 채널 주소 (모든 카카오 버튼에 적용)
worksPerPage: 6,                          // 그리드 첫 화면 노출 개수
slideInterval: 5500                       // 배너 자동 넘김 간격(ms)
```

브랜드명(CHIC STUDIO), 연락처, 사업자 정보, 요금, 후기 문구는 `body.html`에서 실제 정보로 교체하세요.
메인 컬러는 `style.css` 상단 `--accent` 값 하나만 바꾸면 전체에 적용됩니다.
