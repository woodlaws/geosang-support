export type DiagnosisAnswers = {
  businessStatus: string;
  industry: string;
  customIndustry: string;
  region: string;
  businessType: string;
  businessStartYear: string;
  supportNeeds: string[];
  applicationStatus: string;
  selectedProgram: string;
  supportBudget: string;
  marketingBudget: string;
  agreementPeriod: string;
  executionDeadline: string;
  executionServices: string[];
  consultationGoals: string[];
};

export type DiagnosisResult = {
  type: string;
  title: string;
  summary: string;
  supportDirections: string[];
  preparations: string[];
  experts: string[];
  services: string[];
  ctas: { label: string; href: string; primary?: boolean }[];
};

export const emptyDiagnosisAnswers: DiagnosisAnswers = {
  businessStatus: "", industry: "", customIndustry: "", region: "", businessType: "", businessStartYear: "", supportNeeds: [], applicationStatus: "", selectedProgram: "", supportBudget: "", marketingBudget: "", agreementPeriod: "", executionDeadline: "", executionServices: [], consultationGoals: [],
};

export const businessStatusOptions = ["아직 사업자등록 전입니다.", "창업 후 3년 이내입니다.", "사업을 정상적으로 운영 중입니다.", "매출 감소 등 경영 위기를 겪고 있습니다.", "폐업을 고민하거나 준비하고 있습니다.", "이미 폐업했습니다.", "폐업 후 재창업을 준비하고 있습니다.", "정부지원사업에 선정되었습니다."];
export const industryOptions = ["음식점·카페", "제조·제품", "농업·농촌", "온라인 쇼핑몰", "전문 서비스", "교육·컨설팅", "뷰티·건강", "숙박·관광", "지역·전통시장", "콘텐츠·크리에이터", "IT·플랫폼", "기타"];
export const businessTypeOptions = ["사업자등록 전", "개인사업자", "법인사업자", "폐업사업자", "기타"];
export const supportNeedOptions = ["사업화 자금", "경영 개선", "폐업 절차", "점포 철거", "재취업", "재창업", "사업계획서", "세무·회계", "홈페이지", "브랜딩·디자인", "네이버 블로그", "스마트플레이스", "SNS 콘텐츠", "광고·홍보", "온라인 판로", "수출·해외진출", "결과보고", "무엇이 필요한지 잘 모르겠습니다."];
export const applicationStatusOptions = ["처음 알아보는 중입니다.", "적합한 사업을 찾고 있습니다.", "신청을 준비하고 있습니다.", "신청서를 제출했습니다.", "심사 또는 발표를 기다리고 있습니다.", "이미 선정되었습니다.", "협약 및 실행을 준비하고 있습니다.", "사업을 수행 중입니다.", "결과보고를 준비하고 있습니다."];
export const consultationGoalOptions = ["나에게 맞는 지원사업 안내", "희망리턴패키지 상담", "신청 자격 확인", "사업계획서 전문가 연결", "세무·행정 전문가 연결", "선정 후 실행 계획 수립", "홈페이지 제작 상담", "블로그·SNS 콘텐츠 상담", "스마트플레이스 상담", "광고·홍보 상담", "AEO·GEO 상담", "결과보고 준비", "전체적인 방향 상담"];
export const budgetOptions = ["500만원 미만", "500만~1,000만원", "1,000만~3,000만원", "3,000만~5,000만원", "5,000만원 이상", "아직 모름"];
export const executionServiceOptions = ["브랜드 전략", "다페이지 홈페이지", "랜딩페이지", "네이버 블로그", "스마트플레이스", "SNS 콘텐츠", "숏폼·영상", "광고 운영", "AEO·GEO", "산출물·결과보고"];
export const selectedStatuses = new Set(["이미 선정되었습니다.", "협약 및 실행을 준비하고 있습니다.", "사업을 수행 중입니다.", "결과보고를 준비하고 있습니다."]);

