"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href="/" aria-label="거상 정부지원 마케팅센터 홈" onClick={() => setOpen(false)}>
          <span className="brand-mark">거상</span>
          <span className="brand-name">정부지원 마케팅센터</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">메뉴 열기</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="main-nav" className={open ? "main-nav open" : "main-nav"} aria-label="주요 메뉴">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="button button-coral nav-cta" href="/after-selection#consult" onClick={() => setOpen(false)}>선정 후 마케팅 상담</Link>
        </nav>
      </div>
    </header>
  );
}
