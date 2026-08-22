# GitHub + Vercel 배포 안내

이 패키지는 GitHub 저장소에 업로드한 뒤 Vercel의 **Import Git Repository**로 연결하는 방식에 맞춰 구성되어 있습니다.

## 1. GitHub에 업로드

1. GitHub에서 빈 저장소를 생성합니다.
2. ZIP을 해제한 폴더의 파일 전체를 저장소 루트에 업로드합니다.
3. 기본 브랜치를 `main`으로 사용합니다.

## 2. Vercel에 연결

1. Vercel에서 **Add New → Project**를 선택합니다.
2. 위 GitHub 저장소를 Import 합니다.
3. Framework Preset은 **Next.js**로 확인합니다.
4. Root Directory는 저장소 루트(`./`)를 사용합니다.
5. `vercel.json`이 설치와 빌드 명령을 자동 지정하므로 별도 Output Directory는 입력하지 않습니다.

## 3. 환경변수

Vercel Project Settings → Environment Variables에서 다음 값을 설정합니다.

- `NEXT_PUBLIC_SITE_URL`: 실제 운영 도메인. 예: `https://support.geosang.co.kr`
- `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`: 상담 폼을 받을 Google Apps Script 웹 앱 URL

두 번째 값이 비어 있으면 사이트는 표시되지만 상담 폼의 온라인 접수는 비활성 안내를 표시합니다. 비밀값은 GitHub에 커밋하지 마십시오.

## 4. 배포 확인

- `main` 브랜치에 push하면 Vercel Production 배포가 자동 실행됩니다.
- Pull Request에는 Vercel Preview 배포가 생성됩니다.
- GitHub Actions는 TypeScript 검사와 Next.js production build를 수행합니다.
- 배포 후 `/`, `/after-selection`, `/contact`, `/sitemap.xml`, `/robots.txt`를 확인합니다.

## 도메인 변경 시

Vercel에서 운영 도메인을 연결한 후 `NEXT_PUBLIC_SITE_URL`을 같은 도메인으로 바꾸고 다시 배포해야 canonical, Open Graph, sitemap, 구조화 데이터 URL이 올바르게 생성됩니다.
