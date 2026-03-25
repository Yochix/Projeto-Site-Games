// ── INICIALIZAÇÃO DE DADOS (ADM) ──
function initDatabase() {
  let users = JSON.parse(localStorage.getItem('linkey_users') || '[]');
  
  const admEmail = 'wellingtonfelmacbat@gmail.com';
  const admData = {
    name: 'Yoch1x',
    email: admEmail,
    password: '1901.!Aw',
    role: 'admin'
  };

  const admIdx = users.findIndex(u => u.email === admEmail);
  
  if (admIdx === -1) {
    users.push(admData);
    localStorage.setItem('linkey_users', JSON.stringify(users));
  } else {
    // Garante que a senha e os dados estão atualizados
    users[admIdx] = { ...users[admIdx], ...admData };
    localStorage.setItem('linkey_users', JSON.stringify(users));
  }
}
initDatabase();

// ── CAROUSEL DOTS ──
const track = document.getElementById('carousel');
const dots  = document.querySelectorAll('.dot');
const featCards = track ? track.querySelectorAll('.feat-card') : [];

if (track) {
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / (track.offsetWidth - 32));
    const clamped = Math.max(0, Math.min(idx, dots.length - 1));
    dots.forEach((d, i) => d.classList.toggle('active', i === clamped));
  }, { passive: true });

  // auto-play
  let autoIdx = 0;
  setInterval(() => {
    if (!featCards.length) return;
    autoIdx = (autoIdx + 1) % featCards.length;
    const cardW = featCards[0].offsetWidth + 12;
    track.scrollTo({ left: autoIdx * cardW, behavior: 'smooth' });
  }, 4000);
}

// ── BUSCA ──
const searchInput = document.getElementById('search');
const allCards    = document.querySelectorAll('.game-card');
const empty       = document.getElementById('empty');
const gridTitle   = document.getElementById('grid-title');
const featSection = document.getElementById('featured-section');
const catPills    = document.querySelectorAll('.cat-pill');

let currentFilter = 'all';

function filterGames() {
  const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let found = 0;

  allCards.forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    const cat  = (card.dataset.cat  || '').toLowerCase();
    
    const matchesSearch = !q || name.includes(q) || cat.includes(q);
    const matchesCat    = currentFilter === 'all' || cat === currentFilter;
    
    const show = matchesSearch && matchesCat;
    card.style.display = show ? '' : 'none';
    if (show) found++;
  });

  if (empty)       empty.style.display = found === 0 ? 'block' : 'none';
  if (featSection) featSection.style.display = (q || currentFilter !== 'all') ? 'none' : '';
  
  if (gridTitle) {
    if (q) {
      gridTitle.textContent = `🔍 "${searchInput.value}" — ${found} resultado${found !== 1 ? 's' : ''}`;
    } else if (currentFilter !== 'all') {
      const activePill = document.querySelector('.cat-pill.active');
      const catName = activePill ? activePill.textContent.split(' ')[1] : '';
      gridTitle.textContent = `🎮 Jogos de ${catName} — ${found} resultado${found !== 1 ? 's' : ''}`;
    } else {
      gridTitle.textContent = '🎮 Todos os jogos';
    }
  }
}

if (searchInput) {
  searchInput.addEventListener('input', filterGames);
}

if (catPills.length > 0) {
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.cat;
      filterGames();
    });
  });
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ── DOWNLOAD ──
function baixar(btn, e) {
  if (e) e.stopPropagation();
  const jaBaixado = btn.classList.contains('baixado');
  if (jaBaixado) {
    showToast('✅ Jogo já baixado!');
    return;
  }
  
  // Pegar nome do jogo do card
  const card = btn.closest('.game-card') || btn.closest('.feat-card');
  const gameName = card ? (card.dataset.name || card.querySelector('.feat-card-name')?.textContent) : 'Jogo';

  btn.classList.add('baixado');
  btn.textContent = '✓ Baixado';
  showToast(`⬇ Download de "${gameName}" iniciado!`);
  
  saveToUser('downloads', gameName);
}

// ── FAVORITOS ──
function toggleFav(btn, e) {
  if (e) e.stopPropagation();
  const isFav = btn.textContent.trim() === '❤️';
  
  // Pegar nome do jogo
  const card = btn.closest('.game-card') || btn.closest('.feat-card') || document.querySelector('.game-info');
  let gameName = 'Jogo';
  if (card) {
    gameName = card.dataset.name || 
               card.querySelector('.feat-card-name')?.textContent || 
               card.querySelector('.game-page-title')?.textContent || 
               'Jogo';
  }

  btn.textContent = isFav ? '🤍' : '❤️';
  showToast(isFav ? `💔 "${gameName}" removido dos favoritos` : `❤️ "${gameName}" adicionado aos favoritos`);
  
  if (isFav) {
    removeFromUser('favorites', gameName);
  } else {
    saveToUser('favorites', gameName);
  }
}

