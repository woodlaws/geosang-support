import { BoardPost } from "@/data/board";
import { isSupabasePublicConfigured, supabaseRequest } from "@/lib/supabase";

const select = "id,kind,slug,title,excerpt,body,category,is_pinned,organization,target_audience,application_start,application_end,official_url,verified_at,download_access,privacy_purpose,privacy_items,privacy_retention,published_at,created_at,post_attachments(id,bucket_id,object_path,file_name,mime_type,size_bytes)";

export async function listPosts(kind: "news" | "resource", options: { query?: string; category?: string; page?: number; pageSize?: number } = {}) {
  if (!isSupabasePublicConfigured) return { posts: [] as BoardPost[], configured: false, hasMore: false };
  const page = Math.max(1, options.page || 1), pageSize = Math.min(24, Math.max(1, options.pageSize || 9));
  const from = (page - 1) * pageSize, to = from + pageSize;
  const filters = [`kind=eq.${kind}`, "status=eq.published", `select=${encodeURIComponent(select)}`, "order=is_pinned.desc,published_at.desc", `offset=${from}`, `limit=${pageSize + 1}`];
  if (options.category && options.category !== "전체") filters.push(`category=eq.${encodeURIComponent(options.category)}`);
  if (options.query) filters.push(`or=${encodeURIComponent(`(title.ilike.*${options.query.slice(0,80)}*,body.ilike.*${options.query.slice(0,80)}*)`)}`);
  try {
    const rows = await supabaseRequest<BoardPost[]>(`/rest/v1/posts?${filters.join("&")}`);
    return { posts: rows.slice(0, pageSize), configured: true, hasMore: rows.length > pageSize, from, to };
  } catch { return { posts: [] as BoardPost[], configured: true, hasMore: false, error: true }; }
}

export async function getPost(kind: "news" | "resource", slug: string) {
  if (!isSupabasePublicConfigured) return null;
  try {
    const rows = await supabaseRequest<BoardPost[]>(`/rest/v1/posts?kind=eq.${kind}&slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=${encodeURIComponent(select)}&limit=1`);
    return rows[0] || null;
  } catch { return null; }
}
