import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";

// Keep this public-page directory current when routes, services, or contact paths change.
const llmsText = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME}는 정부지원사업을 찾고 준비하는 과정부터 선정 이후 홈페이지, 콘텐츠, SNS, 광고, 고객 유입과 결과보고를 함께하는 거상마케팅센터 정부지원사업 전문본부입니다. 지원사업 선정이나 지원금 지급을 보장하지 않으며, 지원 대상과 내용은 해당 연도의 공식 공고를 확인해야 합니다.

## 주요 페이지

- [홈](${SITE_URL}/): 센터 소개와 지원사업, 마케팅 실행 흐름을 한눈에 확인합니다.
- [정부지원사업 찾기](${SITE_URL}/programs): 사업 단계와 상황에 따라 검토할 지원사업 정보를 확인합니다.
- [희망리턴패키지](${SITE_URL}/hope-return): 희망리턴패키지 준비와 선정 이후 실행 정보를 확인합니다.
- [선정 전 준비](${SITE_URL}/before-selection): 신청 전 사업 상황과 마케팅 계획을 점검합니다.
- [선정 후 실행](${SITE_URL}/after-selection): 협약, 예산, 공급업체, 산출물, 증빙과 결과보고 준비를 확인합니다.
- [마케팅 서비스](${SITE_URL}/services): 브랜드 전략, 홈페이지, 콘텐츠, SNS, 광고, AEO·GEO와 결과보고 지원 범위를 확인합니다.
- [무료 자가진단](${SITE_URL}/diagnosis): 현재 상황에 맞는 다음 단계를 간단히 점검합니다.

## 사례·전문가·자료

- [실행 사례](${SITE_URL}/cases): 업종과 지원사업별 샘플 실행안을 확인합니다. 허위 매출 성과를 제시하지 않습니다.
- [전문가 네트워크](${SITE_URL}/experts): 마케팅 실행 담당자와 분야별 전문가 연결 방식을 확인합니다.
- [자료실](${SITE_URL}/insights): 지원사업 준비, 선정 후 실행, 예산 집행과 결과보고 자료를 확인합니다.
- [자주 묻는 질문](${SITE_URL}/#faq): 신청 가능성, 선정 보장 여부, 비용, 결과보고와 비대면 상담 안내를 확인합니다.

## 문의

- [상담 신청](${SITE_URL}/contact): 지원사업 준비 또는 선정 후 마케팅 실행 상담을 신청합니다.
- [회사 소개](${SITE_URL}/about): 운영 조직과 업무 원칙을 확인합니다.
- [개인정보처리방침](${SITE_URL}/privacy): 상담 정보 처리 기준을 확인합니다.
`;

export function GET() {
  return new Response(llmsText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
