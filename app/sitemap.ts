import type { MetadataRoute } from "next";
import { cases, SITE_URL } from "@/data/site";
import { publishedInsights } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/programs", "/hope-return", "/before-selection", "/after-selection", "/services", "/cases", "/experts", "/insights", "/diagnosis", "/contact", "/about", "/privacy"];
  return [...paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/after-selection" ? 0.9 : 0.7 })), ...cases.map((item) => ({ url: `${SITE_URL}/cases/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })), ...publishedInsights.map((item) => ({ url: `${SITE_URL}/insights/${item.slug}`, lastModified: new Date(item.updatedAt), changeFrequency: "monthly" as const, priority: item.featured ? 0.8 : 0.7 }))];
}
