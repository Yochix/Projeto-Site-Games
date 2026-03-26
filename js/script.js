// Mock de dados dos jogos
const GAMES_DATA = {
  "Cyber Raid": {
    name: "Cyber Raid: Neo Frontier",
    cat: "acao",
    genre: "Ação · RPG",
    rating: "4.8",
    reviews: "12k",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&q=80",
    desc: "Um RPG de ação futurista ambientado em uma metrópole cyberpunk em expansão."
  },
  "Shadow Keep": {
    name: "Shadow Keep: Escape",
    cat: "terror",
    genre: "Terror · Survival",
    rating: "4.5",
    reviews: "8k",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=640&q=80",
    desc: "Sobreviva aos horrores que espreitam nas sombras de um castelo amaldiçoado."
  },
  "Warlords": {
    name: "Warlords: Rise of Empires",
    cat: "estrategia",
    genre: "Estratégia",
    rating: "4.7",
    reviews: "20k",
    img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=640&q=80",
    desc: "Construa seu império e lidere seus exércitos rumo à vitória."
  },
  "Orbit One": {
    name: "Orbit One",
    cat: "simulacao",
    genre: "Simulação · Sci-Fi",
    rating: "4.3",
    reviews: "5k",
    img: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=640&q=80",
    desc: "Explore a vastidão do espaço e gerencie sua própria estação orbital."
  },
  "Dragon Run": {
    name: "Dragon Run: Endless Quest",
    cat: "aventura",
    genre: "Aventura",
    rating: "4.9",
    reviews: "31k",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=640&q=80",
    desc: "Uma jornada épica através de terras místicas cheias de perigos e tesouros."
  },
  "Race Fever": {
    name: "Race Fever",
    cat: "corrida",
    genre: "Corrida",
    rating: "4.1",
    reviews: "3k",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    desc: "Sinta a adrenalina das corridas de rua em alta velocidade."
  },
  "Dungeon Quest": {
    name: "Dungeon Quest",
    cat: "rpg",
    genre: "RPG",
    rating: "4.6",
    reviews: "15k",
    img: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&q=70",
    desc: "Explore masmorras perigosas em busca de itens lendários."
  },
  "Space Wars": {
    name: "Space Wars",
    cat: "acao",
    genre: "Ação",
    rating: "4.4",
    reviews: "9k",
    img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=70",
    desc: "Batalhas espaciais épicas pelo controle da galáxia."
  },
  "Zombie City": {
    name: "Zombie City",
    cat: "terror",
    genre: "Terror",
    rating: "4.2",
    reviews: "7k",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&q=70",
    desc: "Sobreviva ao apocalipse zumbi em uma cidade devastada."
  },
  "Farm Heroes": {
    name: "Farm Heroes",
    cat: "casual",
    genre: "Casual",
    rating: "4.0",
    reviews: "10k",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=70",
    desc: "Cuide de sua fazenda e complete desafios divertidos."
  },
  "Moto Rush": {
    name: "Moto Rush",
    cat: "corrida",
    genre: "Corrida",
    rating: "4.5",
    reviews: "6k",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    desc: "Manobras radicais e velocidade sobre duas rodas."
  },
  "Kingdom Fall": {
    name: "Kingdom Fall",
    cat: "estrategia",
    genre: "Estratégia",
    rating: "4.6",
    reviews: "11k",
    img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&q=70",
    desc: "Defenda seu reino de invasores implacáveis."
  },
  "Final Strike": {
    name: "Final Strike",
    cat: "fps",
    genre: "Ação · FPS",
    rating: "4.7",
    reviews: "18k",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=70",
    desc: "O FPS tático definitivo para mobile."
  },
  "Goal Star": {
    name: "Goal Star",
    cat: "esportes",
    genre: "Esportes",
    rating: "4.5",
    reviews: "22k",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    desc: "O melhor simulador de futebol mobile."
  },
  "Street King": {
    name: "Street King",
    cat: "luta",
    genre: "Luta",
    rating: "4.4",
    reviews: "14k",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&q=70",
    desc: "Combates de rua brutais e técnicos."
  }
};

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initSearch();
  initCategories();
  loadUserData();
  updateHeaderAvatar();
  updateFavoritesUI();
});

