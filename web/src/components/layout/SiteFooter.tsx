import Link from "next/link";

import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

type Strings = ReturnType<typeof t>;

export function SiteFooter({ locale, s }: { locale: Locale; s: Strings }) {
  return (
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
  );
}

