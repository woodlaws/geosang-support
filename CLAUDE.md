# CLAUDE.md — 거상 정부지원사업 마케팅센터 (geosang-support)

Next.js App Router 기반 반응형 다페이지 홈페이지. 배포는 Vercel(`geosang-support.vercel.app`), 운영 도메인은 `NEXT_PUBLIC_SITE_URL`(기본 `https://www.geosangmarketing.kr`).

## 스택

| 항목 | 내용 |
| --- | --- |
| 프레임워크 | Next.js `16.2.6` App Router / React `19.2.6` |
| 언어 | TypeScript strict, `@/*` → 프로젝트 루트 |
| 스타일 | 단일 전역 CSS `app/globals.css` (약 61KB, 한 줄 다중 선언). Tailwind는 devDependency로만 존재하며 **실제로 쓰지 않음** |
| 데이터 | 정적 콘텐츠는 `data/*.ts`, 게시판·회원·자료 다운로드는 Supabase REST (`lib/supabase.ts`, `lib/boards.ts`) |
| 패키지 매니저 | npm (`package-lock.json`). README의 pnpm 안내는 과거 내용이고 Vercel/CI는 `npm ci` 사용 |

## 스크립트

```bash
npm run dev          # next dev
npm run build:next   # next build --webpack  ← Vercel buildCommand
npm run build        # vinext build (Cloudflare Workers 실험용, 평소 쓰지 않음)
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
```

- CI(`.github/workflows/ci.yml`)의 검증 = `npm ci` → `npm run typecheck` → `npm run build:next`. **lint는 CI에 아직 없다.**
- `eslint.config.mjs`는 `eslint-config-next`의 `core-web-vitals` + `typescript` flat config를 쓴다. 린트를 뒤늦게 켠 탓에, eslint-config-next 16의 React Compiler 규칙(`react-hooks/purity`, `react-hooks/set-state-in-effect`)과 `@next/next/no-html-link-for-pages`에 걸리는 **기존 컴포넌트 4개는 설정 끝의 `preexisting` 블록에 파일 단위로 적어 경고로 낮췄다.** 새 코드에는 error 그대로 적용된다. 해당 파일을 실제로 고치면 목록에서 한 줄씩 지우면 된다.
- `npm run build:next`를 돌리면 Next가 `next-env.d.ts`에서 `vinext/types/augmentations` 줄을 지운다. **커밋 전에 되돌릴 것** (`git checkout -- next-env.d.ts`).
- `vercel.json`: `installCommand: npm ci`, `buildCommand: npm run build:next`.

## 라우팅 구조

App Router. 거의 모든 정적 페이지가 **단일 catch 라우트 `app/[section]/page.tsx`** 에 모여 있다.

```
app/
  page.tsx                 홈
  [section]/page.tsx       programs, hope-return, before-selection, after-selection,
                           services, cases, experts, insights, diagnosis, contact,
                           about, privacy  ← meta 객체의 key가 곧 라우트 목록
  insights/[slug]/page.tsx 자료실 상세
  cases/[slug]/page.tsx    사례 상세
  news/page.tsx, news/[slug]/page.tsx   Supabase 게시판
  login/, portal/, portal/[id]/, admin/ 로그인·고객 전용·관리자 (건드리지 말 것)
  api/...                  contact, auth, admin, projects, resources
  sitemap.ts, robots.ts, manifest.ts, rss.xml/route.ts, llms.txt/route.ts
```

`app/[section]/page.tsx` 동작:

1. `const meta: Record<string, [string, string]>` — 라우트별 `[제목, description]`
2. `generateStaticParams()` = `Object.keys(meta)` → **정적 프리렌더**
3. `generateMetadata()` = `makeMetadata(title, description, /${section})` + 섹션별 `keywords`
4. `pages` 레코드에서 섹션별 컴포넌트를 골라 렌더. 클라이언트 필터가 있는 페이지(`cases`, `insights`, `contact`)는 `<Suspense fallback={<InitialHero .../>}>` 로 감싼다 (`useSearchParams` 때문)
5. 섹션별 JSON-LD를 `<JsonLd>` 로 주입

새 정적 섹션을 추가하는 방법은 두 가지다: `meta`에 키를 추가하거나(= `[section]` 안으로 편입), 별도 `app/<name>/page.tsx` 디렉터리를 만드는 것. `/news`는 후자를 쓴다.

## 스타일 규칙

