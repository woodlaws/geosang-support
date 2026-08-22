export const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "";

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
