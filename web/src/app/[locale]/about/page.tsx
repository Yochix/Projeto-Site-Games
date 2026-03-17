import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const s = t(locale);

  return (
    <section className="surface card stack" style={{ padding: 24 }}>
      <h1 style={{ letterSpacing: -1 }}>{s.about.title}</h1>
      <p className="muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
        {s.about.p1}
      </p>
      <p className="muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
        {s.about.p2}
      </p>
    </section>
  );
}