- 토큰은 `app/globals.css` 의 `:root`:
  `--blue:#0757d9` `--blue2:#0646b4` `--navy:#071d46` `--green:#18ad61` `--coral:#ff6452`
  `--ink:#151923` `--body:#454d5c` `--muted:#6b7483` `--line:#e1e6ee` `--soft:#f5f8fc`
  `--shadow` `--shadow2` `--radius:18px` `--shell:1360px`
- 폰트: `Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", Arial`, `word-break: keep-all`
- 레이아웃 공통 클래스: `.shell`(최대폭 컨테이너), `.narrow`(900px), `.section`, `.section-soft`, `.eyebrow`, `.sr-only`
- 버튼: `.button` + `.button-primary` / `.button-coral` / `.button-ghost` / `.button-white` / `.button-light`
- **새 CSS는 전부 `app/globals.css` 에 추가한다.** CSS Module도, Tailwind 클래스도 쓰지 않는다.
- 기존 클래스 재사용이 디자인 통일의 기본 수단이다. 자료실/상세에서 쓰는 주요 클래스:
  `.library-card` `.library-thumb` `.library-card-body` `.all-library-grid` `.compact-insight-row`
  `.filter-chips` `.library-filters` `.filter-status` `.library-empty`
  `.article-page` `.article-progress` `.article-head` `.article-layout` `.article-side`
  `.article-toc` `.article-tools` `.article-main` `.article-takeaways` `.article-section`
  `.direct-answer` `.article-checklist` `.article-sources` `.article-related` `.article-author`
  `.article-disclaimer` `.article-context-cta` `.article-top` `.article-mobile-cta` `.faq-list`

## 코드 스타일

- 기존 파일은 **JSX를 한 줄에 몰아쓰는 매우 압축된 스타일**이다(공백 없는 `a=b`, 세미콜론 연쇄). 기존 파일을 수정할 때는 그 줄의 스타일을 따라가고, 새 파일은 읽을 수 있게 쓰되 들여쓰기 2스페이스·따옴표는 `"` 로 맞춘다.
- 서버 컴포넌트가 기본. 필터·폼·스크롤 추적이 필요한 것만 `"use client"`.
- GA4 이벤트는 `lib/analytics.ts` 의 영역별 `track*Event` 함수로만 보낸다. 이벤트 이름과 파라미터가 union 타입으로 고정돼 있어 **새 이벤트는 타입에 먼저 추가**해야 한다.

## 콘텐츠 관리 방식

콘텐츠는 두 계층으로 나뉘어 있다.

### 1) 코드 내 정적 데이터 (`data/*.ts`)

마크다운 파일이 아니라 **TypeScript 객체 배열**이다. `content/` 디렉터리는 없고, 마크다운 파서 의존성(gray-matter, remark, marked 등)도 설치돼 있지 않다.

| 파일 | 내용 |
| --- | --- |
| `data/site.ts` | `SITE_NAME` `SITE_URL` `OFFICIAL_AFFILIATION` `SITE_DESCRIPTION` `OFFICIAL_NOTICE`, `navItems`(헤더 메뉴), `programs`, `services`, `cases`, `faqs` |
| `data/insights.ts` | 자료실 글 전체 (`Insight[]`) + 카테고리·단계·유형·업종 목록 + `insightFaqs` |
| `data/cases.ts` `data/experts.ts` `data/contact.ts` `data/after-selection.ts` `data/board.ts` | 각 페이지 콘텐츠 / 게시판 타입 |

### 2) 블로그 마크다운 (`content/blog/*.md` + `lib/blog.ts`)

**마크다운 파일 1개 = 글 1개.** `lib/blog.ts`가 빌드 시점에 디렉터리를 한 번 읽어 `BlogPost[]`(최신순)을 만든다. 프런트매터는 `yaml` 패키지로 파싱하고 본문은 `marked`(GFM)로 HTML을 만든다. gray-matter는 js-yaml 체인의 merge-key DoS 권고 때문에 쓰지 않는다.