// --- HEADER ---
function updateHeaderAvatar() {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data'));
  if (userData) {
    const headAv = document.querySelector('.header-avatar');
    if (headAv) {
      // Prioridade total para a foto
      if (userData.profilePic && userData.profilePic.trim() !== '') {
        headAv.innerHTML = `<img src="${userData.profilePic}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; display:block;">`;
        headAv.style.background = 'none';
      } else {
        // Iniciais inteligentes (pula preposições como 'da', 'de', 'do')
        const nameParts = userData.name.split(' ').filter(p => p.length > 2 || p === p.toUpperCase());
        const initials = (nameParts.length > 1 
          ? nameParts[0][0] + nameParts[nameParts.length - 1][0] 
          : nameParts[0].substring(0, 2)
        ).toUpperCase();
        
        headAv.innerHTML = initials; // Usa innerHTML para limpar imagem anterior
        if (userData.color) {
          headAv.style.background = userData.color;
        }
      }
    }
  }
}

// --- CARROSSEL ---
function initCarousel() {
  const track = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  if (!track || !dots.length) return;

  let currentIndex = 0;
  const slideCount = dots.length;

  const updateCarousel = (index) => {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  dots.forEach((dot, i) => {
    dot.onclick = () => updateCarousel(i);
  });

  // Auto-play (opcional)
  setInterval(() => {
    let next = (currentIndex + 1) % slideCount;
    updateCarousel(next);
  }, 5000);
}

// --- BUSCA E FILTROS ---
function initSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    filterGames(term);
  });
}

function initCategories() {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.onclick = () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterGames('', pill.dataset.cat);
    };
  });
}

function filterGames(term = '', cat = 'all') {
  const cards = document.querySelectorAll('.game-card');
  const empty = document.getElementById('empty');
  let count = 0;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const gameCat = card.dataset.cat;
    
    const matchesTerm = name.includes(term);
    const matchesCat = cat === 'all' || gameCat === cat;

    if (matchesTerm && matchesCat) {
      card.style.display = 'block';
      count++;
    } else {
      card.style.display = 'none';
    }
  });

  if (empty) {
    empty.style.display = count === 0 ? 'block' : 'none';
  }
}

// --- FAVORITOS ---
function toggleFav(btn, event) {
  event.stopPropagation();
  const card = btn.closest('.game-card') || btn.closest('.feat-card');
  const gameName = card.dataset.name || card.querySelector('.feat-card-name')?.textContent || card.querySelector('.game-card-name')?.textContent;
  
  let favorites = getFromUser('favorites');
  
  const index = favorites.indexOf(gameName);
  if (index > -1) {
    favorites.splice(index, 1);
    btn.textContent = '🤍';
    showToast(`${gameName} removido dos favoritos`);
  } else {
    favorites.push(gameName);
    btn.textContent = '❤️';
    showToast(`${gameName} adicionado aos favoritos!`);
  }
  
  saveToUser('favorites', favorites);
}

function updateFavoritesUI() {
  const favorites = getFromUser('favorites');
  const cards = document.querySelectorAll('.game-card, .feat-card');
  
  cards.forEach(card => {
    const gameName = card.dataset.name || card.querySelector('.feat-card-name')?.textContent || card.querySelector('.game-card-name')?.textContent;
    const favBtn = card.querySelector('.game-card-fav');
    if (favBtn) {
      favBtn.textContent = favorites.includes(gameName) ? '❤️' : '🤍';
    }
  });
}

// --- DOWNLOADS (MOCK) ---
function baixar(btn, event) {
  event.stopPropagation();
  if (btn.classList.contains('baixado')) return;

  const originalText = btn.innerHTML;
  btn.innerHTML = '...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = 'Abrir';
    btn.classList.add('baixado');
    btn.disabled = false;
    showToast("Download concluído!");
    
    // Salvar nos baixados
    const card = btn.closest('.game-card') || btn.closest('.feat-card');
    const gameName = card.dataset.name || card.querySelector('.feat-card-name')?.textContent || card.querySelector('.game-card-name')?.textContent;
    let downloaded = getFromUser('downloads');
    if (!downloaded.includes(gameName)) {
      downloaded.push(gameName);
      saveToUser('downloads', downloaded);
    }
  }, 2000);
}

// --- PÁGINA DE JOGO ---
function baixarJogo() {
  const btn = document.getElementById('dlBtn');
  if (!btn || btn.classList.contains('baixado')) return;

  const title = document.querySelector('.game-page-title')?.textContent;
  btn.innerHTML = 'Baixando...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.innerHTML = 'Abrir Jogo';
    btn.style.background = 'var(--bg3)';
    btn.style.opacity = '1';
    btn.classList.add('baixado');
    showToast(`${title} instalado com sucesso!`);
    
    // Salvar nos baixados
    let downloaded = getFromUser('downloads');
    if (!downloaded.includes(title)) {
      downloaded.push(title);
      saveToUser('downloads', downloaded);
    }
  }, 3000);
}

