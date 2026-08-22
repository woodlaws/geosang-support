export type DiagnosisEventName = "diagnosis_view" | "diagnosis_start" | "diagnosis_step_complete" | "diagnosis_abandon" | "diagnosis_complete" | "diagnosis_result_view" | "diagnosis_consult_click" | "diagnosis_form_start" | "diagnosis_form_submit" | "diagnosis_form_success" | "diagnosis_form_error";

type SafeEventParameters = { step?: number; business_status?: string; industry?: string; application_status?: string; result_type?: string; consultation_goal?: string; source_page?: string; current_stage?: string; selected_program?: string; selected_services?: string; package_type?: string; budget_range?: string; deadline_range?: string; cta_location?: string; priority?: string; form_type?: string };

declare global { interface Window { gtag?: (command: "event", name: string, parameters?: Record<string, unknown>) => void } }

export function trackDiagnosisEvent(name: DiagnosisEventName, parameters: SafeEventParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}

export type AfterSelectionEventName = "after_selection_view" | "urgent_stage_select" | "execution_service_select" | "package_select" | "case_view" | "quote_form_view" | "quote_form_start" | "quote_form_submit" | "quote_form_success" | "quote_form_error" | "after_selection_cta_click" | "contact_phone_click" | "contact_kakao_click" | "after_selection_header_cta_view" | "after_selection_header_cta_click" | "after_selection_quick_check_start" | "after_selection_stage_select" | "after_selection_service_select" | "after_selection_consult_form_start" | "after_selection_consult_form_submit" | "after_selection_consult_success" | "after_selection_consult_error" | "mobile_sticky_consult_click";
export function trackAfterSelectionEvent(name: AfterSelectionEventName, parameters: SafeEventParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}

export type CaseEventName = "cases_view"|"case_filter_select"|"case_search"|"case_card_click"|"case_detail_view"|"case_deliverable_click"|"case_related_service_click"|"case_consult_click"|"case_form_start"|"case_form_submit"|"case_form_success"|"case_form_error";
type CaseEventParameters = {case_id?:string;case_slug?:string;industry?:string;program?:string;project_status?:string;service?:string;filter_type?:string;cta_location?:string};
export function trackCaseEvent(name:CaseEventName,parameters:CaseEventParameters={}){if(typeof window==="undefined"||typeof window.gtag!=="function")return;window.gtag("event",name,parameters)}

export type InsightEventName = "insights_view"|"insight_search"|"insight_filter_select"|"insight_card_click"|"article_view"|"article_scroll_50"|"article_scroll_90"|"article_toc_click"|"related_article_click"|"official_source_click"|"content_cta_click"|"resource_download_click"|"resource_form_submit"|"newsletter_form_submit"|"article_share_click";
export type InsightEventParameters = {article_id?:string;article_slug?:string;category?:string;content_type?:string;business_stage?:string;cta_type?:string;cta_location?:string;source_name?:string;filter_type?:string;filter_value?:string;search_term?:string;result_count?:number};
export function trackInsightEvent(name:InsightEventName,parameters:InsightEventParameters={}){if(typeof window==="undefined"||typeof window.gtag!=="function")return;window.gtag("event",name,parameters)}

export type ContactEventName="contact_view"|"inquiry_type_select"|"contact_form_start"|"contact_step_complete"|"contact_form_abandon"|"contact_form_review"|"contact_form_submit"|"contact_form_success"|"contact_form_error"|"direct_phone_click"|"direct_email_click"|"direct_kakao_click"|"contact_related_page_click";
export type ContactEventParameters={inquiry_type?:string;business_status?:string;application_status?:string;selected_program?:string;selected_services?:string;budget_range?:string;timeline?:string;step?:number;source_page?:string;cta_location?:string};
export function trackContactEvent(name:ContactEventName,parameters:ContactEventParameters={}){if(typeof window==="undefined"||typeof window.gtag!=="function")return;window.gtag("event",name,parameters)}
