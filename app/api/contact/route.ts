import { NextResponse } from "next/server";
import { enforceRateLimit, isSupabaseServerConfigured, safeText, supabaseRequest } from "@/lib/supabase";

const allowedServices = new Set(["브랜드 전략","홈페이지 제작","다페이지 홈페이지","네이버 블로그","스마트플레이스","SNS 콘텐츠","인스타그램","카드뉴스","숏폼 제작","숏폼","광고 운영","광고","AEO·GEO","실행 결과보고","산출물·결과보고","기타"]);
const phonePattern = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

export async function POST(request: Request) {
  if (!isSupabaseServerConfigured) return NextResponse.json({ message: "온라인 접수 저장소가 아직 연결되지 않았습니다." }, { status: 503 });
  if (!(await enforceRateLimit(request, "contact", 4))) return NextResponse.json({ message: "짧은 시간에 접수가 반복되었습니다. 10분 후 다시 시도해주세요." }, { status: 429 });
  const raw = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!raw || safeText(raw.website, 20)) return NextResponse.json({ message: "입력 내용을 확인해주세요." }, { status: 400 });
  const name = safeText(raw.name, 50), phone = safeText(raw.phone, 30), email = safeText(raw.email, 120), company = safeText(raw.company, 100);
  const industry = safeText(raw.customIndustry || raw.industry, 100);
  const programName = safeText(raw.selectedProgram, 180) || "아직 모름";
  const message = safeText(raw.message, 3000);
  const services = Array.isArray(raw.selectedNeeds) ? raw.selectedNeeds.map(x => safeText(x, 60)).filter(x => allowedServices.has(x)).slice(0, 12) : [];
  const statusText = safeText(raw.applicationStatus, 80);
  const progressStatus = /선정|결과보고/.test(statusText) ? "선정 완료" : /신청 완료|심사/.test(statusText) ? "신청 완료" : "신청 준비 중";
  if (name.length < 2 || !phonePattern.test(phone.replace(/\s/g, "")) || !industry || !services.length || message.length < 5 || raw.privacyConsent !== true) {
    return NextResponse.json({ message: "필수 항목과 개인정보 동의를 확인해주세요." }, { status: 400 });
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ message: "이메일 형식을 확인해주세요." }, { status: 400 });
  const sourcePayload = { inquiryType: safeText(raw.inquiryType, 60), source: safeText(raw.source, 80), sourcePage: safeText(raw.sourcePage, 160), region: safeText(raw.region, 80), organization: safeText(raw.organization, 120), projectGoals: Array.isArray(raw.projectGoals) ? raw.projectGoals.slice(0, 5) : [], referenceLinks: Array.isArray(raw.referenceLinks) ? raw.referenceLinks.slice(0, 5) : [] };
  try {
    const rows = await supabaseRequest<Array<{ receipt_number: string }>>("/rest/v1/consultation_requests?select=receipt_number", { service: true, method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ name, phone, email: email || null, company: company || null, industry, program_name: programName, progress_status: progressStatus, services, message, desired_period: safeText(raw.desiredTimeline || raw.executionDeadline, 100) || null, estimated_budget: safeText(raw.budgetRange, 100) || null, privacy_consent: true, marketing_consent: raw.marketingConsent === true, source_payload: sourcePayload }) });
    return NextResponse.json({ ok: true, receiptNumber: rows[0].receipt_number }, { status: 201 });
  } catch { return NextResponse.json({ message: "접수 내용을 저장하지 못했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 }); }
}
