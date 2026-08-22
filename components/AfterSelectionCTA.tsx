"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { saveAfterSelectionContext } from "@/lib/after-selection-cta";
import { trackAfterSelectionEvent } from "@/lib/analytics";

type Props = {
  location: string;
  className?: string;
  children?: ReactNode;
  onNavigate?: () => void;
  showKicker?: boolean;
};

export function AfterSelectionCTA({ location, className = "button button-coral", children, onNavigate, showKicker = false }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (location === "header") {
      trackAfterSelectionEvent("after_selection_header_cta_view", { source_page: pathname, cta_location: location });
    }
  }, [location, pathname]);

  function handleClick() {
    const source = location === "header" ? "header_cta" : location === "mobile_sticky" ? "mobile_sticky" : "after_selection_page";
    const query = new URLSearchParams(window.location.search);
    const safeCampaignValue = (key: string) => (query.get(key) || "").replace(/[^\p{L}\p{N}._ -]/gu, "").slice(0, 100);
    saveAfterSelectionContext({ source, sourcePage: pathname, ctaLocation: location, utmSource: safeCampaignValue("utm_source"), utmMedium: safeCampaignValue("utm_medium"), utmCampaign: safeCampaignValue("utm_campaign") });
    window.dispatchEvent(new CustomEvent("after-selection-context"));
    trackAfterSelectionEvent(
      location === "mobile_sticky" ? "mobile_sticky_consult_click" : "after_selection_header_cta_click",
      { source_page: pathname, cta_location: location },
    );
    onNavigate?.();
  }

  return (
    <Link className={`${className} after-selection-cta`} href="/after-selection#consult" onClick={handleClick} aria-label="선정 고객 전용 마케팅 실행 상담 시작하기">
      <span className="after-cta-icon" aria-hidden="true">✓</span>
      <span className="after-cta-copy">
        {showKicker && <small>선정 고객 전용</small>}
        <strong className="after-cta-desktop">{children || "선정 후 마케팅 상담"}</strong>
        <strong className="after-cta-mobile">선정 후 실행 상담</strong>
        <strong className="after-cta-narrow">실행 상담</strong>
      </span>
      <span className="after-cta-arrow" aria-hidden="true">→</span>
    </Link>
  );
}
