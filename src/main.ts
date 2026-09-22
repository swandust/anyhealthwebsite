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

/* ---------- Parallax patient-journey scene (home only) ---------- */
function initScrub(): void {
  const section = document.querySelector<HTMLElement>('[data-scrub]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('.scrub-track');
  const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-step-dot]'));
  const fill = section.querySelector<HTMLElement>('[data-step-fill]');
  const layers = Array.from(section.querySelectorAll<HTMLElement>('[data-depth]'));
  const phone = section.querySelector<HTMLElement>('[data-phone]');
  const screens = Array.from(section.querySelectorAll<HTMLElement>('[data-screen]'));
  const chips = Array.from(section.querySelectorAll<HTMLElement>('[data-chip]'));
  if (!track || panels.length === 0) return;

  // Six equal stage windows across the scroll.
  const N = panels.length;
  const bounds = Array.from({ length: N + 1 }, (_, i) => i / N);
  const FADE = 0.03;

  // Reduced motion: drop the pin and show the steps as a stacked list.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('scrub-off');
    return;
  }

  const ramp = (p: number, lo: number, hi: number) =>
    p <= lo ? 0 : p >= hi ? 1 : (p - lo) / (hi - lo);
  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

  // Opacity for stage i: full within its window, cross-fading at the borders.
  const winOpacity = (i: number, p: number) => {
    const s = bounds[i];
    const e = bounds[i + 1];
    const fin = i === 0 ? 1 : ramp(p, s - FADE, s + FADE);
    const fout = i === N - 1 ? 1 : 1 - ramp(p, e - FADE, e + FADE);
    return Math.min(fin, fout);
  };
  // Local 0..1 progress through stage i's window.
  const localT = (i: number, p: number) =>
    clamp01((p - bounds[i]) / (bounds[i + 1] - bounds[i] || 1));

  const apply = (p: number) => {
    let active = 0;
    for (let i = 0; i < N; i++) if (p >= bounds[i]) active = i;

    // Caption words travel with the scroll (rise + alternate drift).
    for (let i = 0; i < N; i++) {
      panels[i].style.opacity = winOpacity(i, p).toFixed(3);
      const lt = localT(i, p);
      const ty = (0.5 - lt) * 64;
      const tx = (0.5 - lt) * 26 * (i % 2 === 0 ? -1 : 1);
      panels[i].style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    }

    // Phone screens morph through the journey (cross-fade + gentle slide).
    screens.forEach((sc, i) => {
      sc.style.opacity = winOpacity(i, p).toFixed(3);
      const ty = (0.5 - localT(i, p)) * 16;
      sc.style.transform = `translateY(${ty.toFixed(1)}px)`;
    });

    // Floating stage labels fade with their stage.
    chips.forEach((c, i) => {
      c.style.opacity = winOpacity(i, p).toFixed(3);
    });

    // The phone turns in 3D and floats as you travel.
    if (phone) {
      const ry = (p - 0.5) * -26;
      const rx = 6 - Math.sin(p * Math.PI) * 4;
      const fy = Math.sin(p * Math.PI * 2) * -5;
      phone.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(${fy.toFixed(1)}px)`;
    }

    // Depth parallax: layers pan/drift at rates set by their data-depth.
    layers.forEach((l) => {
      const d = parseFloat(l.dataset.depth || '0');
      const tx = (p - 0.5) * -130 * d;
      const ty = (p - 0.5) * 34 * d;
      l.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    });

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
