import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HopeReturnContactForm } from "@/components/HopeReturnContactForm";
import { HopeReturnDiagnosis } from "@/components/HopeReturnDiagnosis";
import { JsonLd } from "@/components/JsonLd";
import { cases, services, SITE_NAME, SITE_URL } from "@/data/site";
import { breadcrumbJson, faqJson } from "@/lib/seo";

const overview = [
  ["↗", "경영위기 지원", "경영 상황을 진단하고 개선 방향을 준비합니다."],
  ["□", "원스톱 폐업지원", "사업 정리 과정에서 필요한 상담과 지원을 확인합니다."],
  ["✓", "재취업 지원", "폐업 이후 새로운 직업과 취업을 준비합니다."],
  ["◎", "재창업 지원", "사업 모델을 재정비하고 재창업을 준비합니다."],
];

const situations = [
  ["01", "현재 영업 중이지만 경영이 어렵습니다.", "경영 개선, 사업 진단, 비용 구조와 향후 방향을 먼저 확인해야 합니다."],
  ["02", "폐업을 고민하거나 준비하고 있습니다.", "폐업 시기, 점포 정리, 세무·행정 절차와 이용 가능한 지원을 확인해야 합니다."],
  ["03", "이미 폐업했고 취업을 준비하고 있습니다.", "재취업 교육과 취업 관련 연계 지원을 확인할 수 있습니다."],
  ["04", "폐업 후 다시 창업하려고 합니다.", "재창업 교육, 사업계획, 사업화와 마케팅 실행 계획을 준비해야 합니다."],
];

const supportAreas = [
  ["사업 정리 컨설팅", "폐업 예정 또는 폐업 과정의 판단이 필요한 분", "사업 정리 분야별 상담 범위를 확인", "사업 상태와 임대차·사업장 현황"],
  ["점포 철거·원상복구", "임차 점포 정리를 준비하는 분", "해당 연도 공고의 인정 범위와 절차 확인", "임대차계약서, 점포 사진, 폐업 관련 자료"],
  ["법률 자문", "폐업 과정의 계약·법률 문제가 있는 분", "세부 공고에서 정한 법률 상담", "계약서와 사실관계를 확인할 자료"],
  ["채무조정 관련 안내", "사업 채무로 재기 계획에 어려움이 있는 분", "상담과 연계 가능한 제도 확인", "채무와 소득·자산 현황 자료"],
  ["재취업 교육·연계", "폐업 후 취업 전환을 준비하는 분", "교육 및 연계 프로그램 확인", "취업 목표와 경력·폐업 상태 자료"],
  ["재창업 교육", "새로운 업종과 모델로 재도전하는 분", "재창업 역량과 사업 모델 준비", "아이템, 고객, 시장에 대한 기초 계획"],
  ["재기사업화", "사업화 실행을 준비하는 참여자", "세부 모집의 사업화 범위 확인", "사업계획과 실행 일정·예산 초안"],
  ["경영개선·재창업 사업화", "경영 개선 또는 재창업 실행이 필요한 분", "공고와 협약 범위 내 실행 과업 확인", "진단 결과, 사업계획, 증빙 가능 산출물"],
];

const preparation = [
  ["현재 사업 상태 확인", "영업·폐업·재창업 상태를 사실에 맞게 정리", "사업자등록 관련 서류"],
  ["지원 가능한 세부 사업 찾기", "현재 상황과 목표에 맞는 지원 분야 구분", "폐업사실증명원 등 상태 확인 자료"],
  ["공식 공고·자격조건 확인", "대상, 제외 요건, 기준일과 신청 기간 확인", "공고문과 자격 확인 자료"],
  ["신청 서류·증빙 준비", "요구 형식과 발급 기준에 맞춰 서류 구성", "매출 자료·임대차계약서·점포 사진"],
  ["전문가 검토·신청", "누락과 내용 불일치를 점검한 뒤 제출", "세금 관련 서류·사업계획서"],
  ["선정 후 협약·실행 준비", "수정 계획과 예산, 일정, 산출물을 확정", "협약서와 공고의 추가 요구 서류"],
];

