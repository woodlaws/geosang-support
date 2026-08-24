export const SITE_NAME = "거상 정부지원사업 마케팅센터";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://geosang-support.vercel.app";
export const OFFICIAL_AFFILIATION = "거상마케팅센터 정부지원사업 전문본부";
export const SITE_DESCRIPTION = "정부지원사업 선정 이후 매출을 만드는 마케팅 실행 전문 조직";
export const OFFICIAL_NOTICE = "지원 대상, 지원 내용, 신청 기간은 공고에 따라 변경될 수 있으므로 반드시 해당 연도의 공식 공고를 확인하시기 바랍니다.";

export type Program = {
  slug: string;
  name: string;
  target: string;
  field: string;
  summary: string;
  accent: "blue" | "green" | "coral";
};

export const programs: Program[] = [
  { slug: "hope-return", name: "희망리턴패키지", target: "경영위기·폐업(예정) 소상공인", field: "경영개선·재취업·재창업", summary: "사업 정리부터 경영개선과 재도전까지 단계별로 확인합니다.", accent: "blue" },
  { slug: "pre-startup", name: "예비창업패키지", target: "혁신 아이디어를 가진 예비창업자", field: "사업화·교육·멘토링", summary: "아이디어의 시장성과 실행 계획을 구체화하는 사업입니다.", accent: "green" },
  { slug: "early-startup", name: "초기창업패키지", target: "창업 초기 기업", field: "사업화·시장 진입", summary: "초기 고객 확보와 사업 모델 검증을 위한 기회를 살펴봅니다.", accent: "blue" },
  { slug: "startup-leap", name: "창업도약패키지", target: "도약 단계 창업기업", field: "스케일업·판로 확대", summary: "성장 정체를 넘고 판로를 확장하기 위한 실행 과제를 점검합니다.", accent: "coral" },
  { slug: "strong-small-business", name: "강한소상공인", target: "성장 가능성이 높은 소상공인", field: "브랜딩·제품 고도화", summary: "차별화된 브랜드와 제품 경쟁력을 만드는 방향을 검토합니다.", accent: "green" },
  { slug: "market-development", name: "판로개척·마케팅 지원사업", target: "판매 채널 확장이 필요한 사업자", field: "온라인 판로·콘텐츠·광고", summary: "고객 접점과 판매 채널을 넓히는 지원사업을 찾아봅니다.", accent: "coral" },
];

export const services = [
  { icon: "◆", name: "브랜드 전략", desc: "고객과 시장을 기준으로 메시지와 실행 우선순위를 정리합니다." },
  { icon: "⌘", name: "홈페이지 제작", desc: "지원사업 목적과 고객 전환을 함께 고려한 웹사이트를 구축합니다." },
  { icon: "N", name: "네이버 블로그", desc: "검색 의도에 맞는 기획·원고·발행 체계를 만듭니다." },
  { icon: "⌖", name: "스마트플레이스", desc: "지역 고객이 신뢰하고 방문하도록 핵심 정보를 정비합니다." },
  { icon: "#", name: "SNS 콘텐츠", desc: "브랜드 톤에 맞춘 카드뉴스와 채널 운영안을 설계합니다." },
  { icon: "▶", name: "숏폼 제작", desc: "짧은 시간 안에 강점을 전달하는 기획과 영상을 제작합니다." },
  { icon: "↗", name: "광고 운영", desc: "목표·예산·기간에 맞춰 매체 전략과 소재를 운영합니다." },
  { icon: "AI", name: "AEO·GEO", desc: "검색과 생성형 AI가 사업 정보를 이해하기 쉬운 콘텐츠 구조를 만듭니다." },
  { icon: "✓", name: "실행 결과보고", desc: "실행 내역과 산출물, 증빙을 결과보고에 맞게 정리합니다." },
];

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  program: string;
  problem: string;
  execution: string[];
  deliverables: string[];
  status: string;
  note: string;
};

