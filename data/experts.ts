export type ExpertProfile = {
  slug: string;
  label: string;
  shortLabel: string;
  image: string;
  summary: string;
  services: string[];
  recommendedFor: string[];
};

export const expertProfiles: ExpertProfile[] = [
  { slug: "tax", label: "세무 전문가", shortLabel: "세무", image: "/images/experts/tax.png", summary: "세금 신고·절세 구조와 지원금 집행 과정의 세무 쟁점을 검토합니다.", services: ["세무 신고 방향", "지원금 세무 처리", "사업 구조 점검"], recommendedFor: ["복잡한 세금 문제", "지원금 집행 세무", "폐업·재창업 세무"] },
  { slug: "accounting", label: "회계 전문가", shortLabel: "회계", image: "/images/experts/accounting.png", summary: "회계 기록과 재무자료를 정리해 숫자로 사업 상태를 확인할 수 있도록 돕습니다.", services: ["회계 장부 점검", "재무자료 해석", "정산 자료 준비"], recommendedFor: ["회계·재무 관리", "정산 증빙 준비", "재무 현황 점검"] },
  { slug: "patent", label: "특허 전문가", shortLabel: "특허", image: "/images/experts/patent.png", summary: "아이디어·상표·기술의 권리화 가능성과 출원 준비 방향을 검토합니다.", services: ["상표·특허 상담", "선행 권리 검토", "지식재산 전략"], recommendedFor: ["브랜드 상표 보호", "기술·아이디어 권리화", "특허 분쟁 예방"] },
  { slug: "legal", label: "법률 전문가", shortLabel: "법률", image: "/images/experts/legal.png", summary: "계약과 분쟁, 법적 위험에 관해 자격을 갖춘 전문가의 검토를 연결합니다.", services: ["계약서 검토", "분쟁 대응 방향", "법률 리스크 점검"], recommendedFor: ["계약·거래 분쟁", "채권·채무 문제", "법적 서류 검토"] },
  { slug: "judicial", label: "법무 전문가", shortLabel: "법무", image: "/images/experts/judicial.png", summary: "등기와 법인 관련 서류, 권리관계 정리에 필요한 실무 검토를 돕습니다.", services: ["법인·상업 등기", "부동산 등기", "법무 서류 안내"], recommendedFor: ["법인 설립·변경", "등기 업무", "권리관계 서류"] },
  { slug: "administration", label: "행정 전문가", shortLabel: "행정", image: "/images/experts/administration.png", summary: "인허가와 행정 절차, 정부지원사업 관련 제출 서류의 확인 방향을 안내합니다.", services: ["인허가 절차", "행정 서류 준비", "지원사업 절차 점검"], recommendedFor: ["복잡한 인허가", "행정 서류 보완", "지원사업 절차 확인"] },
  { slug: "labor", label: "노무 전문가", shortLabel: "노무", image: "/images/experts/labor.png", summary: "채용·근로계약·급여와 노사관계에서 필요한 제도와 문서를 점검합니다.", services: ["근로계약 점검", "급여·4대보험", "인사노무 자문"], recommendedFor: ["직장 내 노무 고민", "채용·퇴직 절차", "근로계약 관리"] },
  { slug: "customs", label: "관세 전문가", shortLabel: "관세", image: "/images/experts/customs.png", summary: "수출입 절차와 품목·관세 이슈를 검토하고 해외 판로 준비를 지원합니다.", services: ["수출입 절차", "품목·관세 검토", "통관 서류 안내"], recommendedFor: ["수출입 통관", "해외 판로 준비", "관세·품목 분류"] },
];

export const lifecycleStages = [
  ["01", "스타트업", "아이디어와 사업 구조"],
  ["02", "유년기 성장", "고객과 운영 기반"],
  ["03", "고성장", "인력·자금·권리"],
  ["04", "성숙기 성장", "관리 체계와 확장"],
  ["05", "성숙기 안정", "효율과 위험 관리"],
  ["06", "쇠락·전환", "정리와 재도전"],
] as const;

export const growthStages = [
  { title: "창업 아이템 사업화", subtitle: "예비창업", needs: ["특허", "행정", "세무"], experts: ["patent", "administration", "tax"] },
  { title: "생존과 성장", subtitle: "창업~3년 미만", needs: ["회계", "노무", "마케팅"], experts: ["accounting", "labor"] },
  { title: "혁신 성장", subtitle: "창업 3~7년 미만", needs: ["특허", "법률", "관세"], experts: ["patent", "legal", "customs"] },
  { title: "도약·글로벌 진출", subtitle: "창업 7년 이상", needs: ["관세", "법무", "회계"], experts: ["customs", "judicial", "accounting"] },
] as const;

export const problemLinks = [
  ["복잡한 세금 문제", "tax"], ["회계·재무 관리", "accounting"], ["특허·상표 보호", "patent"], ["계약·분쟁", "legal"],
  ["법인·등기", "judicial"], ["인허가·행정", "administration"], ["채용·노무", "labor"], ["수출입·통관", "customs"],
] as const;

export const expertFaqs = [
  { q: "전문가의 이름과 상세 경력은 왜 공개하지 않나요?", a: "현재 분야별 전문가 섭외는 완료했으며 공개 가능한 프로필을 정리 중입니다. 연결 전에는 상담 분야와 담당 범위를 안내합니다." },
  { q: "거상마케팅센터가 세무·법률 업무를 직접 수행하나요?", a: "아닙니다. 거상마케팅센터는 마케팅 전략과 실행을 담당하며, 자격이 필요한 세무·회계·법률·행정 업무는 해당 분야 외부 전문가 연결을 지원합니다." },
  { q: "전문가 상담만 별도로 신청할 수 있나요?", a: "가능합니다. 현재 문제와 희망 분야를 남겨주시면 필요한 전문 영역을 먼저 분류해 연결 가능 여부를 확인합니다." },
  { q: "전문가 연결을 신청하면 바로 계약되나요?", a: "아닙니다. 요청 내용과 필요한 자료를 확인한 뒤 상담 범위, 일정과 비용을 별도로 안내합니다." },
  { q: "정부지원사업 선정도 전문가가 보장하나요?", a: "선정은 주관기관의 심사와 판단에 따르며 누구도 보장할 수 없습니다. 전문가 연결은 공고와 서류, 실행 준비를 점검하기 위한 절차입니다." },
  { q: "선정 후 홈페이지와 광고도 함께 진행할 수 있나요?", a: "네. 전문 자격 영역은 외부 전문가가, 홈페이지·콘텐츠·SNS·광고·AEO·GEO와 결과보고용 실행 자료는 거상마케팅센터가 담당 범위를 협의합니다." },
];
