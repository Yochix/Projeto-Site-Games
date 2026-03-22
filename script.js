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

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    let found = 0;
    allCards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const cat  = (card.dataset.cat  || '').toLowerCase();
      const show = !q || name.includes(q) || cat.includes(q);
      card.style.display = show ? '' : 'none';
      if (show) found++;
    });
    if (empty)       empty.style.display = found === 0 ? 'block' : 'none';
    if (featSection) featSection.style.display = q ? 'none' : '';
    if (gridTitle)   gridTitle.textContent = q
      ? `🔍 "${searchInput.value}" — ${found} resultado${found !== 1 ? 's' : ''}`
      : '🎮 Todos os jogos';
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
  e.stopPropagation();
  const isFav = btn.textContent.trim() === '❤️';
  btn.textContent = isFav ? '🤍' : '❤️';
  showToast(isFav ? '💔 Removido dos favoritos' : '❤️ Adicionado aos favoritos');
}
