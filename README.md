# 거상 정부지원 마케팅센터

정부지원사업을 찾고 준비하는 과정부터 선정 이후 마케팅 실행까지 연결하는 Next.js App Router 기반 반응형 다페이지 홈페이지입니다.

## 콘텐츠 교체 위치

- 지원사업, 서비스, 사례, 자료, FAQ, 전문가: `data/site.ts`
- 페이지별 설명과 랜딩 콘텐츠: `app/[section]/page.tsx`
- 홈 화면: `app/page.tsx`
- 상담 폼 전송: `.env.local`의 `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`
- 운영 도메인과 canonical: `.env.local`의 `NEXT_PUBLIC_SITE_URL`

상담 폼은 Apps Script URL이 없을 때 데모 성공 상태를 표시하며, URL을 연결하면 JSON 형식으로 전송합니다.

## 실행

```bash
pnpm install
pnpm dev
pnpm build
```

## 유의사항

지원사업 정보는 샘플 데이터입니다. 실제 운영 전 해당 연도의 공식 공고를 확인해 교체해야 합니다. 사례는 서비스 구조 설명용 샘플 실행안이며, 허위 매출 수치나 선정 성과를 포함하지 않습니다.
