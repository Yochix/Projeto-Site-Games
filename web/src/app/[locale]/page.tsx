import Link from "next/link";

import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const s = t(locale);

  return (
    <section className="stack">
      <div className="surface card" style={{ padding: 28 }}>
        <div className="stack" style={{ gap: 10 }}>
          <h1 style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: -1.6 }}>
            {s.home.title}
          </h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.6 }}>
            {s.home.subtitle}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
          <Link href={`/${locale}/library`} className="btn btnPrimary">
            {s.home.ctaPrimary}
          </Link>
          <Link href={`/${locale}/about`} className="btn">
            {s.home.ctaSecondary}
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginTop: 22,
          }}
        >
          <div className="surface card" style={{ padding: 16 }}>
            <strong>{s.home.badges.fast}</strong>
            <div className="muted" style={{ marginTop: 6 }}>
              Next.js + Server Components, pronto pra crescer.
            </div>
          </div>
          <div className="surface card" style={{ padding: 16 }}>
            <strong>{s.home.badges.safe}</strong>
            <div className="muted" style={{ marginTop: 6 }}>
              Organização clara e páginas institucionais desde o começo.
            </div>
          </div>
          <div className="surface card" style={{ padding: 16 }}>
            <strong>{s.home.badges.community}</strong>
            <div className="muted" style={{ marginTop: 6 }}>
              Feito por estudantes, com foco em UX.
            </div>
          </div>
        </div>
      </div>

      <div
        className="surface card"
        style={{
          padding: 22,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
        }}
      >
        <div className="stack">
          <h2 style={{ letterSpacing: -0.8 }}>O que vem depois</h2>
          <p className="muted">
            Biblioteca (UI do seu amigo), login (Google/Discord + email/senha) e
            banco (Vercel Postgres + Prisma).
          </p>
        </div>
        <div className="stack">
          <h2 style={{ letterSpacing: -0.8 }}>Admin e catálogo</h2>
          <p className="muted">
            Painel simples pra cadastrar jogos, imagens e links — depois dá pra
            evoluir pra aprovação e moderação.
          </p>
        </div>
      </div>
    </section>
  );
}

