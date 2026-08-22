import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { DiagnosisWizard } from "@/components/DiagnosisWizard";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/Notice";
import { cases, experts, faqs, insights, OFFICIAL_NOTICE, programs, services, SITE_URL } from "@/data/site";
import { breadcrumbJson, faqJson, makeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ section: string }> };

const meta: Record<string, [string, string]> = {
  programs: ["지원사업 찾기", "소상공인의 업종과 사업 단계에 맞는 정부지원사업 분야를 살펴보고 무료 자가진단과 전문가 연결을 신청하세요."],
  "hope-return": ["희망리턴패키지 마케팅 안내", "희망리턴패키지의 주요 방향과 준비 항목, 선정 이후 홈페이지·콘텐츠·광고 실행 과정을 확인하세요."],
  "before-selection": ["정부지원사업 선정 전 준비", "공고 확인, 사업 현황 진단, 사업계획서 마케팅 항목과 실행 가능 예산을 차분히 준비하는 방법을 안내합니다."],
  "after-selection": ["정부지원사업 선정 후 마케팅 실행", "선정 이후 협약서·예산·공급업체·홈페이지·콘텐츠·광고·증빙·결과보고까지 실행 상담을 신청하세요."],
  services: ["정부지원사업 마케팅 서비스", "브랜드 전략, 홈페이지, 블로그, 스마트플레이스, SNS, 숏폼, 광고, AEO·GEO와 결과보고 서비스를 제공합니다."],
  cases: ["마케팅 실행 사례", "소상공인 업종과 지원사업 상황별 홈페이지·콘텐츠·SNS·광고 실행 설계 샘플을 확인하세요."],
  experts: ["전문가 소개", "정부지원사업의 목적과 선정 이후 고객 유입을 함께 이해하는 거상마케팅센터 실행팀을 소개합니다."],
  insights: ["정부지원사업 마케팅 자료실", "희망리턴패키지, 선정 전 준비, 지원금 집행, 결과보고와 선정 후 마케팅 실행 정보를 확인하세요."],
  diagnosis: ["무료 지원사업 자가진단", "5가지 질문으로 현재 사업 단계와 필요한 지원사업·마케팅 실행 방향을 간단히 확인하세요."],
  contact: ["무료 상담 신청", "정부지원사업 준비 또는 선정 이후 마케팅 실행을 위한 전문가 상담을 신청하세요."],
  about: ["회사 소개", "지원사업 탐색과 선정 이후 마케팅 실행을 연결하는 민간 전문 조직, 거상 정부지원 마케팅센터를 소개합니다."],
  privacy: ["개인정보처리방침", "거상 정부지원 마케팅센터의 상담 신청 개인정보 수집 및 처리 기준을 안내합니다."],
};

export function generateStaticParams() {
  return Object.keys(meta).map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const entry = meta[section];
  if (!entry) return {};
  return makeMetadata(entry[0], entry[1], `/${section}`);
}

function PageHero({ eyebrow, title, description, cta }: { eyebrow: string; title: string; description: string; cta?: [string, string] }) {
  return <section className="sub-hero"><div className="shell sub-hero-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{cta && <Link className="button button-coral" href={cta[1]}>{cta[0]} →</Link>}</div></section>;
}

function Schema({ section, title }: { section: string; title: string }) {
  return <JsonLd data={[breadcrumbJson([{ name: "홈", path: "/" }, { name: title, path: `/${section}` }]), faqJson(faqs)]} />;
}