const mistakes = ["본인 상황과 맞지 않는 세부 사업에 신청", "신청 자격과 폐업 기준일을 확인하지 않음", "공고문에 없는 서류 형식으로 제출", "매출과 사업 현황을 구체적으로 설명하지 못함", "재창업 사업계획이 기존 사업과 차별화되지 않음", "선정 이후 예산 집행 기준을 확인하지 않음", "제작업체를 늦게 찾아 실행 기간이 부족해짐", "증빙과 결과보고 자료를 실행 후에 준비함"];
const afterSelection = ["협약 내용과 집행 가능 항목 확인", "사업계획서의 마케팅 목표 재확인", "실행 일정과 예산 배분", "홈페이지·콘텐츠·광고 제작", "증빙 자료와 산출물 관리", "결과보고 준비"];

const serviceDetails = [
  ["브랜드 전략", "고객에게 강점이 명확하지 않은 문제", "브랜드 메시지·채널 실행안"],
  ["다페이지 홈페이지 제작", "정보와 신뢰 근거가 흩어진 문제", "서비스·사례·상담 구조의 홈페이지"],
  ["전환형 랜딩페이지 제작", "광고 유입이 문의로 이어지지 않는 문제", "캠페인별 상담 랜딩페이지"],
  ["네이버 블로그 콘텐츠", "검색 노출과 설명 콘텐츠가 부족한 문제", "키워드 기획·원고·발행 콘텐츠"],
  ["스마트플레이스 최적화", "지역 고객에게 매장 정보가 약한 문제", "정보 구조·사진·소식 운영안"],
  ["인스타그램·카드뉴스", "브랜드 톤과 콘텐츠 일관성이 없는 문제", "채널 기획·카드뉴스 세트"],
  ["숏폼·광고 영상", "짧게 강점을 전달할 소재가 없는 문제", "기획안·촬영·편집 영상"],
  ["네이버·메타 광고", "목표와 고객이 불명확한 광고 문제", "캠페인 구조·소재·운영 기록"],
  ["AEO·GEO 검색 구조", "검색과 AI가 사업을 이해하기 어려운 문제", "질문형 콘텐츠·구조화 데이터"],
  ["산출물·결과보고 정리", "실행 근거와 자료가 흩어지는 문제", "실행 목록·산출물·운영 기록"],
];

