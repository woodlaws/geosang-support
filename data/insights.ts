export type InsightStatus = "draft" | "published" | "update-needed" | "archived";
export type InsightSection = { id: string; title: string; answer: string; paragraphs?: string[]; bullets?: string[] };
export type InsightSource = { name: string; notice: string; url: string; noticeDate?: string; checkedAt?: string };
export type InsightAuthor = { name: string; role: string; specialties: string[]; image?: string; bio: string };
export type Insight = {
  id: string; slug: string; title: string; subtitle: string; description: string; excerpt: string;
  content: InsightSection[]; checklist: string[]; category: string; subcategory: string; tags: string[];
  targetAudience: string[]; businessStage: string[]; industry: string[]; relatedPrograms: string[];
  relatedServices: string[]; relatedCases: string[]; relatedInsights: string[]; author: InsightAuthor;
  reviewer?: InsightAuthor; publishedAt: string; updatedAt: string; readTime: string; thumbnail: string;
  ogImage?: string; sourceName?: string; sourceUrl?: string; officialNoticeDate?: string;
  sources: InsightSource[]; contentType: string; featured: boolean; popular: boolean; downloadable: boolean;
  downloadUrl?: string; status: InsightStatus; ctaType: "diagnosis"|"hope"|"expert"|"execution"|"quote"|"report";
  takeaways: [string,string,string]; updateLabel: string;
};

export const insightAuthor: InsightAuthor = {
  name: "임헌수 대표", role: "거상스쿨·거상마케팅센터 대표",
  specialties: ["AI 마케팅", "홈페이지", "AEO·GEO", "고객 유입 전략"], image: "/images/lim-heonsu.png",
  bio: "지원사업의 목적이 홈페이지·콘텐츠·검색과 실제 고객 유입으로 이어지도록 실행 구조를 설계합니다.",
};

const officialPortals = {
  sbiz: { name:"소상공인24", notice:"소상공인 지원사업 공식 포털", url:"https://www.sbiz24.kr/", checkedAt:"2026-08-23" },
  kstartup: { name:"K-Startup 창업지원포털", notice:"창업지원사업 공고 확인", url:"https://www.k-startup.go.kr/web/main/index.do", checkedAt:"2026-08-23" },
  bizinfo: { name:"기업마당", notice:"기업지원사업 공고 확인", url:"https://www.bizinfo.go.kr/", checkedAt:"2026-08-23" },
  mss: { name:"중소벤처기업부", notice:"정책·사업공고 확인", url:"https://www.mss.go.kr/site/smba/main.do", checkedAt:"2026-08-23" },
};

const common = {
  author: insightAuthor, reviewer: undefined, publishedAt:"2026-08-23", updatedAt:"2026-08-23", thumbnail:"editorial",
  ogImage:undefined, officialNoticeDate:undefined, downloadable:false, downloadUrl:undefined, status:"published" as const,
};

