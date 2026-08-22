"use client";

import Link from "next/link";
import { useState } from "react";

export const hopeReturnDiagnosisSteps = [
  { key: "businessStatus", title: "현재 사업 상태는 어떻습니까?", options: ["정상 영업 중", "경영 위기", "폐업 준비 중", "폐업 완료", "재창업 준비 중"] },
  { key: "closurePeriod", title: "폐업했다면 언제 폐업했습니까?", options: ["해당 없음", "3개월 이내", "1년 이내", "3년 이내", "3년 초과"] },
  { key: "primaryNeed", title: "현재 가장 필요한 지원은 무엇입니까?", options: ["경영 개선", "폐업 절차", "점포 철거", "취업 준비", "재창업", "마케팅 실행"] },
  { key: "applicationStatus", title: "희망리턴패키지 신청 상태는 어떻습니까?", options: ["처음 알아보는 중", "신청 준비 중", "신청 완료", "심사 중", "선정 완료"] },
  { key: "consultingArea", title: "상담받고 싶은 분야는 무엇입니까?", options: ["지원사업 정보", "사업계획서", "세무·행정", "재창업 전략", "홈페이지", "블로그·SNS", "광고·홍보", "결과보고"] },
] as const;

function resultMessage(answers: Record<string, string>) {
  if (answers.applicationStatus === "선정 완료" || answers.primaryNeed === "마케팅 실행") return "현재는 협약과 집행 기준을 확인한 뒤, 선정 이후 마케팅 실행 계획을 구체화하는 것이 좋습니다.";
  if (answers.businessStatus === "폐업 완료" && answers.primaryNeed === "취업 준비") return "현재는 재취업 교육과 취업 연계 관련 세부 공고를 먼저 확인하는 것이 좋습니다.";
  if (answers.businessStatus === "폐업 완료" || answers.businessStatus === "재창업 준비 중" || answers.primaryNeed === "재창업") return "현재는 재창업 교육·사업화 공고와 사업계획, 선정 이후 실행 방향을 함께 확인하는 것이 좋습니다.";
  if (answers.businessStatus === "폐업 준비 중" || answers.primaryNeed === "폐업 절차" || answers.primaryNeed === "점포 철거") return "현재는 원스톱 폐업지원의 자격과 신청 시점, 폐업·점포 정리 절차를 먼저 확인하는 것이 좋습니다.";
  return "현재는 경영 상태를 진단하고 경영개선 관련 세부 사업과 자격조건을 먼저 확인하는 것이 좋습니다.";
}

export function HopeReturnDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step === hopeReturnDiagnosisSteps.length;
  const current = hopeReturnDiagnosisSteps[step];

  function choose(value: string) {
    setAnswers((previous) => ({ ...previous, [current.key]: value }));
    setStep((previous) => previous + 1);
  }

  function reset() { setAnswers({}); setStep(0); }

  return <div className="hope-diagnosis-card">
    {!done ? <>
      <div className="diagnosis-top"><span>무료 대상 자가진단</span><strong>{step + 1} / {hopeReturnDiagnosisSteps.length}</strong></div>
      <div className="progress"><span style={{ width: `${((step + 1) / hopeReturnDiagnosisSteps.length) * 100}%` }} /></div>
      <h3>{current.title}</h3>
      <div className="hope-option-grid">{current.options.map((option) => <button type="button" key={option} onClick={() => choose(option)}>{option}<span aria-hidden="true">→</span></button>)}</div>
      {step > 0 && <button type="button" className="text-button" onClick={() => setStep((previous) => previous - 1)}>← 이전 질문</button>}
    </> : <div className="diagnosis-result">
      <span className="result-icon" aria-hidden="true">✓</span>
      <span className="eyebrow">다음 확인 방향</span>
      <h3>{resultMessage(answers)}</h3>
      <p className="muted">이 결과는 지원 가능성이나 선정을 판정하는 점수가 아닙니다. 해당 연도 공식 공고와 실제 상황을 기준으로 최종 확인해야 합니다.</p>
      <div className="button-row"><Link className="button button-primary" href={`/contact?source=hope-return-diagnosis&status=${encodeURIComponent(answers.applicationStatus || "")}&need=${encodeURIComponent(answers.primaryNeed || "")}`}>전문가 상담 요청하기</Link><Link className="button button-coral" href="/after-selection#consult">선정 후 마케팅 상담받기</Link></div>
      <button type="button" className="text-button" onClick={reset}>진단 다시 하기</button>
    </div>}
  </div>;
}
