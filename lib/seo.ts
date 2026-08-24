import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/data/site";

export function makeMetadata(title: string, description: string, path = "/"): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const brandedTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: brandedTitle, description, url, siteName: SITE_NAME, locale: "ko_KR", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }] },
    twitter: { card: "summary_large_image", title: brandedTitle, description, images: ["/og-image.png"] },
  };
}

export function breadcrumbJson(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function faqJson(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
