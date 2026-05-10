-- Run this in Supabase SQL editor before using the new Brands flow.

create extension if not exists pgcrypto;

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  brand_name text not null,
  tagline text not null default '',
  tone text not null default '',
  palette jsonb not null default '[]'::jsonb,
  audience jsonb not null default '[]'::jsonb,
  logo jsonb not null default '{}'::jsonb,
  mascot jsonb not null default '{}'::jsonb,
  brand_references jsonb not null default '[]'::jsonb,
  completed_setup boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists brands_user_id_idx on public.brands(user_id);
create index if not exists brands_updated_at_idx on public.brands(updated_at desc);

alter table public.brands enable row level security;

drop policy if exists "brands_select_own" on public.brands;
create policy "brands_select_own"
  on public.brands
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "brands_insert_own" on public.brands;
create policy "brands_insert_own"
  on public.brands
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "brands_update_own" on public.brands;
create policy "brands_update_own"
  on public.brands
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "brands_delete_own" on public.brands;
create policy "brands_delete_own"
  on public.brands
  for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.handle_brands_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_brands_updated_at on public.brands;

create trigger set_brands_updated_at
before update on public.brands
for each row
execute function public.handle_brands_updated_at();