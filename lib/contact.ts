export const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "";
export const SUPABASE_SUBMISSION_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const CONSULTATION_STATUSES = ["신규 문의", "1차 연락", "협약 확인", "상담 예정", "상담 완료", "자료 요청", "실행 가능 검토", "견적 작성", "견적 발송", "계약 검토", "계약 완료", "실행 중", "보고 완료", "보류", "종료"] as const;

export async function submitConsultation(payload: Record<string, unknown>) {
  if (SUPABASE_SUBMISSION_CONFIGURED) {
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "상담 신청 전송에 실패했습니다.");
    return { ok: true, demo: false, receiptNumber: result.receiptNumber as string };
  }
  if (!GOOGLE_APPS_SCRIPT_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ok: true, demo: true };
  }

  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("상담 신청 전송에 실패했습니다.");
  return { ok: true, demo: false, receiptNumber: undefined as string | undefined };
}
