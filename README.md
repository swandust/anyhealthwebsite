# AnyHealth.AI — Marketing Website

Static multi-page site (Vite + TypeScript + Tailwind). Fully pre-rendered HTML → maximum SEO and AI-agent crawlability, ~10 KB of JS.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173 (clean URLs work in dev too)
npm run build    # outputs dist/
```

## Deploy (Vercel)

Import `anyhealth-website/` as the project root. `vercel.json` already enables `cleanUrls` (so `/about` serves `about.html`) and long-cache asset headers. Build command `npm run build`, output `dist`.

> **Canonical domain**: all meta tags, sitemap.xml and llms.txt currently point to `https://anyhealth.asia`. If you deploy under a different domain, search-replace `anyhealth.asia` across `*.html`, `blog/*.html`, `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt`.

## Pages

- `/` — home (morphing-vertical hero, pilot metrics, journey, 24/7 booking, ecosystem, integration, retention/PROM, marketing, ambulance/MediRescue, safety, FAQ)
- `/about`, `/contact`, `/privacy`, `/blog` + 5 SEO guide posts under `/blog/*`

Shared header/footer live in `partials/` and are inlined at build time by the tiny plugin in `vite.config.ts`.

## Visitor analytics (cookie + Supabase)

1. In your Supabase project, run `supabase/migrations/20260705000000_website_analytics.sql` (SQL editor → paste → run). It creates:
   - `website_visitors` — one row per visitor (`ah_vid` cookie)
   - `website_page_views` — every page view with path, referrer, UTM tags
   - `website_events` — CTA clicks (`cta_book_demo_*`, `cta_email_*`, `lead_submitted`)
   - `website_leads` — contact-form submissions
   - views `website_daily_traffic` and `website_top_pages` for quick reporting
   - RLS: the public anon key can only INSERT; reading requires your dashboard login.
2. Copy `.env.example` → `.env` and fill in `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (Project Settings → API). Add the same two env vars in Vercel.
3. Redeploy. Tracking is consent-gated: visitors see a cookie banner; decline = nothing is stored. The contact form falls back to a pre-filled `mailto:` if Supabase isn't configured.

## SEO / AI-agent features

- Unique title/description/canonical/OG per page; JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `AboutPage`, `ContactPage`, `Blog`, `BlogPosting`)
- `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt` (structured summary for AI assistants)
- Blog posts target the keyword clusters: WhatsApp chatbot for hospitals/clinics, healthcare WhatsApp automation, patient engagement/communication/reminder software, healthcare workflow automation, healthcare CRM, PROM software/collection/automation, value-based healthcare, digital patient follow-up, referral automation, healthcare scheduling, appointment reminders, medical appointment booking, healthcare conversational AI, ambulance dispatch coordination, patient transfer coordination.

## Assets

`public/assets/` holds the logo/icon set (from the brand kit), product screenshots extracted from the pitch deck (WhatsApp flows, EMR-integration infographic, campaign builder), the clinic/ambulance transparent collages, team headshots and the OG image.
