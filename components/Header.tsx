"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";
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
        <Link className="brand" href="/" aria-label="거상 정부지원 마케팅센터 홈" onClick={() => updateMenu(false)}>
          <span className="brand-mark">거상</span>
          <span className="brand-name">정부지원 마케팅센터</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => updateMenu(!open)}>
          <span className="sr-only">메뉴 열기</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="main-nav" className={open ? "main-nav open" : "main-nav"} aria-label="주요 메뉴">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => updateMenu(false)}>{label}</Link>
          ))}
          <AfterSelectionCTA className="button button-coral nav-cta" location="header" showKicker onNavigate={() => updateMenu(false)} />
        </nav>
      </div>
    </header>
  );
}
