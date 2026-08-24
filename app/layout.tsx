import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileCTA } from "@/components/MobileCTA";
import { OFFICIAL_AFFILIATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | 선정 이후 마케팅 실행 전문`, template: `%s | ${SITE_NAME}` },
  description: "정부지원사업 선정 이후 홈페이지 제작, 콘텐츠, SNS 광고, 성과 측정과 결과보고까지 실행하는 거상마케팅센터 정부지원사업 전문본부입니다.",
  applicationName: SITE_NAME,
  keywords: ["정부지원사업 마케팅", "희망리턴패키지 마케팅", "정부지원금 마케팅 대행", "소상공인 마케팅 지원사업", "선정 후 마케팅 실행"],
  authors: [{ name: OFFICIAL_AFFILIATION }],
  creator: OFFICIAL_AFFILIATION,
  alternates: { canonical: SITE_URL, types: { "application/rss+xml": `${SITE_URL}/rss.xml` } },
  openGraph: { type: "website", locale: "ko_KR", url: SITE_URL, siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: OFFICIAL_AFFILIATION,
  url: SITE_URL,
  description: "정부지원사업 선정 이후 홈페이지, 콘텐츠, SNS 광고, 성과 측정과 결과보고를 지원하는 마케팅 실행 전문 조직",
  email: "contact@geosang.co.kr",
  logo: `${SITE_URL}/images/geosang-logo.png`,
  image: `${SITE_URL}/og-image.png`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><a className="skip-link" href="#main">본문 바로가기</a><JsonLd data={organization} /><Header /><main id="main">{children}</main><Footer /><MobileCTA /></body></html>;
}
