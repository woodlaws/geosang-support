"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/data/site";
import type { Insight } from "@/data/insights";
import { trackInsightEvent } from "@/lib/analytics";

const ctas={
  diagnosis:{label:"내게 맞는 지원사업 진단하기",href:"/diagnosis"},hope:{label:"희망리턴패키지 상담 요청",href:"/contact?program=hope-return"},expert:{label:"지원사업 전문가 연결",href:"/contact"},execution:{label:"선정 후 마케팅 실행 상담",href:"/after-selection#consult"},quote:{label:"맞춤 실행 견적 요청",href:"/after-selection#consult"},report:{label:"산출물·결과보고 상담",href:"/after-selection#consult"},
};

function ContextCTA({item,location}:{item:Insight;location:"middle"|"bottom"|"mobile"}){const cta=ctas[item.ctaType];return <div className={`article-context-cta ${location}`}><div><small>다음 행동</small><h2>{cta.label}</h2><p>현재 상황과 공고·협약 기준을 확인한 뒤 필요한 준비와 실행 범위를 정리합니다.</p></div><Link className="button button-coral" href={cta.href} onClick={()=>trackInsightEvent("content_cta_click",{article_id:item.id,article_slug:item.slug,category:item.category,cta_type:item.ctaType,cta_location:location})}>{cta.label} →</Link></div>}

