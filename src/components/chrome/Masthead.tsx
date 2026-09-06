"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Masthead() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/dashboard", label: "Peta & Dashboard" },
    { href: "/aqua-alert", label: "AquaAlert" },
    { href: "/hydro-amdal", label: "Hydro-AMDAL" },
    { href: "/about", label: "Tentang Kami" },
  ];

  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <Link href="/" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark">K</span>
          <span>
            KEAIRAN CITANDUY
            <small>Intelijen Hidrologi · WS Citanduy</small>
          </span>
        </Link>

        <nav className={`primary ${mobileOpen ? "open" : ""}`} aria-label="Navigasi utama">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            className="btn btn-primary mobile-menu-cta"
            onClick={() => setMobileOpen(false)}
            style={{ display: mobileOpen ? "inline-flex" : "none" }}
          >
            Buka Dashboard →
          </Link>
        </nav>

        <div className="header-cta">
          <Link href="/dashboard" className="btn btn-primary">
            Buka Dashboard →
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
