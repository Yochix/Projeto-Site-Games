import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/components/layout";
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
      <SiteHeader locale={locale} s={s} />

      <main className="container" style={{ padding: "12px 0 56px" }}>
        {children}
      </main>

      <SiteFooter locale={locale} s={s} />
    </div>
  );
}

