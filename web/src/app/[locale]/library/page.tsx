import type { Locale } from "@/i18n/locales";
import { t } from "@/i18n/strings";

export default async function LibraryPlaceholder({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const s = t(locale);

  return (
    <section className="surface card stack" style={{ padding: 24 }}>
      <h1 style={{ letterSpacing: -1 }}>📚 {s.nav.library}</h1>
      <p className="muted">{s.placeholders.library}</p>
      <div className="surface card" style={{ padding: 16 }}>
        <div className="muted">
          Dica: quando vocês colarem a UI aqui, mantenham essa rota e criem os
          componentes dentro de `src/components/` ou `src/app/[locale]/library/_components`.
        </div>
      </div>
    </section>
  );
}