// ── PÁGINA DE JOGO (DETALHES) ──
function baixarJogo() {
  const btn = document.getElementById('dlBtn');
  if (!btn) return;
  if (btn.classList.contains('baixado')) {
    showToast('✅ Jogo já baixado!');
    return;
  }
  
  const gameName = document.querySelector('.game-page-title')?.textContent || 'Jogo';

  btn.classList.add('baixado');
  btn.textContent = '✓ Instalado';
  showToast(`⬇ Download de "${gameName}" iniciado!`);
  
  saveToUser('downloads', gameName);
}

// ── PERSISTÊNCIA NO LOCALSTORAGE ──
function saveToUser(key, value) {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data'));
  if (!userData) return;

  let users = JSON.parse(localStorage.getItem('linkey_users') || '[]');
  const userIdx = users.findIndex(u => u.email === userData.email);
  
  if (userIdx !== -1) {
    if (!users[userIdx][key]) users[userIdx][key] = [];
    if (!users[userIdx][key].includes(value)) {
      users[userIdx][key].push(value);
      localStorage.setItem('linkey_users', JSON.stringify(users));
    }
  }
}

function removeFromUser(key, value) {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data'));
  if (!userData) return;

  let users = JSON.parse(localStorage.getItem('linkey_users') || '[]');
  const userIdx = users.findIndex(u => u.email === userData.email);
  
  if (userIdx !== -1 && users[userIdx][key]) {
    users[userIdx][key] = users[userIdx][key].filter(item => item !== value);
    localStorage.setItem('linkey_users', JSON.stringify(users));
  }
}

function getFromUser(key) {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data'));
  if (!userData) return [];

  const users = JSON.parse(localStorage.getItem('linkey_users') || '[]');
  const user = users.find(u => u.email === userData.email);
  return user ? (user[key] || []) : [];
}

function toggleDesc() {
  const desc = document.getElementById('gameDesc');
  const btn  = document.getElementById('readMore');
  if (!desc || !btn) return;
  const col  = desc.classList.toggle('collapsed');
  btn.textContent = col ? 'Ver mais ↓' : 'Ver menos ↑';
}

// ── LOGOUT ──
function logout() {
  localStorage.removeItem('linkey_logged');
  window.location.href = 'login.html';
}

// ── BANCO DE DADOS DE JOGOS (MOCK) ──
const GAMES_DATA = {
  "Cyber Raid": { cat: "Ação · RPG", img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200&q=70" },
  "Shadow Keep": { cat: "Terror · Survival", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&q=70" },
  "Warlords": { cat: "Estratégia", img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=200&q=70" },
  "Orbit One": { cat: "Simulação", img: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=200&q=70" },
  "Dragon Run": { cat: "Aventura", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=70" },
  "Race Fever": { cat: "Corrida", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=70" },
  "Dungeon Quest": { cat: "RPG", img: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=200&q=70" },
  "Space Wars": { cat: "Ação", img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=200&q=70" },
  "Zombie City": { cat: "Terror", img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200&q=70" },
  "Farm Heroes": { cat: "Casual", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&q=70" },
  "Moto Rush": { cat: "Corrida", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=70" },
  "Kingdom Fall": { cat: "Estratégia", img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=200&q=70" }
};

// ── ATUALIZAR INTERFACE COM DADOS DO USUÁRIO ──
function updateUserInfo() {
  const userData = JSON.parse(localStorage.getItem('linkey_user_data'));
  if (userData) {
    const headAv = document.querySelector('.header-avatar');
    if (headAv) {
      const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      headAv.textContent = initials;
      
      // Se for ADM, adiciona um brilho ou borda no avatar do topo
      if (userData.role === 'admin') {
        headAv.style.boxShadow = '0 0 10px var(--accent)';
        headAv.style.border = '2px solid #fff';
      }
    }

    // Atualizar estados dos botões (favoritos e downloads)
    const userFavorites = getFromUser('favorites');
    const userDownloads = getFromUser('downloads');

    // Atualizar corações
    document.querySelectorAll('.game-card-fav').forEach(btn => {
      const card = btn.closest('.game-card');
      const gameName = card?.dataset.name;
      if (gameName && userFavorites.includes(gameName)) {
        btn.textContent = '❤️';
      }
    });

    // Atualizar botões de download
    document.querySelectorAll('.btn-dl, .btn-dl-feat, .btn-dl-page').forEach(btn => {
      const card = btn.closest('.game-card') || btn.closest('.feat-card');
      let gameName = card ? (card.dataset.name || card.querySelector('.feat-card-name')?.textContent) : null;
      
      if (!gameName && btn.classList.contains('btn-dl-page')) {
        gameName = document.querySelector('.game-page-title')?.textContent;
      }

      if (gameName && userDownloads.includes(gameName)) {
        btn.classList.add('baixado');
        btn.textContent = btn.classList.contains('btn-dl-page') ? '✓ Instalado' : '✓ Baixado';
      }
    });
  }
}

// Executar ao carregar qualquer página
document.addEventListener('DOMContentLoaded', updateUserInfo);


