# 운영 연결 체크리스트

- [ ] Supabase 프로젝트를 만들고 `supabase/migrations/202610010001_board_system.sql` 실행
- [ ] Vercel Production 환경변수 3개 설정
- [ ] Supabase Auth에서 최초 관리자 사용자를 초대
- [ ] SQL Editor에서 해당 사용자의 `profiles.role`을 `admin`으로 변경
- [ ] 공개/비공개 Storage bucket과 RLS 정책 생성 여부 확인
- [ ] 실제 상담·다운로드·고객 프로젝트 흐름을 운영 프로젝트에서 테스트
- [ ] 개인정보 보유기간과 마케팅 수신 정책을 실제 운영 정책과 최종 대조

게시판 분류나 정책이 바뀌면 이 문서와 `data/board.ts`, DB 마이그레이션을 함께 갱신한다.
