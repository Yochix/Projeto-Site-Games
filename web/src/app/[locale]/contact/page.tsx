import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const s = t(locale);

  return (
    <section
      className="surface card"
      style={{ padding: 24, maxWidth: 680, margin: "0 auto" }}
    >
      <h1 style={{ letterSpacing: -1 }}>{s.contact.title}</h1>
      <p className="muted" style={{ marginTop: 10 }}>
        {s.contact.p1}
      </p>

      <div className="stack" style={{ marginTop: 18 }}>
        <label className="stack" style={{ gap: 8 }}>
          <span className="muted">{s.contact.form.name}</span>
          <input className="input" placeholder={s.contact.form.name} />
        </label>
        <label className="stack" style={{ gap: 8 }}>
          <span className="muted">{s.contact.form.email}</span>
          <input className="input" placeholder="email@exemplo.com" />
        </label>
        <label className="stack" style={{ gap: 8 }}>
          <span className="muted">{s.contact.form.message}</span>
          <textarea
            className="input"
            placeholder={s.contact.form.message}
            style={{ height: 140, paddingTop: 12 }}
          />
        </label>
        <button className="btn btnPrimary" type="button" disabled>
          {s.contact.form.send}
        </button>

        <p className="muted" style={{ fontSize: 13 }}>
          {s.contact.form.note}
        </p>
      </div>
    </section>
  );
}

