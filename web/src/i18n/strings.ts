import type { Locale } from "./locales";

const dict = {
  pt: {
    brand: "Linkey",
    nav: {
      home: "Início",
      library: "Biblioteca",
      about: "Sobre",
      contact: "Contato",
      login: "Entrar",
    },
    home: {
      title: "Sua biblioteca de jogos e apps Android, do jeito certo.",
      subtitle:
        "Organize, descubra e acompanhe seus favoritos. Login opcional para salvar preferências e histórico.",
      ctaPrimary: "Ir para a biblioteca",
      ctaSecondary: "Saiba mais",
      badges: {
        fast: "Rápido",
        safe: "Transparente",
        community: "Feito pra comunidade",
      },
    },
    placeholders: {
      library:
        "A UI da biblioteca vai entrar aqui (sem eu mexer nessa parte).",
      login:
        "Login vai entrar aqui (Google/Discord + email/senha) quando a gente configurar o Auth.",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      terms: "Termos",
      privacy: "Privacidade",
    },
    about: {
      title: "Sobre o Linkey",
      p1: "Projeto de portfólio feito por estudantes, focado em uma experiência rápida e bonita.",
      p2: "A ideia é organizar um catálogo com informações e links, com contas para salvar preferências.",
    },
    contact: {
      title: "Contato",
      p1: "Quer falar com a gente? Manda uma mensagem.",
      form: {
        name: "Nome",
        email: "Email",
        message: "Mensagem",
        send: "Enviar",
        note: "Este formulário é só visual por enquanto.",
      },
    },
    legal: {
      termsTitle: "Termos de uso",
      privacyTitle: "Política de privacidade",
      comingSoon: "Conteúdo em construção.",
    },
  },
  en: {
    brand: "Linkey",
    nav: {
      home: "Home",
      library: "Library",
      about: "About",
      contact: "Contact",
      login: "Sign in",
    },
    home: {
      title: "Your Android games & apps library, done right.",
      subtitle:
        "Organize, discover, and track favorites. Optional login to save preferences and history.",
      ctaPrimary: "Go to library",
      ctaSecondary: "Learn more",
      badges: {
        fast: "Fast",
        safe: "Clear",
        community: "Built for the community",
      },
    },
    placeholders: {
      library: "The library UI will be plugged in here (kept untouched).",
      login:
        "Auth will be added here (Google/Discord + email/password) once we set it up.",
    },
    footer: {
      rights: "All rights reserved.",
      terms: "Terms",
      privacy: "Privacy",
    },
    about: {
      title: "About Linkey",
      p1: "Portfolio project built by students, focused on a fast and polished experience.",
      p2: "The goal is to organize a catalog with info and links, plus accounts to save preferences.",
    },
    contact: {
      title: "Contact",
      p1: "Want to reach us? Send a message.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        note: "This form is visual-only for now.",
      },
    },
    legal: {
      termsTitle: "Terms of use",
      privacyTitle: "Privacy policy",
      comingSoon: "Content coming soon.",
    },
  },
} as const;

export function t<L extends Locale>(locale: L) {
  return dict[locale];
}

