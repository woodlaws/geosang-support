"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GOOGLE_APPS_SCRIPT_URL, submitConsultation } from "@/lib/contact";
import { trackExpertEvent } from "@/lib/analytics";
import { expertFaqs, expertProfiles, growthStages, lifecycleStages, problemLinks } from "@/data/experts";

const statusText = "전문가 섭외 완료 · 상세 프로필 준비 중";
const stages = ["예비창업", "창업 초기", "성장기", "성숙기", "사업 전환·정리"];

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="experts-heading"><span>{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function ExpertsNetworkPage() {
  const [activeLifecycle, setActiveLifecycle] = useState(0);
  const [activeExpert, setActiveExpert] = useState("tax");
  const [formStarted, setFormStarted] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error" | "unavailable">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { trackExpertEvent("experts_view", { source_page: "/experts" }); }, []);

  function chooseExpert(slug: string, source: string, scroll = true) {
    setActiveExpert(slug);
    trackExpertEvent("expert_category_select", { expert_category: slug, cta_location: source, source_page: "/experts" });
    if (scroll) requestAnimationFrame(() => document.getElementById(`expert-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function goToForm(slug = activeExpert, location = "expert_card") {
    setActiveExpert(slug);
    trackExpertEvent("expert_connect_click", { expert_category: slug, cta_location: location, source_page: "/experts" });
    requestAnimationFrame(() => document.getElementById("expert-consult")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function startForm() {
    if (formStarted) return;
    setFormStarted(true);
    trackExpertEvent("expert_form_start", { expert_category: activeExpert, source_page: "/experts" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    trackExpertEvent("expert_form_submit", { expert_category: activeExpert, source_page: "/experts" });
    if (!GOOGLE_APPS_SCRIPT_URL) {
      setSubmitState("unavailable");
      setMessage("현재 온라인 접수 연결을 준비 중입니다. 아래 상담 신청 페이지에서 다른 상담 채널을 확인해 주세요.");
      trackExpertEvent("expert_form_error", { expert_category: activeExpert, source_page: "/experts", error_type: "endpoint_unconfigured" });
      return;
    }
    setSubmitState("sending");
    setMessage("");
    const formData = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.inquiryType = "전문가 연결 상담";
    payload.expertCategory = activeExpert;
    payload.source = "experts_page";
    payload.sourcePage = "/experts";
    payload.submittedAt = new Date().toISOString();
    try {
      const result = await submitConsultation(payload);
      if (result.demo) throw new Error("endpoint_unconfigured");
      setSubmitState("success");
      setMessage("전문가 연결 요청이 접수되었습니다. 영업일 기준 1일 이내 연락드리겠습니다.");
      trackExpertEvent("expert_form_success", { expert_category: activeExpert, source_page: "/experts" });
      form.reset();
    } catch (error) {
      setSubmitState(error instanceof Error && error.message === "endpoint_unconfigured" ? "unavailable" : "error");
      setMessage(error instanceof Error && error.message === "endpoint_unconfigured" ? "현재 온라인 접수 연결을 준비 중입니다." : "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      trackExpertEvent("expert_form_error", { expert_category: activeExpert, source_page: "/experts", error_type: "submission_failed" });
    }
  }

  return <div className="experts-page">
    <section className="experts-hero">
      <div className="shell experts-hero-grid">
        <div className="experts-hero-copy">
          <span className="experts-kicker">사업 단계와 문제에 맞는 분야별 연결</span>
          <h1>성장할 때도, 막막할 때도<br /><em>필요한 전문가를 찾으세요</em></h1>
          <p>세무·회계·특허·법률·법무·행정·노무·관세까지, 현재 사업의 문제를 먼저 분류하고 필요한 전문 영역을 연결합니다.</p>
          <div className="button-row"><button type="button" className="button button-primary" onClick={() => document.getElementById("problem-finder")?.scrollIntoView({ behavior: "smooth" })}>내 문제에 맞는 전문가 찾기 →</button><button type="button" className="button button-coral" onClick={() => goToForm(activeExpert, "hero")}>전문가 연결 상담 신청</button></div>
          <small>거상마케팅센터는 정부기관이 아니며, 전문 자격 업무는 해당 분야 외부 전문가가 담당합니다.</small>
        </div>
        <div className="experts-hero-visual" aria-label="분야별 전문가 네트워크 일러스트">
          {expertProfiles.map((expert) => <div key={expert.slug}><Image src={expert.image} alt="" width={180} height={180} priority={expert.slug === "tax"} loading={expert.slug === "tax" ? undefined : "eager"} sizes="(max-width: 768px) 22vw, 150px" /><span>{expert.shortLabel}</span></div>)}
          <strong>8개 전문 분야<br /><em>연결 준비 완료</em></strong>
        </div>
      </div>
    </section>
    <Breadcrumb current="전문가 네트워크" />

    <section className="section experts-lifecycle">
      <div className="shell">
        <Heading eyebrow="기업 생애주기" title="사업은 단계마다 다른 질문을 만납니다" description="현재 위치를 선택하면 그 단계에서 먼저 점검할 과제를 확인할 수 있습니다." />
        <div className="lifecycle-chart" role="tablist" aria-label="기업 생애주기 선택">
          {lifecycleStages.map(([number, title, note], index) => <button type="button" role="tab" aria-selected={activeLifecycle === index} className={activeLifecycle === index ? "active" : ""} key={title} onClick={() => { setActiveLifecycle(index); trackExpertEvent("lifecycle_stage_select", { lifecycle_stage: title, source_page: "/experts" }); }} style={{ "--rise": `${Math.min(index, 4) * 13 + (index === 5 ? 39 : 0)}px` } as CSSProperties}><i>{number}</i><b>{title}</b><span>{note}</span></button>)}
        </div>
        <div className="lifecycle-result"><b>{lifecycleStages[activeLifecycle][1]}</b><span>{lifecycleStages[activeLifecycle][2]}를 기준으로 세무·회계·법률·마케팅 과제를 함께 구분해 보세요.</span></div>
      </div>
    </section>

    <section className="section section-soft experts-growth">
      <div className="shell"><Heading eyebrow="성장 단계별 지원" title="정부지원사업과 전문 지원을 함께 설계합니다" description="성장 단계에 맞는 지원 영역을 살피고, 전문 자격 검토와 마케팅 실행의 담당을 구분합니다." />
        <div className="growth-grid">{growthStages.map((stage, index) => <article key={stage.title}><span>0{index + 1}</span><h3>{stage.title}</h3><p>{stage.subtitle}</p><div>{stage.needs.map((need) => <b key={need}>{need}</b>)}</div><button type="button" onClick={() => chooseExpert(stage.experts[0], "growth_stage")}>관련 전문가 보기 →</button></article>)}</div>
      </div>
    </section>

    <section className="section problem-finder" id="problem-finder">
      <div className="shell"><Heading eyebrow="문제에서 시작하기" title="지금 가장 가까운 고민을 선택하세요" description="직업 이름을 몰라도 괜찮습니다. 문제를 선택하면 연결 분야를 먼저 찾아드립니다." />
        <div className="problem-grid">{problemLinks.map(([problem, slug]) => <button type="button" className={activeExpert === slug ? "active" : ""} key={problem} onClick={() => chooseExpert(slug, "problem_finder")}><span>✓</span>{problem}<b>→</b></button>)}</div>
      </div>
    </section>

    <section className="section section-soft" id="expert-list">
      <div className="shell"><Heading eyebrow="분야별 전문가 네트워크" title="8개 전문 분야의 연결을 준비했습니다" description="현재는 개인정보를 보호하기 위해 분야명만 공개합니다. 실제 담당자는 연결 단계에서 범위와 함께 안내합니다." />
        <div className="expert-network-grid">{expertProfiles.map((expert) => <article id={`expert-${expert.slug}`} className={activeExpert === expert.slug ? "active" : ""} key={expert.slug}>
          <div className="expert-network-image"><Image src={expert.image} alt={`${expert.label}를 표현한 가상 캐릭터 일러스트`} width={420} height={420} sizes="(max-width: 768px) 100vw, 25vw" /></div>
          <div className="expert-network-body"><span>{expert.label}</span><h3>{expert.summary}</h3><div className="expert-status"><i aria-hidden="true">✓</i>{statusText}</div><ul>{expert.services.map((service) => <li key={service}>{service}</li>)}</ul><p><b>이런 경우 추천</b>{expert.recommendedFor.join(" · ")}</p><button type="button" className="button button-primary" onClick={() => goToForm(expert.slug)}>이 분야 연결 요청 →</button></div>
        </article>)}</div>
      </div>
    </section>

    <section className="section expert-roles"><div className="shell"><Heading eyebrow="분야별 역할" title="비슷해 보여도 담당 업무는 다릅니다" description="아래 내용을 열어 대표적인 검토 범위를 확인하세요." /><div className="expert-role-list">{expertProfiles.map((expert) => <details key={expert.slug}><summary><span>{expert.shortLabel}</span>{expert.label}<b>＋</b></summary><div><p>{expert.summary}</p><ul>{expert.services.map((service) => <li key={service}>{service}</li>)}</ul><button type="button" onClick={() => goToForm(expert.slug, "role_detail")}>연결 요청하기 →</button></div></details>)}</div></div></section>

    <section className="section section-soft expert-process"><div className="shell"><Heading eyebrow="연결 프로세스" title="문제를 확인한 뒤 적합한 분야를 연결합니다" /><ol>{[["01", "상담 접수", "현재 상황과 고민을 남깁니다."], ["02", "문제 분류", "전문 자격 영역과 마케팅 영역을 구분합니다."], ["03", "전문가 확인", "연결 가능 분야와 필요한 자료를 확인합니다."], ["04", "범위 안내", "상담 범위·일정·비용을 별도로 안내합니다."], ["05", "실행 연결", "전문 검토와 마케팅 실행을 필요한 순서로 진행합니다."]].map(([n, t, d]) => <li key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></li>)}</ol></div></section>

    <section className="section expert-separation"><div className="shell"><Heading eyebrow="역할 구분" title="전문 자격 검토와 마케팅 실행을 명확히 나눕니다" /><div className="expert-separation-grid"><article><span>외부 분야별 전문가</span><h3>자격과 판단이 필요한 영역</h3><ul>{["세무·회계 검토", "법률·법무 서류", "특허·상표", "인허가·행정", "인사·노무", "수출입·관세"].map((x) => <li key={x}>✓ {x}</li>)}</ul></article><article><span>거상마케팅센터</span><h3>고객 유입을 만드는 실행 영역</h3><ul>{["브랜드·홈페이지", "블로그·SNS·숏폼", "스마트플레이스", "광고 운영", "AEO·GEO", "실행 산출물·결과보고 자료"].map((x) => <li key={x}>✓ {x}</li>)}</ul></article></div><p className="expert-disclaimer">전문가 연결은 선정, 지원금 지급, 법적·세무상 결과 또는 매출 성과를 보장하지 않습니다.</p></div></section>

    <section className="section expert-consult" id="expert-consult"><div className="shell expert-consult-grid"><div><span className="experts-kicker">전문가 연결 상담</span><h2>지금 필요한 분야부터<br />함께 정리해드리겠습니다</h2><p>간단한 정보를 남겨주시면 문제 유형과 담당 영역을 먼저 확인합니다. 민감한 서류는 접수 단계에서 첨부하지 마세요.</p><div className="selected-expert"><span>현재 선택 분야</span><b>{expertProfiles.find((x) => x.slug === activeExpert)?.label}</b></div></div>
      <form ref={formRef} className="expert-consult-form" onSubmit={submit} onFocus={startForm}>
        <div className="form-two"><label><span>이름 <b>*</b></span><input name="name" required autoComplete="name" /></label><label><span>업체명 <b>*</b></span><input name="company" required autoComplete="organization" /></label></div>
        <div className="form-two"><label><span>연락처 <b>*</b></span><input name="phone" required inputMode="tel" autoComplete="tel" /></label><label><span>이메일 <b>*</b></span><input name="email" required type="email" autoComplete="email" /></label></div>
        <div className="form-two"><label><span>사업 단계 <b>*</b></span><select name="businessStage" required defaultValue=""><option value="" disabled>선택해주세요</option>{stages.map((x) => <option key={x}>{x}</option>)}</select></label><label><span>희망 전문가 분야 <b>*</b></span><select name="expertCategoryLabel" required value={activeExpert} onChange={(e) => chooseExpert(e.target.value, "consult_form", false)}>{expertProfiles.map((x) => <option value={x.slug} key={x.slug}>{x.label}</option>)}</select></label></div>
        <label><span>현재 고민 <b>*</b></span><textarea name="concern" required rows={5} placeholder="확인이 필요한 문제와 현재 상황을 적어주세요." /></label>
        <label className="form-agree"><input type="checkbox" name="privacyConsent" value="동의" required /><span><Link href="/privacy" target="_blank">개인정보 수집·이용 내용</Link>을 확인했으며 상담을 위해 수집하는 데 동의합니다. <b>*</b></span></label>
        <label className="form-agree"><input type="checkbox" name="marketingConsent" value="동의" /><span>관련 서비스와 지원사업 소식 수신에 동의합니다. (선택)</span></label>
        <button type="submit" className="button button-coral form-submit" disabled={submitState === "sending"}>{submitState === "sending" ? "전송 중…" : "전문가 연결 요청하기 →"}</button>
        {message && <div role="status" className={`expert-form-message ${submitState}`}>{message}{submitState === "unavailable" && <Link href="/contact"> 상담 신청 페이지 보기 →</Link>}</div>}
        <small>접수 후 자료 확인이 필요할 수 있으며, 전문가 상담 범위와 비용은 별도로 안내합니다.</small>
      </form>
    </div></section>

    <section className="section section-soft expert-faq"><div className="shell"><Heading eyebrow="FAQ" title="전문가 연결 전에 많이 묻는 질문" /><div>{expertFaqs.map((faq) => <details key={faq.q}><summary>{faq.q}<span>＋</span></summary><p>{faq.a}</p></details>)}</div></div></section>

    <section className="experts-final-cta"><div className="shell"><span>사업 문제를 혼자 분류하지 않아도 됩니다</span><h2>필요한 전문가와 실행 순서부터<br />차분히 정리해보세요</h2><button type="button" className="button button-coral" onClick={() => goToForm(activeExpert, "final_cta")}>전문가 연결 상담 신청 →</button></div></section>
  </div>;
}
