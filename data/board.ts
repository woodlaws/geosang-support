export const newsCategories = ["전체", "희망리턴패키지", "창업지원사업", "소상공인 지원사업", "판로·마케팅 지원사업", "센터 공지"];
export const resourceCategories = ["선정 전 준비", "선정 후 마케팅 실행", "홈페이지·콘텐츠·광고", "예산·증빙·결과보고"];

export type BoardPost = {
  id: string; kind: "news" | "resource"; slug: string; title: string; excerpt: string; body: string; category: string;
  is_pinned: boolean; organization: string | null; target_audience: string | null; application_start: string | null;
  application_end: string | null; official_url: string | null; verified_at: string | null; download_access: "public" | "lead" | null;
  privacy_purpose: string | null; privacy_items: string | null; privacy_retention: string | null; published_at: string | null; created_at: string;
  post_attachments?: BoardAttachment[];
};
export type BoardAttachment = { id: string; bucket_id: "public-resources" | "private-resources"; object_path: string; file_name: string; mime_type: string; size_bytes: number };

export const projectStageLabels: Record<string, string> = { collecting: "자료 수집", strategy: "전략 수립", production: "제작 중", review: "고객 검토", revision: "수정 중", completed: "완료" };
export const consultationStatusLabels: Record<string, string> = { received: "접수", reviewing: "확인 중", consulted: "상담 완료", quoted: "견적 발송", contracted: "계약 완료", closed: "종료" };

export function recruitmentStatus(post: Pick<BoardPost, "application_start" | "application_end">) {
  if (!post.application_start && !post.application_end) return null;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (post.application_start && today < post.application_start) return "모집 예정";
  if (post.application_end && today > post.application_end) return "마감";
  return "모집 중";
}
