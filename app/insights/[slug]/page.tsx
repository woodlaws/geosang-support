import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleExperience } from "@/components/ArticleExperience";
import { JsonLd } from "@/components/JsonLd";
import { cases, SITE_NAME, SITE_URL } from "@/data/site";
import { findInsight, getRelatedInsights, publishedInsights } from "@/data/insights";
import { breadcrumbJson, faqJson } from "@/lib/seo";
import { getPost } from "@/lib/boards";
import { ResourceDownload } from "@/components/ResourceDownload";
import Link from "next/link";

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return publishedInsights.map(({slug})=>({slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;const dbPost=await getPost("resource",slug);if(dbPost)return{title:dbPost.title,description:dbPost.excerpt,alternates:{canonical:`/insights/${slug}`},openGraph:{type:"article",url:`${SITE_URL}/insights/${slug}`,title:dbPost.title,description:dbPost.excerpt}};const item=findInsight(slug);if(!item)return{};const url=`${SITE_URL}/insights/${slug}`;
  const image=item.ogImage??"/og-image.png";
  const brandedTitle=`${item.title} | ${SITE_NAME}`;
  return {title:item.title,description:item.description,authors:[{name:item.author.name}],alternates:{canonical:url},openGraph:{type:"article",locale:"ko_KR",siteName:SITE_NAME,url,title:brandedTitle,description:item.description,publishedTime:item.publishedAt,modifiedTime:item.updatedAt,authors:[item.author.name],images:[{url:image,width:1200,height:630,alt:item.ogImage?item.title:SITE_NAME}]},twitter:{card:"summary_large_image",title:brandedTitle,description:item.description,images:[image]},robots:{index:true,follow:true}};
}

export default async function InsightDetail({params}:Props){
  const {slug}=await params;const dbPost=await getPost("resource",slug);if(dbPost)return <article className="board-detail resource-detail"><header><div className="shell narrow"><span className="eyebrow">{dbPost.category}</span><h1>{dbPost.title}</h1><p>{dbPost.excerpt}</p><small>게시일 {dbPost.published_at?.slice(0,10)||dbPost.created_at.slice(0,10)}</small></div></header><div className="shell narrow board-body"><div className="safe-body">{dbPost.body}</div><ResourceDownload postId={dbPost.id} access={dbPost.download_access} attachments={dbPost.post_attachments||[]} purpose={dbPost.privacy_purpose} items={dbPost.privacy_items} retention={dbPost.privacy_retention}/><div className="board-cta"><h2>자료를 내 사업에 적용하는 방법이 궁금하신가요?</h2><Link className="button button-coral" href={`/contact?source=insights&reference=${encodeURIComponent(dbPost.slug)}`}>상담 신청 →</Link></div></div></article>;const item=findInsight(slug);if(!item)notFound();const url=`${SITE_URL}/insights/${slug}`;
  const article={"@context":"https://schema.org","@type":"Article",headline:item.title,description:item.description,datePublished:item.publishedAt,dateModified:item.updatedAt,author:{"@type":"Person",name:item.author.name,jobTitle:item.author.role},publisher:{"@type":"Organization",name:SITE_NAME,url:SITE_URL},mainEntityOfPage:url,image:new URL(item.ogImage??"/og-image.png",SITE_URL).toString(),about:item.relatedPrograms,keywords:item.tags.join(", ")};
  const questions=item.content.slice(0,3).map(x=>({q:x.title,a:x.answer}));
  const related=getRelatedInsights(item);const relatedCases=item.relatedCases.map(x=>cases.find(c=>c.slug===x)).filter((x):x is (typeof cases)[number]=>Boolean(x)).slice(0,3);
  return <><JsonLd data={[article,breadcrumbJson([{name:"홈",path:"/"},{name:"자료실",path:"/insights"},{name:item.title,path:`/insights/${slug}`}]),faqJson(questions)]}/><ArticleExperience item={item} related={related} cases={relatedCases}/></>;
}
