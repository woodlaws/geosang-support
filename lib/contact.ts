export const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "";
export const CONSULTATION_STATUSES = ["신규 문의", "1차 연락", "협약 확인", "상담 예정", "상담 완료", "자료 요청", "실행 가능 검토", "견적 작성", "견적 발송", "계약 검토", "계약 완료", "실행 중", "보고 완료", "보류", "종료"] as const;

export async function submitConsultation(payload: Record<string, string | string[] | boolean>) {
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
  return { ok: true, demo: false };
}