프런트매터 필드:

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` `description` `category` `mainKeyword` `aiAnswer` | ✅ | `aiAnswer`는 보통 `\|` 블록으로 2~3문장 |
| `slug` | ✅ | 영문 소문자·숫자·하이픈만. 라우트 `/blog/<slug>`의 기준이며 파일명보다 우선 |
| `date` | ✅ | `YYYY-MM-DD` |
| `updated` | | 없으면 `date`와 같게 처리 |
| `thumbnail` | | `/images/blog/...` 같은 public 경로. 없으면 카드가 CSS 그라디언트로 대체 |
| `faq` | | `- q:` / `a:` 목록 (`question`/`answer`도 허용). FAQPage JSON-LD의 원본 |
| `hub` | | 상위 허브 글의 slug. 사이드바에 "상위 가이드" 링크로 노출 |

필수 항목 누락, 잘못된 날짜 형식, slug 중복은 **파일 이름과 함께 throw** 해서 빌드를 세운다. 조용히 넘어가지 않는다.

목차는 본문 `h2`/`h3`에서 자동 생성된다. 별도 설정이 없고, 표는 `.blog-table-wrap`으로 감싸져 모바일에서 가로 스크롤된다.

### 3) Supabase 게시판 (`lib/boards.ts`)

`posts` 테이블, `kind = "news" | "resource"`. 환경변수가 없으면 `isSupabasePublicConfigured === false` 로 **빈 배열을 반환하고 조용히 넘어간다** → 로컬·CI 빌드가 Supabase 없이도 통과한다. 이 폴백을 깨지 말 것.

`kind="resource"` 게시물은 `/insights/<slug>` 경로를 **정적 자료실 글과 공유**한다. `app/insights/[slug]/page.tsx` 는 먼저 `getPost("resource", slug)` 를 보고, 있으면 DB 게시물로 렌더하고 없으면 `data/insights.ts` 를 찾는다.

## /insights (자료실) 구현

### 목록 — `app/[section]/page.tsx` 의 `insights` 섹션 → `components/InsightsPage.tsx`

- `"use client"`. `useSearchParams` 로 필터 상태를 URL 쿼리에 보관(`category` `stage` `program` `industry` `type` `year` `tag` `q`), `router.replace(..., {scroll:false})` 로 갱신
- 섹션 구성: 히어로+검색 → 시작 가이드 → 카테고리 그리드 → 추천 3개 → 공식 공고 해설 → 선정 전/후 저니 → 업종별 → 인기 태그 → **전체 목록(`#all-insights`, 검색+필터+`.all-library-grid`)** → 무료자료(`ManagedResources`) → 뉴스레터 → FAQ → 최종 CTA
- 카드는 `components/InsightCard.tsx`. 썸네일은 **실제 이미지가 아니라** `.library-thumb category-<카테고리>` CSS 그라디언트 + 텍스트 오버레이
- 목록 JSON-LD는 `[section]/page.tsx` 쪽에서 `BreadcrumbList` + `FAQPage` + `CollectionPage(ItemList)` 를 주입

### 상세 — `app/insights/[slug]/page.tsx` → `components/ArticleExperience.tsx`

- `generateStaticParams()` = `publishedInsights.map(({slug})=>({slug}))` → 정적 생성
- `generateMetadata()` — title, description, canonical, OG(`type:"article"`, publishedTime/modifiedTime/authors), twitter, robots
- JSON-LD: `Article` + `BreadcrumbList` + `FAQPage`(본문 섹션 상위 3개의 `title`/`answer`)
- `ArticleExperience` (`"use client"`) 렌더 순서:
  진행률 바 → 헤더(카테고리·제목·설명·대상·작성일·수정일·읽는 시간·업데이트 라벨) → 브레드크럼 →
  사이드(목차 `<details>` + 글자크기/인쇄/링크복사) → 3줄 핵심 요약 → 본문 섹션(섹션번호·제목·`직접 답변` 박스·단락·불릿, 두 번째 섹션 뒤 중간 CTA) →
  체크리스트 → 공식 출처 → 관련 지원사업 → 관련 글 → 관련 사례 → 작성자 → 면책 안내 → 하단 CTA → 맨위로 버튼 → 모바일 하단 고정 CTA
- CTA 링크는 `ctaType`(`diagnosis`/`hope`/`expert`/`execution`/`quote`/`report`) → `ctas` 맵으로 결정

## /blog 구현

