import { publishedInsights } from "@/data/insights";
import { SITE_NAME, SITE_URL } from "@/data/site";

const esc=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[char]||char));
export function GET(){
  const items=publishedInsights.map(item=>`<item><title>${esc(item.title)}</title><link>${SITE_URL}/insights/${item.slug}</link><guid isPermaLink="true">${SITE_URL}/insights/${item.slug}</guid><description>${esc(item.description)}</description><category>${esc(item.category)}</category><pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate></item>`).join("");
  const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE_NAME)} 자료실</title><link>${SITE_URL}/insights</link><description>정부지원사업 신청부터 선정 후 마케팅 실행까지 실무 자료</description><language>ko-KR</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
