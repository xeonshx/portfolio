// ─────────────────────────────────────────────────────────────
// THE REEL: curated order, strongest work first. No menus:
// every section is stacked on the page as the client scrolls.
// Videos are YouTube (Unlisted) embeds, listed in assets/videos.json —
// edit that file (e.g. straight in GitHub's web UI) to swap clips,
// no code changes needed. Keys must match SECTIONS[].key below.
// ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { key: 'ugc', num: '01', title: 'UGC ADS', videos: [] },
  { key: 'hype', num: '02', title: 'HYPE & ANIMATION', videos: [] },
  { key: 'podcast-ai', num: '03', title: 'AI ENGINEERED ADS', videos: [] },
  { key: 'vsl', num: '04', title: 'VSL', videos: [] },
  { key: 'voiceover', num: '05', title: 'PODCAST & BILINGUAL',
    sub: "A translated ad usually sounds translated. I write and voice EN/中文 versions myself, so both land like the original, not a dub.",
    videos: [] },
];

const reel = document.getElementById('reel');
const players = {}; // youtube video id -> YT.Player
let ytApiReady = false;
const pendingPlayers = [];

const ICONS = {
  play: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  unmute: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M15.5 12a3.5 3.5 0 00-2-3.16v6.32a3.5 3.5 0 002-3.16z"/></svg>',
  mute: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M19.5 8.5l-1-1-2.5 2.5-2.5-2.5-1 1L15 11l-2.5 2.5 1 1L16 12l2.5 2.5 1-1L17 11z"/></svg>',
};

// YouTube's "hqdefault" thumbnail frequently returns a 3-frame contact-sheet
// image for Shorts instead of one clean frame (a known platform quirk) —
// that's the "split/stitched" look. maxresdefault is a genuine single frame
// but doesn't exist for every video (YouTube returns a tiny 120x90 grey
// placeholder instead of a real 404 when it's missing, so we detect that
// and fall back down the chain rather than trusting a plain <img onerror>).
function setThumb(el, videoId, isBackground) {
  const chain = ['maxresdefault', 'sddefault', 'hqdefault'].map(size => `https://img.youtube.com/vi/${videoId}/${size}.jpg`);
  let i = 0;
  const tryNext = () => {
    const probe = new Image();
    probe.onload = () => {
      if (probe.naturalWidth <= 120 && i < chain.length - 1) { i++; tryNext(); return; }
      if (isBackground) el.style.backgroundImage = `url('${chain[i]}')`;
      else el.src = chain[i];
    };
    probe.onerror = () => { if (i < chain.length - 1) { i++; tryNext(); } };
    probe.src = chain[i];
  };
  tryNext();
}

function loadYouTubeApi() {
  if (window.YT || document.getElementById('yt-iframe-api')) return;
  const tag = document.createElement('script');
  tag.id = 'yt-iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}
window.onYouTubeIframeAPIReady = () => {
  ytApiReady = true;
  pendingPlayers.forEach(mount => mount());
  pendingPlayers.length = 0;
};

function mountPlayer(el, videoId, tileEl) {
  if (!el) return;
  let readyTimer = null;
  const create = () => {
    players[el.id] = new YT.Player(el.id, {
      videoId,
      // No loop/playlist params here on purpose: setting them makes YouTube
      // treat the embed as a real playlist and show its own title/channel/
      // prev-next overlay even with controls:0. We loop manually instead
      // (see onStateChange below) to keep the embed completely chrome-free.
      playerVars: { mute: 1, autoplay: 1, controls: 0, rel: 0, playsinline: 1, modestbranding: 1 },
      events: {
        // Belt-and-suspenders: some browsers ignore the autoplay param on
        // first paint, leaving YouTube's own branded "not playing yet" card
        // visible. Forcing play here fixes that — BUT only for tiles that
        // are actually supposed to be playing right now: filmstrip tiles
        // (no tileEl/not gated) always autoplay, reel tiles only autoplay
        // if their section is currently on screen (tracked by the
        // IntersectionObserver below via dataset.visible).
        onReady: (e) => {
          e.target.mute();
          const shouldPlay = !tileEl || tileEl.dataset.gated !== 'true' || tileEl.dataset.visible === 'true';
          if (!shouldPlay) return;
          e.target.playVideo();
          // Autoplay can silently no-op when several iframes all initialize
          // in the same tick (common with the filmstrip). Nudge it again
          // shortly after if it still hasn't actually started.
          setTimeout(() => {
            if (e.target.getPlayerState?.() !== YT.PlayerState.PLAYING) e.target.playVideo();
          }, 1200);
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) {
            e.target.seekTo(0);
            e.target.playVideo();
          }
          if (!tileEl) return;
          const playing = e.data === YT.PlayerState.PLAYING;
          tileEl.classList.toggle('is-playing', playing);
          const playBtn = tileEl.querySelector('.ctl-play');
          if (playBtn) playBtn.innerHTML = playing ? ICONS.pause : ICONS.play;
          // Only reveal the real video once it's been stably playing for a
          // beat — the first PLAYING event can still flicker through a
          // buffering state, which is when YouTube's own branded title
          // card and play/pause icon can flash. Waiting skips past that.
          clearTimeout(readyTimer);
          if (playing) readyTimer = setTimeout(() => tileEl.classList.add('is-ready'), 700);
        },
      },
    });
  };
  ytApiReady ? create() : pendingPlayers.push(create);
}

