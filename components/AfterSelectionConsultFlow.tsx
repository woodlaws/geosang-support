"use client";

import Link from "next/link";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { readAfterSelectionContext, type AfterSelectionContext } from "@/lib/after-selection-cta";
import { trackAfterSelectionEvent } from "@/lib/analytics";
import { submitConsultation } from "@/lib/contact";

const stageOptions = [
  ["선정 통보", "선정 통보를 받았습니다."],
  ["협약 준비", "협약을 준비하고 있습니다."],
  ["협약 완료", "협약을 완료했습니다."],
  ["실행업체 탐색", "실행업체를 찾고 있습니다."],
  ["실행 중", "사업을 수행 중입니다."],
  ["결과보고 준비", "결과보고를 준비하고 있습니다."],
] as const;

const serviceOptions = ["마케팅 전략", "브랜드", "다페이지 홈페이지", "랜딩페이지", "상세페이지", "네이버 블로그", "스마트플레이스", "SNS 콘텐츠", "카드뉴스", "숏폼", "광고", "체험단", "인플루언서", "공동구매", "온라인 판로", "AEO·GEO", "산출물·결과보고", "무엇부터 해야 할지 모르겠습니다."];
const deadlineOptions = ["2주 이내", "1개월 이내", "2개월 이내", "3개월 이내", "3개월 이후", "아직 확인 중"];
const submittedKey = "geosang_after_selection_submitted";

type SubmitState = "idle" | "validating" | "submitting" | "success" | "error" | "unconfigured" | "duplicate";

