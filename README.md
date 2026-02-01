# wedding-invitation-app

청첩장 웹앱(모바일/웹) 프로젝트.

## 기획 / 요구사항
1. 웹/모바일에서 모두 확인할 수 있어야 한다. (반응형)
2. 구성되는 모든 텍스트/사진은 수정 가능해야 하고, 템플릿화하여 내 청첩장 외 다른 청첩장에도 테마(theme)만 바꿔 재사용할 수 있어야 한다.
3. 다국어(한국어/중국어/영어)를 지원하고, 접속 국가(로케일)에 맞게 기본 언어가 자동으로 설정되어야 한다.
4. 링크 공유 시 Open Graph/Twitter meta 데이터(대표 이미지/문구 등)를 자유롭게 설정할 수 있어야 한다.
   - 링크를 받았을 때 `일정 등록`, `공유` 등 액션 버튼이 제공되어야 한다.
5. React 19 + TypeScript를 사용한다.
6. 빌드는 Vite 기반이며, GitHub Actions로 CI/CD가 가능해야 한다.
7. 스타일은 `vanilla-extract`를 사용한다.
8. 패키지 매니저는 Yarn Berry를 사용한다.

## 배포

GitHub Pages로 배포됩니다. `main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 및 배포합니다.

GitHub 저장소 Settings → Pages → Source에서 `GitHub Actions`를 선택해야 합니다.
