-- Kør dette i Supabase -> SQL Editor

create table markers (
  id bigint generated always as identity primary key,
  titel text,
  latitude float8,
  longitude float8
);

-- Slå Row Level Security til
alter table markers enable row level security;

-- Kun brugere der er logget ind må læse, tilføje og slette
create policy "Logget ind kan læse" on markers for select to authenticated using (true);
create policy "Logget ind kan tilføje" on markers for insert to authenticated with check (true);
create policy "Logget ind kan slette" on markers for delete to authenticated using (true);
