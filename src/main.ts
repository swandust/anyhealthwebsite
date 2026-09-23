import './style.css';
import { initConsentAndTracking, trackEvent, submitLead } from './tracking';
import { initHero } from './hero';

/* ---------- Sticky header ---------- */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 12);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('hidden');
    navToggle.setAttribute('aria-expanded', String(!open));
  });
}

/* ---------- Active nav link ---------- */
const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((a) => {
  const target = a.getAttribute('href')!.replace(/\/$/, '') || '/';
  const isBlog = target === '/blog' && path.startsWith('/blog');
  if (target === path || isBlog) a.setAttribute('aria-current', 'page');
});

/* ---------- Scroll reveal ---------- */
const revealer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealer.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

/* ---------- Animated counters ---------- */
function animateCounter(el: HTMLElement): void {
  const target = parseFloat(el.dataset.count ?? '0');
  const decimals = (el.dataset.count ?? '').includes('.') ? 1 : 0;
  const dur = 1400;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        animateCounter(e.target as HTMLElement);
        counterObs.unobserve(e.target);
      }
    }
  },
  { threshold: 0.5 },
);
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => counterObs.observe(el));

/* ---------- Click tracking on tagged CTAs ---------- */
document.querySelectorAll<HTMLElement>('[data-track]').forEach((el) => {
  el.addEventListener('click', () => trackEvent(el.dataset.track!, { label: el.textContent?.trim().slice(0, 60) }));
});

/* ---------- Contact form ---------- */
const form = document.getElementById('contact-form') as HTMLFormElement | null;
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    const status = document.getElementById('form-status')!;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const ok = await submitLead({
      name: data.name,
      email: data.email,
      organisation: data.organisation,
      role: data.role,
      interest: data.interest,
      message: data.message,
    });
    if (ok) {
      trackEvent('lead_submitted', { interest: data.interest });
      form.classList.add('hidden');
      status.classList.remove('hidden');
    } else {
      // Storage not configured / offline - fall back to a pre-filled email.
      const body = encodeURIComponent(
        `Name: ${data.name}\nOrganisation: ${data.organisation ?? ''}\nRole: ${data.role ?? ''}\nInterested in: ${data.interest ?? ''}\n\n${data.message ?? ''}`,
      );
      location.href = `mailto:contact@anyhealth.asia?subject=${encodeURIComponent('Demo request - ' + (data.organisation || data.name))}&body=${body}`;
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
}

/* ---------- Footer year ---------- */
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

/* ---------- Scroll-scrubbed patient journey (home only) ----------
   Six scenes are pre-rendered to image sequences and scrubbed on a <canvas>:
   scroll position is the timeline (scroll = frames advance, stop = freeze),
   with a dissolve between scenes and a slow camera push. Runs identically on
   laptop and iPhone (no video-seek jank). rAF lerp smooths the scrub. */