function ProgramsPage() {
  return <><PageHero eyebrow="정부지원사업 찾기" title="내 사업에 맞는 지원사업부터 찾으세요" description="업종과 사업 단계, 현재 목표를 기준으로 검토할 지원사업 분야를 정리합니다. 최종 신청 전에는 반드시 해당 연도의 공식 공고를 확인하세요." cta={["무료 자가진단 시작하기", "/diagnosis"]} /><Breadcrumb current="지원사업 찾기" /><section className="section"><div className="shell"><div className="filter-chips" aria-label="지원사업 분야"><span className="active">전체</span><span>경영개선</span><span>창업</span><span>성장</span><span>판로·마케팅</span></div><div className="program-list">{programs.map((program) => <article id={program.slug} key={program.slug}><div className={`program-icon ${program.accent}`}>{program.name[0]}</div><div><span className="card-kicker">{program.field}</span><h2>{program.name}</h2><p>{program.summary}</p><dl><div><dt>주요 대상</dt><dd>{program.target}</dd></div><div><dt>살펴볼 분야</dt><dd>{program.field}</dd></div></dl></div><Link className="button button-ghost" href={program.slug === "hope-return" ? "/hope-return" : "/diagnosis"}>{program.slug === "hope-return" ? "상세 안내" : "적합성 진단"} →</Link></article>)}</div><OfficialNotice /></div></section><FAQ limit={4} /><CTA compact /></>;
}

