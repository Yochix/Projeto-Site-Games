import Link from "next/link";

import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

type Strings = ReturnType<typeof t>;

export function SiteHeader({ locale, s }: { locale: Locale; s: Strings }) {
  return (
    <header
      className="surface"
      style={{
        position: "sticky",
        top: 16,
        zIndex: 20,
        margin: "16px auto",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
        }}
      >
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            aria-hidden
            style={{
              width: 28,
              height: 28,
              borderRadius: 10,
              background:
                "linear-gradient(180deg, rgba(167,139,250,1), rgba(124,58,237,1))",
              boxShadow: "0 16px 40px rgba(124, 58, 237, 0.35)",
            }}
          />
          <strong style={{ letterSpacing: -0.4 }}>{s.brand}</strong>
        </Link>

        <nav aria-label="Primary" style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Link href={`/${locale}`} className="btn">
            {s.nav.home}
          </Link>
          <Link href={`/${locale}/library`} className="btn">
            {s.nav.library}
          </Link>
          <Link href={`/${locale}/about`} className="btn">
            {s.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} className="btn">
            {s.nav.contact}
          </Link>
          <Link href={`/${locale}/login`} className="btn btnPrimary">
            {s.nav.login}
          </Link>
        </nav>
      </div>
    </header>
  );
}

