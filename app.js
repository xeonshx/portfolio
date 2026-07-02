// ─────────────────────────────────────────────────────────────
// THE REEL: curated order, strongest work first. No menus:
// every section is stacked on the page as the client scrolls.
// Videos live in assets/videos/<folder>/. Add entries to `videos`.
// ─────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    num: '01', title: 'UGC ADS',
    videos: [
      // { src: 'assets/videos/ugc/freeprints-hook.mp4', brand: 'FreePrints', format: 'TIKTOK AD' },
    ],
  },
  {
    num: '02', title: 'HYPE & ANIMATION',
    videos: [],
  },
  {
    num: '03', title: 'PODCAST & AI ADS',
    videos: [],
  },
  {
    num: '04', title: 'VSL',
    videos: [],
  },
  {
    num: '05', title: 'VOICEOVER & BILINGUAL',
    videos: [],
  },
];

const reel = document.getElementById('reel');

// Autoplay tiles only while on screen; reveal with a rise-in.
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const v = e.target.querySelector('video');
    if (e.isIntersecting) {
      e.target.classList.add('in');
      if (v) { v.muted = true; v.play().catch(() => {}); }
    } else if (v) v.pause();
  });
}, { rootMargin: '80px', threshold: 0.15 });

function render() {
  reel.innerHTML = '';
  SECTIONS.forEach(sec => {
    const s = document.createElement('section');
    s.className = 'block';
    s.innerHTML = `
      <div class="block-head">
        <span class="block-num">${sec.num}</span>
        <h2 class="block-title">${sec.title}</h2>
      </div>`;
    const grid = document.createElement('div');
    grid.className = 'grid';
    if (!sec.videos.length) {
      for (let i = 0; i < 3; i++) {
        const d = document.createElement('div');
        d.className = 'tile empty in';
        d.innerHTML = '<p>REEL<br>LOADING SOON</p>';
        grid.appendChild(d);
      }
    } else {
      sec.videos.forEach(item => {
        const d = document.createElement('div');
        d.className = 'tile';
        const cap = item.brand || item.title
          ? `<div class="vcap"><span>${item.brand || item.title}</span>${item.format ? `<small>${item.format}</small>` : ''}</div>`
          : '';
        d.innerHTML = `
          <video src="${item.src}" preload="metadata" muted loop playsinline></video>
          <div class="hoverhint">▶ FULL SCREEN</div>
          ${cap}`;
        d.onclick = () => openLightbox(item.src);
        io.observe(d);
        grid.appendChild(d);
      });
    }
    s.appendChild(grid);
    reel.appendChild(s);
  });
}

// Filmstrip under the hero: pulls the first video of each section
// so the best work is moving on screen within the first second.
function renderStrip() {
  const track = document.getElementById('stripTrack');
  const picks = SECTIONS.flatMap(s => s.videos.slice(0, 2));
  track.innerHTML = '';
  const make = (item) => {
    const t = document.createElement('div');
    if (!item) {
      t.className = 'strip-tile empty';
      t.innerHTML = '<p>REEL<br>SOON</p>';
    } else {
      t.className = 'strip-tile';
      t.innerHTML = `<video src="${item.src}" preload="metadata" muted loop autoplay playsinline></video>`;
      t.onclick = () => openLightbox(item.src);
    }
    return t;
  };
  const items = picks.length ? picks : Array(8).fill(null);
  // double the content for a seamless loop
  [...items, ...items].forEach(i => track.appendChild(make(i)));
}

// Lightbox
const lb = document.getElementById('lightbox');
const lbVideo = document.getElementById('lbVideo');
function openLightbox(src) {
  lbVideo.src = src;
  lb.hidden = false;
  lbVideo.muted = false;
  lbVideo.play().catch(() => {});
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lbVideo.pause(); lbVideo.src = '';
  lb.hidden = true;
  document.body.style.overflow = '';
}
document.getElementById('lbClose').onclick = closeLightbox;
lb.onclick = e => { if (e.target === lb) closeLightbox(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLightbox(); });

// ── EDIT / BUILD mode tabs ──
const MODES = {
  edit: {
    pitch: 'I cut ads that <em>sell.</em>',
    roles: 'UGC ADS · AI ADS · VSL · ANIMATION · AI COACHING',
  },
  build: {
    pitch: 'I build things that <em>work.</em>',
    roles: 'DASHBOARDS · WORDPRESS · AUTOMATION',
  },
};

function setMode(mode) {
  document.querySelectorAll('.mtab').forEach(b => b.classList.toggle('on', b.dataset.mode === mode));
  document.getElementById('world-edit').hidden = mode !== 'edit';
  document.getElementById('world-build').hidden = mode !== 'build';
  const pitch = document.getElementById('pitch');
  const roles = document.getElementById('rolesLine');
  pitch.innerHTML = MODES[mode].pitch;
  roles.innerHTML = MODES[mode].roles.split('·')
    .map(r => `<span class="chip-clip">${r.trim()}</span>`).join('');
  // retrigger the rise-in on the swapped text
  [pitch, roles].forEach(el => { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); });
  if (location.hash !== '#' + mode) history.replaceState(null, '', '#' + mode);
  // pause any playing edit-world videos when leaving
  if (mode !== 'edit') document.querySelectorAll('#world-edit video').forEach(v => v.pause());
}
document.querySelectorAll('.mtab').forEach(b => b.onclick = () => setMode(b.dataset.mode));
setMode(location.hash === '#build' ? 'build' : 'edit');

// Running timecode in the hero (24fps)
const tcEl = document.getElementById('tc');
let frames = 0;
setInterval(() => {
  frames++;
  const f = frames % 24, s = Math.floor(frames / 24) % 60,
        m = Math.floor(frames / 1440) % 60, h = Math.floor(frames / 86400);
  const p = n => String(n).padStart(2, '0');
  tcEl.textContent = `${p(h)}:${p(m)}:${p(s)}:${p(f)}`;
}, 1000 / 24);

render();
renderStrip();
document.getElementById('year').textContent = new Date().getFullYear();
