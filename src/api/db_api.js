// SISTEMA DE BANCO DE DADOS (LOCALSTORAGE WRAPPER - PROMISE BASED)
// Centralizamos tudo aqui para facilitar a migração para Firebase/Supabase no futuro.

export const DB = {
  // Helper para simular delay de rede
  delay: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),

  // USUÁRIOS
  users: {
    getAll: async () => {
      await DB.delay();
      return JSON.parse(localStorage.getItem('linkey_users') || '[]');
    },
    saveAll: async (users) => {
      await DB.delay();
      localStorage.setItem('linkey_users', JSON.stringify(users));
      return true;
    },
    getLogged: () => JSON.parse(localStorage.getItem('linkey_user_data') || '{}'),
    setLogged: (user) => localStorage.setItem('linkey_user_data', JSON.stringify(user)),
    isLogged: () => localStorage.getItem('linkey_logged') === 'true'
  },
  // JOGOS
  games: {
    getAll: async () => {
      await DB.delay();
      return JSON.parse(localStorage.getItem('linkey_games') || '{}');
    },
    saveAll: async (games) => {
      await DB.delay();
      localStorage.setItem('linkey_games', JSON.stringify(games));
      window.dispatchEvent(new Event('gamesUpdated'));
      return true;
    },
    getFeatured: async () => {
      const games = await DB.games.getAll();
      return Object.keys(games)
        .filter(key => games[key].featured)
        .map(key => ({ key, ...games[key] }));
    }
  },
  // AVALIAÇÕES
  reviews: {
    getAll: async () => {
      await DB.delay();
      return JSON.parse(localStorage.getItem('linkey_reviews') || '[]');
    },
    save: async (review) => {
      await DB.delay();
      const reviews = await DB.reviews.getAll();
      reviews.unshift(review);
      localStorage.setItem('linkey_reviews', JSON.stringify(reviews));
      return true;
    },
    delete: async (id) => {
      await DB.delay();
      const reviews = (await DB.reviews.getAll()).filter(r => r.id !== id);
      localStorage.setItem('linkey_reviews', JSON.stringify(reviews));
      return true;
    }
  },
  // LOGS
  logs: {
    getAll: async () => {
      await DB.delay();
      return JSON.parse(localStorage.getItem('linkey_admin_logs') || '[]');
    },
    add: async (action, target) => {
      await DB.delay();
      const user = DB.users.getLogged();
      const logs = await DB.logs.getAll();
      const newLog = {
        id: Date.now(),
        adminName: user.name || 'Sistema',
        adminEmail: user.email || 'system',
        action, target,
        timestamp: new Date().toLocaleString('pt-BR')
      };
      logs.unshift(newLog);
      localStorage.setItem('linkey_admin_logs', JSON.stringify(logs.slice(0, 100)));
      return true;
    },
    clear: async () => {
      await DB.delay();
      localStorage.removeItem('linkey_admin_logs');
      return true;
    }
  }
};
