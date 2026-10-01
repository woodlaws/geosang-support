import { cookies } from "next/headers";
import { createHash } from "node:crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabasePublicConfigured = Boolean(url && anonKey);
export const isSupabaseServerConfigured = Boolean(url && anonKey && serviceKey);

type RequestOptions = RequestInit & { service?: boolean; token?: string };

export async function supabaseRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!url || !anonKey) throw new Error("SUPABASE_NOT_CONFIGURED");
  const key = options.service ? serviceKey : anonKey;
  if (!key) throw new Error("SUPABASE_SERVER_NOT_CONFIGURED");
  const headers = new Headers(options.headers);
  headers.set("apikey", key);
  headers.set("Authorization", `Bearer ${options.token || key}`);
  if (!headers.has("Content-Type") && options.body) headers.set("Content-Type", "application/json");
  const response = await fetch(`${url}${path}`, { ...options, headers, cache: options.cache ?? "no-store" });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`SUPABASE_${response.status}:${detail.slice(0, 300)}`);
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export type AuthUser = { id: string; email?: string };
export type AuthContext = { user: AuthUser; role: "admin" | "customer"; displayName: string; accessToken: string };

export async function getAuthContext(): Promise<AuthContext | null> {
  if (!isSupabasePublicConfigured) return null;
  const store = await cookies();
  const accessToken = store.get("gsc_access_token")?.value;
  if (!accessToken) return null;
  try {
    const user = await supabaseRequest<AuthUser>("/auth/v1/user", { token: accessToken });
    const rows = await supabaseRequest<Array<{ role: "admin" | "customer"; display_name: string }>>(`/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role,display_name&limit=1`, { token: accessToken });
    if (!rows[0]) return null;
    return { user, role: rows[0].role, displayName: rows[0].display_name, accessToken };
  } catch { return null; }
}

export function safeText(value: unknown, max: number): string {
  return String(value ?? "").replace(/[\u0000-\u001f]/g, " ").replace(/<[^>]*>/g, "").trim().slice(0, max);
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const agent = request.headers.get("user-agent") || "unknown";
  return createHash("sha256").update(`${forwarded}|${agent}|${process.env.RATE_LIMIT_SALT || "gsc"}`).digest("hex");
}

export async function enforceRateLimit(request: Request, action: string, limit = 5): Promise<boolean> {
  if (!isSupabaseServerConfigured) return true;
  const now = new Date();
  now.setUTCMinutes(Math.floor(now.getUTCMinutes() / 10) * 10, 0, 0);
  const window = now.toISOString();
  const key = clientKey(request);
  const query = `/rest/v1/submission_rate_limits?key_hash=eq.${key}&action=eq.${encodeURIComponent(action)}&window_started_at=eq.${encodeURIComponent(window)}&select=request_count`;
  const rows = await supabaseRequest<Array<{ request_count: number }>>(query, { service: true });
  if (!rows.length) {
    await supabaseRequest("/rest/v1/submission_rate_limits", { service: true, method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ key_hash: key, action, window_started_at: window, request_count: 1 }) });
    return true;
  }
  if (rows[0].request_count >= limit) return false;
  await supabaseRequest(`/rest/v1/submission_rate_limits?key_hash=eq.${key}&action=eq.${encodeURIComponent(action)}&window_started_at=eq.${encodeURIComponent(window)}`, { service: true, method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ request_count: rows[0].request_count + 1 }) });
  return true;
}

export function storagePublicUrl(bucket: string, path: string) {
  return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

export async function createSignedUrl(bucket: string, path: string, expiresIn = 300) {
  const data = await supabaseRequest<{ signedURL?: string; signedUrl?: string }>(`/storage/v1/object/sign/${encodeURIComponent(bucket)}/${path.split("/").map(encodeURIComponent).join("/")}`, { service: true, method: "POST", body: JSON.stringify({ expiresIn }) });
  const signed = data.signedURL || data.signedUrl;
  if (!signed) throw new Error("SIGNED_URL_FAILED");
  return signed.startsWith("http") ? signed : `${url}/storage/v1${signed}`;
}
