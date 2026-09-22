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

/* ---------- Scroll-scrub: patient lifecycle video (home only) ---------- */
function initScrub(): void {
  const section = document.querySelector<HTMLElement>('[data-scrub]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('.scrub-track');
  const video = section.querySelector<HTMLVideoElement>('[data-scrub-video]');
  const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-step-dot]'));
  const fill = section.querySelector<HTMLElement>('[data-step-fill]');
  if (!track || !video || panels.length === 0) return;

  // Step windows in scroll-progress space, aligned to when each moment appears
  // in the 9.9s clip: walk/voice, chat "Book", plane+calendar+tick, walk-in,
  // care-plan screen, home reminder.
  const bounds = [0, 0.263, 0.374, 0.556, 0.677, 0.808, 1];
  const N = panels.length;
  const FADE = 0.028;

  // Reduced motion: don't pin/scrub - loop the clip and stack the captions.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('scrub-off');
    video.loop = true;
    video.play().catch(() => {});
    return;
  }

  let duration = 9.9;
  video.addEventListener('loadedmetadata', () => {
    duration = video.duration || 9.9;
    try {
      video.currentTime = 0.001;
    } catch {
      /* ignore */
    }
  });
  // Prime the element so browsers allow frame-accurate seeking without playback.
  video.play().then(() => video.pause()).catch(() => {});

  const ramp = (p: number, lo: number, hi: number) =>
    p <= lo ? 0 : p >= hi ? 1 : (p - lo) / (hi - lo);

  let curT = -1;

  const apply = (p: number) => {
    let active = 0;
    for (let i = 0; i < N; i++) if (p >= bounds[i]) active = i;
    for (let i = 0; i < N; i++) {
      const s = bounds[i];
      const e = bounds[i + 1];
      const fin = i === 0 ? 1 : ramp(p, s - FADE, s + FADE);
      const fout = i === N - 1 ? 1 : 1 - ramp(p, e - FADE, e + FADE);
      panels[i].style.opacity = Math.min(fin, fout).toFixed(3);
      // The words travel with the scroll: rise through the frame and drift
      // sideways (alternating) across each step's window.
      const lt = Math.min(1, Math.max(0, (p - s) / (e - s || 1)));
      const ty = (0.5 - lt) * 64; // +32px below -> 0 -> -32px above
      const tx = (0.5 - lt) * 26 * (i % 2 === 0 ? -1 : 1);
      panels[i].style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    }
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === active);
      d.classList.toggle('is-done', i < active);
    });
    if (fill) fill.style.transform = `scaleX(${p.toFixed(4)})`;
  };

  const onScroll = () => {
    const total = track.offsetHeight - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total)) : 0;
    apply(p);
    const t = p * duration;
    if (video.readyState >= 1 && Math.abs(t - curT) > 0.03) {
      curT = t;
      try {
        video.currentTime = t;
      } catch {
        /* ignore */
      }
    }
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
}
initScrub();

/* ---------- Hero (home page only) ---------- */
initHero();

/* ---------- Consent + analytics ---------- */
initConsentAndTracking();
