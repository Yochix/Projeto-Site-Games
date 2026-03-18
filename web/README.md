# Linkey (web)

Frontend do Linkey em **Next.js (App Router)**, com rotas por idioma (`/pt`, `/en`).

## Rodando local

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Estrutura (boilerplate)

- **`src/app/`**: rotas do Next
  - **`src/app/page.tsx`**: redireciona pra `/pt`
  - **`src/app/[locale]/`**: páginas localizadas (home, about, contact, etc.)
- **`src/components/`**: componentes reutilizáveis (UI)
  - **`src/components/layout/`**: layout do site (`SiteHeader`, `SiteFooter`)
- **`src/i18n/`**: i18n simples (sem lib externa)
  - **`locales.ts`**: lista/validação de locais
  - **`strings.ts`**: dicionário e `t(locale)`
- **`src/lib/`**: helpers sem UI (validação, formatadores, acesso a dados, etc.)

## Convenções

- **Componentes reutilizáveis** vão em `src/components/`.
- **Componentes específicos de uma rota** podem ficar em `src/app/<rota>/_components`.
- **Sem lógica de UI**: preferir `src/lib/`.

