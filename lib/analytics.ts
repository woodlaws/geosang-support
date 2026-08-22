export type DiagnosisEventName = "diagnosis_view" | "diagnosis_start" | "diagnosis_step_complete" | "diagnosis_abandon" | "diagnosis_complete" | "diagnosis_result_view" | "diagnosis_consult_click" | "diagnosis_form_start" | "diagnosis_form_submit" | "diagnosis_form_success" | "diagnosis_form_error";

type SafeEventParameters = { step?: number; business_status?: string; industry?: string; application_status?: string; result_type?: string; consultation_goal?: string; source_page?: string; current_stage?: string; selected_program?: string; selected_services?: string; package_type?: string; budget_range?: string; deadline_range?: string; cta_location?: string };

declare global { interface Window { gtag?: (command: "event", name: string, parameters?: SafeEventParameters) => void } }

export function trackDiagnosisEvent(name: DiagnosisEventName, parameters: SafeEventParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}

export type AfterSelectionEventName = "after_selection_view" | "urgent_stage_select" | "execution_service_select" | "package_select" | "case_view" | "quote_form_view" | "quote_form_start" | "quote_form_submit" | "quote_form_success" | "quote_form_error" | "after_selection_cta_click" | "contact_phone_click" | "contact_kakao_click";
export function trackAfterSelectionEvent(name: AfterSelectionEventName, parameters: SafeEventParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}
