"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, SITE_NAME } from "@/data/site";
import { AfterSelectionCTA } from "@/components/AfterSelectionCTA";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const updateMenu = (next: boolean) => {
    setOpen(next);
    window.dispatchEvent(new CustomEvent("mobile-menu-state", { detail: { open: next } }));
  };

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href="/" aria-label={`${SITE_NAME} 홈으로 이동`} onClick={() => updateMenu(false)}>
          <Image className="brand-logo" src="/images/geosang-logo.png" width={46} height={48} alt={`${SITE_NAME} 로고`} priority sizes="46px" />
          <span className="brand-copy"><strong className="brand-primary">거상</strong><span className="brand-secondary">정부지원사업 마케팅센터</span></span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => updateMenu(!open)}>
          <span className="sr-only">메뉴 열기</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="main-nav" className={open ? "main-nav open" : "main-nav"} aria-label="주요 메뉴">
          <span className="mobile-brand-full">{SITE_NAME}</span>
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => updateMenu(false)}>{label}</Link>
          ))}
          <AfterSelectionCTA className="button button-coral nav-cta" location="header" showKicker onNavigate={() => updateMenu(false)} />
        </nav>
      </div>
    </header>
  );
}
