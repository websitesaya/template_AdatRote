/* ============================================
   SCRIPT.JS - UNDANGAN PERNIKAHAN ROTE NDAO
   Design by Zhald_Design
   ============================================ */

// ===== CONFIG =====
const CONFIG = {
  binId: 'GANTI_BIN_ID_ANDA',
  accessKey: 'GANTI_ACCESS_KEY_ANDA',
  binUrl: 'https://api.jsonbin.io/v3/b/',
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParticles();
  initMusic();
  initOpenBtn();
  initNavDots();
  initScrollAnimations();
  initGallery();
  initTimeline();
  initCopyBtn();
  loadUcapan();
});

// ===== STARS =====
function initStars() {
  const container = document.getElementById('cover-stars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${2 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }
}

// ===== PARTICLES =====
function initParticles() {
  const containers = document.querySelectorAll('.particles-container');
  containers.forEach(container => {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        --dur: ${6 + Math.random() * 8}s;
        --delay: ${Math.random() * 8}s;
        --drift: ${(Math.random() - 0.5) * 100}px;
      `;
      container.appendChild(p);
    }
  });
}

// ===== MUSIC =====
let musicPlaying = false;
function initMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  if (!audio || !btn) return;

  audio.volume = 0.4;
  audio.loop = true;

  btn.addEventListener('click', () => {
    if (musicPlaying) {
      audio.pause();
      btn.innerHTML = '♪';
      musicPlaying = false;
    } else {
      audio.play().catch(() => {});
      btn.innerHTML = '❚❚';
      musicPlaying = true;
    }
  });
}

function playMusicOnOpen() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  if (!audio) return;
  audio.volume = 0.4;
  audio.play().then(() => {
    musicPlaying = true;
    if (btn) btn.innerHTML = '❚❚';
  }).catch(() => {});
}

// ===== OPEN BUTTON =====
function initOpenBtn() {
  const btn = document.getElementById('open-btn');
  const opening = document.getElementById('opening-screen');
  const main = document.getElementById('main-invitation');

  if (!btn) return;
  btn.addEventListener('click', () => {
    opening.classList.add('hidden');
    setTimeout(() => {
      opening.style.display = 'none';
      main.classList.add('visible');
      playMusicOnOpen();
      window.scrollTo(0, 0);
    }, 1000);
  });
}

// ===== NAV DOTS =====
const SECTIONS = ['cover','mempelai','love-story','acara','gallery','hadiah','ucapan','penutup'];
const SECTION_LABELS = ['Cover','Mempelai','Love Story','Acara','Galeri','Hadiah','Ucapan','Penutup'];

function initNavDots() {
  const container = document.getElementById('nav-dots');
  if (!container) return;

  SECTIONS.forEach((id, i) => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    dot.title = SECTION_LABELS[i];
    dot.addEventListener('click', () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(dot);
  });

  window.addEventListener('scroll', updateNavDots, { passive: true });
}

function updateNavDots() {
  const dots = document.querySelectorAll('.nav-dot');
  let current = 0;
  SECTIONS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - window.innerHeight / 2) {
      current = i;
    }
  });
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

// ===== QUICK NAV BUTTONS =====
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ===== TIMELINE =====
function initTimeline() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
  });
}

// ===== GALLERY =====
function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== COPY ATM =====
function initCopyBtn() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => showToast('Nomor Rekening Disalin! ✓'));
    });
  });
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== UCAPAN / JSONBIN =====
async function loadUcapan() {
  const listEl = document.getElementById('ucapan-list');
  if (!listEl) return;

  if (CONFIG.binId === 'GANTI_BIN_ID_ANDA') {
    listEl.innerHTML = renderUcapanItem({
      name: 'Tim Zhald_Design',
      attend: 'Hadir',
      message: 'Selamat menempuh hidup baru. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Tuhan memberkati! 🙏',
      emoji: '💒',
      time: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
    });
    return;
  }

  listEl.innerHTML = `<div class="loading-wrap"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div>`;

  try {
    const res = await fetch(`${CONFIG.binUrl}${CONFIG.binId}/latest`, {
      headers: { 'X-Access-Key': CONFIG.accessKey }
    });
    const data = await res.json();
    const items = data.record?.ucapan || [];
    if (items.length === 0) {
      listEl.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic;padding:24px;">Belum ada ucapan. Jadilah yang pertama! 💌</p>';
    } else {
      listEl.innerHTML = items.slice().reverse().map(renderUcapanItem).join('');
    }
  } catch (e) {
    listEl.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.4);padding:24px;">Gagal memuat ucapan.</p>';
  }
}

function renderUcapanItem(item) {
  const initial = (item.name || '?').charAt(0).toUpperCase();
  const attendLabel = {
    'Hadir': '✅ Hadir',
    'Tidak Hadir': '❌ Tidak Hadir',
    'Masih Ragu': '🤔 Masih Ragu'
  }[item.attend] || item.attend;

  return `
    <div class="ucapan-item">
      <div class="ucapan-item-header">
        <div class="ucapan-avatar">${initial}</div>
        <div class="ucapan-meta">
          <div class="ucapan-name">${escHtml(item.name)}</div>
          <div class="ucapan-attend">${attendLabel}</div>
        </div>
        <div class="ucapan-emoji">${item.emoji || '💝'}</div>
      </div>
      <div class="ucapan-text">"${escHtml(item.message)}"</div>
      <div class="ucapan-time">${item.time || ''}</div>
    </div>
  `;
}

async function submitUcapan() {
  const name = document.getElementById('ucapan-name').value.trim();
  const attend = document.getElementById('ucapan-attend').value;
  const message = document.getElementById('ucapan-message').value.trim();
  const emoji = document.getElementById('ucapan-emoji').value;

  if (!name || !message) { showToast('Nama dan ucapan tidak boleh kosong!'); return; }

  const submitBtn = document.getElementById('submit-ucapan');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Mengirim...';

  const newItem = {
    name, attend, message, emoji,
    time: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })
  };

  if (CONFIG.binId === 'GANTI_BIN_ID_ANDA') {
    const listEl = document.getElementById('ucapan-list');
    listEl.insertAdjacentHTML('afterbegin', renderUcapanItem(newItem));
    showToast('Ucapan berhasil dikirim! 💌');
    resetForm();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Kirim Ucapan & Doa';
    return;
  }

  try {
    // GET current
    const getRes = await fetch(`${CONFIG.binUrl}${CONFIG.binId}/latest`, {
      headers: { 'X-Access-Key': CONFIG.accessKey }
    });
    const getData = await getRes.json();
    const existing = getData.record?.ucapan || [];
    existing.push(newItem);

    // PUT updated
    await fetch(`${CONFIG.binUrl}${CONFIG.binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': CONFIG.accessKey
      },
      body: JSON.stringify({ ucapan: existing })
    });

    showToast('Ucapan berhasil dikirim! 💌');
    resetForm();
    loadUcapan();
  } catch (e) {
    showToast('Gagal mengirim, coba lagi.');
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Kirim Ucapan & Doa';
}

function resetForm() {
  document.getElementById('ucapan-name').value = '';
  document.getElementById('ucapan-message').value = '';
  document.getElementById('ucapan-attend').value = 'Hadir';
  document.getElementById('ucapan-emoji').value = '💝';
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// ===== ATM FLIP on hover (mobile tap) =====
document.addEventListener('click', (e) => {
  const card = e.target.closest('.atm-card');
  if (card && !e.target.closest('.atm-copy-btn')) {
    card.classList.toggle('flipped');
  }
});
