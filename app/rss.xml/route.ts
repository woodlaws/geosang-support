import { publishedInsights } from "@/data/insights";
import { blogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/data/site";

const esc=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[char]||char));
type FeedEntry={title:string;path:string;description:string;category:string;publishedAt:string};
export function GET(){
  const entries:FeedEntry[]=[
    ...publishedInsights.map(item=>({title:item.title,path:`/insights/${item.slug}`,description:item.description,category:item.category,publishedAt:item.publishedAt})),
    ...blogPosts.map(post=>({title:post.title,path:`/blog/${post.slug}`,description:post.description,category:post.category,publishedAt:post.date})),
  ].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
  const items=entries.map(entry=>`<item><title>${esc(entry.title)}</title><link>${SITE_URL}${entry.path}</link><guid isPermaLink="true">${SITE_URL}${entry.path}</guid><description>${esc(entry.description)}</description><category>${esc(entry.category)}</category><pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate></item>`).join("");
  const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE_NAME)} 자료실·블로그</title><link>${SITE_URL}/blog</link><description>정부지원사업 신청부터 선정 후 마케팅 실행까지 실무 자료와 블로그 글</description><language>ko-KR</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
