-- Run this in Supabase SQL editor to enable saved generation history.

create extension if not exists pgcrypto;

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  brand_id uuid references public.brands(id) on delete set null,
  brand_name text not null default '',
  prompt text not null default '',
  format text not null default 'video',
  platform text not null default '',
  duration integer,
  include jsonb not null default '[]'::jsonb,
  output_url text not null default '',
  video_url text not null default '',
  image_url text not null default '',
  title text not null default '',
  summary text not null default '',
  raw_response jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists generations_user_id_idx on public.generations(user_id);
create index if not exists generations_created_at_idx on public.generations(created_at desc);
create index if not exists generations_brand_id_idx on public.generations(brand_id);

alter table public.generations enable row level security;

drop policy if exists "generations_select_own" on public.generations;
create policy "generations_select_own"
  on public.generations
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "generations_insert_own" on public.generations;
create policy "generations_insert_own"
  on public.generations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "generations_update_own" on public.generations;
create policy "generations_update_own"
  on public.generations
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "generations_delete_own" on public.generations;
create policy "generations_delete_own"
  on public.generations
  for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.handle_generations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_generations_updated_at on public.generations;

create trigger set_generations_updated_at
before update on public.generations
for each row
execute function public.handle_generations_updated_at();