// Play/pause (hover-revealed) and mute/unmute (always visible) per reel tile.
// Filmstrip tiles don't get these — they're decorative and always playing.
function wireControls(tileEl, embedId) {
  const playBtn = tileEl.querySelector('.ctl-play');
  const muteBtn = tileEl.querySelector('.ctl-mute');
  playBtn.innerHTML = ICONS.play;
  muteBtn.innerHTML = ICONS.mute;
  playBtn.onclick = (ev) => {
    ev.stopPropagation();
    const p = players[embedId];
    if (!p) return;
    p.getPlayerState() === YT.PlayerState.PLAYING ? p.pauseVideo() : p.playVideo();
  };
  muteBtn.onclick = (ev) => {
    ev.stopPropagation();
    const p = players[embedId];
    if (!p) return;
    const nowMuted = !p.isMuted();
    nowMuted ? p.mute() : p.unMute();
    muteBtn.classList.toggle('is-muted', nowMuted);
    muteBtn.innerHTML = nowMuted ? ICONS.mute : ICONS.unmute;
  };
}

// Tear a player fully down (frees the whole iframe/browser-context, not
// just a pause) and reset the tile so it can be cleanly re-mounted later.
function unmountPlayer(tileEl) {
  const id = tileEl.dataset.embed;
  const p = players[id];
  if (p) { try { p.destroy(); } catch (e) {} delete players[id]; }
  tileEl.dataset.mounted = 'false';
  tileEl.classList.remove('is-ready', 'is-playing');
  const wrap = tileEl.querySelector('.ytwrap');
  if (wrap) wrap.innerHTML = `<div id="${id}"></div>`; // fresh mount point
  const playBtn = tileEl.querySelector('.ctl-play');
  if (playBtn) playBtn.innerHTML = ICONS.play;
}

// Two observers, so RAM stays capped to what's actually near the viewport:
//
// lifeIO (wide margin) — CREATES the heavy YouTube embed as a tile gets
// close, and DESTROYS it once it's scrolled well away. Without the destroy
// half, scrolling through every section would accumulate all ~17 embeds and
// they'd never be freed — that was the real memory growth. Now only tiles
// near the viewport hold a live embed at any moment.
const lifeIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const t = e.target;
    if (e.isIntersecting && t.dataset.mounted !== 'true') {
      t.dataset.mounted = 'true';
      t.classList.add('in');
      mountPlayer(t.querySelector('.ytwrap > div'), t.dataset.videoId, t);
    } else if (!e.isIntersecting && t.dataset.mounted === 'true') {
      unmountPlayer(t);
    }
  });
}, { rootMargin: '400px 0px', threshold: 0 });

// playIO (tight margin) — plays a mounted tile only while it's genuinely
// on screen, pauses it the moment it isn't. This is also what actually
// kicks off playback (YouTube defers autoplay until visible), so a tile
// mounted early by lifeIO doesn't start until it's really in view.
const playIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const t = e.target;
    t.dataset.visible = e.isIntersecting ? 'true' : 'false';
    const p = players[t.dataset.embed];
    if (e.isIntersecting) p?.playVideo?.();
    else p?.pauseVideo?.();
  });
}, { rootMargin: '0px', threshold: 0.3 });

let tileSeq = 0;

