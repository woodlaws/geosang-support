"use client";

import Link from "next/link";
import { useState } from "react";

const steps = [
  { key: "industry", title: "어떤 업종을 운영하고 계신가요?", options: ["외식·식품", "온라인·유통", "교육·서비스", "뷰티·건강", "제조·공예", "기타"] },
  { key: "stage", title: "현재 사업 단계는 어디에 가깝나요?", options: ["예비창업", "창업 초기", "운영·성장", "경영 위기", "재도전 준비"] },
  { key: "status", title: "개업 또는 폐업 상태를 알려주세요.", options: ["개업 전", "사업자 운영 중", "폐업 예정", "폐업 완료"] },
  { key: "selection", title: "지원사업 진행 단계는 무엇인가요?", options: ["아직 찾는 중", "신청 예정", "심사 중", "선정 완료"] },
  { key: "need", title: "가장 필요한 마케팅은 무엇인가요?", options: ["브랜드 전략", "홈페이지", "블로그·SNS", "스마트플레이스", "숏폼·광고", "AEO·GEO·결과보고"] },
];

export function DiagnosisWizard({ condensed = false }: { condensed?: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = steps[step];
  const done = step === steps.length;

  function choose(value: string) {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    setStep(step + 1);
  }

  function reset() { setAnswers({}); setStep(0); }

  return (
    <div className={condensed ? "diagnosis-card condensed" : "diagnosis-card"}>
      {!done ? <>
        <div className="diagnosis-top"><span>무료 자가진단</span><strong>{step + 1} / {steps.length}</strong></div>
        <div className="progress"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        <h3>{current.title}</h3>
        <div className="option-grid">{current.options.map((option) => <button key={option} type="button" onClick={() => choose(option)}>{option}<span aria-hidden="true">→</span></button>)}</div>
        {step > 0 && <button className="text-button" type="button" onClick={() => setStep(step - 1)}>← 이전 질문</button>}
      </> : <div className="diagnosis-result">
        <span className="result-icon" aria-hidden="true">✓</span>
        <h3>진단이 완료되었습니다</h3>
        <p><strong>{answers.industry}</strong> 업종의 <strong>{answers.stage}</strong> 단계이며, 현재 <strong>{answers.selection}</strong> 상태로 확인했습니다.</p>
        <p className="muted">공식 공고와 세부 상황을 확인하면 지원사업과 {answers.need} 실행 방향을 더 정확히 정리할 수 있습니다.</p>
        <div className="button-row"><Link className="button button-primary" href={`/contact?source=diagnosis&need=${encodeURIComponent(answers.need || "")}`}>전문가 연결 요청하기</Link><button type="button" className="button button-ghost" onClick={reset}>다시 진단하기</button></div>
      </div>}
    </div>
  );
}
