import Link from "next/link";
import { CTA } from "@/components/CTA";
import { DiagnosisWizard } from "@/components/DiagnosisWizard";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/Notice";
import { cases, experts, faqs, insights, programs, services, SITE_NAME, SITE_URL } from "@/data/site";
import { faqJson } from "@/lib/seo";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "정부지원사업 선정 후 마케팅 실행",
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  areaServed: "대한민국",
  serviceType: ["홈페이지 제작", "콘텐츠 마케팅", "광고 운영", "AEO·GEO", "결과보고 지원"],
  description: "지원사업 선정 이후 사업계획과 예산에 맞춘 마케팅 전략, 제작, 운영과 보고를 지원합니다.",
};

export default function Home() {
  return <>
    <JsonLd data={[serviceSchema, faqJson(faqs)]} />
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="pulse" /> 정부지원사업부터 선정 후 실행까지</span>
          <h1>지원사업 선정 이후,<br /><em>매출이 시작됩니다</em></h1>
          <p>복잡한 정부지원사업은 쉽게 이해하고,<br className="desktop-only" /> 선정 이후 홈페이지·콘텐츠·광고·고객 유입까지 함께합니다.</p>
          <div className="button-row"><Link className="button button-primary" href="/programs">내게 맞는 지원사업 찾기 <span aria-hidden="true">→</span></Link><Link className="button button-outline-coral" href="/after-selection#consult">선정 후 마케팅 실행 상담</Link></div>
          <div className="hero-proof" aria-label="서비스 신뢰 요소"><span><b>01</b>지원사업 이해</span><span><b>02</b>전문가 연결</span><span><b>03</b>선정 후 마케팅 실행</span></div>
          <p className="hero-disclaimer">선정 여부는 주관기관의 심사 기준과 판단에 따르며, 선정을 보장하지 않습니다.</p>
        </div>
        <div className="hero-visual" aria-label="한국인 소상공인 대표와 마케팅 전문가의 상담 장면">
          <img src="/images/hero-korean-consulting-v2.png" alt="밝은 국내 카페에서 노트북과 서류를 함께 검토하는 한국인 소상공인 대표와 마케팅 전문가" />
          <aside className="home-diagnosis-overlay"><span className="float-kicker">무료 자가진단</span><strong>5가지 질문으로 내 상황에 맞는<br />다음 단계를 확인하세요.</strong><Link href="/diagnosis">지금 진단 시작하기 <span aria-hidden="true">→</span></Link></aside>
          <div className="home-execution-overlay"><span className="float-icon">✓</span><div><strong>선정 후 실행 준비</strong><small>전략 · 제작 · 운영 · 결과보고</small></div></div>
        </div>
      </div>
    </section>

    <section className="trust-strip"><div className="shell trust-grid"><div><span>01</span><strong>지원사업 이해부터 실행까지</strong><p>현재 상황과 공고를 함께 확인합니다.</p></div><div><span>02</span><strong>상황에 맞는 전문가 연결</strong><p>업종과 단계에 필요한 역할을 연결합니다.</p></div><div><span>03</span><strong>선정 이후 마케팅 실행</strong><p>매출 성장을 위한 고객 접점을 만듭니다.</p></div></div></section>

    <section className="section" id="programs"><div className="shell"><div className="section-heading split"><div><span className="eyebrow">주요 지원사업</span><h2>지금 살펴볼 수 있는<br />지원사업 분야</h2></div><div><p>공고를 나열하는 데서 끝내지 않고, 내 사업에 맞는지와 선정 이후 무엇을 실행할지 함께 봅니다.</p><Link href="/programs" className="text-link">전체 지원사업 보기 →</Link></div></div><div className="card-grid program-grid">{programs.map((program) => <article className={`program-card ${program.accent}`} key={program.slug}><div className="program-icon" aria-hidden="true">{program.name.slice(0, 1)}</div><span className="card-kicker">{program.field}</span><h3>{program.name}</h3><dl><div><dt>대상</dt><dd>{program.target}</dd></div><div><dt>지원 분야</dt><dd>{program.field}</dd></div></dl><Link href={program.slug === "hope-return" ? "/hope-return" : `/programs#${program.slug}`}>상세보기 <span aria-hidden="true">→</span></Link></article>)}</div><OfficialNotice /></div></section>

    <section className="section diagnosis-section"><div className="shell diagnosis-layout"><div className="section-heading"><span className="eyebrow light">무료 자가진단</span><h2>5가지 질문으로<br />현재 방향을 확인하세요</h2><p>업종, 사업 단계, 지원사업 진행 상태와 필요한 마케팅을 선택하면 다음 상담 방향을 정리해드립니다.</p><ul className="check-list light"><li>회원가입 없이 간단하게</li><li>결과 확인 후 전문가 연결</li><li>전국 비대면 상담 가능</li></ul></div><DiagnosisWizard condensed /></div></section>

    <section className="section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">실행 프로세스</span><h2>지원사업 이해부터 성과관리까지</h2><p>각 단계가 끊기지 않도록 하나의 실행 흐름으로 연결합니다.</p></div><div className="process-grid">{[["01","사업 상황 진단","현재 상태와 목표, 공고 적합성을 확인합니다."],["02","지원사업 및 전문가 연결","필요한 사업 정보와 전문 역할을 연결합니다."],["03","선정 후 마케팅 전략 수립","사업계획과 예산에 맞춰 실행안을 설계합니다."],["04","실행·정산·성과관리","산출물과 증빙, 결과보고를 함께 관리합니다."]].map(([n,t,d], index) => <article key={n}><span className="process-number">{n}</span><div><h3>{t}</h3><p>{d}</p></div>{index < 3 && <i aria-hidden="true">→</i>}</article>)}</div></div></section>

    <section className="section section-soft"><div className="shell"><div className="section-heading split"><div><span className="eyebrow">선정 후 마케팅 서비스</span><h2>계획서를 고객 유입으로<br />이어가는 실행팀</h2></div><div><p>보기 좋은 결과물만 만드는 것이 아니라 고객이 발견하고, 이해하고, 문의하는 흐름을 설계합니다.</p><Link className="text-link" href="/services">서비스 전체보기 →</Link></div></div><div className="service-grid">{services.map((service) => <article key={service.name}><span className="service-icon" aria-hidden="true">{service.icon}</span><h3>{service.name}</h3><p>{service.desc}</p></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="section-heading split"><div><span className="eyebrow">실행 사례</span><h2>업종과 상황에 맞춘<br />실행 설계 예시</h2></div><div><p>아래 내용은 서비스 이해를 돕기 위한 샘플 사례이며, 실제 매출 성과나 지원사업 선정 결과를 의미하지 않습니다.</p><Link className="text-link" href="/cases">전체 사례 보기 →</Link></div></div><div className="case-grid">{cases.map((item, index) => <article className="case-card" key={item.slug}><div className={`case-visual case-visual-${index + 1}`}><span>{item.industry}</span><b>{String(index + 1).padStart(2,"0")}</b></div><div className="case-card-body"><div className="case-top"><span>{item.program}</span><b>{item.status}</b></div><h3>{item.title}</h3><dl><div><dt>해결할 문제</dt><dd>{item.problem}</dd></div><div><dt>실행 항목</dt><dd>{item.execution.join(" · ")}</dd></div><div><dt>제작 결과물</dt><dd>{item.deliverables.join(" · ")}</dd></div></dl><Link href={`/cases/${item.slug}`}>자세히 보기 <span aria-hidden="true">→</span></Link></div></article>)}</div></div></section>

    <section className="section expert-section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">전문가 소개</span><h2>사업과 마케팅을 함께 보는 사람들</h2><p>지원사업의 목적과 실제 고객 유입을 함께 이해하는 팀이 실행합니다.</p></div><div className="expert-grid">{experts.map((expert) => <article key={expert.name}>{expert.image ? <div className="expert-photo"><img src={expert.image} alt={`${expert.name} 프로필 사진`} /></div> : <div className="avatar network-avatar" aria-hidden="true">{expert.initials}</div>}<span>{expert.role}</span><h3>{expert.name}</h3><p>{expert.bio}</p><ul>{expert.specialties.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="center-action"><Link className="button button-ghost" href="/experts">전문가 소개 자세히 보기 →</Link></div></div></section>

    <section className="section"><div className="shell"><div className="section-heading split"><div><span className="eyebrow">최신 자료</span><h2>공고 전부터 결과보고까지<br />실무에 필요한 정보</h2></div><Link className="text-link" href="/insights">자료실 전체보기 →</Link></div><div className="insight-grid">{insights.map((item, index) => <article key={item.slug}><div className={`insight-thumb thumb-${index + 1}`}><span>{item.category}</span><b>{String(index + 1).padStart(2,"0")}</b></div><div className="insight-body"><span>{item.date} · {item.readTime}</span><h3>{item.title}</h3><p>{item.description}</p><Link href={`/insights/${item.slug}`}>읽어보기 →</Link></div></article>)}</div></div></section>

    <FAQ />
    <CTA />
  </>;
}