function render() {
  reel.innerHTML = '';
  SECTIONS.forEach(sec => {
    const s = document.createElement('section');
    s.className = 'block';
    s.innerHTML = `
      <div class="block-head">
        <h2 class="block-title">${sec.title}</h2>
        ${sec.sub ? `<p class="block-sub">${sec.sub}</p>` : ''}
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
        d.className = item.ratio === '16:9' ? 'tile wide' : 'tile';
        const embedId = `yt-${tileSeq++}`;
        const cap = item.brand || item.title
          ? `<div class="vcap"><span>${item.brand || item.title}</span>${item.format ? `<small>${item.format}</small>` : ''}</div>`
          : '';
        d.dataset.embed = embedId;
        d.dataset.videoId = item.id;
        d.dataset.gated = 'true'; // reel tiles only play while their section is on screen
        d.innerHTML = `
          <div class="ytwrap"><div id="${embedId}"></div></div>
          <div class="cover"></div>
          <button class="ctl ctl-play" aria-label="Play or pause"></button>
          <button class="ctl ctl-mute is-muted" aria-label="Mute or unmute"></button>
          ${cap}`;
        setThumb(d.querySelector('.cover'), item.id, true);
        wireControls(d, embedId);
        // Player is created lazily (lifeIO) as the tile nears the viewport
        // and destroyed once it's far away; playIO starts/pauses playback
        // only while it's genuinely on screen.
        lifeIO.observe(d);
        playIO.observe(d);
        grid.appendChild(d);
      });
    }
    s.appendChild(grid);
    reel.appendChild(s);
  });
}

// Filmstrip under the hero: static thumbnails only. Confirmed (including
// in Incognito, ruling out extensions) that live embeds here just don't
// autoplay reliably — the reel's per-tile IntersectionObserver approach
// works fine, but the strip's container-level trigger doesn't, and it's
// not worth shipping a "live" tile that actually just sits frozen. Zero
// RAM cost here; the real playback experience is the reel below.
function renderStrip() {
  const track = document.getElementById('stripTrack');
  track.innerHTML = '';
  const make = (item) => {
    const t = document.createElement('div');
    if (!item) {
      t.className = 'strip-tile empty';
      t.innerHTML = '<p>REEL<br>SOON</p>';
      return t;
    }
    t.className = 'strip-tile';
    t.innerHTML = `<img alt="" loading="lazy">`;
    setThumb(t.querySelector('img'), item.id, false);
    return t;
  };
  const picks = SECTIONS.flatMap(s => s.videos.slice(0, 2));
  const items = picks.length ? picks : Array(8).fill(null);
  const tileWidth = 210 + 12;
  const setsNeeded = Math.max(2, Math.ceil((window.innerWidth * 2.2) / (items.length * tileWidth)));
  const repeated = Array.from({ length: setsNeeded }, () => items).flat();
  repeated.forEach(item => track.appendChild(make(item)));
  track.style.setProperty('--sets', setsNeeded);
}

// Pull the video list from assets/videos.json — edit that file (even via
// GitHub's web UI on a phone) to swap clips; the site re-fetches it fresh
// on every load, no rebuild or code change required.
async function loadVideos() {
  try {
    const res = await fetch('assets/videos.json', { cache: 'no-store' });
    const data = await res.json();
    SECTIONS.forEach(sec => {
      sec.videos = (data[sec.key] || []).filter(v => v.id);
    });
  } catch (e) {
    console.warn('Could not load assets/videos.json', e);
  }
  loadYouTubeApi();
  render();
  renderStrip();
}

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

// Hero chip label -> where it should scroll to, per mode. EDIT chips map
// to a SECTIONS key (jumps to that reel block) or an element id (AI
// COACHING). BUILD chips all point at the single "what I ship" block
// since those three are rows within it, not separate sections.
const CHIP_TARGETS = {
  edit: { 'UGC ADS': 'ugc', 'ANIMATION': 'hype', 'AI ADS': 'podcast-ai', 'VSL': 'vsl', 'AI COACHING': '#coaching' },
  build: { 'DASHBOARDS': '#ship', 'WORDPRESS': '#ship', 'AUTOMATION': '#ship' },
};
function scrollToChipTarget(mode, label) {
  const target = CHIP_TARGETS[mode]?.[label];
  if (!target) return;
  const el = target.startsWith('#')
    ? document.querySelector(target)
    : document.querySelectorAll('#reel .block')[SECTIONS.findIndex(s => s.key === target)];
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Fill the BUILD terminal's `ship <args>` line once — each arg is a
// clickable span that jumps to the WHAT I SHIP block, mirroring the way
// the EDIT chips scroll to their sections.
function renderBuildStack() {
  const stack = document.getElementById('buildStack');
  if (!stack) return;
  const args = MODES.build.roles.split('·').map(r => r.trim().toLowerCase());
  stack.innerHTML = args.map(a => `<span class="arg">${a}</span>`).join(' ');
  stack.querySelectorAll('.arg').forEach(a => {
    a.onclick = () => document.getElementById('ship')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function setMode(mode) {
  document.documentElement.dataset.mode = mode; // drives .edit-only / .build-only gating
  document.querySelectorAll('.mtab').forEach(b => b.classList.toggle('on', b.dataset.mode === mode));
  document.getElementById('world-edit').hidden = mode !== 'edit';
  document.getElementById('world-build').hidden = mode !== 'build';
  const pitch = document.getElementById('pitch');
  const roles = document.getElementById('rolesLine');
  pitch.innerHTML = MODES[mode].pitch;
  // EDIT chips live in the video-timeline instrument; BUILD roles live in
  // the terminal instead, so only repopulate the chips for EDIT.
  if (mode === 'edit') {
    roles.innerHTML = MODES.edit.roles.split('·')
      .map(r => `<span class="chip-clip">${r.trim()}</span>`).join('');
    roles.querySelectorAll('.chip-clip').forEach(chip => {
      chip.onclick = () => scrollToChipTarget('edit', chip.textContent.trim());
    });
  }
  // retrigger the rise-in on the swapped text
  [pitch, roles].forEach(el => { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); });
  if (location.hash !== '#' + mode) history.replaceState(null, '', '#' + mode);
  // pause any playing edit-world videos when leaving
  if (mode !== 'edit') Object.values(players).forEach(p => p?.pauseVideo?.());
}
renderBuildStack();
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

loadVideos();
document.getElementById('year').textContent = new Date().getFullYear();
