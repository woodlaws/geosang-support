import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleExperience } from "@/components/ArticleExperience";
import { JsonLd } from "@/components/JsonLd";
import { cases, SITE_NAME, SITE_URL } from "@/data/site";
import { findInsight, getRelatedInsights, publishedInsights } from "@/data/insights";
import { breadcrumbJson, faqJson } from "@/lib/seo";

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return publishedInsights.map(({slug})=>({slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;const item=findInsight(slug);if(!item)return{};const url=`${SITE_URL}/insights/${slug}`;
  return {title:`${item.title} | ${SITE_NAME}`,description:item.description,authors:[{name:item.author.name}],alternates:{canonical:url},openGraph:{type:"article",locale:"ko_KR",siteName:SITE_NAME,url,title:item.title,description:item.description,publishedTime:item.publishedAt,modifiedTime:item.updatedAt,authors:[item.author.name],images:item.ogImage?[{url:item.ogImage,alt:item.title}]:[]},twitter:{card:item.ogImage?"summary_large_image":"summary",title:item.title,description:item.description,images:item.ogImage?[item.ogImage]:[]},robots:{index:true,follow:true}};
}

export default async function InsightDetail({params}:Props){
  const {slug}=await params;const item=findInsight(slug);if(!item)notFound();const url=`${SITE_URL}/insights/${slug}`;
  const article={"@context":"https://schema.org","@type":"Article",headline:item.title,description:item.description,datePublished:item.publishedAt,dateModified:item.updatedAt,author:{"@type":"Person",name:item.author.name,jobTitle:item.author.role},publisher:{"@type":"Organization",name:SITE_NAME,url:SITE_URL},mainEntityOfPage:url,image:item.ogImage?new URL(item.ogImage,SITE_URL).toString():undefined,about:item.relatedPrograms,keywords:item.tags.join(", ")};
  const questions=item.content.slice(0,3).map(x=>({q:x.title,a:x.answer}));
  const related=getRelatedInsights(item);const relatedCases=item.relatedCases.map(x=>cases.find(c=>c.slug===x)).filter((x):x is (typeof cases)[number]=>Boolean(x)).slice(0,3);
  return <><JsonLd data={[article,breadcrumbJson([{name:"홈",path:"/"},{name:"자료실",path:"/insights"},{name:item.title,path:`/insights/${slug}`}]),faqJson(questions)]}/><ArticleExperience item={item} related={related} cases={relatedCases}/></>;
}
