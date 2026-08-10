/**
 * First-party, consent-gated visitor analytics.
 *
 * A random visitor id is stored in the `ah_vid` cookie once the visitor accepts
 * the cookie banner. Page views and events are written to Supabase via the REST
 * API (tables in supabase/migrations/20260705000000_website_analytics.sql).
 * If VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not configured, everything
 * silently no-ops so the site never breaks.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const CONSENT_KEY = 'ah_consent'; // 'granted' | 'denied'
const VID_COOKIE = 'ah_vid';
const SID_KEY = 'ah_sid';

function uuid(): string {
  if ('randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string, days: number): void {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${days * 86400}; Path=/; SameSite=Lax${secure}`;
}

export function getConsent(): string | null {
  return localStorage.getItem(CONSENT_KEY);
}

function visitorId(): string {
  let vid = getCookie(VID_COOKIE);
  if (!vid) {
    vid = uuid();
    setCookie(VID_COOKIE, vid, 400);
  }
  return vid;
}

function sessionId(): string {
  let sid = sessionStorage.getItem(SID_KEY);
  if (!sid) {
    sid = uuid();
    sessionStorage.setItem(SID_KEY, sid);
  }
  return sid;
}

async function post(table: string, body: Record<string, unknown>, upsert = false): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: upsert ? 'resolution=merge-duplicates,return=minimal' : 'return=minimal',
      },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    /* analytics must never break the site */
  }
}

function utm(): Record<string, string | null> {
  const p = new URLSearchParams(location.search);
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    utm_term: p.get('utm_term'),
    utm_content: p.get('utm_content'),
  };
}

/** Record the page view + keep the visitor row fresh. Call only after consent. */
export function trackPageView(): void {
  const vid = visitorId();
  const sid = sessionId();
  const u = utm();

  void post(
    'website_visitors',
    {
      visitor_id: vid,
      last_seen_at: new Date().toISOString(),
      first_referrer: document.referrer || null,
      first_utm_source: u.utm_source,
      first_utm_medium: u.utm_medium,
      first_utm_campaign: u.utm_campaign,
      user_agent: navigator.userAgent,
      language: navigator.language,
      screen_w: screen.width,
      screen_h: screen.height,
    },
    true,
  );

  void post('website_page_views', {
    visitor_id: vid,
    session_id: sid,
    path: location.pathname,
    page_title: document.title,
    referrer: document.referrer || null,
    ...u,
    viewport_w: innerWidth,
    viewport_h: innerHeight,
    user_agent: navigator.userAgent,
    language: navigator.language,
  });
}

/** Record a named event (demo click, email click, …). Only fires after consent. */
export function trackEvent(name: string, data: Record<string, unknown> = {}): void {
  if (getConsent() !== 'granted') return;
  void post('website_events', {
    visitor_id: visitorId(),
    session_id: sessionId(),
    event_name: name,
    event_data: data,
    path: location.pathname,
  });
}

/** Store a contact-form lead. Works regardless of cookie consent (it is first-party, user-initiated). */
export async function submitLead(lead: {
  name: string;
  email: string;
  organisation?: string;
  role?: string;
  interest?: string;
  message?: string;
}): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/website_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        ...lead,
        source_path: location.pathname,
        visitor_id: getConsent() === 'granted' ? getCookie(VID_COOKIE) : null,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Cookie consent banner. Injected on every page; resolves consent then starts tracking. */
export function initConsentAndTracking(): void {
  const consent = getConsent();
  if (consent === 'granted') {
    trackPageView();
    return;
  }
  if (consent === 'denied') return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className =
    'fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-xl rounded-3xl border border-navy-100 bg-white p-5 shadow-2xl shadow-navy-900/20 sm:left-auto sm:right-6 sm:bottom-6';
  banner.innerHTML = `
    <p class="text-sm font-semibold text-navy-900">We use one first-party cookie 🍪</p>
    <p class="mt-1 text-sm leading-relaxed text-navy-700">It helps us understand who visits AnyHealth.AI so we can improve the site. No ad networks, no third-party trackers. See our <a href="/privacy" class="font-semibold text-sage-700 underline underline-offset-2">privacy note</a>.</p>
    <div class="mt-4 flex gap-3">
      <button id="cookie-accept" class="rounded-full bg-sage-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sage-700">Accept</button>
      <button id="cookie-decline" class="rounded-full border border-navy-200 px-5 py-2.5 text-sm font-bold text-navy-700 transition hover:bg-navy-50">Decline</button>
    </div>`;
  document.body.appendChild(banner);

  const close = () => {
    banner.classList.add('hidden-down');
    setTimeout(() => banner.remove(), 500);
  };
  banner.querySelector('#cookie-accept')!.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    close();
    trackPageView();
  });
  banner.querySelector('#cookie-decline')!.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    close();
  });
}
