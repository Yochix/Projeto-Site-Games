import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/i18n/locales";
import { isLocale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export const metadata: Metadata = {
  title: "Linkey",
  description: "Android games & apps catalog.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const s = t(locale);

  return (
    <div>
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
          <Link
            href={`/${locale}`}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
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

          <nav
            aria-label="Primary"
            style={{ display: "flex", gap: 14, alignItems: "center" }}
          >
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

      <main className="container" style={{ padding: "12px 0 56px" }}>
        {children}
      </main>

      <footer className="container muted" style={{ paddingBottom: 32 }}>
        <div
          className="surface card"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            © {new Date().getFullYear()} {s.brand}. {s.footer.rights}
          </span>
          <span style={{ display: "flex", gap: 12 }}>
            <Link href={`/${locale}/terms`} className="btn">
              {s.footer.terms}
            </Link>
            <Link href={`/${locale}/privacy`} className="btn">
              {s.footer.privacy}
            </Link>
            <Link
              href={locale === "pt" ? "/en" : "/pt"}
              className="btn"
              aria-label="Change language"
              title="Change language"
            >
              {locale === "pt" ? "EN" : "PT"}
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}