const resultCatalog: Record<string, Omit<DiagnosisResult, "type">> = {
  TYPE_1: { title: "예비창업 준비형", summary: "사업자등록 전 단계로 아이디어와 고객, 실행 가능한 사업계획을 구체화할 시점입니다.", supportDirections: ["예비창업 지원사업", "창업교육", "시장조사와 사업계획 구체화"], preparations: ["목표 고객과 해결할 문제 정리", "유사 서비스와 시장 조사", "초기 실행 일정과 비용 가설 작성"], experts: ["창업 지원사업 전문가", "사업계획 검토 전문가", "브랜드 전략 담당자"], services: ["초기 브랜드 전략", "소개형 홈페이지", "시장 검증 콘텐츠"], ctas: [{ label: "관련 지원사업 찾아보기", href: "/programs", primary: true }, { label: "전문가 상담 요청", href: "#diagnosis-consult" }, { label: "홈페이지·마케팅 준비 상담", href: "/contact" }] },
  TYPE_2: { title: "초기창업 성장형", summary: "창업 초기 고객 확보와 온라인 판로를 함께 설계해야 하는 단계입니다.", supportDirections: ["초기창업 사업화", "온라인 판로", "디지털 전환"], preparations: ["핵심 고객과 구매 이유 정리", "현재 유입·문의 경로 점검", "실행 가능한 채널 우선순위 설정"], experts: ["창업사업화 전문가", "마케팅 전략 담당자", "온라인 판로 전문가"], services: ["다페이지 홈페이지", "콘텐츠·SNS", "광고와 고객 유입 구조"], ctas: [{ label: "관련 지원사업 찾아보기", href: "/programs", primary: true }, { label: "전문가 상담 요청", href: "#diagnosis-consult" }, { label: "홈페이지·마케팅 준비 상담", href: "/services" }] },
  TYPE_3: { title: "소상공인 경영개선형", summary: "사업은 운영 중이지만 경영 개선과 고객 유입 구조의 재정비가 필요한 단계입니다.", supportDirections: ["소상공인 경영개선", "디지털 전환", "지역·온라인 판로"], preparations: ["매출과 비용 구조의 변화 확인", "현재 마케팅 채널 성과 점검", "재방문과 신규 고객 과제 구분"], experts: ["경영개선 전문가", "마케팅 전략 담당자", "지역 검색 전문가"], services: ["스마트플레이스", "네이버 블로그·SNS", "고객 재방문 콘텐츠"], ctas: [{ label: "경영개선 지원사업 확인", href: "/programs", primary: true }, { label: "현재 마케팅 진단", href: "#diagnosis-consult" }, { label: "거상마케팅센터 상담", href: "/contact" }] },
  TYPE_4: { title: "폐업 준비형", summary: "폐업 시점과 행정·점포 정리 절차를 먼저 확인하고 이후 경로를 준비할 단계입니다.", supportDirections: ["희망리턴패키지", "원스톱 폐업지원", "점포 철거·행정 안내"], preparations: ["폐업 기준일과 신청 시점 확인", "임대차·점포·세무 자료 정리", "취업 또는 재창업 방향 선택"], experts: ["폐업 행정 전문가", "세무·법률 전문가", "재기 지원사업 전문가"], services: ["재창업 방향 진단", "브랜드 재설계", "새 사업 고객 접점 준비"], ctas: [{ label: "희망리턴패키지 확인", href: "/hope-return", primary: true }, { label: "폐업·행정 전문가 연결", href: "#diagnosis-consult" }, { label: "재창업 준비 상담", href: "/experts" }] },
  TYPE_5: { title: "폐업 후 재취업형", summary: "폐업 상태를 기준으로 재취업 교육과 취업 연계 공고를 우선 확인할 단계입니다.", supportDirections: ["재취업 교육", "취업 연계", "직무교육"], preparations: ["폐업일과 사업자 상태 확인", "보유 경력과 희망 직무 정리", "해당 연도 공식 공고 확인"], experts: ["재취업 지원 전문가", "직무·경력 상담 전문가", "폐업 행정 전문가"], services: ["개인 경력 콘텐츠 정리", "향후 창업 시 브랜드 상담", "온라인 포트폴리오"], ctas: [{ label: "희망리턴패키지 확인", href: "/hope-return", primary: true }, { label: "재취업 전문가 연결", href: "#diagnosis-consult" }, { label: "공식 공고 준비 상담", href: "/contact" }] },
  TYPE_6: { title: "재창업 준비형", summary: "기존 경험을 바탕으로 새로운 사업 모델과 실행 계획을 다시 설계할 단계입니다.", supportDirections: ["재창업 지원", "재기사업화", "사업계획서 준비"], preparations: ["기존 사업과 달라질 점 정리", "새 고객과 수익 구조 검증", "사업계획과 마케팅 예산 구체화"], experts: ["재창업 지원사업 전문가", "사업계획서 검토 전문가", "브랜드 전략 담당자"], services: ["브랜드 재설계", "홈페이지", "판로·콘텐츠·광고"], ctas: [{ label: "재창업 지원사업 확인", href: "/hope-return", primary: true }, { label: "사업계획서 전문가 연결", href: "#diagnosis-consult" }, { label: "브랜드·마케팅 상담", href: "/services" }] },
  TYPE_7: { title: "선정 후 실행 준비형", summary: "정부지원사업에 선정되어 협약과 마케팅 실행을 준비하거나 수행하는 단계입니다.", supportDirections: ["협약서·집행 항목 확인", "마케팅 실행 계획", "산출물·증빙 관리"], preparations: ["협약서와 집행 가능 항목 확인", "실행 일정과 예산 배분", "공급업체와 산출물 확정"], experts: ["지원사업 실행 컨설턴트", "마케팅 전략 담당자", "결과보고 담당자"], services: ["다페이지 홈페이지", "네이버 블로그·SNS", "광고 운영", "산출물·결과보고 정리"], ctas: [{ label: "선정 후 마케팅 실행 상담", href: "/after-selection#consult", primary: true }, { label: "서비스 패키지 보기", href: "/services" }, { label: "실행 사례 보기", href: "/cases" }] },
  TYPE_8: { title: "결과보고 준비형", summary: "수행 내용을 증빙 가능한 산출물과 기록으로 정리해 결과보고를 준비할 단계입니다.", supportDirections: ["실행 내역 정리", "지출·운영 증빙", "결과보고 자료"], preparations: ["계획 대비 실행 항목 목록화", "산출물과 거래 증빙 연결", "성과와 변경 사항 정리"], experts: ["결과보고 담당자", "지원사업 실행 컨설턴트", "마케팅 운영 담당자"], services: ["실행 산출물 정리", "운영 기록 구성", "결과보고 자료 정리"], ctas: [{ label: "결과보고·산출물 상담", href: "#diagnosis-consult", primary: true }, { label: "실행 내용 정리 요청", href: "/after-selection" }, { label: "전문가 연결", href: "/experts" }] },
  TYPE_9: { title: "복합 상담형", summary: "여러 과제가 함께 있거나 우선순위가 아직 명확하지 않아 1:1 상황 진단이 적합합니다.", supportDirections: ["지원사업 분야 탐색", "마케팅 현황 점검", "실행 우선순위 상담"], preparations: ["현재 가장 큰 문제 한 가지 정리", "사업·신청 상태 자료 모으기", "3개월 안에 원하는 변화 작성"], experts: ["지원사업 전문가", "경영·마케팅 진단 담당자", "분야별 외부 전문가"], services: ["마케팅 현황 진단", "고객 접점 점검", "단계별 실행 로드맵"], ctas: [{ label: "1:1 방향 상담", href: "#diagnosis-consult", primary: true }, { label: "지원사업 찾아보기", href: "/programs" }, { label: "전문가 소개", href: "/experts" }] },
};