export function ArticleExperience({item,related,cases}:{item:Insight;related:Insight[];cases:CaseStudy[]}){
  const [progress,setProgress]=useState(0),[active,setActive]=useState(item.content[0]?.id||""),[fontSize,setFontSize]=useState(18),[copied,setCopied]=useState(false);
  const sent=useRef(new Set<number>());
  useEffect(()=>{
    trackInsightEvent("article_view",{article_id:item.id,article_slug:item.slug,category:item.category,content_type:item.contentType,business_stage:item.businessStage.join(",")});
    const onScroll=()=>{const root=document.documentElement;const max=root.scrollHeight-window.innerHeight;const value=max>0?Math.round(window.scrollY/max*100):0;setProgress(value);[50,90].forEach(point=>{if(value>=point&&!sent.current.has(point)){sent.current.add(point);trackInsightEvent(point===50?"article_scroll_50":"article_scroll_90",{article_id:item.id,article_slug:item.slug,category:item.category})}})};
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)})},{rootMargin:"-25% 0px -60%"});
    item.content.forEach(section=>{const el=document.getElementById(section.id);if(el)observer.observe(el)});window.addEventListener("scroll",onScroll,{passive:true});onScroll();return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll)};
  },[item]);
  async function copyLink(){try{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),1800);trackInsightEvent("article_share_click",{article_id:item.id,article_slug:item.slug,cta_type:"copy_link"})}catch{setCopied(false)}}
  function go(id:string){document.getElementById(id)?.scrollIntoView();trackInsightEvent("article_toc_click",{article_id:item.id,article_slug:item.slug,filter_value:id})}
  return <div className="article-page">
    <div className="article-progress" aria-hidden="true"><span style={{width:`${progress}%`}}/></div>
    <section className="article-head"><div className="shell narrow"><span className="article-category">{item.category}</span><h1>{item.title}</h1><p>{item.description}</p><div className="article-head-meta"><span>대상: {item.targetAudience.join(" · ")}</span><time dateTime={item.publishedAt}>작성 {item.publishedAt.replaceAll("-",".")}</time><time dateTime={item.updatedAt}>업데이트 {item.updatedAt.replaceAll("-",".")}</time><span>읽는 시간 {item.readTime}</span></div><div className="article-update"><b>{item.updateLabel}</b><span>지원사업의 조건과 일정은 공식 공고를 우선 확인하세요.</span></div></div></section>
    <nav className="breadcrumb" aria-label="현재 위치"><div className="shell"><Link href="/">홈</Link><span>›</span><Link href="/insights">자료실</Link><span>›</span><span aria-current="page">{item.title}</span></div></nav>
    <div className="shell article-layout"><aside className="article-side"><details className="article-toc"><summary>목차 <span>접기·펼치기</span></summary><nav aria-label="글 목차">{item.content.map((section,index)=><button className={active===section.id?"active":""} key={section.id} onClick={()=>go(section.id)}><span>{String(index+1).padStart(2,"0")}</span>{section.title}</button>)}</nav></details><div className="article-tools" aria-label="읽기 도구"><button onClick={()=>setFontSize(x=>Math.max(17,x-1))} aria-label="글자 크기 줄이기">가−</button><button onClick={()=>setFontSize(x=>Math.min(22,x+1))} aria-label="글자 크기 늘리기">가＋</button><button onClick={()=>window.print()}>인쇄</button><button onClick={copyLink}>{copied?"복사됨":"링크 복사"}</button></div></aside>
      <main className="article-main" style={{"--article-font":`${fontSize}px`} as React.CSSProperties}>
        <section className="article-takeaways" aria-labelledby="takeaway-title"><span>3줄 핵심 요약</span><h2 id="takeaway-title">이 글에서 알 수 있는 것</h2><ul>{item.takeaways.map(x=><li key={x}>{x}</li>)}</ul></section>
        {item.content.map((section,index)=><div key={section.id}><section className="article-section" id={section.id}><span className="section-number">{String(index+1).padStart(2,"0")}</span><h2>{section.title}</h2><div className="direct-answer"><b>직접 답변</b><p>{section.answer}</p></div>{section.paragraphs?.map(x=><p key={x}>{x}</p>)}{section.bullets&&<ul>{section.bullets.map(x=><li key={x}>{x}</li>)}</ul>}</section>{index===1&&<ContextCTA item={item} location="middle"/>}</div>)}
        <section className="article-checklist"><span>요약 체크리스트</span><h2>읽고 나서 이것만은 확인하세요</h2><ul>{item.checklist.map(x=><li key={x}>✓ <span>{x}</span></li>)}</ul></section>
        <section className="article-sources"><span>공식 출처</span><h2>원문과 최신 공고를 확인하세요</h2>{item.sources.length?<div>{item.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" onClick={()=>trackInsightEvent("official_source_click",{article_id:item.id,article_slug:item.slug,source_name:source.name})}><b>{source.name} ↗</b><span>{source.notice}</span>{source.noticeDate&&<small>공고 날짜 {source.noticeDate}</small>}{source.checkedAt&&<small>링크 확인 {source.checkedAt.replaceAll("-",".")}</small>}</a>)}</div>:<p>이 글은 특정 공고의 금액·일정을 인용하지 않는 실행 가이드입니다. 지원사업 적용 전에는 관련 주관기관의 공식 공고를 확인하세요.</p>}</section>
        {item.relatedPrograms.length>0&&<section className="article-programs"><span>관련 지원사업</span><h2>같이 확인할 지원사업</h2><div>{item.relatedPrograms.map(name=><Link key={name} href={name==="희망리턴패키지"?"/hope-return":"/programs"}>{name} →</Link>)}</div></section>}
        {related.length>0&&<section className="article-related"><span>관련 콘텐츠</span><h2>다음 단계의 글을 이어서 읽어보세요</h2><div>{related.map(article=><Link key={article.slug} href={`/insights/${article.slug}`} onClick={()=>trackInsightEvent("related_article_click",{article_id:article.id,article_slug:article.slug,category:article.category})}><small>{article.category}</small><b>{article.title}</b><p>{article.excerpt}</p><span>읽어보기 →</span></Link>)}</div></section>}
        {cases.length>0&&<section className="article-related"><span>관련 실행 사례</span><h2>비슷한 실행 맥락을 확인하세요</h2><div>{cases.map(study=><Link key={study.slug} href={`/cases/${study.slug}`}><small>{study.industry} · {study.program}</small><b>{study.title}</b><p>{study.problem}</p><span>사례 보기 →</span></Link>)}</div></section>}
        <section className="article-author"><Image src={item.author.image||"/images/lim-heonsu.png"} alt={`${item.author.name} 프로필`} width={88} height={88}/><div><span>작성자</span><h2>{item.author.name}</h2><b>{item.author.role}</b><p>{item.author.bio}</p><small>전문 분야: {item.author.specialties.join(" · ")}</small>{!item.reviewer&&<em>별도의 외부 전문가 검토 표시는 하지 않았습니다.</em>}</div></section>
        <aside className="article-disclaimer"><b>면책 안내</b><p>이 글은 공고와 실행 절차를 쉽게 이해하기 위한 참고 정보입니다. 최종 신청 대상, 제출 서류, 지원 규모, 일정과 집행 가능 여부는 해당 연도의 주관기관 공식 공고와 협약을 기준으로 확인해야 합니다. 거상마케팅센터는 정부기관이 아니며 지원사업 선정이나 지원금 수령, 특정 성과를 보장하지 않습니다.</p></aside>
        <ContextCTA item={item} location="bottom"/>
      </main>
    </div>
    <button className="article-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="맨 위로 이동">↑</button>
    <div className="article-mobile-cta"><Link href={ctas[item.ctaType].href} onClick={()=>trackInsightEvent("content_cta_click",{article_id:item.id,article_slug:item.slug,cta_type:item.ctaType,cta_location:"mobile"})}>{ctas[item.ctaType].label} →</Link></div>
  </div>
}
