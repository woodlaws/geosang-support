export type DiagnosisEventName = "diagnosis_view" | "diagnosis_start" | "diagnosis_step_complete" | "diagnosis_abandon" | "diagnosis_complete" | "diagnosis_result_view" | "diagnosis_consult_click" | "diagnosis_form_start" | "diagnosis_form_submit" | "diagnosis_form_success" | "diagnosis_form_error";

type SafeEventParameters = { step?: number; business_status?: string; industry?: string; application_status?: string; result_type?: string; consultation_goal?: string; source_page?: string };

declare global { interface Window { gtag?: (command: "event", name: string, parameters?: SafeEventParameters) => void } }

export function trackDiagnosisEvent(name: DiagnosisEventName, parameters: SafeEventParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}
