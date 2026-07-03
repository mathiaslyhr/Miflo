-- Beta waitlist — graduates the signup off the temporary `submit_feedback` hack.
--
-- Applies to the SAME (shared) Supabase project the iOS app uses — the marketing
-- site already writes web feedback into it via submit_feedback. This adds a
-- waitlist table alongside the app's tables.
--
-- The DB is not linked locally: APPLY THIS MANUALLY via that project's Supabase
-- dashboard SQL editor before deploying the updated signup code, otherwise
-- /notify signups will fail (the RPC won't exist yet).

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'web',
  created_at timestamptz not null default now()
);

-- Lock the table down: all writes go through the SECURITY DEFINER RPC below,
-- so the anon key can add an email but can never read or enumerate the list.
alter table public.waitlist enable row level security;

create or replace function public.join_waitlist(p_email text, p_source text default 'web')
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.waitlist (email, source)
  values (lower(trim(p_email)), coalesce(nullif(trim(p_source), ''), 'web'))
  on conflict (email) do nothing;
end;
$$;

grant execute on function public.join_waitlist(text, text) to anon, authenticated;