export const cases: CaseStudy[] = [
  { slug: "local-cafe-brand", title: "동네 카페 브랜드 기반 정비", industry: "카페·디저트", program: "희망리턴패키지", problem: "브랜드 강점과 온라인 고객 접점이 정리되지 않은 상황", execution: ["브랜드 메시지", "스마트플레이스", "콘텐츠 기획"], deliverables: ["핵심 메시지 가이드", "플레이스 정보 구조", "콘텐츠 주제표"], status: "샘플 실행안", note: "현황 진단 후 고객이 발견하고 신뢰하는 접점을 우선 정비하는 예시입니다." },
  { slug: "beauty-booking-funnel", title: "뷰티 매장 예약 동선 개선", industry: "뷰티·서비스", program: "소상공인 판로지원", problem: "SNS 노출은 있으나 상담과 예약까지의 연결이 약한 상황", execution: ["랜딩페이지", "SNS 콘텐츠", "예약 동선"], deliverables: ["예약 랜딩페이지", "콘텐츠 템플릿", "문의 동선표"], status: "샘플 실행안", note: "채널별 역할과 예약 전환 동선을 단순화하는 예시입니다." },
  { slug: "local-food-content", title: "지역 식품 온라인 콘텐츠 구축", industry: "식품 제조", program: "판로개척 지원", problem: "제품 차별점과 생산자 이야기가 고객에게 전달되지 않는 상황", execution: ["콘텐츠 전략", "상세페이지", "숏폼"], deliverables: ["제품 상세페이지", "촬영 기획안", "숏폼 구성안"], status: "샘플 실행안", note: "제품 근거와 생산 과정을 콘텐츠 자산으로 전환하는 예시입니다." },
  { slug: "education-lead-page", title: "교육 서비스 상담 페이지 설계", industry: "교육·컨설팅", program: "창업사업화 지원", problem: "서비스 설명은 많지만 고객의 상담 결정 기준이 불명확한 상황", execution: ["홈페이지", "FAQ", "상담 폼"], deliverables: ["서비스 소개 페이지", "FAQ 콘텐츠", "상담 접수 폼"], status: "샘플 실행안", note: "고객 질문을 중심으로 정보 구조와 상담 경로를 설계하는 예시입니다." },
  { slug: "fitness-local-search", title: "운동 시설 지역 검색 기반 강화", industry: "스포츠·건강", program: "디지털 전환 지원", problem: "지역 검색에서 프로그램 특성과 전문성이 잘 드러나지 않는 상황", execution: ["스마트플레이스", "블로그", "AEO·GEO"], deliverables: ["플레이스 정보표", "검색 콘텐츠", "구조화 문답"], status: "샘플 실행안", note: "지역성과 전문 정보를 일관된 데이터로 정리하는 예시입니다." },
  { slug: "craft-brand-launch", title: "공예 브랜드 초기 런칭 체계", industry: "공예·라이프스타일", program: "초기창업패키지", problem: "상품은 준비됐지만 브랜드 소개와 판매 콘텐츠가 부족한 상황", execution: ["브랜드 전략", "홈페이지", "SNS"], deliverables: ["브랜드 소개서", "런칭 홈페이지", "SNS 콘텐츠 세트"], status: "샘플 실행안", note: "런칭에 필요한 최소 브랜드 자산과 채널별 콘텐츠를 준비하는 예시입니다." },
];

export type Insight = {
  slug: string;
  title: string;
  category: string;
  description: string;
  date: string;
  readTime: string;
  content: string[];
};

export const insights: Insight[] = [
  { slug: "hope-return-guide", title: "희망리턴패키지, 공고 전에 확인할 준비 항목", category: "지원사업 안내", description: "현재 사업 상태와 신청 목적을 정리할 때 놓치기 쉬운 기본 항목을 살펴봅니다.", date: "2026.08.18", readTime: "5분", content: ["공고가 열리기 전에는 사업자 상태와 현재 경영 상황, 향후 계획을 먼저 사실에 근거해 정리하는 것이 좋습니다.", "지원 대상과 세부 프로그램은 연도별 공고에서 달라질 수 있습니다. 신청 전 반드시 주관기관의 공식 공고와 제출 서류를 확인하세요.", "선정 이후 실행이 필요한 경우에는 사업계획서의 목표와 예산 항목을 기준으로 필요한 공급업체와 산출물을 미리 검토할 수 있습니다."] },
  { slug: "after-selection-checklist", title: "선정 후 마케팅 실행 체크리스트", category: "실행 가이드", description: "협약부터 예산, 산출물, 증빙, 결과보고까지 실행 전에 확인할 순서입니다.", date: "2026.08.12", readTime: "7분", content: ["선정 통보를 받으면 먼저 협약서, 수정 사업계획서, 집행 가능 기간과 예산 항목을 한곳에 모으세요.", "공급업체와 협의할 때는 목표, 범위, 일정, 산출물, 수정 기준, 증빙 자료를 문서로 합의해야 합니다.", "홈페이지와 콘텐츠는 만드는 것에서 끝나지 않습니다. 고객이 어떻게 발견하고 문의하는지까지 연결해야 실행의 의미가 분명해집니다."] },
  { slug: "budget-mistakes", title: "지원금 집행 시 자주 놓치는 실무 항목", category: "결과보고", description: "집행 전 확인해야 할 증빙과 변경 승인, 산출물 관리의 기본을 정리합니다.", date: "2026.08.05", readTime: "6분", content: ["집행 기준은 사업마다 다르므로 일반적인 관행보다 해당 사업의 지침과 협약 내용을 우선해야 합니다.", "계획과 다른 항목으로 변경하거나 일정이 달라질 때에는 임의로 진행하지 말고 담당기관의 승인 필요 여부를 확인하세요.", "계약서, 견적서, 결과물, 거래 증빙은 실행 과정에서 동시에 관리해야 누락을 줄일 수 있습니다."] },
  { slug: "marketing-plan-writing", title: "사업계획서 마케팅 항목 작성법", category: "선정 전 준비", description: "채널 나열이 아니라 고객·문제·실행·검증이 연결되는 작성 구조를 소개합니다.", date: "2026.07.28", readTime: "8분", content: ["마케팅 계획은 블로그, SNS, 광고 같은 채널 목록보다 누구에게 어떤 가치를 전달할지에서 시작합니다.", "목표 고객이 현재 겪는 문제와 구매 결정 기준을 구체적으로 정리하면 실행 채널을 선택하기 쉬워집니다.", "실행 후 확인할 지표와 산출물을 현실적으로 제시하면 계획의 일관성과 실행 가능성을 보여줄 수 있습니다."] },
];

