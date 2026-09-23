import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

const publicCrawlerRule = (userAgent: string) => ({
  userAgent,
  allow: "/",
  disallow: ["/api/"],
});

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      publicCrawlerRule("*"),
      publicCrawlerRule("GPTBot"),
      publicCrawlerRule("OAI-SearchBot"),
      publicCrawlerRule("ClaudeBot"),
      publicCrawlerRule("Claude-SearchBot"),
      publicCrawlerRule("PerplexityBot"),
      publicCrawlerRule("Google-Extended"),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
