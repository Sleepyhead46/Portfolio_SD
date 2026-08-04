-- ============================================================
-- Samyak Deshar Portfolio — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Create the contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Policy: allow anyone to INSERT a new contact message (public form)
create policy "Allow public insert contact_messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Policy: only authenticated admins can SELECT messages
create policy "Allow authenticated select contact_messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

