import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export default async function LoginPlaceholder({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const s = t(locale);

  return (
    <section
      className="surface card"
      style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}
    >
      <h1 style={{ letterSpacing: -1, marginBottom: 10 }}>{s.nav.login}</h1>
      <p className="muted" style={{ marginBottom: 18 }}>
        {s.placeholders.login}
      </p>

      <div className="stack">
        <button className="btn btnPrimary" type="button" disabled>
          Google
        </button>
        <button className="btn" type="button" disabled>
          Discord
        </button>
        <div className="surface card muted" style={{ padding: 14 }}>
          Email/senha (em breve)
        </div>
      </div>
    </section>
  );
}

