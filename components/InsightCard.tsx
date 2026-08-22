"use client";

import Link from "next/link";
import type { Insight } from "@/data/insights";
import { trackInsightEvent } from "@/lib/analytics";

function Highlight({text,query}:{text:string;query?:string}){
  if(!query?.trim()) return <>{text}</>;
  const index=text.toLocaleLowerCase("ko").indexOf(query.trim().toLocaleLowerCase("ko"));
  if(index<0) return <>{text}</>;
  return <>{text.slice(0,index)}<mark>{text.slice(index,index+query.trim().length)}</mark>{text.slice(index+query.trim().length)}</>;
}

export function InsightCard({item,query,featured=false}:{item:Insight;query?:string;featured?:boolean}){
  return <article className={`library-card${featured?" library-card-featured":""}`}>
    <Link href={`/insights/${item.slug}`} aria-label={`${item.title} 읽어보기`} onClick={()=>trackInsightEvent("insight_card_click",{article_id:item.id,article_slug:item.slug,category:item.category,content_type:item.contentType,business_stage:item.businessStage.join(",")})}>
      <div className={`library-thumb category-${item.category.replace(/[·\s]/g,"-")}`} aria-hidden="true">
        <span>{item.category}</span><b>{item.contentType}</b><i>{item.tags[0]}</i>
      </div>
      <div className="library-card-body">
        <div className="library-card-kicker"><span>{item.category}</span><time dateTime={item.updatedAt}>{item.updatedAt.replaceAll("-",".")}</time></div>
        <h3><Highlight text={item.title} query={query}/></h3>
        <p><Highlight text={item.excerpt} query={query}/></p>
        <div className="library-audience"><b>대상</b> {item.targetAudience.join(" · ")}</div>
        <div className="library-tags">{item.tags.slice(0,3).map(tag=><span key={tag}>#{tag}</span>)}</div>
        <div className="library-card-foot"><small>읽는 시간 {item.readTime}</small><strong>읽어보기 <span aria-hidden="true">→</span></strong></div>
      </div>
    </Link>
  </article>;
}