function HopeReturnPage() {
  return <><PageHero eyebrow="희망리턴패키지" title="경영의 어려움에서 다음 선택까지, 차분히 준비하세요" description="희망리턴패키지는 소상공인의 경영개선, 폐업 부담 완화와 재도전을 돕는 지원 체계입니다. 현재 상태에 따라 확인할 세부 프로그램이 달라질 수 있습니다." cta={["내 상황 무료 진단", "/diagnosis"]} /><Breadcrumb current="희망리턴패키지" /><section className="section"><div className="shell two-col"><div><span className="eyebrow">먼저 확인할 내용</span><h2>현재 사업 상태와 목표가 출발점입니다</h2><p className="lead">같은 소상공인이라도 경영개선을 원하는지, 폐업을 준비하는지, 다시 창업하려는지에 따라 필요한 정보가 다릅니다.</p><OfficialNotice /></div><div className="feature-stack">{[["01","경영개선","운영 중인 사업의 문제를 진단하고 개선 실행 가능성을 살펴봅니다."],["02","원스톱 폐업지원","사업 정리 과정에서 필요한 분야별 지원 내용을 확인합니다."],["03","재취업·재창업","폐업 이후 새로운 경로와 재도전 준비를 검토합니다."]].map(([n,t,d]) => <article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></div></section><section className="section section-soft"><div className="shell"><div className="section-heading centered"><span className="eyebrow">선정 이후</span><h2>지원의 목적을 실제 고객 접점으로 연결합니다</h2><p>협약과 사업계획에 맞는 범위에서 브랜드, 홈페이지, 콘텐츠, 광고와 결과보고를 준비합니다.</p></div><div className="service-grid compact-services">{services.slice(0,6).map((service) => <article key={service.name}><span className="service-icon">{service.icon}</span><h3>{service.name}</h3><p>{service.desc}</p></article>)}</div><div className="center-action"><Link className="button button-coral" href="/after-selection">선정 후 실행 안내 보기 →</Link></div></div></section><FAQ /><CTA compact /></>;
}

function BeforeSelectionPage() {
  const items = [["공고와 자격 확인","지원 대상, 제외 요건, 제출 기한과 필수 서류를 공식 공고에서 확인합니다."],["사업 현황 진단","고객, 매출 구조, 운영 문제와 이번 지원으로 해결할 과제를 정리합니다."],["마케팅 항목 설계","채널을 나열하기보다 목표 고객과 실행 목적, 산출물과 검증 방법을 연결합니다."],["실행 가능성 점검","기간과 예산 안에서 실제로 수행하고 증빙할 수 있는 계획인지 확인합니다."]];
  return <><PageHero eyebrow="선정 전 준비" title="잘 쓰는 계획보다, 실행 가능한 계획을 준비하세요" description="지원사업의 목적과 내 사업의 문제가 연결되어야 선정 이후에도 흔들리지 않고 실행할 수 있습니다." cta={["전문가 연결 요청하기", "/contact"]} /><Breadcrumb current="선정 전 준비" /><section className="section"><div className="shell numbered-list"><div className="section-heading"><span className="eyebrow">준비 체크포인트</span><h2>신청 전에 확인할 4가지</h2><p>선정을 보장하는 방법은 없습니다. 다만 공고와 사업 현실에 맞는 준비는 할 수 있습니다.</p></div><div>{items.map((item,index) => <article key={item[0]}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}</div></div></section><section className="section section-soft"><div className="shell callout"><div><span className="eyebrow">사업계획서 마케팅 항목</span><h2>고객 → 문제 → 실행 → 검증이 이어져야 합니다</h2><p>누구에게 무엇을 왜 알릴지, 어떤 결과물로 실행하고 무엇을 확인할지를 하나의 문장으로 설명할 수 있어야 합니다.</p></div><Link className="button button-primary" href="/insights/marketing-plan-writing">작성 가이드 읽기 →</Link></div></section><FAQ limit={4} /><CTA compact /></>;
}

function AfterSelectionPage() {
  const checklist = ["협약서와 수정 사업계획서의 최종본 확보", "집행 가능 기간과 예산 항목별 기준 확인", "공급업체 비교 기준과 계약·산출물 범위 정리", "실행 중 필요한 증빙 자료와 승인 절차 확인", "결과보고 형식과 마감 일정을 역산해 관리"];
  return <><section className="sales-hero"><div className="shell sales-grid"><div><span className="eyebrow light">선정 후 실행 전문</span><h1>정부지원사업에 선정되셨습니까?<br /><em>이제 실행과 성과를 준비할 차례입니다.</em></h1><p>협약서와 사업계획서, 예산과 기한을 바탕으로 고객 유입에 필요한 홈페이지·콘텐츠·광고를 실행하고 증빙과 결과보고까지 함께 관리합니다.</p><div className="button-row"><Link className="button button-coral" href="#consult">내 사업 실행 상담받기 →</Link><Link className="button button-dark-outline" href="/services">서비스 범위 보기</Link></div><small>정부기관이 아닌 민간 마케팅센터이며, 지원사업 선정이나 특정 성과를 보장하지 않습니다.</small></div><aside><span>선정 직후 체크리스트</span><h2>실행 전에 이것부터 확인하세요</h2><ul>{checklist.map((item) => <li key={item}><b>✓</b>{item}</li>)}</ul></aside></div></section><Breadcrumb current="선정 후 실행" />
    <section className="section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">가장 먼저 확인할 것</span><h2>서류, 예산, 일정이 실행의 기준입니다</h2><p>좋은 아이디어보다 먼저 협약과 사업계획의 허용 범위를 정확히 확인해야 합니다.</p></div><div className="three-cards">{[["01","협약서·계획서","최종 승인된 목표, 세부 과업, 변경 승인 기준을 확인합니다."],["02","예산 실행 계획","비목별 집행 가능 범위와 자부담, 세금, 지급 절차를 점검합니다."],["03","공급업체 기준","경험, 과업 이해도, 산출물, 일정과 증빙 대응 가능성을 비교합니다."]].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="section section-soft"><div className="shell execution-layout"><div><span className="eyebrow">실행과 결과보고</span><h2>만드는 과정과 남기는 자료를 동시에 관리합니다</h2><p>홈페이지와 콘텐츠, 광고는 고객을 위한 자산인 동시에 사업 실행을 설명하는 산출물입니다.</p><ul className="check-list">{["실행 목표와 고객 여정 정의","홈페이지·콘텐츠·광고 통합 일정","중간 검토와 수정 기준","계약·견적·거래·운영 증빙 관리","결과보고용 실행 내역 정리"].map((x)=><li key={x}>{x}</li>)}</ul></div><div className="execution-board"><div><span>전략</span><strong>고객과 목표</strong><small>무엇을 누구에게 알릴지</small></div><i>→</i><div><span>제작</span><strong>채널과 콘텐츠</strong><small>홈페이지·SNS·숏폼</small></div><i>→</i><div><span>운영</span><strong>유입과 개선</strong><small>광고·검색·AEO·GEO</small></div><i>→</i><div><span>보고</span><strong>산출물과 증빙</strong><small>실행 내역·결과보고</small></div></div></div></section>
    <section className="section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">서비스 패키지</span><h2>필요한 실행만 조합할 수 있습니다</h2><p>사업계획과 예산, 집행 기간을 확인한 뒤 범위와 산출물을 투명하게 제안합니다.</p></div><div className="package-grid"><article><span>FOUNDATION</span><h3>브랜드·채널 기반</h3><p>메시지와 고객 접점을 처음부터 정리해야 하는 사업자</p><ul><li>브랜드 전략</li><li>홈페이지 또는 랜딩페이지</li><li>검색·AI 노출 기반 설계</li></ul></article><article className="featured"><b>가장 많이 문의하는 구성</b><span>GROWTH</span><h3>콘텐츠·고객 유입</h3><p>채널 운영과 문의 전환을 연결해야 하는 사업자</p><ul><li>블로그·SNS 콘텐츠</li><li>스마트플레이스·숏폼</li><li>광고 운영과 월간 기록</li></ul></article><article><span>REPORT</span><h3>통합 실행·결과보고</h3><p>여러 과업과 증빙, 결과보고를 함께 관리해야 하는 사업자</p><ul><li>통합 실행 일정 관리</li><li>산출물·운영 기록 정리</li><li>결과보고 자료 구성</li></ul></article></div></div></section>
    <section className="section consult-section" id="consult"><div className="shell consult-grid"><div><span className="eyebrow light">선정 후 마케팅 상담</span><h2>협약서와 예산을 확인하면<br />실행 방향이 선명해집니다</h2><p>현재 선정된 지원사업과 필요한 서비스를 알려주세요. 영업일 기준 1일 이내 담당자가 연락드립니다.</p><div className="contact-points"><span><b>01</b> 가능한 실행 범위 확인</span><span><b>02</b> 일정·산출물·예산 정리</span><span><b>03</b> 증빙·결과보고 방식 안내</span></div></div><ContactForm compact /></div></section><FAQ /><CTA compact /></>;
}

function ServicesPage() { return <><PageHero eyebrow="마케팅 서비스" title="선정 이후 필요한 실행을 한 팀에서 연결합니다" description="브랜드 전략부터 홈페이지, 콘텐츠, 광고, AEO·GEO와 결과보고까지 사업 목표와 예산에 맞게 구성합니다." cta={["실행 상담 신청", "/contact"]} /><Breadcrumb current="마케팅 서비스" /><section className="section"><div className="shell"><div className="service-grid service-page-grid">{services.map((item,index) => <article key={item.name}><span className="service-index">{String(index+1).padStart(2,"0")}</span><span className="service-icon">{item.icon}</span><h2>{item.name}</h2><p>{item.desc}</p><Link href="/contact">상담 요청 →</Link></article>)}</div></div></section><section className="section section-soft"><div className="shell callout"><div><span className="eyebrow">범위와 비용</span><h2>필요한 과업과 산출물을 먼저 정의합니다</h2><p>서비스 비용은 과업 범위, 수량, 운영 기간, 촬영·제작 여부와 보고 기준에 따라 항목별로 산정합니다.</p></div><Link className="button button-coral" href="/contact">내 사업 견적 상담 →</Link></div></section><FAQ /><CTA compact /></> }

function CasesPage() { return <><PageHero eyebrow="실행 사례" title="성과 수치보다 실행 과정을 투명하게 보여드립니다" description="초기 사례는 서비스 이해를 위한 샘플 실행안입니다. 허위 매출 수치나 가상의 지원사업 선정 성과를 사용하지 않습니다." /><Breadcrumb current="실행 사례" /><section className="section"><div className="shell case-grid">{cases.map((item) => <article className="case-card" key={item.slug}><div className="case-top"><span>{item.industry}</span><b>{item.status}</b></div><h2>{item.title}</h2><dl><div><dt>지원사업</dt><dd>{item.program}</dd></div><div><dt>고객 문제</dt><dd>{item.problem}</dd></div><div><dt>실행 서비스</dt><dd>{item.execution.join(" · ")}</dd></div><div><dt>진행 상태</dt><dd>{item.status}</dd></div></dl><Link href={`/cases/${item.slug}`}>상세보기 →</Link></article>)}</div></section><FAQ limit={3} /><CTA compact /></> }

function ExpertsPage() { return <><PageHero eyebrow="전문가 소개" title="사업의 언어와 고객의 언어를 연결합니다" description="지원사업의 목적을 이해하면서도 선정 이후 실제 고객이 발견하고 문의하는 흐름을 만드는 실행 파트너입니다." cta={["전문가 연결 요청", "/contact"]} /><Breadcrumb current="전문가 소개" /><section className="section"><div className="shell expert-detail-grid">{experts.map((expert,index) => <article key={expert.name}><div className={`avatar large avatar-${index}`}>{expert.initials}</div><div><span>{expert.role}</span><h2>{expert.name}</h2><p>{expert.bio}</p><ul><li>사업 상황과 목표 기반 진단</li><li>실행 가능한 범위와 일정 설계</li><li>필요 시 분야별 전문가 협업</li></ul></div></article>)}</div></section><section className="section section-soft"><div className="shell callout"><div><span className="eyebrow">전문가 네트워크</span><h2>모든 사업을 한 사람이 안다고 말하지 않습니다</h2><p>지원사업과 업종의 특성에 따라 필요한 분야를 확인하고 적합한 외부 전문가와 협업합니다.</p></div><Link className="button button-primary" href="/contact">연결 요청하기 →</Link></div></section><FAQ limit={3} /><CTA compact /></> }

function InsightsPage() { return <><PageHero eyebrow="자료실" title="공고 전 준비부터 선정 후 결과보고까지" description="지원사업과 마케팅 실행 사이에서 소상공인이 자주 놓치는 실무 정보를 이해하기 쉽게 정리합니다." /><Breadcrumb current="자료실" /><section className="section"><div className="shell insight-grid insight-page-grid">{insights.map((item,index) => <article key={item.slug}><div className={`insight-thumb thumb-${index+1}`}><span>{item.category}</span><b>{String(index+1).padStart(2,"0")}</b></div><div className="insight-body"><span>{item.date} · {item.readTime}</span><h2>{item.title}</h2><p>{item.description}</p><Link href={`/insights/${item.slug}`}>읽어보기 →</Link></div></article>)}</div><OfficialNotice /></section><FAQ limit={3} /><CTA compact /></> }

function DiagnosisPage() { return <><PageHero eyebrow="무료 자가진단" title="5가지 질문으로 지금 필요한 방향을 확인하세요" description="진단 결과는 지원 가능 여부를 확정하거나 선정을 보장하는 결과가 아닙니다. 공식 공고와 전문가 확인을 위한 첫 단계입니다." /><Breadcrumb current="무료 자가진단" /><section className="section diagnosis-page"><div className="shell"><DiagnosisWizard /></div></section><OfficialNotice /><FAQ limit={4} /><CTA compact /></> }

function ContactPage() { return <><PageHero eyebrow="상담 신청" title="현재 상황을 알려주시면 실행 방향부터 정리해드립니다" description="지원사업 신청 예정, 심사 중, 선정 완료 어느 단계든 상담할 수 있습니다. 선정 완료 상태라면 지원사업명과 집행 기한을 함께 알려주세요." /><Breadcrumb current="상담 신청" /><section className="section contact-page"><div className="shell contact-page-grid"><aside><span className="eyebrow">상담 안내</span><h2>영업일 기준 1일 이내 연락드립니다</h2><p>제출 내용을 확인한 뒤 필요한 추가 자료와 상담 일정을 안내합니다.</p><div className="contact-info"><div><span>01</span><p><strong>현재 단계 확인</strong>신청 전·심사 중·선정 후</p></div><div><span>02</span><p><strong>실행 요구 정리</strong>목표·예산·기한·산출물</p></div><div><span>03</span><p><strong>상담 및 제안</strong>적합한 범위와 다음 단계</p></div></div><small>거상 정부지원 마케팅센터는 정부기관이 아닌 민간 사업자입니다.</small></aside><ContactForm /></div></section><FAQ /><CTA compact /></> }

function AboutPage() { return <><PageHero eyebrow="회사 소개" title="지원사업 정보와 마케팅 실행 사이의 빈틈을 채웁니다" description="거상 정부지원 마케팅센터는 거상마케팅센터가 운영하는 민간 서비스로, 지원사업 준비와 선정 이후 실행을 연결합니다." cta={["전문가 상담 신청", "/contact"]} /><Breadcrumb current="회사 소개" /><section className="section"><div className="shell about-story"><div><span className="eyebrow">Our Mission</span><h2>선정이 끝이 되지 않도록</h2></div><div><p className="lead">지원사업에 선정되고도 어디에, 어떻게 예산을 써야 고객과 매출로 이어지는지 막막한 소상공인이 많습니다.</p><p>우리는 사업계획서의 목표를 실제 고객 접점으로 번역합니다. 홈페이지와 콘텐츠, 스마트플레이스, SNS, 광고, AEO·GEO를 따로 보지 않고 고객의 발견부터 문의까지 연결합니다.</p><p>선정 가능성이나 매출을 보장하지 않습니다. 대신 합의한 범위와 산출물, 일정과 실행 기록을 투명하게 관리합니다.</p></div></div><div className="shell values-grid"><article><span>01</span><h3>사실에 근거한 안내</h3><p>공식 공고와 협약 기준을 우선하고 과장된 약속을 하지 않습니다.</p></article><article><span>02</span><h3>고객 중심의 실행</h3><p>지원금 소진이 아니라 사업에 남는 고객 접점과 자산을 만듭니다.</p></article><article><span>03</span><h3>과정의 투명성</h3><p>범위, 일정, 산출물과 보고 자료를 처음부터 명확히 관리합니다.</p></article></div></section><FAQ limit={3} /><CTA compact /></> }

function PrivacyPage() { return <><PageHero eyebrow="개인정보처리방침" title="상담을 위해 필요한 정보만 수집합니다" description="거상 정부지원 마케팅센터의 상담 신청 및 서비스 안내 과정에서 처리하는 개인정보 기준입니다." /><Breadcrumb current="개인정보처리방침" /><section className="section"><article className="shell policy"><p className="policy-date">시행일: 2026년 8월 22일</p><h2>1. 수집하는 개인정보</h2><p>이름, 업체명, 연락처, 이메일, 업종, 현재 단계, 지원사업명, 지원금 규모, 필요한 서비스, 집행 기한, 현재 고민을 상담 신청 시 수집할 수 있습니다.</p><h2>2. 이용 목적</h2><p>상담 신청 확인, 서비스 안내, 문의 응대와 상담 품질 관리를 위해 사용합니다.</p><h2>3. 보유 및 이용 기간</h2><p>상담 종료 후 1년까지 보관한 뒤 지체 없이 파기합니다. 다만 관계 법령에 별도 보존 의무가 있는 경우 해당 기간을 따릅니다.</p><h2>4. 제3자 제공 및 처리 위탁</h2><p>법령에 근거가 있거나 사전 동의를 받은 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다. 상담 접수를 위해 Google Apps Script 등 기술 서비스를 사용할 수 있으며, 실제 연동 시 관련 내용을 본 방침에 반영합니다.</p><h2>5. 정보주체의 권리</h2><p>본인의 개인정보에 대한 열람, 정정, 삭제와 처리 정지를 요청할 수 있습니다.</p><h2>6. 문의</h2><p>개인정보 관련 문의: <a href="mailto:contact@geosang.co.kr">contact@geosang.co.kr</a></p></article></section></> }

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!meta[section]) notFound();
  const title = meta[section][0];
  const pages: Record<string, React.ReactNode> = { programs: <ProgramsPage />, "hope-return": <HopeReturnPage />, "before-selection": <BeforeSelectionPage />, "after-selection": <AfterSelectionPage />, services: <ServicesPage />, cases: <CasesPage />, experts: <ExpertsPage />, insights: <InsightsPage />, diagnosis: <DiagnosisPage />, contact: <ContactPage />, about: <AboutPage />, privacy: <PrivacyPage /> };
  return <><Schema section={section} title={title} />{pages[section]}</>;
}
