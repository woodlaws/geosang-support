# 구현 설계

- 공개: `/news`, `/news/[slug]`, 기존 `/insights`, `/insights/[slug]`
- 비공개: `/contact`, `/portal`, `/portal/[id]`, `/admin`
- 인증: Supabase Auth 이메일 로그인. 공개 회원가입은 제공하지 않고 관리자가 Dashboard에서 초대한다.
- 권한: `profiles.role`은 `admin` 또는 `customer`. 클라이언트 메타데이터로 권한을 판단하지 않는다.
- 저장소: `public-resources`는 공개 자료, `private-resources`와 `project-files`는 private bucket이다.
- 렌더링: 게시글 본문은 HTML로 해석하지 않고 일반 텍스트로 출력한다.
- 환경 미연결 시: 가짜 성공을 표시하지 않고 설정 필요 상태를 반환한다.