export const hopeReturnFaqs = [
  { q: "현재 영업 중이어도 신청할 수 있나요?", a: "경영위기 지원 등 영업 중인 소상공인이 확인할 수 있는 세부 사업이 있을 수 있습니다. 대상과 요건은 해당 연도의 세부 공고를 기준으로 확인해야 합니다." },
  { q: "이미 폐업했는데 신청할 수 있나요?", a: "폐업 상태와 폐업일, 세부 사업에 따라 확인할 수 있는 지원이 달라집니다. 폐업사실과 신청 기준일을 공식 공고에서 확인하세요." },
  { q: "점포 철거 전에 신청해야 하나요?", a: "철거 시점과 인정 절차는 중요한 확인 항목입니다. 임의로 진행하기 전에 해당 연도 공고와 접수기관의 안내를 먼저 확인해야 합니다." },
  { q: "모든 폐업 소상공인이 지원받을 수 있나요?", a: "아닙니다. 사업별 지원 대상, 제외 요건, 예산과 심사 기준이 있으므로 모든 신청자가 지원받는 것은 아닙니다." },
  { q: "지원금 선정을 보장해주나요?", a: "선정이나 지원을 보장하지 않습니다. 최종 판단은 주관기관의 자격 검토와 심사 기준에 따라 이루어집니다." },
  { q: "사업계획서 작성도 도움받을 수 있나요?", a: "공고 분석과 사업계획서 전문 검토가 필요한 경우 관련 전문가 연결을 안내합니다. 사실과 실행 가능성에 기반해 준비해야 합니다." },
  { q: "이미 선정된 후에도 상담할 수 있나요?", a: "네. 협약서, 승인된 사업계획서, 예산 항목과 집행 기한을 확인한 뒤 마케팅 실행 범위를 상담할 수 있습니다." },
  { q: "지원금으로 홈페이지를 만들 수 있나요?", a: "가능 여부는 선정 사업의 협약과 집행 기준에 따라 다릅니다. 집행 가능 항목과 승인 필요 여부를 확인한 후 진행합니다." },
  { q: "광고나 SNS 콘텐츠 제작도 가능한가요?", a: "거상마케팅센터는 콘텐츠, SNS, 광고 실행을 직접 담당합니다. 다만 실제 과업은 협약과 집행 기준에서 허용되는 범위를 먼저 확인합니다." },
  { q: "결과보고에 필요한 산출물도 받을 수 있나요?", a: "계약 범위에 따라 제작물과 실행 기록을 정리해드립니다. 최종 제출 형식과 인정 기준은 주관기관 지침을 따라야 합니다." },
  { q: "전국 비대면 상담이 가능한가요?", a: "네. 전화와 화상회의를 통한 전국 비대면 상담과 프로젝트 진행이 가능합니다." },
  { q: "거상마케팅센터는 정부기관인가요?", a: "아닙니다. 거상마케팅센터는 정부기관이 아닌 민간 마케팅 전문회사이며, 지원사업 정보 안내와 전문가 연결, 선정 이후 마케팅 실행을 제공합니다." },
];

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading centered"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function HopeReturnPage() {
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "희망리턴패키지 신청 준비 및 선정 후 마케팅 실행 상담", provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL }, areaServed: "KR", description: "희망리턴패키지 정보 안내, 전문가 연결과 선정 이후 홈페이지·콘텐츠·광고·결과보고 실행 서비스" };
  return <>
    <JsonLd data={[breadcrumbJson([{ name: "홈", path: "/" }, { name: "희망리턴패키지", path: "/hope-return" }]), faqJson(hopeReturnFaqs), serviceSchema]} />
    <section className="hope-hero"><div className="shell hope-hero-grid"><div className="hope-hero-copy"><span className="eyebrow">소상공인 재기 지원</span><h1>폐업의 끝이 아니라,<br /><em>다시 시작하는 방법</em>을 찾으세요</h1><p>희망리턴패키지의 지원 대상과 신청 방향을 확인하고,<br className="desktop-only" /> 선정 이후 필요한 마케팅 실행까지 한 번에 준비해드립니다.</p><div className="button-row"><Link className="button button-primary" href="#diagnosis">나도 지원 대상인지 확인하기 →</Link><Link className="button button-coral" href="#consult">이미 선정됐다면 실행 상담받기</Link></div><small>지원 대상과 내용은 세부 사업 및 해당 연도의 공고에 따라 달라질 수 있습니다. 최종 신청 전 반드시 공식 공고를 확인하시기 바랍니다.</small></div><div className="hope-hero-visual"><img src="/images/hero-korean-consulting-v2.png" alt="한국인 소상공인과 전문가가 노트북과 서류를 보며 희망리턴패키지를 상담하는 모습" /><aside><span>무료 대상 확인</span><strong>3분이면 현재 단계와 필요한 지원 방향을 확인할 수 있습니다.</strong><Link href="#diagnosis">지금 확인하기 →</Link></aside></div></div></section>
    <Breadcrumb current="희망리턴패키지" />

    <section className="section"><div className="shell"><Heading eyebrow="한눈에 보기" title="희망리턴패키지란 무엇인가요?" description="경영 위기를 겪고 있거나 폐업을 준비하는 소상공인이 안전하게 사업을 정리하고 취업 또는 재창업을 준비할 수 있도록 단계별로 지원하는 소상공인 재기 지원사업입니다." /><div className="hope-overview-grid">{overview.map(([icon,title,desc]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>

    <section className="section section-soft"><div className="shell"><Heading eyebrow="상황별 안내" title="현재 어떤 상황이신가요?" description="지금의 사업 상태와 다음 목표에 따라 먼저 확인해야 할 지원 방향이 달라집니다." /><div className="situation-grid">{situations.map(([number,title,desc]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{desc}</p><Link href="#diagnosis">내 상황 상담하기 →</Link></article>)}</div></div></section>

    <section className="section"><div className="shell"><Heading eyebrow="세부 지원 분야" title="희망리턴패키지에서 확인할 수 있는 지원" description="아래 내용은 지원 분야를 이해하기 위한 안내입니다. 실제 대상·범위·조건은 공식 공고를 우선합니다." /><div className="support-accordion">{supportAreas.map(([title,who,what,prepare]) => <details key={title}><summary><strong>{title}</strong><span>자세히 보기 ＋</span></summary><div><dl><dt>누구에게 필요한가</dt><dd>{who}</dd><dt>무엇을 지원하는가</dt><dd>{what}</dd><dt>무엇을 준비해야 하는가</dt><dd>{prepare}</dd></dl><a className="button button-ghost" href="https://www.sbiz24.kr/?menu_id=020500&menu_type_a=A" target="_blank" rel="noopener noreferrer">공식 공고 확인 ↗</a></div></details>)}</div><p className="official-inline">지원 규모와 조건은 해당 연도의 세부 공고를 기준으로 확인해야 합니다.</p></div></section>

    <section className="section hope-diagnosis-section" id="diagnosis"><div className="shell diagnosis-layout"><div><span className="eyebrow light">무료 대상 자가진단</span><h2>나는 어떤 지원부터<br />확인해야 할까요?</h2><p>다섯 가지 질문으로 현재 상태에 맞는 다음 확인 방향을 정리합니다. 선정 가능성을 점수로 판단하지 않습니다.</p><ul className="check-list light"><li>현재 사업·폐업 상태 확인</li><li>먼저 살펴볼 지원 방향 안내</li><li>전문가 또는 실행 상담 연결</li></ul></div><HopeReturnDiagnosis /></div></section>

    <section className="section"><div className="shell"><Heading eyebrow="신청 준비 절차" title="희망리턴패키지, 이렇게 준비하세요" description="공고 확인부터 선정 이후 실행까지 순서대로 준비하면 서류 누락과 일정 지연을 줄일 수 있습니다." /><div className="hope-timeline">{preparation.map(([title,desc,docs],index) => <article key={title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{desc}</p><small>대표 자료 · {docs}</small></div></article>)}</div><p className="official-inline">필요 문서와 발급 기준은 세부 사업별로 달라질 수 있으므로 공고의 제출 서류 목록을 확인하세요.</p></div></section>

    <section className="section section-soft"><div className="shell"><Heading eyebrow="신청 전 체크" title="신청 전에 반드시 확인하세요" /><div className="mistake-grid">{mistakes.map((item,index) => <article key={item}><span>!</span><div><small>CHECK {String(index + 1).padStart(2,"0")}</small><h3>{item}</h3></div></article>)}</div><div className="hope-emphasis">지원사업은 신청만큼 <strong>선정 이후의 실행과 증빙 관리</strong>가 중요합니다.</div></div></section>

    <section className="hope-selected"><div className="shell hope-selected-grid"><div><span className="eyebrow light">선정 후 핵심 전환</span><h2>이미 희망리턴패키지에<br />선정되셨나요?</h2><p>이제 사업계획서에 작성한 내용을 실제 고객 유입과 매출로 연결할 실행 파트너가 필요합니다.</p><div className="button-row"><Link className="button button-coral" href="#consult">선정 후 마케팅 실행 상담 →</Link><Link className="button button-dark-outline" href="/services">거상마케팅센터 서비스 보기</Link></div></div><ol>{afterSelection.map((item,index) => <li key={item}><span>{String(index + 1).padStart(2,"0")}</span>{item}</li>)}</ol></div></section>

    <section className="section"><div className="shell"><Heading eyebrow="직접 실행 서비스" title="선정 이후 마케팅은 거상마케팅센터가 실행합니다" description="고객 유입 → 신뢰 형성 → 문의·판매의 흐름을 기준으로 필요한 채널과 산출물을 설계합니다." /><div className="flow-strip"><span>고객 유입</span><b>→</b><span>신뢰 형성</span><b>→</b><span>문의·판매</span><b>→</b><span>산출물·결과보고</span></div><div className="hope-service-grid">{serviceDetails.map(([title,problem,result],index) => <article key={title}><span>{String(index + 1).padStart(2,"0")}</span><h3>{title}</h3><dl><dt>해결하는 문제</dt><dd>{problem}</dd><dt>제공 결과물</dt><dd>{result}</dd></dl><Link href="#consult">상담하기 →</Link></article>)}</div></div></section>

    <section className="section section-soft"><div className="shell"><Heading eyebrow="진행·실행 사례" title="희망리턴패키지와 정부지원사업 실행 사례" description="허위 매출이나 가상의 성과 수치 없이 고객 상황과 실제 제작 범위를 중심으로 안내합니다." /><div className="case-grid hope-case-grid">{cases.slice(0,3).map((item,index) => <article className="case-card" key={item.slug}><div className={`case-visual case-visual-${index + 1}`}><span>{item.industry}</span><b>{String(index+1).padStart(2,"0")}</b></div><div className="case-card-body"><div className="case-top"><span>{item.program}</span><b>{item.status}</b></div><h3>{item.title}</h3><dl><div><dt>고객 상황</dt><dd>{item.problem}</dd></div><div><dt>실행 항목</dt><dd>{item.execution.join(" · ")}</dd></div><div><dt>제작 결과물</dt><dd>{item.deliverables.join(" · ")}</dd></div></dl><Link href={`/cases/${item.slug}`}>상세보기 →</Link></div></article>)}</div><div className="center-action"><Link className="button button-ghost" href="/cases">전체 실행 사례 보기 →</Link></div></div></section>

    <section className="section"><div className="shell"><Heading eyebrow="전문가 연결" title="신청 준비와 마케팅 실행에 필요한 전문가를 연결합니다" description="거상마케팅센터가 직접 실행하는 범위와 외부 전문가를 연결하는 범위를 명확히 구분합니다." /><div className="expert-scope-grid"><article><span>거상마케팅센터 직접 실행</span><h3>선정 이후 마케팅 실행</h3><ul>{["브랜드", "홈페이지", "콘텐츠", "SNS", "스마트플레이스", "광고", "AEO·GEO", "마케팅 결과보고"].map((item) => <li key={item}>{item}</li>)}</ul><Link className="button button-primary" href="#consult">실행 상담 요청</Link></article><article><span>외부 전문가 연결</span><h3>신청·세무·법률·행정 검토</h3><ul>{["신청 자격 검토", "사업계획서 전문 검토", "세무·법률·행정", "채무 및 폐업 절차", "지원사업 공고 분석", "재창업 전략"].map((item) => <li key={item}>{item}</li>)}</ul><Link className="button button-ghost" href="#consult">전문가 연결 요청</Link></article></div></div></section>

    <section className="section section-soft" id="faq"><div className="shell narrow"><Heading eyebrow="FAQ" title="희망리턴패키지, 자주 묻는 질문" description="핵심 조건은 반드시 해당 연도의 공식 공고와 담당기관 안내를 기준으로 판단하세요." /><div className="faq-list">{hopeReturnFaqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">＋</span></summary><p>{item.a}</p></details>)}</div></div></section>

    <section className="section official-sources"><div className="shell callout"><div><span className="eyebrow">공식 자료 출처</span><h2>최종 신청 전 공식 공고를 확인하세요</h2><p>거상마케팅센터는 민간 마케팅 전문회사입니다. 사업 대상과 세부 조건은 공식 기관의 최신 공고를 우선합니다.</p></div><div className="official-links"><a href="https://www.sbiz24.kr/?menu_id=020500&menu_type_a=A" target="_blank" rel="noopener noreferrer">소상공인24 ↗</a><a href="https://www.semas.or.kr" target="_blank" rel="noopener noreferrer">소상공인시장진흥공단 ↗</a><a href="https://www.mss.go.kr" target="_blank" rel="noopener noreferrer">중소벤처기업부 ↗</a></div></div></section>

    <section className="section hope-consult" id="consult"><div className="shell consult-grid"><div><span className="eyebrow light">무료 상담 신청</span><h2>폐업을 준비하고 있거나,<br />다시 시작할 계획이 있으신가요?</h2><p>현재 상황을 알려주시면 확인해야 할 지원사업과 선정 이후 필요한 실행 방향부터 정리해드립니다.</p><div className="hope-consult-actions"><Link href="#diagnosis">무료 자가진단 시작하기 →</Link><span>전문가 상담 요청하기</span><Link href="/after-selection">선정 후 마케팅 상담받기 →</Link></div></div><HopeReturnContactForm /></div></section>

    <nav className="hope-internal-links" aria-label="관련 페이지"><div className="shell">{[["정부지원사업","/programs"],["선정 전 준비","/before-selection"],["선정 후 실행","/after-selection"],["마케팅 서비스","/services"],["전문가 소개","/experts"],["무료 자가진단","/diagnosis"],["자료실","/insights"]].map(([label,href]) => <Link key={href} href={href}>{label} →</Link>)}</div></nav>
  </>;
}
