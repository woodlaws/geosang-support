import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { cases, SITE_URL } from "@/data/site";
import { breadcrumbJson, makeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return cases.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = cases.find((x) => x.slug === slug); if (!item) return {}; return makeMetadata(`${item.title} 사례`, `${item.industry} 업종의 ${item.program} 선정 후 ${item.execution.join(", ")} 실행 설계 샘플입니다.`, `/cases/${slug}`); }

export default async function CaseDetail({ params }: Props) { const { slug } = await params; const item = cases.find((x) => x.slug === slug); if (!item) notFound(); return <><JsonLd data={breadcrumbJson([{name:"홈",path:"/"},{name:"실행 사례",path:"/cases"},{name:item.title,path:`/cases/${slug}`}])} /><section className="detail-hero"><div className="shell narrow"><span className="eyebrow">{item.industry} · {item.status}</span><h1>{item.title}</h1><p>{item.note}</p><div className="tag-row">{item.execution.map((x)=><span key={x}>{x}</span>)}</div></div></section><Breadcrumb current={item.title} /><article className="section"><div className="shell article-layout"><aside><strong>사례 요약</strong><dl><div><dt>업종</dt><dd>{item.industry}</dd></div><div><dt>지원사업</dt><dd>{item.program}</dd></div><div><dt>진행 상태</dt><dd>{item.status}</dd></div></dl></aside><div className="article-content"><p className="sample-note">이 사례는 서비스 구조를 설명하기 위한 샘플 실행안이며, 실제 고객의 매출 수치나 선정 성과를 표현하지 않습니다.</p><h2>고객 상황</h2><p>{item.problem}</p><h2>실행 방향</h2><p>지원사업의 목적과 집행 가능 범위를 먼저 확인한 뒤, 고객이 사업을 발견하고 신뢰하며 문의하는 흐름을 기준으로 실행 우선순위를 정합니다.</p><div className="execution-steps">{item.execution.map((x,index)=><div key={x}><span>{String(index+1).padStart(2,"0")}</span><h3>{x}</h3><p>목표, 범위, 일정, 산출물과 증빙 기준을 합의한 후 단계별로 진행합니다.</p></div>)}</div><h2>결과물 관리</h2><p>제작 결과물과 운영 기록, 계약 범위에 포함된 증빙 자료를 실행 과정에서 함께 정리해 결과보고 누락을 줄입니다.</p><Link className="button button-coral" href="/contact">비슷한 상황 상담하기 →</Link></div></div></article><CTA compact /></>; }
