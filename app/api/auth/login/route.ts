import { NextResponse } from "next/server";
import { isSupabasePublicConfigured, safeText, supabaseRequest } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!isSupabasePublicConfigured) return NextResponse.json({ message: "로그인 서비스가 아직 연결되지 않았습니다." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  const email = safeText(body.email, 160), password = String(body.password || "").slice(0, 200);
  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return NextResponse.json({ message: "이메일과 비밀번호를 확인해주세요." }, { status: 400 });
  try {
    const session = await supabaseRequest<{ access_token: string; refresh_token: string; expires_in: number }>("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
    const response = NextResponse.json({ ok: true });
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set("gsc_access_token", session.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: session.expires_in });
    response.cookies.set("gsc_refresh_token", session.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    return response;
  } catch { return NextResponse.json({ message: "로그인 정보가 올바르지 않습니다." }, { status: 401 }); }
}