export const faqs = [
  { q: "어떤 지원사업을 신청할 수 있나요?", a: "업종, 사업 기간, 현재 경영 상태와 목표에 따라 검토할 사업이 달라집니다. 자가진단 후 공식 공고를 기준으로 적합 가능성을 함께 확인합니다." },
  { q: "지원사업 선정을 보장하나요?", a: "아닙니다. 선정은 각 사업의 심사 기준과 주관기관 판단에 따르며, 거상 정부지원사업 마케팅센터는 선정 가능성을 보장하지 않습니다." },
  { q: "이미 선정된 후에도 상담할 수 있나요?", a: "네. 협약서와 사업계획서, 예산 항목, 집행 기한을 바탕으로 가능한 마케팅 실행 범위를 정리해드립니다." },
  { q: "마케팅 비용은 어떻게 산정되나요?", a: "필요한 서비스의 범위, 제작 수량, 운영 기간, 산출물과 보고 기준을 확인한 뒤 항목별로 안내합니다." },
  { q: "결과보고 자료도 받을 수 있나요?", a: "계약 범위에 따라 실행 내역, 산출물, 운영 기록 등 결과보고에 필요한 자료를 정리해드립니다. 최종 제출 기준은 해당 사업 지침을 따릅니다." },
  { q: "전국 비대면 상담이 가능한가요?", a: "네. 전화와 화상회의를 통해 전국 비대면 상담과 프로젝트 진행이 가능합니다." },
];

export const experts = [
  { name: "임헌수 대표", role: "거상스쿨·거상마케팅센터 대표", initials: "임", image: "/images/lim-heonsu.png", bio: "AI 마케팅과 온라인 고객 유입 전략을 바탕으로 홈페이지·AEO·GEO·콘텐츠 시스템을 구축합니다.", specialties: ["AI 마케팅 및 온라인 고객 유입 전략", "홈페이지·AEO·GEO", "콘텐츠 시스템 구축"] },
  { name: "이유진 팀장", role: "SNS·브랜드 콘텐츠 전략", initials: "이", image: "/images/lee-yujin.png", bio: "인플루언서·공동구매·콘텐츠 제작을 연결하고 프로젝트 실행 전 과정을 관리합니다.", specialties: ["SNS·브랜드 콘텐츠 전략", "인플루언서·공동구매", "프로젝트 실행 관리"] },
  { name: "지원사업 전문가 네트워크", role: "사업별 전문 자문", initials: "전", image: null, bio: "지원사업 특성과 업종에 따라 필요한 분야의 전문가 연결을 돕습니다.", specialties: ["사업별 공고 검토", "분야별 전문가 연결", "실행 범위 자문"] },
];

export const navItems = [
  ["희망리턴패키지", "/hope-return"],
  ["정부지원사업", "/programs"],
  ["무료 자가진단", "/diagnosis"],
  ["선정 후 실행", "/after-selection"],
  ["실행 사례", "/cases"],
  ["전문가 네트워크", "/experts"],
  ["자료실", "/insights"],
  ["상담 신청", "/contact"],
] as const;
