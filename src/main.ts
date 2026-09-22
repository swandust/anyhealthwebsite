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
   Six full-HD scene clips play full-screen and cross-fade (blend) into each
   other as you scroll, with a slow camera push on each. Captions sit in each
   scene's empty space. Works the same on laptop and iPhone. */
function initScrub(): void {
  const section = document.querySelector<HTMLElement>('[data-scrub]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('.scrub-track');
  const vids = Array.from(section.querySelectorAll<HTMLVideoElement>('[data-cine]'));
  const caps = Array.from(section.querySelectorAll<HTMLElement>('[data-cap]'));
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-step-dot]'));
  const fill = section.querySelector<HTMLElement>('[data-step-fill]');
  if (!track || vids.length === 0) return;

  const N = vids.length; // 6
  const bounds = Array.from({ length: N + 1 }, (_, i) => i / N);
  const FADE = 0.055; // half-width of each cross-fade blend

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('scrub-off');
    vids.forEach((v, i) => {
      v.style.transform = 'none';
      if (i === 0) v.play().catch(() => {});
      else v.pause();
    });
    return;
  }

  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
  const ramp = (p: number, lo: number, hi: number) => (p <= lo ? 0 : p >= hi ? 1 : (p - lo) / (hi - lo));

  // Scene i is fully opaque within its window and cross-fades at the borders.
  const sceneOpacity = (i: number, p: number) => {
    const fin = i === 0 ? 1 : ramp(p, bounds[i] - FADE, bounds[i] + FADE);
    const fout = i === N - 1 ? 1 : 1 - ramp(p, bounds[i + 1] - FADE, bounds[i + 1] + FADE);
    return Math.min(fin, fout);
  };
  const localT = (i: number, p: number) => clamp01((p - bounds[i]) / (bounds[i + 1] - bounds[i] || 1));
  // Caption trapezoid: fades in just after a scene arrives, out just before it leaves.
  const captionOpacity = (i: number, p: number) => {
    const s = i === 0 ? 0 : bounds[i] + 0.02;
    const sf = bounds[i] + 0.055;
    const eh = bounds[i + 1] - 0.055;
    const e = i === N - 1 ? 1 : bounds[i + 1] - 0.02;
    if (p <= s || p >= e) return 0;
    if (p < sf) return clamp01((p - s) / (sf - s || 1));
    if (p > eh) return clamp01((e - p) / (e - eh || 1));
    return 1;
  };

  const apply = (p: number) => {
    vids.forEach((v, i) => {
      const o = sceneOpacity(i, p);
      v.style.opacity = o.toFixed(3);
      const push = 1 + 0.09 * localT(i, p); // slow camera push, keeps full-bleed (>=1)
      v.style.transform = `scale(${push.toFixed(3)})`;
      // Play a scene once when you scroll into it; it then holds on its last
      // frame (no loop). Scroll back in and it replays from the start.
      const visible = o > 0.02;
      const wasVisible = v.dataset.vis === '1';
      if (visible && !wasVisible) {
        v.dataset.vis = '1';
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
        v.play().catch(() => {});
      } else if (!visible && wasVisible) {
        v.dataset.vis = '0';
        v.pause();
      }
    });

    caps.forEach((c, i) => (c.style.opacity = captionOpacity(i, p).toFixed(3)));

    let active = 0;
    for (let i = 0; i < N; i++) if (p >= bounds[i]) active = i;
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
