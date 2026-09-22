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

/* ---------- Cinematic patient-journey (home only) ----------
   Six full-HD scene clips loop while the scroll drives a "camera" that flies
   through them: each scene zooms/pans in, holds, then hands off to the next.
   Captions sit in each scene's empty space. */
interface CineKey {
  p: number;
  o: number;
  s: number;
  x: number;
  y: number;
  b: number;
  br: number;
}
function initScrub(): void {
  const section = document.querySelector<HTMLElement>('[data-scrub]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('.scrub-track');
  const vids = Array.from(section.querySelectorAll<HTMLVideoElement>('[data-cine]'));
  const caps = Array.from(section.querySelectorAll<HTMLElement>('[data-cap]'));
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-step-dot]'));
  const fill = section.querySelector<HTMLElement>('[data-step-fill]');
  if (!track || vids.length === 0) return;

  const k = (p: number, o: number, s: number, x: number, y: number, b = 0, br = 1): CineKey => ({ p, o, s, x, y, b, br });
  // Camera keyframes per scene: opacity, scale, translate x/y (%), blur px, brightness.
  const scenes: CineKey[][] = [
    [k(0, 1, 1, 0, 0), k(0.13, 1, 1, 0, 0), k(0.2, 0, 0.55, -6, -6, 4, 0.6)], // 1 full -> recede
    [k(0.1, 0, 0.28, 42, -28, 2, 0.9), k(0.23, 1, 1, 0, 0), k(0.31, 1, 1, 0, 0), k(0.39, 0, 0.95, -105, 0, 0, 0.8)], // 2 in from top-right -> swipe left
    [k(0.31, 0, 1, 105, 0, 0, 0.9), k(0.42, 1, 1, 0, 0), k(0.5, 1, 1, 0, 0), k(0.57, 0, 0.5, -6, 8, 4, 0.6)], // 3 in from right -> recede
    [k(0.52, 0, 0.62, 58, 0, 1, 0.95), k(0.6, 1, 0.6, 22, 0, 0, 1), k(0.69, 1, 0.6, 22, 0, 0, 1), k(0.77, 0, 2.3, 4, -4, 2, 1)], // 4 right half -> zoom through
    [k(0.71, 0, 1.18, 0, 0, 2, 1), k(0.79, 1, 1, 0, 0), k(0.87, 1, 1, 0, 0), k(0.92, 0, 1.08, 0, 0, 0, 0.9)], // 5 full
    [k(0.88, 0, 1.1, 0, 0, 2, 1), k(0.95, 1, 1, 0, 0), k(1, 1, 1, 0, 0)], // 6 full
  ];
  // Caption visibility windows [fadeInStart, full, holdEnd, fadeOutEnd].
  const capWin = [
    [0.0, 0.03, 0.12, 0.17],
    [0.22, 0.25, 0.31, 0.36],
    [0.4, 0.43, 0.49, 0.54],
    [0.585, 0.61, 0.7, 0.735],
    [0.785, 0.81, 0.87, 0.9],
    [0.93, 0.955, 1, 1],
  ];
  const stepB = [0, 0.18, 0.36, 0.53, 0.72, 0.9, 1];

  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('scrub-off');
    vids.forEach((v, i) => {
      v.style.transform = 'none';
      if (i === 0) v.play().catch(() => {});
      else v.pause();
    });
    return;
  }

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const at = (keys: CineKey[], p: number): CineKey => {
    if (p <= keys[0].p) return keys[0];
    const last = keys[keys.length - 1];
    if (p >= last.p) return last;
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i];
      const b = keys[i + 1];
      if (p >= a.p && p <= b.p) {
        const t = (p - a.p) / (b.p - a.p || 1);
        return { p, o: lerp(a.o, b.o, t), s: lerp(a.s, b.s, t), x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), b: lerp(a.b, b.b, t), br: lerp(a.br, b.br, t) };
      }
    }
    return last;
  };
  const capOpacity = (w: number[], p: number) => {
    if (p < w[0] || p > w[3]) return 0;
    if (p < w[1]) return clamp01((p - w[0]) / (w[1] - w[0] || 1));
    if (p > w[2]) return clamp01((w[3] - p) / (w[3] - w[2] || 1));
    return 1;
  };

  const apply = (p: number) => {
    vids.forEach((v, i) => {
      const st = at(scenes[i], p);
      v.style.opacity = st.o.toFixed(3);
      v.style.transform = `translate(${st.x.toFixed(2)}%, ${st.y.toFixed(2)}%) scale(${st.s.toFixed(3)})`;
      v.style.filter = st.b > 0.05 || st.br < 0.995 ? `blur(${st.b.toFixed(1)}px) brightness(${st.br.toFixed(2)})` : 'none';
      // Only decode/play layers that are near-visible.
      if (st.o > 0.02) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    });

    caps.forEach((c, i) => (c.style.opacity = capOpacity(capWin[i], p).toFixed(3)));

    let active = 0;
    for (let i = 0; i < stepB.length - 1; i++) if (p >= stepB[i]) active = i;
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
