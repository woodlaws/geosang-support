import type { MetadataRoute } from "next";
import { cases, SITE_URL } from "@/data/site";
import { publishedInsights } from "@/data/insights";
import { listPosts } from "@/lib/boards";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = ["", "/programs", "/news", "/hope-return", "/before-selection", "/after-selection", "/services", "/cases", "/experts", "/insights", "/diagnosis", "/contact", "/about", "/privacy"];
  const [news,resources]=await Promise.all([listPosts("news",{pageSize:24}),listPosts("resource",{pageSize:24})]);
  return [...paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/after-selection" ? 0.9 : 0.7 })), ...cases.map((item) => ({ url: `${SITE_URL}/cases/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })), ...publishedInsights.map((item) => ({ url: `${SITE_URL}/insights/${item.slug}`, lastModified: new Date(item.updatedAt), changeFrequency: "monthly" as const, priority: item.featured ? 0.8 : 0.7 })),...news.posts.map(item=>({url:`${SITE_URL}/news/${item.slug}`,lastModified:new Date(item.published_at||item.created_at),changeFrequency:"weekly" as const,priority:0.7})),...resources.posts.map(item=>({url:`${SITE_URL}/insights/${item.slug}`,lastModified:new Date(item.published_at||item.created_at),changeFrequency:"monthly" as const,priority:0.7}))];
}