function toggleDesc() {
  const desc = document.getElementById('gameDesc');
  const btn = document.getElementById('readMore');
  if (!desc || !btn) return;

  if (desc.classList.contains('collapsed')) {
    desc.classList.remove('collapsed');
    btn.textContent = 'Ver menos ↑';
  } else {
    desc.classList.add('collapsed');
    btn.textContent = 'Ver mais ↓';
  }
}

// --- PERFIL E MODAL ---
function openEditModal() {
  const modal = document.getElementById('editModal');
  const userData = JSON.parse(localStorage.getItem('linkey_user_data') || '{}');
  
  if (modal) {
    modal.classList.add('active');
    document.getElementById('editName').value = userData.name || '';
    document.getElementById('editPic').value = userData.profilePic || '';
    
    // Configurar picker de cores
    const options = document.querySelectorAll('.color-opt');
    options.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.color === userData.color);
      opt.onclick = () => {
        options.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      };
    });
  }
}

function closeEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) modal.classList.remove('active');
}

function handleFileSelect(input) {
  const display = document.getElementById('fileNameDisplay');
  if (input.files && input.files[0]) {
    display.textContent = input.files[0].name;
    display.style.display = 'block';
    
    // Em um sistema real, faríamos upload. Aqui vamos usar FileReader para Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('editPic').value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function saveProfile() {
  const name = document.getElementById('editName').value;
  const pic = document.getElementById('editPic').value;
  const color = document.querySelector('.color-opt.active')?.dataset.color;
  
  let userData = JSON.parse(localStorage.getItem('linkey_user_data') || '{}');
  userData.name = name;
  userData.profilePic = pic;
  userData.color = color;
  
  localStorage.setItem('linkey_user_data', JSON.stringify(userData));
  
  // Atualizar também na lista de usuários (simulação)
  let users = JSON.parse(localStorage.getItem('linkey_users') || '[]');
  const userIdx = users.findIndex(u => u.email === userData.email);
  if (userIdx > -1) {
    users[userIdx] = { ...users[userIdx], ...userData };
    localStorage.setItem('linkey_users', JSON.stringify(users));
  }

  showToast("Perfil atualizado!");
  closeEditModal();
  setTimeout(() => window.location.reload(), 1000);
}

// --- TOAST ---
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = msg;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// --- AUTENTICAÇÃO E USUÁRIO ---
function logout() {
  localStorage.removeItem('linkey_logged');
  // Não removemos mais o linkey_user_data para manter a referência da última sessão se necessário
  // mas o estado de logado é o que manda.
  
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    window.location.href = 'login.html';
  } else {
    window.location.href = 'pages/login.html';
  }
}

function getFromUser(key) {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data') || '{}');
  const userKey = `linkey_${userData.email}_${key}`;
  return JSON.parse(localStorage.getItem(userKey) || '[]');
}

function saveToUser(key, data) {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data') || '{}');
  const userKey = `linkey_${userData.email}_${key}`;
  localStorage.setItem(userKey, JSON.stringify(data));
}

function loadUserData() {
  // Mock users if none exists
  let allUsers = JSON.parse(localStorage.getItem('linkey_users') || '[]');
  
  const defaultUsers = [
    {
      name: "João da Silva",
      email: "joao@exemplo.com",
      password: "123",
      role: "user",
      color: "linear-gradient(135deg, #5b8fff, #7b5cff)"
    },
    {
      name: "Hi55Five",
      email: "felipelissapera@gmail.com",
      password: "fefe1234",
      role: "admin",
      color: "linear-gradient(135deg, #cf5bff, #9e5cff)"
    }
  ];

  // Adiciona usuários padrão que não existem ainda
  let updated = false;
  defaultUsers.forEach(defUser => {
    if (!allUsers.some(u => u.email === defUser.email)) {
      allUsers.push(defUser);
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem('linkey_users', JSON.stringify(allUsers));
  }

  // Define um usuário logado inicial caso não haja nenhum (opcional, para testes)
  if (!localStorage.getItem('linkey_user_data')) {
    const firstUser = allUsers[0];
    localStorage.setItem('linkey_user_data', JSON.stringify({
      name: firstUser.name,
      email: firstUser.email,
      role: firstUser.role,
      color: firstUser.color
    }));
  }
}
