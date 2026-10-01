import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthContext, supabaseRequest } from "@/lib/supabase";
import { projectStageLabels } from "@/data/board";
export const metadata:Metadata={title:"고객 전용 프로젝트",robots:{index:false,follow:false}};
type Project={id:string;name:string;service_scope:string;stage:string;schedule_start:string|null;schedule_end:string|null;updated_at:string};
export default async function PortalPage(){const auth=await getAuthContext();if(!auth)redirect("/login?next=/portal");const projects=await supabaseRequest<Project[]>(`/rest/v1/projects?select=id,name,service_scope,stage,schedule_start,schedule_end,updated_at&order=updated_at.desc`,{token:auth.accessToken}).catch(()=>[]);return <section className="private-shell wide"><div className="private-head"><div><span className="eyebrow">고객 전용</span><h1>{auth.displayName||"고객"}님의 프로젝트</h1><p>배정된 프로젝트만 표시됩니다.</p></div><form action="/api/auth/logout" method="post"><button className="button button-ghost">로그아웃</button></form></div>{projects.length?<div className="project-grid">{projects.map(x=><article key={x.id}><span>{projectStageLabels[x.stage]||x.stage}</span><h2>{x.name}</h2><p>{x.service_scope||"서비스 범위 확인 중"}</p><small>{x.schedule_start||"일정 협의"} ~ {x.schedule_end||"일정 협의"}</small><Link className="text-link" href={`/portal/${x.id}`}>프로젝트 열기 →</Link></article>)}</div>:<div className="board-empty"><h2>배정된 프로젝트가 없습니다.</h2><p>계약 후 관리자가 고객 계정과 프로젝트를 연결하면 이곳에 표시됩니다.</p></div>}</section>}
