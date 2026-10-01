import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const access = request.cookies.get("gsc_access_token")?.value;
  const refresh = request.cookies.get("gsc_refresh_token")?.value;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (access || !refresh || !url || !key) return NextResponse.next();
  try {
    const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: refresh }) });
    if (!response.ok) throw new Error("refresh failed");
    const session = await response.json();
    const next = NextResponse.next();
    const secure = process.env.NODE_ENV === "production";
    next.cookies.set("gsc_access_token", session.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: session.expires_in });
    if (session.refresh_token) next.cookies.set("gsc_refresh_token", session.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    return next;
  } catch {
    const next = NextResponse.next();
    next.cookies.set("gsc_access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
    next.cookies.set("gsc_refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });
    return next;
  }
}

export const config = { matcher: ["/portal/:path*", "/admin/:path*", "/api/admin/:path*", "/api/projects/:path*"] };
