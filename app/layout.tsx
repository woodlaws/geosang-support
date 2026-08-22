import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileCTA } from "@/components/MobileCTA";
import { SITE_NAME, SITE_URL } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | 선정 후 마케팅 실행`, template: `%s | ${SITE_NAME}` },
  description: "정부지원사업 탐색과 준비부터 선정 이후 홈페이지, 콘텐츠, 광고, 고객 유입과 결과보고까지 함께하는 민간 마케팅센터입니다.",
  applicationName: SITE_NAME,
  keywords: ["정부지원사업 마케팅", "희망리턴패키지 마케팅", "정부지원금 마케팅 대행", "소상공인 마케팅 지원사업", "선정 후 마케팅 실행"],
  authors: [{ name: "거상마케팅센터" }],
  creator: "거상마케팅센터",
  alternates: { canonical: SITE_URL },
  openGraph: { type: "website", locale: "ko_KR", url: SITE_URL, siteName: SITE_NAME, title: "지원사업 선정 이후, 매출이 시작됩니다", description: "지원사업을 찾고 준비하는 과정부터 선정 이후 홈페이지·콘텐츠·광고·고객 유입까지 함께합니다.", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "한국인 소상공인 대표와 마케팅 전문가의 상담 장면" }] },
  twitter: { card: "summary_large_image", title: "지원사업 선정 이후, 매출이 시작됩니다", description: "정부지원사업 준비부터 선정 이후 마케팅 실행까지 함께합니다.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "거상마케팅센터",
  url: SITE_URL,
  description: "정부지원사업 준비와 선정 이후 마케팅 실행을 지원하는 민간 마케팅센터",
  email: "contact@geosang.co.kr",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><a className="skip-link" href="#main">본문 바로가기</a><JsonLd data={organization} /><Header /><main id="main">{children}</main><Footer /><MobileCTA /></body></html>;
}