export const insights: Insight[] = [
  {
    ...common, id:"ins-001", slug:"hope-return-guide", title:"희망리턴패키지, 누구에게 필요한가요?", subtitle:"현재 사업 상태부터 확인하는 희망리턴패키지 입문 가이드",
    description:"경영 위기, 폐업 준비, 폐업 후 재취업·재창업 단계에서 희망리턴패키지를 살펴볼 때 먼저 확인할 기준을 정리했습니다.", excerpt:"희망리턴패키지를 처음 알아보는 소상공인이 현재 상태와 다음 행동을 구분할 수 있도록 핵심 구조를 쉽게 설명합니다.",
    category:"희망리턴패키지", subcategory:"사업 이해", tags:["희망리턴패키지","소상공인","재창업"], targetAudience:["소상공인","재창업자"], businessStage:["경영위기","폐업 준비","재창업"], industry:["전체 업종"], relatedPrograms:["희망리턴패키지"], relatedServices:["브랜드 전략","홈페이지 제작"], relatedCases:["local-cafe-brand"], relatedInsights:["government-program-search","after-selection-first-step"], contentType:"가이드", featured:true, popular:true, ctaType:"hope", readTime:"6분", sourceName:officialPortals.sbiz.name, sourceUrl:officialPortals.sbiz.url, sources:[officialPortals.sbiz,officialPortals.mss], updateLabel:"세부 공고 확인 필요",
    takeaways:["경영위기·폐업·재도전 단계별로 확인할 정보","신청 전 공식 공고에서 확인해야 할 조건","선정되었을 때 협약과 실행 계획을 점검하는 순서"],
    content:[
      {id:"who",title:"희망리턴패키지는 누구에게 필요한가요?",answer:"희망리턴패키지는 경영 위기, 폐업 준비, 폐업 후 재취업 또는 재창업을 준비하는 소상공인이 단계별 지원을 확인할 때 살펴볼 사업입니다. 세부 지원 대상과 프로그램은 해당 연도의 공식 공고와 신청 시점의 조건을 확인해야 합니다.",paragraphs:["먼저 현재 사업을 운영 중인지, 폐업을 준비하는지, 이미 폐업했고 재도전을 준비하는지를 구분하세요. 같은 사업명 안에서도 현재 상태에 따라 확인할 세부 지원이 달라질 수 있습니다."]},
      {id:"conditions",title:"신청 전에 무엇을 확인해야 하나요?",answer:"사업자 상태, 지원 대상, 제외 요건, 신청 가능 기간과 필수 서류를 공식 공고에서 확인해야 합니다. 기억이나 이전 연도 안내만으로 판단하지 않는 것이 중요합니다.",bullets:["사업자등록과 영업 상태","세부 프로그램의 지원 대상","중복지원·참여 제한 여부","필수 제출 서류와 신청 경로"]},
      {id:"prepare",title:"공고를 본 뒤에는 무엇을 준비하나요?",answer:"현재 문제와 지원이 필요한 이유를 사실에 근거해 정리하고, 제출 서류를 항목별로 준비합니다. 선정 가능성을 보장하는 문구보다 실제 상황과 실행 가능한 계획이 중요합니다.",paragraphs:["공고의 평가 기준이 있다면 사업 현황, 해결 과제, 실행 계획이 서로 이어지는지 확인하세요."]},
      {id:"next",title:"선정 이후에는 무엇이 달라지나요?",answer:"선정 통보 후에는 협약서, 최종 사업계획서, 예산 항목과 실행 기한이 기준이 됩니다. 승인된 범위에서 수행업체와 산출물, 일정, 증빙 방식을 정해야 합니다.",bullets:["협약서와 수정 사업계획서 확보","예산 항목별 집행 가능 범위 확인","수행업체 비교와 산출물 정의","결과보고용 기록을 실행과 동시에 관리"]},
    ], checklist:["현재 사업 상태를 한 문장으로 정리했다","해당 연도의 공식 공고를 확인했다","지원 대상과 제외 요건을 확인했다","선정 후 실행 일정도 미리 검토했다"],
  },
  {
    ...common,id:"ins-002",slug:"after-selection-first-step",title:"정부지원사업 선정 후 가장 먼저 해야 할 일",subtitle:"통보 직후 협약·예산·일정을 정리하는 순서",description:"정부지원사업 선정 통보 후 협약서, 사업계획서, 예산 항목과 실행 마감일부터 확인하는 실무 순서입니다.",excerpt:"선정 직후 무엇부터 해야 할지 막막할 때, 실행 기준이 되는 네 가지 문서를 먼저 정리하는 방법을 안내합니다.",category:"선정 후 실행",subcategory:"실행 준비",tags:["선정 후 실행","협약서","예산 집행"],targetAudience:["지원사업 선정자"],businessStage:["선정 후 실행"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:["홈페이지 제작","SNS 콘텐츠","광고 운영","실행 결과보고"],relatedCases:["education-lead-page"],relatedInsights:["website-budget-check","vendor-selection-guide","result-report-evidence"],contentType:"체크리스트",featured:true,popular:true,ctaType:"execution",readTime:"7분",sourceName:officialPortals.bizinfo.name,sourceUrl:officialPortals.bizinfo.url,sources:[officialPortals.bizinfo,officialPortals.kstartup],updateLabel:"협약·사업별 지침 우선",
    takeaways:["선정 통보 직후 모아야 할 기준 문서","예산과 기한을 실행 계획으로 바꾸는 방법","수행업체와 증빙 기준을 합의하는 순서"],
    content:[
      {id:"first",title:"선정 후 가장 먼저 해야 할 일은 무엇인가요?",answer:"선정 통보 후에는 협약서, 최종 사업계획서, 예산 항목과 실행 마감일을 먼저 확인해야 합니다. 이후 승인된 범위에서 수행업체와 실행 일정을 결정해야 합니다.",paragraphs:["선정 사실만 확인하고 제작부터 시작하면 승인 범위, 일정 또는 증빙 기준과 어긋날 수 있습니다."]},
      {id:"documents",title:"어떤 문서를 한곳에 모아야 하나요?",answer:"선정 안내, 협약서, 수정 사업계획서, 예산 편성표, 운영지침과 담당기관 안내를 최신본으로 모으세요.",bullets:["최종 협약서와 수정 사업계획서","예산 비목별 승인 금액","집행·변경 승인 기준","최종 결과보고 형식과 제출 기한"]},
      {id:"plan",title:"실행 계획은 어떻게 만들까요?",answer:"과업마다 목표, 담당자, 시작일, 검토일, 완료일, 산출물과 증빙을 한 표로 정리하면 됩니다. 외부 수행업체와도 같은 기준표를 공유하세요.",paragraphs:["홈페이지·콘텐츠·광고처럼 연결된 과업은 고객 여정과 제작 순서를 함께 봐야 재작업을 줄일 수 있습니다."]},
      {id:"mistakes",title:"선정 직후 자주 하는 실수는 무엇인가요?",answer:"구두 안내만 믿고 집행하거나, 결과물만 받고 증빙을 나중에 준비하는 실수가 많습니다. 변경 사항은 담당기관 확인과 필요한 승인 절차를 먼저 거치세요.",bullets:["승인 전에 계획을 임의 변경","견적과 산출물 범위를 불명확하게 계약","실행 기록과 증빙을 사후에 수집","결과보고 일정 없이 제작만 진행"]},
    ],checklist:["최종 문서 버전을 확인했다","예산 비목과 부가세 기준을 확인했다","과업별 마감일을 역산했다","산출물과 증빙 책임자를 정했다"],
  },
  {
    ...common,id:"ins-003",slug:"website-budget-check",title:"지원금으로 홈페이지를 만들기 전에 확인할 것",subtitle:"예산 집행과 고객 전환을 함께 보는 홈페이지 체크리스트",description:"지원사업 예산으로 홈페이지 제작을 검토할 때 과업 범위, 산출물, 소유권, 유지관리와 증빙을 확인하는 방법입니다.",excerpt:"예쁜 홈페이지보다 먼저 사업 목적, 고객 행동, 납품 범위와 운영 책임을 문서로 정리해야 합니다.",category:"홈페이지",subcategory:"선정 후 실행",tags:["홈페이지 제작","수행업체","산출물"],targetAudience:["지원사업 선정자","소상공인"],businessStage:["선정 후 실행"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:["홈페이지 제작","AEO·GEO"],relatedCases:["education-lead-page","craft-brand-launch"],relatedInsights:["after-selection-first-step","vendor-selection-guide","result-report-evidence"],contentType:"체크리스트",featured:true,popular:true,ctaType:"quote",readTime:"8분",sources:[officialPortals.bizinfo],updateLabel:"사업별 집행 기준 확인 필요",
    takeaways:["제작 전에 정해야 할 홈페이지의 목적","견적서·계약서에 포함할 산출물","완료 후 운영과 결과보고를 준비하는 방법"],
    content:[
      {id:"goal",title:"지원금 홈페이지는 무엇부터 정해야 하나요?",answer:"홈페이지의 첫 기준은 디자인이 아니라 지원사업 목표와 방문자가 해야 할 행동입니다. 문의, 예약, 구매, 자료 신청 중 핵심 전환을 하나 이상 명확히 정하세요.",paragraphs:["목표가 정해져야 메뉴, 콘텐츠, 기능과 성과 확인 방법을 구체화할 수 있습니다."]},
      {id:"scope",title:"견적서에는 어떤 범위가 필요할까요?",answer:"페이지 수만 적기보다 기획, 디자인, 개발, 원고, 이미지, 도메인, 분석 설정, 유지관리와 산출물 전달 범위를 구분해야 합니다.",bullets:["페이지와 기능 목록","원고·사진 제공 책임","수정 횟수와 검수 일정","도메인·계정·소스 소유권","완료 보고용 산출물"]},
      {id:"vendor",title:"수행업체는 무엇으로 비교하나요?",answer:"비슷한 가격보다 사업 목적 이해도, 일정 관리, 산출물 정의, 접근성·검색 대응, 증빙 협조 범위를 함께 비교하세요.",paragraphs:["제안서의 표현보다 실제 납품 범위와 담당자의 커뮤니케이션 방식을 확인하는 것이 안전합니다."]},
      {id:"after",title:"제작 후 무엇을 남겨야 하나요?",answer:"관리자 계정, 도메인 소유 정보, 최종 파일, 작업 내역, 화면 기록과 계약 범위의 증빙을 정리하세요. 운영 담당자가 직접 수정할 수 있는 범위도 인수받아야 합니다.",bullets:["관리자·분석 계정","최종 화면과 기능 목록","원본·소스 전달 범위","유지관리 연락 체계","결과보고용 실행 내역"]},
    ],checklist:["홈페이지의 핵심 전환을 정했다","견적 범위와 제외 항목을 확인했다","계정과 소유권을 문서에 적었다","산출물·증빙 전달 방식을 합의했다"],
  },
  {
    ...common,id:"ins-004",slug:"government-program-search",title:"내게 맞는 정부지원사업 찾는 방법",subtitle:"사업 단계와 해결 과제로 공고를 좁히는 방법",description:"지원사업 이름부터 찾지 않고 사업 단계, 현재 문제, 필요한 실행을 기준으로 공식 공고를 탐색하는 방법입니다.",excerpt:"수많은 공고를 모두 읽기보다 내 사업의 상태와 해결 과제를 먼저 정리하면 탐색 범위를 줄일 수 있습니다.",category:"신청 준비",subcategory:"지원사업 탐색",tags:["정부지원사업 신청","공고 찾기","자가진단"],targetAudience:["예비창업자","소상공인"],businessStage:["예비창업","초기창업","사업 운영","경영위기"],industry:["전체 업종"],relatedPrograms:["창업지원사업","소상공인 지원사업"],relatedServices:["브랜드 전략"],relatedCases:[],relatedInsights:["notice-reading-order","eligibility-check","marketing-plan-writing"],contentType:"가이드",featured:false,popular:true,ctaType:"diagnosis",readTime:"6분",sources:[officialPortals.kstartup,officialPortals.bizinfo,officialPortals.sbiz],updateLabel:"공식 포털에서 최신 공고 확인",
    takeaways:["사업 단계와 문제로 공고를 좁히는 법","공식 포털을 교차 확인하는 이유","신청 전 적합성을 판단하는 질문"],
    content:[{id:"start",title:"지원사업은 어디서부터 찾아야 하나요?",answer:"사업 이름을 외우기보다 현재 단계, 해결할 문제와 필요한 지원 분야를 먼저 정리하세요. 그 기준으로 K-Startup, 기업마당, 소상공인24의 공식 공고를 검색하면 탐색 범위를 줄일 수 있습니다."},{id:"criteria",title:"어떤 기준으로 후보를 줄이나요?",answer:"사업자 상태, 업력, 소재지, 업종, 지원 목적과 신청 시점의 조건을 공고문에서 대조하세요.",bullets:["현재 사업 단계","해결할 경영 과제","지원이 필요한 분야","실행 가능한 기간"]},{id:"compare",title:"비슷한 공고는 어떻게 비교하나요?",answer:"지원 규모만 보지 말고 자부담, 집행 가능 항목, 의무사항, 일정과 결과보고 부담을 함께 비교해야 합니다."},{id:"next",title:"후보를 찾은 다음에는 무엇을 하나요?",answer:"공식 공고 원문을 저장하고 지원 대상, 제외 요건, 제출 서류와 평가 기준을 체크리스트로 옮기세요."}],checklist:["사업 단계를 정했다","해결 과제를 한 문장으로 적었다","공식 포털에서 원문을 확인했다","신청과 실행 일정을 감당할 수 있는지 봤다"],
  },
  {
    ...common,id:"ins-005",slug:"notice-reading-order",title:"정부지원사업 공고문 읽는 순서",subtitle:"긴 공고문에서 먼저 확인할 항목",description:"정부지원사업 공고문을 지원 대상, 제외 요건, 일정, 제출 서류, 평가, 집행 순서로 빠르게 읽는 방법입니다.",excerpt:"첫 페이지부터 정독하기보다 신청 가능 여부와 실행 부담을 결정하는 항목부터 확인하세요.",category:"최신 공고",subcategory:"공고 해설",tags:["공고문","신청 자격","제출 서류"],targetAudience:["예비창업자","소상공인"],businessStage:["예비창업","초기창업","사업 운영"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:[],relatedCases:[],relatedInsights:["eligibility-check","application-mistakes","government-program-search"],contentType:"가이드",featured:false,popular:false,ctaType:"expert",readTime:"5분",sources:[officialPortals.mss,officialPortals.bizinfo],updateLabel:"공고 원문 우선",
    takeaways:["신청 가능 여부를 먼저 판별하는 순서","본문·별첨·서식의 역할","질문이 남을 때 확인할 공식 경로"],content:[{id:"order",title:"공고문은 어떤 순서로 읽어야 하나요?",answer:"지원 대상과 제외 요건을 먼저 확인한 뒤 신청 기간, 제출 서류, 평가 기준, 지원 내용과 집행 조건 순서로 읽으세요."},{id:"attachments",title:"첨부파일도 모두 봐야 하나요?",answer:"공고문 본문만으로 부족한 기준이 별첨 지침과 신청 서식에 들어 있을 수 있습니다. 체크리스트를 만들 때 본문과 첨부파일을 함께 확인하세요."},{id:"terms",title:"어려운 용어는 어떻게 확인하나요?",answer:"임의로 해석하지 말고 공고의 정의 조항, 주관기관 FAQ와 문의처를 순서대로 확인하세요."},{id:"record",title:"읽은 내용은 어떻게 정리하나요?",answer:"자격, 기한, 서류, 평가, 집행, 문의처 여섯 칸으로 요약하면 신청 준비와 팀 공유가 쉬워집니다."}],checklist:["지원 대상과 제외 요건을 먼저 봤다","첨부 지침과 서식을 열었다","기한과 제출 방식을 기록했다","모호한 항목은 공식 문의처에 확인한다"],
  },
  {
    ...common,id:"ins-006",slug:"eligibility-check",title:"신청 자격과 제외 대상 확인법",subtitle:"신청 전에 부적합 가능성을 줄이는 확인 순서",description:"사업자 상태, 업력, 업종, 소재지와 참여 제한 등 신청 자격과 제외 요건을 공식 공고에서 대조하는 방법입니다.",excerpt:"좋은 사업계획보다 먼저 신청 가능한 상태인지 객관적인 증빙과 공고 기준으로 확인해야 합니다.",category:"신청 준비",subcategory:"자격 확인",tags:["신청 자격","제외 대상","중복지원"],targetAudience:["예비창업자","소상공인"],businessStage:["예비창업","초기창업","사업 운영"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:[],relatedCases:[],relatedInsights:["notice-reading-order","application-mistakes","marketing-plan-writing"],contentType:"체크리스트",featured:false,popular:false,ctaType:"expert",readTime:"6분",sources:[officialPortals.kstartup,officialPortals.bizinfo],updateLabel:"세부 공고 기준",
    takeaways:["자격을 판단할 기본 증빙","제외 요건과 중복지원 확인법","애매한 경우 공식 확인을 남기는 방법"],content:[{id:"proof",title:"신청 자격은 무엇으로 확인하나요?",answer:"사업자등록 상태, 업력, 소재지, 업종과 공고가 요구하는 증빙을 기준으로 확인합니다. 자기 판단보다 발급 가능한 서류와 공고 문구가 우선입니다."},{id:"exclude",title:"제외 대상은 왜 먼저 봐야 하나요?",answer:"참여 제한, 휴·폐업 상태, 세금 체납, 업종 제한 등은 사업마다 다를 수 있어 신청 전 반드시 원문을 확인해야 합니다."},{id:"overlap",title:"중복지원은 어떻게 확인하나요?",answer:"같은 비용이나 같은 과업에 대한 중복 지원 제한이 있는지 해당 공고와 기존 협약을 함께 대조하세요."},{id:"ask",title:"판단이 애매하면 어떻게 하나요?",answer:"주관기관 공식 문의처에 사실관계를 구체적으로 설명하고 답변을 기록해 두는 것이 안전합니다."}],checklist:["사업자 상태 증빙을 준비했다","업력·소재지·업종 기준을 대조했다","참여 제한과 중복지원 여부를 봤다","애매한 내용은 공식 문의했다"],
  },
  {
    ...common,id:"ins-007",slug:"marketing-plan-writing",title:"사업계획서의 마케팅 전략 작성법",subtitle:"채널 나열을 고객·문제·실행·검증 구조로 바꾸기",description:"사업계획서 마케팅 항목을 목표 고객, 해결 문제, 실행 채널, 산출물과 검증 지표로 연결하는 작성 방법입니다.",excerpt:"블로그·SNS·광고를 나열하지 말고 왜 필요한지와 무엇으로 실행을 확인할지 보여주세요.",category:"사업계획서",subcategory:"마케팅 전략",tags:["사업계획서","마케팅 전략","시장 분석"],targetAudience:["예비창업자","초기창업자"],businessStage:["예비창업","초기창업"],industry:["전체 업종"],relatedPrograms:["창업지원사업"],relatedServices:["브랜드 전략","홈페이지 제작"],relatedCases:["craft-brand-launch"],relatedInsights:["government-program-search","application-mistakes","after-selection-first-step"],contentType:"가이드",featured:false,popular:true,ctaType:"expert",readTime:"8분",sources:[officialPortals.kstartup],updateLabel:"사업별 평가 기준 확인",
    takeaways:["마케팅 전략을 구성하는 네 가지 요소","시장 분석을 고객 언어로 바꾸는 법","실행 후 검증할 산출물과 지표"],content:[{id:"conclusion",title:"마케팅 전략의 핵심은 무엇인가요?",answer:"누구의 어떤 문제를 어떤 메시지와 채널로 해결하고, 결과를 무엇으로 확인할지 한 흐름으로 설명하는 것입니다."},{id:"customer",title:"목표 고객은 얼마나 구체적이어야 하나요?",answer:"연령만 적기보다 구매 상황, 불편, 비교 기준과 정보를 찾는 경로를 구체화하세요."},{id:"channel",title:"채널은 어떻게 선택하나요?",answer:"유행보다 고객이 정보를 찾고 신뢰하고 행동하는 과정에서 각 채널의 역할을 정하세요.",bullets:["발견: 검색·SNS·광고","이해: 홈페이지·상세페이지","신뢰: 사례·리뷰·FAQ","행동: 문의·예약·구매"]},{id:"measure",title:"무엇으로 실행을 검증하나요?",answer:"예산과 기간 안에서 확인 가능한 산출물, 유입, 문의 같은 지표를 정하되 성과를 과장하거나 보장하지 마세요."}],checklist:["목표 고객의 구매 상황을 적었다","문제와 메시지가 연결된다","채널마다 역할이 있다","산출물과 확인 지표가 현실적이다"],
  },
  {
    ...common,id:"ins-008",slug:"application-mistakes",title:"정부지원사업 신청 시 자주 하는 실수",subtitle:"제출 전 줄일 수 있는 기본 오류",description:"공고 기준 누락, 서류 버전 혼동, 과도한 표현과 실행 불가능한 계획처럼 신청 과정에서 자주 생기는 실수를 정리했습니다.",excerpt:"선정 비법보다 공고 준수, 사실 확인, 문서 일관성과 제출 점검이 먼저입니다.",category:"신청 준비",subcategory:"제출 점검",tags:["신청 서류","자주 하는 실수","체크리스트"],targetAudience:["예비창업자","소상공인"],businessStage:["예비창업","초기창업","사업 운영"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:[],relatedCases:[],relatedInsights:["notice-reading-order","eligibility-check","marketing-plan-writing"],contentType:"FAQ",featured:false,popular:false,ctaType:"expert",readTime:"6분",sources:[officialPortals.bizinfo],updateLabel:"공식 제출 기준 우선",
    takeaways:["제출 전에 발견할 수 있는 오류","문서 간 불일치를 줄이는 법","선정 보장 표현을 피해야 하는 이유"],content:[{id:"common",title:"가장 흔한 신청 실수는 무엇인가요?",answer:"지원 대상과 제외 요건을 끝까지 확인하지 않거나, 오래된 서식과 공고를 사용하는 실수입니다."},{id:"consistency",title:"문서의 일관성은 어떻게 확인하나요?",answer:"문제, 목표, 예산, 일정과 산출물이 각 문서에서 같은 방향을 가리키는지 대조하세요."},{id:"claims",title:"강한 표현이 더 유리한가요?",answer:"근거 없는 시장 규모, 매출 전망이나 선정 보장 표현은 신뢰를 낮춥니다. 확인 가능한 근거와 현실적인 가정으로 작성하세요."},{id:"submit",title:"제출 직전 무엇을 확인하나요?",answer:"파일명, 형식, 용량, 서명, 필수 첨부와 제출 완료 상태를 공식 시스템에서 확인하세요."}],checklist:["최신 공고와 서식을 사용한다","필수 첨부와 서명을 확인한다","수치와 주장의 근거가 있다","제출 완료 화면을 확인한다"],
  },
  {
    ...common,id:"ins-009",slug:"vendor-selection-guide",title:"마케팅 수행업체 선정 기준",subtitle:"가격표 밖의 실행 역량을 비교하는 체크리스트",description:"정부지원사업 선정 후 홈페이지·콘텐츠·광고 수행업체를 비교할 때 과업 이해, 산출물, 일정과 증빙 대응을 확인하는 기준입니다.",excerpt:"가장 싼 견적보다 무엇을 언제 어떤 형태로 납품하고 어떻게 기록할지 비교해야 합니다.",category:"선정 후 실행",subcategory:"수행업체",tags:["수행업체","비교견적","계약"],targetAudience:["지원사업 선정자"],businessStage:["선정 후 실행"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:["홈페이지 제작","SNS 콘텐츠","광고 운영"],relatedCases:["local-food-content","beauty-booking-funnel"],relatedInsights:["after-selection-first-step","website-budget-check","result-report-evidence"],contentType:"비교 콘텐츠",featured:false,popular:true,ctaType:"quote",readTime:"7분",sources:[officialPortals.bizinfo],updateLabel:"협약·지침의 조달 기준 확인",
    takeaways:["견적 외에 비교할 수행 역량","계약 전 합의할 산출물과 수정 기준","증빙과 결과보고 협조 범위"],content:[{id:"criteria",title:"수행업체는 무엇으로 비교해야 하나요?",answer:"과업 목적 이해, 담당 인력, 일정, 산출물, 수정 기준, 계정 소유권과 증빙 대응 범위를 같은 표로 비교하세요."},{id:"quote",title:"비교견적은 가격만 보면 되나요?",answer:"항목명이 같아도 포함 범위가 다를 수 있습니다. 수량, 규격, 운영 기간과 제외 항목을 맞춰 비교하세요."},{id:"contract",title:"계약서에 무엇을 적어야 하나요?",answer:"납기, 검수, 수정, 산출물 형식, 원본 전달, 계정과 저작권, 증빙 제공 범위를 구체적으로 적으세요."},{id:"warning",title:"주의할 신호는 무엇인가요?",answer:"공고나 협약 확인 없이 가능하다고 단정하거나, 성과와 선정을 보장하는 표현을 쓰는 업체는 주의해야 합니다."}],checklist:["같은 범위로 견적을 비교했다","담당자와 일정이 명확하다","소유권·원본 전달을 확인했다","증빙 협조 범위를 합의했다"],
  },
  {
    ...common,id:"ins-010",slug:"result-report-evidence",title:"산출물과 증빙자료 정리법",subtitle:"결과보고 직전에 찾지 않도록 실행 중 기록하기",description:"정부지원사업 실행 과정에서 계약, 견적, 산출물, 화면 기록과 운영 내역을 결과보고에 맞게 정리하는 기본 방법입니다.",excerpt:"증빙은 마지막에 모으는 일이 아니라 과업이 진행될 때 함께 남기는 실행 기록입니다.",category:"증빙·결과보고",subcategory:"결과보고",tags:["결과보고","산출물","증빙"],targetAudience:["지원사업 선정자"],businessStage:["선정 후 실행","결과보고"],industry:["전체 업종"],relatedPrograms:["정부지원사업"],relatedServices:["실행 결과보고"],relatedCases:["education-lead-page"],relatedInsights:["after-selection-first-step","vendor-selection-guide","website-budget-check"],contentType:"체크리스트",featured:false,popular:true,ctaType:"report",readTime:"7분",sources:[officialPortals.bizinfo],updateLabel:"사업별 결과보고 지침 우선",
    takeaways:["실행 중 함께 모아야 할 기록","산출물과 증빙을 연결하는 방법","결과보고 전에 확인할 누락 항목"],content:[{id:"when",title:"증빙자료는 언제 정리해야 하나요?",answer:"계약, 제작, 검수, 납품과 지급 단계마다 바로 정리해야 합니다. 마지막에 모으면 날짜와 버전, 승인 기록을 놓치기 쉽습니다."},{id:"structure",title:"폴더는 어떻게 구성하나요?",answer:"과업별로 계약·견적, 진행 기록, 최종 산출물, 거래 증빙과 승인 자료를 같은 번호 체계로 묶으세요."},{id:"output",title:"산출물은 무엇을 남기나요?",answer:"최종 파일뿐 아니라 화면, URL, 게시일, 운영 기간과 계약 범위에 포함된 원본을 정리하세요."},{id:"before",title:"결과보고 전에 무엇을 대조하나요?",answer:"협약과 사업계획의 목표, 실제 실행 내역, 지출과 산출물이 서로 맞는지 확인하고 누락은 담당기관 지침에 따라 보완하세요."}],checklist:["과업별 폴더 체계를 만들었다","버전과 날짜를 기록한다","최종 산출물과 실행 화면을 보관한다","협약·지출·산출물을 대조한다"],
  },
  {
    ...common,id:"ins-011",slug:"local-cafe-marketing",title:"음식점·카페의 지역 검색 마케팅 시작법",subtitle:"스마트플레이스와 콘텐츠를 방문 행동으로 연결하기",description:"음식점과 카페가 스마트플레이스, 블로그, 메뉴 콘텐츠와 숏폼을 지역 고객의 방문 행동으로 연결하는 기초 전략입니다.",excerpt:"채널을 늘리기 전에 고객이 검색하고 비교하고 방문하기까지 필요한 정보를 일관되게 정리하세요.",category:"업종별 가이드",subcategory:"음식점·카페",tags:["음식점·카페","스마트플레이스","지역 검색"],targetAudience:["소상공인"],businessStage:["사업 운영","선정 후 실행"],industry:["음식점·카페"],relatedPrograms:["소상공인 지원사업"],relatedServices:["스마트플레이스","네이버 블로그","숏폼 제작"],relatedCases:["local-cafe-brand"],relatedInsights:["website-budget-check","after-selection-first-step"],contentType:"업종별 가이드",featured:false,popular:false,ctaType:"quote",readTime:"7분",sources:[],updateLabel:"업체 상황에 따라 실행 범위 조정",
    takeaways:["지역 고객이 확인하는 핵심 정보","플레이스·블로그·숏폼의 역할","문의와 방문을 확인하는 기초 지표"],content:[{id:"start",title:"지역 검색 마케팅은 어디서 시작하나요?",answer:"상호, 업종, 위치, 영업 정보, 대표 메뉴와 방문 이유를 모든 채널에서 일관되게 정리하는 것부터 시작합니다."},{id:"place",title:"스마트플레이스에는 무엇이 중요하나요?",answer:"정확한 기본 정보, 대표 이미지, 메뉴, 예약·문의 경로와 고객이 자주 묻는 질문을 최신 상태로 관리하세요."},{id:"content",title:"콘텐츠는 무엇을 보여줘야 하나요?",answer:"메뉴만 반복하기보다 만드는 과정, 공간, 이용 상황, 찾아오는 방법과 실제 선택 기준을 보여주세요."},{id:"measure",title:"무엇을 확인하면 되나요?",answer:"노출 수치 하나보다 전화, 길찾기, 예약, 메뉴 확인 등 방문 전 행동의 변화를 함께 보세요."}],checklist:["채널의 기본 정보가 일치한다","대표 메뉴와 방문 이유가 선명하다","문의·예약 경로가 짧다","방문 전 행동을 확인한다"],
  },
  {
    ...common,id:"ins-012",slug:"aeo-geo-professional-service",title:"교육·컨설팅을 위한 AEO·GEO 콘텐츠 구조",subtitle:"전문성을 질문과 근거로 설명하는 방법",description:"교육·컨설팅 사업자가 검색과 생성형 AI가 이해하기 쉬운 질문·답변, 근거, 작성자와 서비스 연결 구조를 만드는 방법입니다.",excerpt:"모호한 홍보 문구보다 고객 질문에 직접 답하고, 작성자·근거·서비스 범위를 명확히 연결하세요.",category:"AEO·GEO",subcategory:"교육·컨설팅",tags:["AEO·GEO","교육·컨설팅","전문가 브랜딩"],targetAudience:["교육·컨설팅 사업자"],businessStage:["사업 운영","선정 후 실행"],industry:["교육·컨설팅","전문 서비스"],relatedPrograms:["소상공인 지원사업"],relatedServices:["AEO·GEO","홈페이지 제작","네이버 블로그"],relatedCases:["education-lead-page"],relatedInsights:["website-budget-check","marketing-plan-writing"],contentType:"가이드",featured:false,popular:false,ctaType:"quote",readTime:"8분",sources:[],updateLabel:"콘텐츠·서비스 정보 기준",
    takeaways:["질문형 콘텐츠의 직접 답변 구조","전문성과 신뢰를 보여주는 근거","콘텐츠를 상담 전환으로 연결하는 방법"],content:[{id:"meaning",title:"AEO·GEO 콘텐츠는 무엇이 다른가요?",answer:"사용자의 구체적인 질문에 짧고 명확한 답을 먼저 주고, 근거와 상세 설명, 작성자, 관련 서비스를 구조적으로 연결합니다."},{id:"questions",title:"어떤 질문을 다뤄야 하나요?",answer:"고객이 상담 전에 묻는 대상, 방법, 비용 기준, 기간, 준비물, 결과물과 비교 질문부터 정리하세요."},{id:"trust",title:"전문성은 어떻게 보여주나요?",answer:"작성자 역할, 실제 전문 분야, 업데이트 날짜, 공식 또는 원천 출처와 적용 범위를 명확히 표시하세요."},{id:"conversion",title:"상담 전환은 어디에 배치하나요?",answer:"답변 중간과 마지막에 질문의 다음 행동과 맞는 자료, 진단 또는 견적 CTA를 자연스럽게 연결하세요."}],checklist:["핵심 질문에 직접 답한다","작성자와 업데이트일을 표시한다","근거와 적용 범위를 밝힌다","다음 행동 CTA가 문맥에 맞다"],
  },
];

export const publishedInsights = insights.filter((item)=>item.status === "published");
export const findInsight = (slug:string) => publishedInsights.find((item)=>item.slug === slug);
export const getRelatedInsights = (item:Insight) => item.relatedInsights.map(findInsight).filter((x):x is Insight=>Boolean(x)).slice(0,3);
export const insightCategories = ["전체","최신 공고","희망리턴패키지","창업지원사업","소상공인 지원","신청 준비","사업계획서","선정 후 실행","홈페이지","네이버·스마트플레이스","SNS·콘텐츠","광고·판로","AEO·GEO","증빙·결과보고","실행 사례","업종별 가이드"];
export const businessStages = ["예비창업","초기창업","사업 운영","경영위기","폐업 준비","재창업","선정 후 실행","결과보고"];
export const contentTypes = ["공고 해설","가이드","체크리스트","FAQ","사례","템플릿","용어 설명","비교 콘텐츠","업종별 가이드","영상·강의"];
export const industries = ["전체 업종","음식점·카페","농업·수산","제조·제품","온라인 쇼핑몰","교육·컨설팅","숙박·관광","전문 서비스","뷰티·건강","전통시장·지역사업","IT·플랫폼"];

export const insightFaqs = [
  {q:"자료실의 정보는 무료인가요?",a:"네. 공개된 자료는 무료로 열람할 수 있습니다. 별도 제작·상담·대행 범위는 현재 상황을 확인한 뒤 안내합니다."},
  {q:"최신 정부지원사업 공고는 어디에서 확인하나요?",a:"중소벤처기업부, K-Startup, 기업마당, 소상공인24와 각 주관기관의 공식 공고를 우선 확인하세요."},
  {q:"자료실의 내용만 보고 신청해도 되나요?",a:"자료실은 이해를 돕는 참고 정보입니다. 최종 신청 대상, 제출 서류와 일정은 해당 연도의 공식 공고가 기준입니다."},
  {q:"지원 대상과 금액은 매년 동일한가요?",a:"아닙니다. 지원 대상, 내용, 규모와 일정은 연도와 세부 공고에 따라 달라질 수 있습니다."},
  {q:"희망리턴패키지 자료도 있나요?",a:"네. 사업 이해, 신청 전 확인 사항과 선정 후 실행 준비 자료를 순차적으로 제공합니다."},
  {q:"사업계획서 작성 자료를 볼 수 있나요?",a:"마케팅 전략, 목표 고객, 시장 분석과 실행 가능성을 정리하는 글을 무료로 볼 수 있습니다."},
  {q:"선정 후 실행에 관한 정보도 있나요?",a:"협약·예산 확인부터 수행업체 선정, 홈페이지·콘텐츠·광고와 결과보고 준비까지 안내합니다."},
  {q:"무료 체크리스트를 받을 수 있나요?",a:"현재 다운로드 자료는 준비 중입니다. 준비된 파일 없이 가짜 다운로드를 제공하지 않으며, 공개되면 자료실에서 안내합니다."},
  {q:"이미 선정된 후에도 상담할 수 있나요?",a:"네. 협약서, 사업계획서, 예산과 집행 기한을 바탕으로 가능한 실행 범위를 함께 정리합니다."},
  {q:"홈페이지나 콘텐츠 제작을 맡길 수 있나요?",a:"네. 사업 목적과 허용 예산을 확인한 뒤 홈페이지, 콘텐츠, 광고와 AEO·GEO 등 필요한 범위를 제안합니다."},
  {q:"결과보고 자료도 도움받을 수 있나요?",a:"계약 범위의 산출물과 실행 내역 정리를 지원합니다. 최종 제출 기준과 승인 여부는 해당 사업 지침과 주관기관 판단을 따릅니다."},
  {q:"거상마케팅센터는 정부기관인가요?",a:"아닙니다. 거상마케팅센터는 정부지원사업 정보와 선정 후 마케팅 실행을 돕는 민간 마케팅 전문회사이며 선정이나 지원금 수령을 보장하지 않습니다."},
];
