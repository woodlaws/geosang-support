"use client";

import { FormEvent, useState } from "react";
import { submitConsultation } from "@/lib/contact";

const expertOptions = ["지원사업 공고 분석", "사업계획서", "세무·회계", "폐업 행정", "법률·채무", "재창업 전략", "마케팅 실행", "결과보고"];
const marketingOptions = ["브랜드", "홈페이지", "콘텐츠", "SNS", "스마트플레이스", "광고", "AEO·GEO", "마케팅 결과보고"];

export function HopeReturnContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string | string[] | boolean> = { source: "hope-return-page" };
    formData.forEach((value, key) => {
      payload[key] = key === "experts" || key === "marketingServices" ? formData.getAll(key).map(String) : String(value);
    });
    try { await submitConsultation(payload); setState("success"); form.reset(); }
    catch { setState("error"); }
  }

  if (state === "success") return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h3>상담 신청이 접수되었습니다.</h3><p>영업일 기준 1일 이내 연락드리겠습니다.</p></div>;

  return <form className="contact-form hope-contact-form" onSubmit={onSubmit}>
    <div className="form-grid">
      <label>이름 <span>*</span><input name="name" required autoComplete="name" /></label>
      <label>업체명 <span>*</span><input name="company" required autoComplete="organization" /></label>
      <label>연락처 <span>*</span><input name="phone" required inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" /></label>
      <label>지역 <span>*</span><input name="region" required placeholder="예: 서울 마포구" /></label>
      <label>업종 <span>*</span><input name="industry" required /></label>
      <label>현재 사업 상태 <span>*</span><select name="businessStatus" required defaultValue=""><option value="" disabled>선택해주세요</option>{["정상 영업 중", "경영 위기", "폐업 준비 중", "폐업 완료", "재창업 준비 중"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>희망리턴패키지 신청 상태 <span>*</span><select name="applicationStatus" required defaultValue=""><option value="" disabled>선택해주세요</option>{["처음 알아보는 중", "신청 준비 중", "신청 완료", "심사 중", "선정 완료"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>관심 있는 세부 지원 <input name="supportArea" placeholder="예: 원스톱 폐업지원, 재창업" /></label>
    </div>
    <fieldset><legend>필요한 전문가</legend><div className="check-grid">{expertOptions.map((item) => <label key={item}><input type="checkbox" name="experts" value={item} /><span>{item}</span></label>)}</div></fieldset>
    <fieldset><legend>필요한 마케팅 서비스</legend><div className="check-grid">{marketingOptions.map((item) => <label key={item}><input type="checkbox" name="marketingServices" value={item} /><span>{item}</span></label>)}</div></fieldset>
    <label>현재 고민 <span>*</span><textarea name="concern" required rows={5} placeholder="현재 상황과 확인하고 싶은 내용을 알려주세요." /></label>
    <label className="privacy-check"><input type="checkbox" name="privacy" required value="동의" /><span><a href="/privacy" target="_blank" rel="noopener noreferrer">개인정보 수집 및 이용</a>에 동의합니다. <b>*</b></span></label>
    {state === "error" && <p className="form-error" role="alert">전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>}
    <button className="button button-coral form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "접수 중…" : "전문가 상담 요청하기"} →</button>
    <p className="form-footnote">제출 정보는 상담 안내 목적으로만 사용됩니다.</p>
  </form>;
}
