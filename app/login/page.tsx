import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
export const metadata: Metadata = { title: "고객 전용 로그인", robots: { index: false, follow: false } };
export default function LoginPage() { return <section className="private-shell"><div className="private-card"><span className="eyebrow">계약 고객 전용</span><h1>프로젝트 진행 공간 로그인</h1><p>배정된 프로젝트의 자료, 제작물, 수정 요청과 결과보고 자료를 안전하게 확인합니다.</p><Suspense fallback={<p>로그인 화면을 불러오는 중입니다.</p>}><LoginForm /></Suspense></div></section>; }
