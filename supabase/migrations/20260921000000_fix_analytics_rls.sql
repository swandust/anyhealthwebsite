-- =============================================================
-- FIX: website page-view analytics was silently failing because the
-- anon role could not INSERT into public.website_visitors (RLS policy
-- was missing on the live database, so every visitor upsert returned
-- 42501 "violates row-level security policy", which then blocked the
-- page_view insert via the foreign key).
--
-- This migration is idempotent: run it in the Supabase SQL editor
-- (or `supabase db push`) to (re)create the anon INSERT/UPDATE policies
-- for all three analytics tables. It does not touch website_leads
-- (the contact form) or any data.
-- =============================================================

alter table public.website_visitors   enable row level security;
alter table public.website_page_views enable row level security;
alter table public.website_events     enable row level security;

-- website_visitors: anon may insert new visitors and refresh last_seen (upsert)
drop policy if exists "anon can insert visitors"          on public.website_visitors;
drop policy if exists "anon can upsert visitor freshness"  on public.website_visitors;
create policy "anon can insert visitors"
  on public.website_visitors for insert to anon with check (true);
create policy "anon can upsert visitor freshness"
  on public.website_visitors for update to anon using (true) with check (true);

-- website_page_views: anon may insert page views
drop policy if exists "anon can insert page views" on public.website_page_views;
create policy "anon can insert page views"
  on public.website_page_views for insert to anon with check (true);

-- website_events: anon may insert CTA / event rows
drop policy if exists "anon can insert events" on public.website_events;
create policy "anon can insert events"
  on public.website_events for insert to anon with check (true);

-- (reads stay restricted to the authenticated dashboard role; unchanged)