- 목록 `app/blog/page.tsx`(서버·정적) + `components/BlogList.tsx`(`"use client"`) + `components/BlogCard.tsx`. 카드는 1:1 썸네일 / 카테고리 / 제목 / description / 발행일
- **`BlogList`는 `useSearchParams`를 쓰지 않는다.** 그 훅은 정적 프리렌더를 Suspense 폴백으로 떨어뜨려 빌드된 HTML에서 글 목록이 통째로 빠진다(`/insights`가 실제로 그 상태다 — `.next/server/app/insights.html`에 카드가 없다). 대신 `useSyncExternalStore`로 URL 쿼리를 외부 저장소처럼 구독해, 서버 스냅샷은 항상 "전체"(모든 카드가 정적 HTML에 포함)이고 클라이언트에서만 `?category=`를 읽는다. **여기를 `useSearchParams`로 바꾸면 블로그의 SEO가 깨진다.**
- 상세 `app/blog/[slug]/page.tsx` + `components/BlogArticle.tsx`. **클라이언트 JS가 전혀 없다** — 목차는 앵커, FAQ는 `<details>`
- 상세 렌더 순서: 카테고리·발행일·수정일 → 제목 → 썸네일 → `aiAnswer` 요약 박스 → 목차 → 본문 → FAQ → 같은 카테고리 관련 글 3개 → 면책 → 상담 CTA 박스(문구 고정, `무료 자가진단`·`상담 신청` 버튼) → 모바일 하단 고정 `상담 신청` 바
- 전역 `MobileCTA`는 `/blog` 이하에서 자기를 숨긴다. 글의 자체 하단 바와 겹치기 때문(전역 바가 z-index가 더 높다)

## 메뉴·공통 레이아웃

- `app/layout.tsx`: `metadataBase`, title template `%s | ${SITE_NAME}`, OG/twitter 기본값, `alternates.types["application/rss+xml"]`, **`verification.other["naver-site-verification"]`(유지 필수)**, `Organization` JSON-LD, 그리고 `<Header/> <main id="main"> <Footer/> <MobileCTA/>`
- `components/Header.tsx`: `data/site.ts` 의 `navItems` 를 **PC/모바일 동일한 `<nav id="main-nav">` 로 렌더**(모바일은 `.open` 토글). 오른쪽 CTA는 `AfterSelectionCTA className="button button-coral nav-cta"`
- `components/Footer.tsx`: 빠른 메뉴 링크를 하드코딩 (`/programs` `/news` `/diagnosis` `/experts` `/contact` `/portal`) + 안내 링크(`/about` `/privacy` `/rss.xml`)
- `components/MobileCTA.tsx`: 전역 모바일 하단 고정 상담 바. `/contact` 에서는 숨고, 키보드 올라오면·모바일 메뉴 열리면·대상 폼이 화면에 보이면 자동으로 숨는다

## SEO 파이프라인

| 파일 | 역할 |
| --- | --- |
| `lib/seo.ts` | `makeMetadata(title, description, path)` → title/description/canonical/OG/twitter, `breadcrumbJson(items)`, `faqJson(items)` |
| `components/JsonLd.tsx` | `<script type="application/ld+json">` 주입 (`<` 이스케이프 포함) |
| `app/sitemap.ts` | 고정 경로 배열 + `cases` + `publishedInsights` + `blogPosts` + Supabase news/resource 게시물. `siteWideLastModified` 상수를 쓰는 곳이 있음 |
| `app/rss.xml/route.ts` | `publishedInsights` + `blogPosts` 를 발행일 역순으로 합친 RSS 2.0. 피드는 이것 하나뿐이다. 자체 `esc()` 로 XML 이스케이프, `Cache-Control: public, max-age=3600` |
| `app/robots.ts` | `*` + GPTBot/OAI-SearchBot/ClaudeBot/Claude-SearchBot/PerplexityBot/Google-Extended 전부 allow, `/api/` 만 disallow |
| `app/llms.txt/route.ts` | AI 검색용 사이트 안내문. 공개 라우트를 추가하면 여기도 갱신 |

## 하지 말 것

- `/portal`, `/login`, `/admin`, `app/api/auth/*`, `app/api/admin/*`, `app/api/projects/*`, `lib/supabase.ts` 의 인증 흐름 — 로그인·고객 전용 기능은 건드리지 않는다
- `app/layout.tsx` 의 `naver-site-verification` 제거
- Supabase 미설정 시의 빈 폴백 제거 (CI 빌드가 깨진다)
- `data/*.ts` 에 실제 공고 금액·일정을 단정적으로 써 넣는 것. 사이트 전체가 "공식 공고를 확인하라"는 면책 톤을 유지하고 있다
- 연도 표기는 **2027년 기준** (`2027 희망리턴패키지` 등)