function clean(value: FormDataEntryValue | null, max = 1000) {
  return String(value || "").replace(/<[^>]*>/g, "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

function safePageUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function safeReferrer() {
  try {
    const url = new URL(document.referrer);
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

function priorityFor(stage: string, deadline: string, services: string[], budget: string) {
  if (deadline === "2주 이내" || stage === "결과보고 준비" || (stage === "실행업체 탐색" && deadline === "1개월 이내")) return "urgent";
  if (deadline === "1개월 이내" || (stage === "협약 완료" && services.length > 0 && Boolean(budget))) return "high";
  return "normal";
}

export function AfterSelectionConsultFlow({ selected, setSelected, quoteRef }: { selected: string[]; setSelected: (items: string[]) => void; quoteRef: RefObject<HTMLElement | null> }) {
  const [currentStage, setCurrentStage] = useState("");
  const [deadlineRange, setDeadlineRange] = useState("");
  const [prechecked, setPrechecked] = useState(false);
  const [formType, setFormType] = useState<"quick" | "detail">("quick");
  const [state, setState] = useState<SubmitState>("idle");
  const [context, setContext] = useState<AfterSelectionContext>({ source: "after_selection_page", sourcePage: "/after-selection", ctaLocation: "consult" });
  const [precheckError, setPrecheckError] = useState("");
  const mountedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const firstStageRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const focusConsult = () => {
      setContext(readAfterSelectionContext() || { source: "after_selection_page", sourcePage: window.location.pathname, ctaLocation: "consult" });
      window.requestAnimationFrame(() => {
        quoteRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        window.setTimeout(() => firstStageRef.current?.focus({ preventScroll: true }), 350);
      });
    };
    setContext(readAfterSelectionContext() || { source: "after_selection_page", sourcePage: window.location.pathname, ctaLocation: "consult" });
    if (window.location.hash === "#consult") focusConsult();
    window.addEventListener("after-selection-context", focusConsult);
    trackAfterSelectionEvent("after_selection_quick_check_start", { source_page: window.location.pathname, cta_location: readAfterSelectionContext()?.ctaLocation || "consult" });
    return () => window.removeEventListener("after-selection-context", focusConsult);
  }, [quoteRef]);

  function toggleService(item: string) {
    const next = selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item];
    setSelected(next);
    trackAfterSelectionEvent("after_selection_service_select", { selected_services: next.join("|"), source_page: context.sourcePage });
  }

  function continueToForm() {
    if (!currentStage || !selected.length || !deadlineRange) {
      setPrecheckError("현재 단계, 필요한 실행, 실행 마감 범위를 모두 선택해주세요.");
      (!currentStage ? firstStageRef.current : document.querySelector<HTMLButtonElement>(!selected.length ? "[data-service-choice]" : "[data-deadline-choice]"))?.focus();
      return;
    }
    setPrecheckError("");
    setPrechecked(true);
    trackAfterSelectionEvent("after_selection_consult_form_start", { current_stage: currentStage, selected_services: selected.join("|"), deadline_range: deadlineRange, form_type: formType, source_page: context.sourcePage });
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("[name=selectedProgram]")?.focus(), 50);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting" || state === "success") return;
    if (sessionStorage.getItem(submittedKey)) {
      setState("duplicate");
      return;
    }
    const form = event.currentTarget;
    setState("validating");
    if (!form.reportValidity()) {
      setState("idle");
      return;
    }
    const data = new FormData(form);
    if (clean(data.get("website")) || Date.now() - mountedAt.current < 3000) {
      setState("error");
      return;
    }
    const latestContext = readAfterSelectionContext() || context;
    const marketingBudget = clean(data.get("marketingBudget"));
    const priority = priorityFor(currentStage, deadlineRange, selected, marketingBudget);
    const inquiryId = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `consult-${Date.now()}`;
    const payload: Record<string, unknown> = {
      submittedAt: new Date().toISOString(), inquiryId, inquiryType: "선정 후 실행 상담",
      source: latestContext.source, sourcePage: latestContext.sourcePage, pageUrl: safePageUrl(), referrer: safeReferrer(), ctaLocation: latestContext.ctaLocation,
      utmSource: latestContext.utmSource || "", utmMedium: latestContext.utmMedium || "", utmCampaign: latestContext.utmCampaign || "",
      name: clean(data.get("name"), 80), company: clean(data.get("company"), 120), phone: clean(data.get("phone"), 30), email: clean(data.get("email"), 160),
      region: clean(data.get("region"), 80), industry: clean(data.get("industry"), 100), selectedProgram: clean(data.get("selectedProgram"), 160), organization: clean(data.get("organization"), 120),
      currentStage, supportBudget: clean(data.get("supportBudget"), 80), marketingBudget, selfPayment: clean(data.get("selfPayment"), 30), agreementStart: clean(data.get("agreementStart"), 20),
      executionDeadline: clean(data.get("executionDeadline"), 20), deadlineRange, reportDeadline: clean(data.get("reportDeadline"), 20), selectedServices: selected,
      consultationMethod: clean(data.get("consultationMethod"), 40), preferredTime: clean(data.get("preferredTime"), 80), message: clean(data.get("message"), 2000), referenceUrl: clean(data.get("referenceUrl"), 500),
      privacyConsent: true, marketingConsent: data.get("marketingConsent") === "동의", priority, status: "신규 문의", assignedTo: "선정 후 실행 상담 담당자", userAgent: navigator.userAgent,
      formType, relatedProgram: latestContext.relatedProgram || "", referenceCase: latestContext.referenceCase || "", referenceArticle: latestContext.referenceArticle || "", resultType: latestContext.resultType || "",
    };
    setState("submitting");
    trackAfterSelectionEvent("after_selection_consult_form_submit", { current_stage: currentStage, selected_program: String(payload.selectedProgram), selected_services: selected.join("|"), deadline_range: deadlineRange, priority, form_type: formType, source_page: context.sourcePage });
    try {
      const result = await submitConsultation(payload);
      if (result.demo) {
        setState("unconfigured");
        trackAfterSelectionEvent("after_selection_consult_error", { current_stage: currentStage, deadline_range: deadlineRange, priority, form_type: formType, source_page: context.sourcePage });
        return;
      }
      sessionStorage.setItem(submittedKey, inquiryId);
      setState("success");
      trackAfterSelectionEvent("after_selection_consult_success", { current_stage: currentStage, deadline_range: deadlineRange, priority, form_type: formType, source_page: context.sourcePage });
    } catch {
      setState("error");
      trackAfterSelectionEvent("after_selection_consult_error", { current_stage: currentStage, deadline_range: deadlineRange, priority, form_type: formType, source_page: context.sourcePage });
    }
  }

  if (state === "success") return (
    <section ref={quoteRef} id="consult" className="after-quote section" aria-labelledby="consult-success-title">
      <div className="shell"><div className="after-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span><h2 id="consult-success-title">상담 신청이 정상적으로 접수되었습니다</h2>
        <p>접수 내용을 확인한 후 영업일 기준 1일 이내 연락드립니다.<br />필요한 경우 협약서, 사업계획서와 예산표를 별도로 요청드립니다.</p>
        <div className="success-prep"><strong>상담 전 준비자료</strong><p>지원사업 공고 · 선정 확인서 · 협약서 · 사업계획서 · 예산표 · 실행 마감일 · 참고 결과물</p></div>
        <div className="button-row"><Link className="button button-primary" href="/after-selection#first-check">선정 후 실행 가이드 보기</Link><Link className="button button-ghost" href="/cases">실행 사례 확인</Link><Link className="button button-ghost" href="/">메인으로 돌아가기</Link></div>
      </div></div>
    </section>
  );

  return (
    <section ref={quoteRef} id="consult" className="after-quote section" aria-labelledby="consult-title">
      <div className="shell quote-layout">
        <aside><span className="eyebrow light">선정 고객 전용 상담</span><h2 id="consult-title">정부지원사업 선정 후<br />마케팅 실행 상담</h2><p>정부지원사업에 선정된 후에는 협약서, 사업계획서, 예산 항목과 실행 마감일을 먼저 확인해야 합니다. 승인된 실행 범위에 맞춰 홈페이지, 콘텐츠, 광고와 결과보고 자료를 준비합니다.</p><ul><li>상담 신청 무료</li><li>전국 비대면 진행</li><li>영업일 기준 1일 이내 확인</li><li>협약·집행 기준 확인 후 견적 안내</li></ul><small>실제 수행 가능 항목은 선정된 사업의 협약서, 사업계획서와 집행 기준을 확인한 후 결정됩니다.</small></aside>
        <div className="after-consult-card">
          {!prechecked ? <div className="quick-check" aria-live="polite">
            <div className="quick-check-head"><span>빠른 사전 확인</span><strong>세 가지만 먼저 알려주세요</strong><small>약 30초</small></div>
            <fieldset><legend>1. 현재 어느 단계이신가요?</legend><div className="quick-choice-grid stage">{stageOptions.map(([value, label], index) => <button ref={index === 0 ? firstStageRef : undefined} type="button" key={value} className={currentStage === value ? "selected" : ""} aria-pressed={currentStage === value} onClick={() => { setCurrentStage(value); trackAfterSelectionEvent("after_selection_stage_select", { current_stage: value, source_page: context.sourcePage }); }}>{label}</button>)}</div></fieldset>
            <fieldset><legend>2. 가장 먼저 필요한 실행은 무엇인가요? <small>복수 선택</small></legend><div className="quick-choice-grid services">{serviceOptions.map((item) => <button data-service-choice type="button" key={item} className={selected.includes(item) ? "selected" : ""} aria-pressed={selected.includes(item)} onClick={() => toggleService(item)}>{item}</button>)}</div></fieldset>
            <fieldset><legend>3. 실행 마감은 언제인가요?</legend><div className="quick-choice-grid deadline">{deadlineOptions.map((item) => <button data-deadline-choice type="button" key={item} className={deadlineRange === item ? "selected" : ""} aria-pressed={deadlineRange === item} onClick={() => setDeadlineRange(item)}>{item}</button>)}</div></fieldset>
            {precheckError && <p className="form-error" role="alert">{precheckError}</p>}
            <button className="button button-coral quick-continue" type="button" onClick={continueToForm}>맞춤 실행 상담 계속하기 <span aria-hidden="true">→</span></button>
          </div> : <form ref={formRef} className="after-form" onSubmit={submit} noValidate aria-busy={state === "submitting"}>
            <div className="consult-summary"><div><span>현재 단계</span><strong>{currentStage}</strong></div><div><span>필요한 실행</span><strong>{selected.join(" · ")}</strong></div><div><span>마감 범위</span><strong>{deadlineRange}</strong></div><button type="button" onClick={() => setPrechecked(false)}>사전 확인 수정</button></div>
            <div className="form-type-tabs" role="group" aria-label="상담 작성 방식"><button type="button" className={formType === "quick" ? "selected" : ""} aria-pressed={formType === "quick"} onClick={() => setFormType("quick")}><strong>빠른 상담</strong><span>필수 정보만 입력</span></button><button type="button" className={formType === "detail" ? "selected" : ""} aria-pressed={formType === "detail"} onClick={() => setFormType("detail")}><strong>상세 상담</strong><span>예산·일정·고민 함께 전달</span></button></div>
            <h3>지원사업명과 실행 마감일을 알려주세요</h3><p className="form-intro">협약 내용과 예산 항목을 확인한 후 진행 가능한 실행 범위와 우선순위를 안내해드립니다.</p>
            <input className="consult-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
            <div className="after-form-grid">
              <label>이름 <b>*</b><input name="name" required maxLength={80} autoComplete="name" /></label><label>업체명 <b>*</b><input name="company" required maxLength={120} autoComplete="organization" /></label>
              <label>연락처 <b>*</b><input name="phone" required maxLength={30} inputMode="tel" autoComplete="tel" pattern="0\d{1,2}-?\d{3,4}-?\d{4}" title="휴대전화 또는 지역번호를 포함한 전화번호를 입력해주세요." /></label><label>선정된 지원사업 <b>*</b><input name="selectedProgram" required maxLength={160} placeholder="예: 희망리턴패키지" /></label>
              <label>실행 마감일 <b>*</b><input name="executionDeadline" type="date" required /></label>
              {formType === "detail" && <><label>이메일<input name="email" type="email" maxLength={160} autoComplete="email" /></label><label>업종<input name="industry" maxLength={100} placeholder="예: 식품 제조" /></label><label>지역<input name="region" maxLength={80} placeholder="예: 서울" /></label><label>주관기관<input name="organization" maxLength={120} /></label><label>총 지원 규모<input name="supportBudget" maxLength={80} /></label><label>마케팅 집행 가능 예산<select name="marketingBudget" defaultValue=""><option value="">선택해주세요</option>{["500만원 미만", "500만~1,000만원", "1,000만~3,000만원", "3,000만~5,000만원", "5,000만원 이상", "아직 확인 중", "공개하기 어려움"].map((item) => <option key={item}>{item}</option>)}</select></label><label>자부담 여부<select name="selfPayment" defaultValue=""><option value="">선택해주세요</option><option>있음</option><option>없음</option><option>확인 중</option></select></label><label>협약 시작일<input name="agreementStart" type="date" /></label><label>결과보고 예정일<input name="reportDeadline" type="date" /></label><label>희망 상담 방식<select name="consultationMethod" defaultValue=""><option value="">선택해주세요</option>{["전화", "문자", "카카오톡", "줌", "방문", "방식 협의"].map((item) => <option key={item}>{item}</option>)}</select></label><label>연락 가능 시간<input name="preferredTime" maxLength={80} placeholder="예: 평일 오후 2~5시" /></label></>}
            </div>
            {formType === "detail" && <><label className="full-label">현재 고민<textarea name="message" rows={5} maxLength={2000} placeholder="현재 상황과 필요한 실행을 알려주세요." /></label><label className="full-label">참고 링크<input name="referenceUrl" type="url" maxLength={500} placeholder="https://" /></label><div className="file-placeholder"><strong>자료 첨부 예정</strong><p>선정 확인서, 협약서, 사업계획서, 예산표, 실행 지침과 회사소개서는 안전한 저장소 연결 후 제공할 예정입니다.</p><small>예정 형식: PDF, DOCX, HWP, XLSX, JPG, PNG · 현재는 담당자 연락 후 별도로 전달해주세요.</small><button type="button" disabled>파일 첨부 준비 중</button></div></>}
            <label className="privacy-row"><input type="checkbox" required /><span><Link href="/privacy" target="_blank" rel="noreferrer">개인정보 수집 및 이용 <span className="sr-only">(새 창)</span></Link>에 동의합니다. <b>*</b></span></label><label className="privacy-row optional"><input type="checkbox" name="marketingConsent" value="동의" /><span>마케팅 정보 수신에 동의합니다. (선택)</span></label>
            <div className="submit-status" aria-live="polite">{state === "error" && <p className="form-error">일시적으로 접수하지 못했습니다. 입력 내용은 유지되니 잠시 후 다시 시도해주세요.</p>}{state === "unconfigured" && <p className="form-error">온라인 상담 저장소가 아직 연결되지 않았습니다. 연결 완료 전에는 접수 완료로 처리하지 않습니다.</p>}{state === "duplicate" && <p className="form-error">이 브라우저에서 이미 접수된 상담이 있습니다. 담당자 확인을 기다려주세요.</p>}</div>
            <button className="button button-coral after-submit" type="submit" disabled={state === "submitting"}>{state === "submitting" ? "안전하게 접수 중…" : formType === "quick" ? "빠른 상담 신청" : "상세 상담 신청"}</button><p className="form-footnote">상담 신청은 계약 확정이 아니며, 협약·집행 기준을 확인한 후 견적을 안내합니다.</p>
          </form>}
        </div>
      </div>
    </section>
  );
}
