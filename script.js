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
  e.stopPropagation();
  const jaBaixado = btn.classList.contains('baixado');
  if (jaBaixado) {
    showToast('✅ Jogo já baixado!');
    return;
  }
  btn.classList.add('baixado');
  btn.textContent = '✓ Baixado';
  showToast('⬇ Download iniciado!');
}

// ── FAVORITOS ──
function toggleFav(btn, e) {
  if (e) e.stopPropagation();
  const isFav = btn.textContent.trim() === '❤️';
  btn.textContent = isFav ? '🤍' : '❤️';
  showToast(isFav ? '💔 Removido dos favoritos' : '❤️ Adicionado aos favoritos');
}

// ── PÁGINA DE JOGO (DETALHES) ──
function baixarJogo() {
  const btn = document.getElementById('dlBtn');
  if (!btn) return;
  if (btn.classList.contains('baixado')) {
    showToast('✅ Jogo já baixado!');
    return;
  }
  btn.classList.add('baixado');
  btn.textContent = '✓ Instalado';
  showToast('⬇ Download iniciado!');
}

function toggleDesc() {
  const desc = document.getElementById('gameDesc');
  const btn  = document.getElementById('readMore');
  if (!desc || !btn) return;
  const col  = desc.classList.toggle('collapsed');
  btn.textContent = col ? 'Ver mais ↓' : 'Ver menos ↑';
}

