"use client";

import { FormEvent, useState } from "react";
import { submitConsultation } from "@/lib/contact";

const serviceOptions = ["브랜드 전략", "홈페이지 제작", "네이버 블로그", "스마트플레이스", "SNS 콘텐츠", "숏폼 제작", "광고 운영", "AEO·GEO", "결과보고"];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string | string[] | boolean> = {};
    formData.forEach((value, key) => {
      if (key === "services") payload[key] = formData.getAll(key).map(String);
      else payload[key] = String(value);
    });
    try { await submitConsultation(payload); setState("success"); form.reset(); }
    catch { setState("error"); }
  }

  if (state === "success") return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h3>상담 신청이 접수되었습니다.</h3><p>영업일 기준 1일 이내 연락드리겠습니다.</p></div>;

  return (
    <form className={compact ? "contact-form compact" : "contact-form"} onSubmit={onSubmit}>
      <div className="form-grid">
        <label>이름 <span>*</span><input name="name" required autoComplete="name" placeholder="성함을 입력해주세요" /></label>
        <label>업체명 <span>*</span><input name="company" required autoComplete="organization" placeholder="업체명을 입력해주세요" /></label>
        <label>연락처 <span>*</span><input name="phone" required inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" /></label>
        <label>이메일 <input name="email" type="email" autoComplete="email" placeholder="name@example.com" /></label>
        <label>업종 <span>*</span><input name="industry" required placeholder="예: 카페, 제조업, 교육 서비스" /></label>
        <label>현재 단계 <span>*</span><select name="stage" required defaultValue=""><option value="" disabled>선택해주세요</option><option>신청 예정</option><option>심사 중</option><option>선정 완료</option></select></label>
        <label>지원사업명 <input name="program" placeholder="모르면 비워두셔도 됩니다" /></label>
        <label>지원금 규모 <input name="budget" placeholder="예: 2천만 원 / 미정" /></label>
        <label>집행 기한 <input name="deadline" type="date" /></label>
      </div>
      <fieldset><legend>필요한 서비스</legend><div className="check-grid">{serviceOptions.map((item) => <label key={item}><input type="checkbox" name="services" value={item} /> <span>{item}</span></label>)}</div></fieldset>
      <label>현재 고민 <span>*</span><textarea name="concern" required rows={5} placeholder="현재 상황과 가장 고민되는 내용을 알려주세요." /></label>
      <label className="privacy-check"><input type="checkbox" name="privacy" required value="동의" /> <span><a href="/privacy" target="_blank">개인정보 수집 및 이용</a>에 동의합니다. <b>*</b></span></label>
      {state === "error" && <p className="form-error" role="alert">전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>}
      <button className="button button-coral form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "접수 중…" : "무료 상담 신청하기"} <span aria-hidden="true">→</span></button>
      <p className="form-footnote">제출하신 정보는 상담 안내 목적으로만 사용합니다.</p>
    </form>
  );
}
