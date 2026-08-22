import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AdvancedDiagnosisWizard, DiagnosisFooterCTA } from "@/components/AdvancedDiagnosisWizard";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { breadcrumbJson, faqJson } from "@/lib/seo";

const previewOptions = ["창업 준비 중", "사업 운영 중", "경영 위기", "폐업 준비", "폐업 완료", "재창업 준비"];
const benefits = [
  ["01", "현재 사업 단계", "예비창업, 사업 운영, 경영위기, 폐업 또는 재창업 중 어느 단계인지 정리합니다."],
  ["02", "먼저 확인할 지원 분야", "현재 상황에서 먼저 살펴볼 지원사업 분야를 안내합니다."],
  ["03", "필요한 준비사항", "공고 확인, 증빙자료, 사업계획, 실행 준비 등 다음에 준비할 내용을 안내합니다."],
  ["04", "필요한 전문가와 실행 서비스", "신청 전 전문가와 선정 후 마케팅 실행 중 어떤 도움이 필요한지 구분합니다."],
];

export const diagnosisFaqs = [
  { q: "무료 자가진단은 정말 무료인가요?", a: "네. 진단 결과 확인까지 무료이며, 이후 전문가 상담이나 마케팅 대행은 필요한 범위를 확인한 뒤 별도로 협의합니다." },
  { q: "회원가입이 필요한가요?", a: "아닙니다. 회원가입 없이 5단계 질문에 답할 수 있습니다." },
  { q: "진단에 얼마나 걸리나요?", a: "대부분 약 3분 이내에 완료할 수 있으며, 중간에 나가더라도 선택한 진단 답변은 현재 브라우저에 임시 저장됩니다." },
  { q: "진단 결과가 지원사업 선정 가능성을 의미하나요?", a: "아닙니다. 진단은 다음 방향을 안내하기 위한 것으로 선정 가능성이나 합격 여부를 판단하지 않습니다." },
  { q: "진단 결과에 나온 사업은 반드시 신청할 수 있나요?", a: "아닙니다. 실제 자격과 신청 가능 여부는 해당 연도의 공식 공고와 주관기관 기준으로 최종 확인해야 합니다." },
  { q: "아직 사업자등록 전이어도 진단할 수 있나요?", a: "네. 예비창업 단계에 맞는 지원 분야와 준비사항을 확인할 수 있습니다." },
  { q: "이미 폐업했어도 진단할 수 있나요?", a: "네. 폐업 후 재취업 또는 재창업 준비 상황에 맞는 확인 방향을 안내합니다." },
  { q: "희망리턴패키지 상담도 가능한가요?", a: "네. 진단 결과를 바탕으로 희망리턴패키지 안내와 필요한 외부 전문가 연결을 상담할 수 있습니다." },
  { q: "이미 지원사업에 선정된 경우에도 이용할 수 있나요?", a: "네. 선정 사업과 집행 일정, 필요한 서비스를 입력하면 선정 후 실행형 또는 결과보고 준비형 안내를 제공합니다." },
  { q: "선정 후 홈페이지나 마케팅을 맡길 수 있나요?", a: "거상마케팅센터는 홈페이지, 콘텐츠, SNS, 광고, AEO·GEO와 결과보고 자료 정리를 제공합니다. 협약과 집행 기준 확인 후 범위를 협의합니다." },
  { q: "상담 신청 후 언제 연락이 오나요?", a: "정상 접수된 문의는 확인 후 영업일 기준 1일 이내 연락드립니다." },
  { q: "입력한 개인정보는 어떻게 관리되나요?", a: "상담 연락과 서비스 안내 목적으로만 사용하며 상담 종료 후 1년까지 보관합니다. 자세한 내용은 개인정보처리방침에서 확인할 수 있습니다." },
];

