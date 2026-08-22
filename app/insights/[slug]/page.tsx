import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { insights, OFFICIAL_NOTICE, SITE_URL } from "@/data/site";
import { breadcrumbJson, makeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return insights.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = insights.find((x) => x.slug === slug); if (!item) return {}; return makeMetadata(item.title, item.description, `/insights/${slug}`); }

export default async function InsightDetail({ params }: Props) { const { slug } = await params; const item = insights.find((x) => x.slug === slug); if (!item) notFound(); const url = `${SITE_URL}/insights/${slug}`; const article = { "@context":"https://schema.org", "@type":"Article", headline:item.title, description:item.description, datePublished:item.date.replace(/\./g,"-"), dateModified:item.date.replace(/\./g,"-"), author:{"@type":"Organization",name:"거상마케팅센터"}, publisher:{"@type":"Organization",name:"거상 정부지원 마케팅센터"}, mainEntityOfPage:url }; return <><JsonLd data={[article,breadcrumbJson([{name:"홈",path:"/"},{name:"자료실",path:"/insights"},{name:item.title,path:`/insights/${slug}`}])]} /><section className="detail-hero article-hero"><div className="shell narrow"><span className="eyebrow">{item.category}</span><h1>{item.title}</h1><p>{item.description}</p><div className="article-meta">{item.date} · 읽는 시간 {item.readTime}</div></div></section><Breadcrumb current={item.title} /><article className="section"><div className="shell reading-content">{item.content.map((paragraph,index)=><section key={paragraph}><h2>{index === 0 ? "먼저 확인할 점" : index === 1 ? "공식 기준을 우선하세요" : "선정 이후 실행까지 생각하세요"}</h2><p>{paragraph}</p></section>)}<blockquote>{OFFICIAL_NOTICE}</blockquote><p>지원사업 준비 또는 선정 후 실행 방향을 현재 상황에 맞게 확인하고 싶다면 전문가 상담을 요청할 수 있습니다.</p></div></article><CTA compact /></>; }
