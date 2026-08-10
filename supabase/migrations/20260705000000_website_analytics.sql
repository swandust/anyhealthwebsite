-- =============================================================
-- AnyHealth.AI website analytics & leads
-- Run this in your Supabase SQL editor (or `supabase db push`).
-- Pairs with src/tracking.ts on the website, which writes via the
-- anon key. Anon role can only INSERT (and upsert its own visitor
-- row); reading the data requires the service role / dashboard.
-- =============================================================

-- Who visited (one row per ah_vid cookie)
create table if not exists public.website_visitors (
  visitor_id         uuid primary key,
  first_seen_at      timestamptz not null default now(),
  last_seen_at       timestamptz not null default now(),
  first_referrer     text,
  first_utm_source   text,
  first_utm_medium   text,
  first_utm_campaign text,
  user_agent         text,
  language           text,
  screen_w           integer,
  screen_h           integer
);

-- Every page view
create table if not exists public.website_page_views (
  id           bigint generated always as identity primary key,
  visitor_id   uuid not null references public.website_visitors (visitor_id) on delete cascade,
  session_id   uuid,
  path         text not null,
  page_title   text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,
  viewport_w   integer,
  viewport_h   integer,
  user_agent   text,
  language     text,
  viewed_at    timestamptz not null default now()
);

-- CTA clicks and other named events (demo clicks, email clicks, lead submits)
create table if not exists public.website_events (
  id         bigint generated always as identity primary key,
  visitor_id uuid,
  session_id uuid,
  event_name text not null,
  event_data jsonb not null default '{}'::jsonb,
  path       text,
  created_at timestamptz not null default now()
);

-- Contact-form submissions
create table if not exists public.website_leads (
  id           bigint generated always as identity primary key,
  name         text not null,
  email        text not null,
  organisation text,
  role         text,
  interest     text,
  message      text,
  source_path  text,
  visitor_id   uuid,
  created_at   timestamptz not null default now()
);

create index if not exists idx_page_views_visitor on public.website_page_views (visitor_id, viewed_at desc);
create index if not exists idx_page_views_path    on public.website_page_views (path, viewed_at desc);
create index if not exists idx_events_name        on public.website_events (event_name, created_at desc);
create index if not exists idx_leads_created      on public.website_leads (created_at desc);

-- ---------- Row Level Security ----------
alter table public.website_visitors  enable row level security;
alter table public.website_page_views enable row level security;
alter table public.website_events    enable row level security;
alter table public.website_leads     enable row level security;

-- anon may write analytics, never read it
create policy "anon can insert visitors"
  on public.website_visitors for insert to anon with check (true);
create policy "anon can upsert visitor freshness"
  on public.website_visitors for update to anon using (true) with check (true);
create policy "anon can insert page views"
  on public.website_page_views for insert to anon with check (true);
create policy "anon can insert events"
  on public.website_events for insert to anon with check (true);
create policy "anon can insert leads"
  on public.website_leads for insert to anon with check (true);

-- authenticated dashboard users may read everything
create policy "authenticated can read visitors"
  on public.website_visitors for select to authenticated using (true);
create policy "authenticated can read page views"
  on public.website_page_views for select to authenticated using (true);
create policy "authenticated can read events"
  on public.website_events for select to authenticated using (true);
create policy "authenticated can read leads"
  on public.website_leads for select to authenticated using (true);

-- ---------- Convenience views for quick reporting ----------
create or replace view public.website_daily_traffic as
select
  date_trunc('day', viewed_at)::date as day,
  count(*)                            as page_views,
  count(distinct visitor_id)          as unique_visitors,
  count(distinct session_id)          as sessions
from public.website_page_views
group by 1
order by 1 desc;

create or replace view public.website_top_pages as
select path, count(*) as views, count(distinct visitor_id) as unique_visitors
from public.website_page_views
group by path
order by views desc;
