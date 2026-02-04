# Wedding Invitation App

모던 미니멀 스타일의 모바일 청첩장 웹앱

## 주요 기능

- **모던 미니멀 디자인** - 깔끔한 타이포그래피, 넓은 여백, 부드러운 애니메이션
- **다국어 지원** - 한국어/영어/중국어 자동 감지 및 전환
- **테마 시스템** - classic, midnight, botanical 테마 지원
- **커플 스토리** - 처음 만난 날, 함께한 시간, 결혼까지 D-Day 타임라인
- **사진 갤러리** - 캐러셀 형태의 사진 슬라이더
- **오시는 길** - 대중교통/자가용 탭, 카카오내비/T맵/네이버지도 연동
- **축하하기** - 하트 애니메이션 + Firebase 실시간 카운트
- **일정 등록** - ICS 파일 다운로드
- **공유 기능** - Web Share API / 클립보드 복사

## URL 파라미터

```
?to=홍길동        # 받는 사람 이름
?lang=ko|en|zh   # 기본 언어 설정
?theme=botanical # 테마 (classic, midnight, botanical)
```

예시: `https://example.com/?to=홍길동&lang=ko`

## 기술 스택

- **React 19** + **TypeScript**
- **Vite** - 빌드 도구
- **vanilla-extract** - CSS-in-TypeScript (zero-runtime)
- **Firebase Realtime Database** - 축하하기 카운트 저장
- **Yarn Berry (v4)** - 패키지 매니저

## 시작하기

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 타입 체크
yarn typecheck

# 프로덕션 빌드
yarn build
```

## Firebase 설정

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Realtime Database 활성화
3. `.env` 파일 생성:

```bash
cp .env.example .env
# Firebase Console에서 값 복사하여 입력
```

## 프로젝트 구조

```
src/
├── main.tsx                    # 엔트리 포인트
├── firebase.ts                 # Firebase 설정
└── ui/
    ├── App.tsx                 # 메인 컴포넌트
    ├── i18n.ts                 # 다국어 시스템
    ├── OurStory.tsx            # 커플 스토리 타임라인
    ├── CelebrationButton.tsx   # 축하하기 버튼
    ├── PhotoGallery.tsx        # 사진 캐러셀
    ├── MapSection.tsx          # 오시는 길
    ├── ShareActions.tsx        # 공유 버튼
    ├── LanguagePicker.tsx      # 언어 선택 (floating)
    ├── invitation/
    │   ├── types.ts            # Invitation 타입 정의
    │   └── defaultInvitation.ts # 샘플 데이터
    └── theme/
        ├── theme.css.ts        # 테마 변수 정의
        └── global.css.ts       # 글로벌 스타일
```

## 커스터마이징

### 청첩장 내용 수정

`src/ui/invitation/defaultInvitation.ts` 파일에서 다음 정보를 수정:

- 신랑/신부 이름
- 처음 만난 날
- 예식 일시/장소
- 교통 정보
- 사진

### 테마 추가

`src/ui/theme/theme.css.ts`에서 새 테마 클래스 생성

## 배포

GitHub Pages로 자동 배포됩니다. `main` 브랜치에 push하면 GitHub Actions가 빌드 및 배포합니다.

## 라이선스

MIT