export function classifyDiagnosis(answers: DiagnosisAnswers): DiagnosisResult {
  let type = "TYPE_9";
  if (answers.applicationStatus === "결과보고를 준비하고 있습니다." || answers.supportNeeds.includes("결과보고")) type = "TYPE_8";
  else if (selectedStatuses.has(answers.applicationStatus) || answers.businessStatus === "정부지원사업에 선정되었습니다.") type = "TYPE_7";
  else if (answers.businessStatus === "폐업 후 재창업을 준비하고 있습니다." || answers.supportNeeds.includes("재창업")) type = "TYPE_6";
  else if (answers.businessStatus === "이미 폐업했습니다." && answers.supportNeeds.includes("재취업")) type = "TYPE_5";
  else if (answers.businessStatus === "폐업을 고민하거나 준비하고 있습니다." || answers.supportNeeds.includes("폐업 절차") || answers.supportNeeds.includes("점포 철거")) type = "TYPE_4";
  else if (answers.businessStatus === "매출 감소 등 경영 위기를 겪고 있습니다." || answers.supportNeeds.includes("경영 개선")) type = "TYPE_3";
  else if (answers.businessStatus === "창업 후 3년 이내입니다.") type = "TYPE_2";
  else if (answers.businessStatus === "아직 사업자등록 전입니다." || answers.businessType === "사업자등록 전") type = "TYPE_1";
  return { type, ...resultCatalog[type] };
}

export function getDiagnosisResult(type: string): DiagnosisResult | null {
  return resultCatalog[type] ? { type, ...resultCatalog[type] } : null;
}
