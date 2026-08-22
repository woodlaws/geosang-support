"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AfterSelectionCTA } from "@/components/AfterSelectionCTA";

export function MobileCTA() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const formSection = pathname === "/after-selection" ? document.getElementById("consult") : pathname === "/contact" ? document.getElementById("contact-form") : null;
    const viewport = window.visualViewport;
    const updateForKeyboard = () => setHidden(Boolean(viewport && viewport.height < window.innerHeight * 0.72));
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.matches("input, select, textarea")) setHidden(true);
    };
    const handleBlur = () => window.setTimeout(updateForKeyboard, 120);
    const handleMenu = (event: Event) => setMenuOpen(Boolean((event as CustomEvent<{ open: boolean }>).detail?.open));
    const observer = formSection ? new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.08 }) : null;
    if (formSection && observer) observer.observe(formSection);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    window.addEventListener("mobile-menu-state", handleMenu);
    viewport?.addEventListener("resize", updateForKeyboard);
    updateForKeyboard();
    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
      window.removeEventListener("mobile-menu-state", handleMenu);
      viewport?.removeEventListener("resize", updateForKeyboard);
    };
  }, [pathname]);

  if (hidden || menuOpen || pathname === "/contact") return null;
  return <div className="mobile-consult-bar"><AfterSelectionCTA location="mobile_sticky" /></div>;
}
