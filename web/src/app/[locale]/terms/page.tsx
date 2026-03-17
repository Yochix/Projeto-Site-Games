import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const s = t(locale);

  return (
    <section className="surface card stack" style={{ padding: 24 }}>
      <h1 style={{ letterSpacing: -1 }}>{s.legal.termsTitle}</h1>
      <p className="muted">{s.legal.comingSoon}</p>
    </section>
  );
}