function initScrub(): void {
  const section = document.querySelector<HTMLElement>('[data-scrub]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('.scrub-track');
  const canvas = section.querySelector<HTMLCanvasElement>('[data-cine-canvas]');
  const caps = Array.from(section.querySelectorAll<HTMLElement>('[data-cap]'));
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-step-dot]'));
  const fill = section.querySelector<HTMLElement>('[data-step-fill]');
  if (!track || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const N = 6;
  const FRAMES = 28;
  const BLEND = 0.16; // fraction of each scene window spent dissolving into the next
  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scrub state (declared early: the image onload handler reads them)
  let targetP = 0;
  let curP = 0;
  let running = false;

  // ----- preload the image sequences (scene 1 first, then stagger the rest) -----
  const imgs: HTMLImageElement[][] = [];
  const loadScene = (s: number) => {
    imgs[s] = [];
    for (let f = 0; f < FRAMES; f++) {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => {
        if (!running) draw(curP);
      };
      im.src = `/assets/seq/s${s + 1}/${String(f + 1).padStart(2, '0')}.webp`;
      imgs[s][f] = im;
    }
  };
  loadScene(0);
  let toLoad = 1;
  const loadNext = () => {
    if (toLoad < N) {
      loadScene(toLoad++);
      setTimeout(loadNext, 120);
    }
  };
  setTimeout(loadNext, 80);

  // nearest already-decoded frame, so an un-loaded frame degrades gracefully
  const frameOf = (s: number, f: number): HTMLImageElement | null => {
    const arr = imgs[s];
    if (!arr) return null;
    const ok = (im?: HTMLImageElement) => (im && im.complete && im.naturalWidth > 0 ? im : null);
    if (ok(arr[f])) return arr[f];
    for (let d = 1; d < FRAMES; d++) {
      if (ok(arr[f - d])) return arr[f - d];
      if (ok(arr[f + d])) return arr[f + d];
    }
    return null;
  };

  // ----- canvas sizing (device-pixel-ratio aware, self-correcting) -----
  let W = 0;
  let H = 0;
  const ensureSize = () => {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw && ch && (cw !== W || ch !== H || canvas.width === 0)) {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cw;
      H = ch;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };

  const drawCover = (img: HTMLImageElement, alpha: number, push: number) => {
    const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight) * push;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    ctx.globalAlpha = 1;
  };

  // caption visible during a scene's hold (fractions are within-scene 0..1,
  // fading out before the dissolve to the next scene begins at 1 - BLEND)
  const captionOpacity = (i: number, p: number) => {
    const within = (clamp01(p) - i / N) * N;
    if (within < 0 || within > 1.0001) return 0;
    const inA = 0.08;
    const inB = 0.2;
    const last = i === N - 1;
    const outA = last ? 1.01 : 1 - BLEND - 0.06;
    const outB = last ? 1.01 : 1 - BLEND - 0.01;
    if (within <= inA || within >= outB) return 0;
    if (within < inB) return clamp01((within - inA) / (inB - inA));
    if (within > outA) return clamp01((outB - within) / (outB - outA || 1));
    return 1;
  };

  const draw = (p: number) => {
    ensureSize();
    if (!W || !H) return;
    ctx.fillStyle = '#0b1329';
    ctx.fillRect(0, 0, W, H);

    const pos = clamp01(p) * N;
    const base = Math.min(N - 1, Math.floor(pos));
    const within = pos - base; // 0..1 across the current scene
    const baseImg = frameOf(base, Math.round(within * (FRAMES - 1)));
    if (baseImg) drawCover(baseImg, 1, 1 + 0.08 * within);

    // dissolve the next scene in over the last BLEND of this scene
    if (base < N - 1 && within > 1 - BLEND) {
      const t = (within - (1 - BLEND)) / BLEND;
      const nextImg = frameOf(base + 1, 0);
      if (nextImg) drawCover(nextImg, clamp01(t), 1);
    }

    caps.forEach((c, i) => (c.style.opacity = captionOpacity(i, p).toFixed(3)));
    const active = Math.min(N - 1, Math.floor(clamp01(p) * N));
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === active);
      d.classList.toggle('is-done', i < active);
    });
    if (fill) fill.style.transform = `scaleX(${clamp01(p).toFixed(4)})`;
  };

  if (import.meta.env.DEV) (window as unknown as { __cineDraw?: (p: number) => void }).__cineDraw = draw;

  if (reduced) {
    section.classList.add('scrub-off');
    addEventListener('resize', () => draw(0));
    draw(0);
    return;
  }

  // ----- rAF-smoothed scrub -----
  const tick = () => {
    curP += (targetP - curP) * 0.2;
    if (Math.abs(targetP - curP) < 0.0004) curP = targetP;
    draw(curP);
    if (curP !== targetP) requestAnimationFrame(tick);
    else running = false;
  };
  const ensure = () => {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  };
  const onScroll = () => {
    const total = track.offsetHeight - window.innerHeight;
    targetP = total > 0 ? clamp01(-track.getBoundingClientRect().top / total) : 0;
    ensure();
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => draw(curP));
  onScroll();
  draw(0);
}
initScrub();

/* ---------- Hero (home page only) ---------- */
initHero();

/* ---------- Consent + analytics ---------- */
initConsentAndTracking();
