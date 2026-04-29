create table if not exists ar_achievements (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  category text not null,
  title text not null,
  date text,
  description text,
  impact text,
  tags text[] default '{}',
  employer text,
  created_at timestamptz default now()
);

create table if not exists ar_books (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  title text not null,
  author text,
  date_read text,
  key_takeaway text,
  rating integer,
  created_at timestamptz default now()
);

alter table ar_achievements enable row level security;
alter table ar_books enable row level security;

create policy "Public insert — ar_achievements" on ar_achievements for insert using (true) with check (true);
create policy "Public read by email — ar_achievements" on ar_achievements for select using (true);
create policy "Public insert — ar_books" on ar_books for insert using (true) with check (true);
create policy "Public read by email — ar_books" on ar_books for select using (true);
