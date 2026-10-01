import { NextResponse } from "next/server";
import { createSignedUrl, enforceRateLimit, isSupabaseServerConfigured, safeText, storagePublicUrl, supabaseRequest } from "@/lib/supabase";
import type { BoardPost } from "@/data/board";

export async function POST(request: Request) {
  if (!isSupabaseServerConfigured) return NextResponse.json({ message: "자료 다운로드 저장소가 아직 연결되지 않았습니다." }, { status: 503 });
  if (!(await enforceRateLimit(request, "resource-download", 8))) return NextResponse.json({ message: "요청이 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
  const raw = await request.json().catch(() => ({}));
  const postId = safeText(raw.postId, 80), attachmentId = safeText(raw.attachmentId, 80);
  const posts = await supabaseRequest<BoardPost[]>(`/rest/v1/posts?id=eq.${encodeURIComponent(postId)}&kind=eq.resource&status=eq.published&select=*,post_attachments(*)&limit=1`, { service: true });
  const post = posts[0], attachment = post?.post_attachments?.find(item => item.id === attachmentId);
  if (!post || !attachment) return NextResponse.json({ message: "자료를 찾을 수 없습니다." }, { status: 404 });
  if (post.download_access === "lead") {
    const name = safeText(raw.name, 50), phone = safeText(raw.phone, 30), company = safeText(raw.company, 100);
    if (name.length < 2 || !/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(phone.replace(/\s/g,"")) || raw.privacyConsent !== true) return NextResponse.json({ message: "이름, 연락처와 필수 동의를 확인해주세요." }, { status: 400 });
    await supabaseRequest("/rest/v1/download_requests", { service: true, method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ post_id: post.id, name, phone, company: company || null, privacy_consent: true, marketing_consent: raw.marketingConsent === true }) });
  }
  const downloadUrl = attachment.bucket_id === "public-resources" ? storagePublicUrl(attachment.bucket_id, attachment.object_path) : await createSignedUrl(attachment.bucket_id, attachment.object_path, 300);
  return NextResponse.json({ ok: true, downloadUrl });
}
