export const AFTER_SELECTION_CONTEXT_KEY = "geosang_after_selection_context";

export type AfterSelectionContext = {
  source: "header_cta" | "mobile_sticky" | "after_selection_page";
  sourcePage: string;
  ctaLocation: string;
  relatedProgram?: string;
  referenceCase?: string;
  referenceArticle?: string;
  resultType?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export function saveAfterSelectionContext(context: AfterSelectionContext) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AFTER_SELECTION_CONTEXT_KEY, JSON.stringify(context));
}

export function readAfterSelectionContext(): AfterSelectionContext | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(AFTER_SELECTION_CONTEXT_KEY) || "null") as AfterSelectionContext | null;
    if (!parsed || typeof parsed.sourcePage !== "string" || !parsed.sourcePage.startsWith("/")) return null;
    return parsed;
  } catch {
    return null;
  }
}