export function DiagnosisLandingPage() {
  return <>
    <JsonLd data={[breadcrumbJson([{ name: "홈", path: "/" }, { name: "무료 자가진단", path: "/diagnosis" }]), faqJson(diagnosisFaqs), { "@context": "https://schema.org", "@type": "WebApplication", name: "무료 정부지원사업 방향 진단", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: `${SITE_URL}/diagnosis`, provider: { "@type": "Organization", name: SITE_NAME }, offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" }, description: "5가지 질문으로 현재 사업 단계와 필요한 지원사업, 전문가와 마케팅 실행 방향을 안내하는 무료 웹 진단" }]} />
    <section className="direction-hero"><div className="shell direction-hero-grid"><div><span className="eyebrow">무료 정부지원사업 방향 진단</span><h1>5가지 질문으로<br /><em>내게 필요한 지원 방향</em>을 확인하세요</h1><p>현재 사업 단계와 가장 필요한 도움을 선택하면 먼저 확인할 지원사업, 준비사항과 다음 실행 방향을 안내해드립니다.</p><div className="direction-trust">{["회원가입 없이 간단하게", "약 3분 이내 완료", "사업 단계별 맞춤 안내", "전국 비대면 상담 가능"].map((item) => <span key={item}>✓ {item}</span>)}</div><Link className="button button-primary" href="#diagnosis-wizard">무료 진단 시작하기 →</Link><small>본 진단은 지원사업 선정 가능성이나 합격 여부를 판단하는 심사가 아닙니다. 실제 지원 자격과 선정 여부는 각 사업의 공식 공고와 주관기관 심사를 기준으로 합니다.</small></div><aside className="direction-preview"><div className="diagnosis-top"><span>무료 자가진단</span><strong>1 / 5</strong></div><div className="progress"><span style={{ width: "20%" }} /></div><h2>현재 사업 상태는 어떻습니까?</h2><div>{previewOptions.map((item) => <span key={item}>{item}<b aria-hidden="true">○</b></span>)}</div><small>총 5단계 중 1단계</small><Link className="button button-coral" href="#diagnosis-wizard">진단 시작하기</Link></aside></div></section>
    <Breadcrumb current="무료 자가진단" />
    <section className="section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">진단 안내</span><h2>진단을 시작하면 무엇을 알 수 있나요?</h2></div><div className="direction-benefits">{benefits.map(([number,title,description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div><p className="direction-no-score">진단 결과는 합격 가능성이나 지원금 수령 가능성을 점수로 표시하지 않습니다.</p></div></section>
    <section className="section diagnosis-page" id="diagnosis-wizard"><div className="shell"><div className="section-heading centered"><span className="eyebrow">5단계 맞춤 진단</span><h2>현재 상황을 하나씩 선택해주세요</h2><p>한 화면에 한 질문만 표시하며, 선택한 답변은 이 브라우저에 임시 저장됩니다.</p></div><AdvancedDiagnosisWizard /></div></section>
    <section className="section direction-services"><div className="shell"><div className="section-heading centered"><span className="eyebrow">선정 후 마케팅</span><h2>지원사업 선정 이후에도 실행 방향을 안내합니다</h2><p>협약과 사업계획의 범위를 확인한 뒤 고객 유입, 신뢰 형성, 문의 전환과 결과보고를 연결합니다.</p></div><div className="direction-service-grid">{[["고객 유입","검색·광고·스마트플레이스"],["신뢰 형성","홈페이지·블로그·SNS 콘텐츠"],["문의 전환","랜딩페이지·상담 동선"],["실행 관리","산출물·증빙·결과보고"]].map(([title,desc],index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{desc}</p><Link href="/services">서비스 보기 →</Link></article>)}</div></div></section>
    <section className="section section-soft diagnosis-policy"><div className="shell two-col"><div><span className="eyebrow">개인정보와 진단 안내</span><h2>진단 답변과 연락처를 분리해 관리합니다</h2><p>진단 선택값만 현재 브라우저에 임시 저장하며 이름, 연락처, 이메일과 업체명은 로컬 저장소에 보관하지 않습니다.</p><Link className="button button-ghost" href="/privacy">개인정보처리방침 보기 →</Link></div><ul><li>진단은 방향 안내용이며 선정 가능성을 판단하지 않습니다.</li><li>상담 연락을 위한 필수 동의와 정보 수신 선택 동의를 구분합니다.</li><li>분석 이벤트에는 이름·연락처·이메일·업체명·문의내용을 전송하지 않습니다.</li><li>거상마케팅센터는 정부기관이 아닌 민간 마케팅 전문회사입니다.</li></ul></div></section>
    <section className="section" id="faq"><div className="shell narrow"><div className="section-heading centered"><span className="eyebrow">FAQ</span><h2>무료 자가진단, 자주 묻는 질문</h2></div><div className="faq-list">{diagnosisFaqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">＋</span></summary><p>{item.a}</p></details>)}</div></div></section>
    <DiagnosisFooterCTA />
  </>;
}
