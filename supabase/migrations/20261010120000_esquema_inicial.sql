-- Essência Raiz | Consciência: esquema inicial do banco (Supabase / Postgres).
--
-- Dados pessoais (profiles, participant_settings, practice_progress, journal_entries):
--   Row Level Security ligada; cada participante só lê, cria, edita e exclui os próprios registros.
--   Visitantes sem login (papel anon) não têm nenhum acesso.
-- Conteúdos (library_categories, library_articles, audio_practices):
--   leitura para participantes logadas; escrita só pelo painel do Supabase (service role), nunca pelo site.
--
-- A chave service_role ignora o RLS: ela nunca deve ir para o site (variáveis VITE_).

-- ---------------------------------------------------------------------------
-- Utilitários
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Perfis e onboarding (1 linha por conta, criada automaticamente no cadastro)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  preferred_name text check (char_length(preferred_name) <= 60),
  intention text check (intention in ('presenca', 'cuidado', 'padroes', 'prazer', 'curiosidade')),
  availability text check (availability in ('manha', 'tarde', 'noite', 'varia')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfil da participante e respostas do onboarding (todas opcionais). Sem dados médicos ou íntimos.';

-- Configurações da experiência. Hoje só a retomada de áudios; preparada para novas opções.
create table public.participant_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  audio_resume boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Progresso da jornada: uma linha por dia e momento que a participante iniciou ou concluiu
-- ---------------------------------------------------------------------------

create table public.practice_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  day smallint not null check (day between 1 and 21),
  moment text not null check (moment in ('despertar', 'presenca', 'integrar')),
  state text not null check (state in ('iniciado', 'concluido')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, day, moment),
  -- "concluido" sempre tem data de conclusão; "iniciado" nunca tem.
  constraint practice_progress_completed_at_matches_state check ((state = 'concluido') = (completed_at is not null))
);

comment on table public.practice_progress is 'Estado de cada prática (Despertar, Presença, Integrar) de cada dia. Sem linha = disponível.';

-- ---------------------------------------------------------------------------
-- Diário (conteúdo sensível)
-- ---------------------------------------------------------------------------

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text check (char_length(title) <= 120),
  body text not null check (char_length(btrim(body)) between 1 and 20000),
  day smallint check (day between 1 and 21),
  prompt text check (char_length(prompt) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index journal_entries_user_updated_idx on public.journal_entries (user_id, updated_at desc);

comment on table public.journal_entries is 'Diário da participante. Privado: nunca público, nunca usado para publicidade, nunca enviado a terceiros.';

-- ---------------------------------------------------------------------------
-- Metadados de conteúdos e áudios (iguais para todas as participantes)
-- ---------------------------------------------------------------------------

create table public.library_categories (
  id text primary key,
  name text not null,
  evidence text not null check (evidence in ('ciencia', 'ciencia-em-desenvolvimento', 'filosofia', 'pratica-tradicional', 'evidencia-limitada')),
  description text not null default '',
  limits text not null default '',
  sort_order smallint not null default 0
);

create table public.library_articles (
  id text primary key,
  category_id text not null references public.library_categories (id) on update cascade,
  title text not null,
  summary text not null default '',
  status text not null default 'pendente' check (status in ('publicado', 'pendente')),
  reading_minutes smallint check (reading_minutes > 0),
  -- Seções: [{ "heading": "...", "paragraphs": ["..."] }]
  sections jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audio_practices (
  id text primary key,
  title text not null,
  description text not null default '',
  category text not null,
  status text not null default 'pendente' check (status in ('publicado', 'pendente')),
  -- Só preenchida com a duração real do arquivo.
  duration_seconds integer check (duration_seconds > 0),
  -- Caminho do arquivo (ex.: no Supabase Storage). Obrigatório para publicar.
  file_path text,
  related_day smallint check (related_day between 1 and 21),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audio_practices_published_needs_file check (status <> 'publicado' or file_path is not null)
);

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger participant_settings_set_updated_at before update on public.participant_settings
  for each row execute function public.set_updated_at();
create trigger practice_progress_set_updated_at before update on public.practice_progress
  for each row execute function public.set_updated_at();
create trigger journal_entries_set_updated_at before update on public.journal_entries
  for each row execute function public.set_updated_at();
create trigger library_articles_set_updated_at before update on public.library_articles
  for each row execute function public.set_updated_at();
create trigger audio_practices_set_updated_at before update on public.audio_practices
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Cadastro: cria o perfil e as configurações da nova conta
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(btrim(coalesce(new.raw_user_meta_data ->> 'display_name', '')), 80));
  insert into public.participant_settings (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Exclusão da conta pela própria participante (apaga tudo em cascata)
-- ---------------------------------------------------------------------------

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'É preciso estar logada para excluir a conta.' using errcode = '28000';
  end if;
  delete from auth.users where id = current_user_id;
end;
$$;

revoke all on function public.delete_my_account() from public;
revoke all on function public.delete_my_account() from anon;
grant execute on function public.delete_my_account() to authenticated;

revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Permissões e Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.participant_settings enable row level security;
alter table public.practice_progress enable row level security;
alter table public.journal_entries enable row level security;
alter table public.library_categories enable row level security;
alter table public.library_articles enable row level security;
alter table public.audio_practices enable row level security;

-- Visitantes sem login não tocam em nada.
revoke all on public.profiles, public.participant_settings, public.practice_progress, public.journal_entries,
  public.library_categories, public.library_articles, public.audio_practices from anon;

-- Participantes logadas: só o que cada tabela precisa (o RLS decide quais linhas).
revoke all on public.profiles, public.participant_settings, public.practice_progress, public.journal_entries,
  public.library_categories, public.library_articles, public.audio_practices from authenticated;
grant select, insert on public.profiles to authenticated;
grant update (display_name, preferred_name, intention, availability, onboarding_completed) on public.profiles to authenticated;
grant select, insert on public.participant_settings to authenticated;
grant update (audio_resume) on public.participant_settings to authenticated;
grant select, insert, update, delete on public.practice_progress to authenticated;
grant select, insert, delete on public.journal_entries to authenticated;
grant update (title, body, day, prompt) on public.journal_entries to authenticated;
grant select on public.library_categories, public.library_articles, public.audio_practices to authenticated;

-- profiles: ler, criar (se o gatilho não tiver criado) e editar só o próprio. Exclusão: só via delete_my_account.
create policy "profiles: ler o próprio" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles: criar o próprio" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "profiles: editar o próprio" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- participant_settings
create policy "settings: ler as próprias" on public.participant_settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "settings: criar as próprias" on public.participant_settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "settings: editar as próprias" on public.participant_settings
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- practice_progress
create policy "progresso: ler o próprio" on public.practice_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "progresso: criar o próprio" on public.practice_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "progresso: editar o próprio" on public.practice_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "progresso: excluir o próprio" on public.practice_progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- journal_entries
create policy "diário: ler os próprios registros" on public.journal_entries
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "diário: criar registros próprios" on public.journal_entries
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "diário: editar os próprios registros" on public.journal_entries
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "diário: excluir os próprios registros" on public.journal_entries
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Conteúdos: participantes logadas leem categorias e só o que está publicado.
create policy "categorias: leitura" on public.library_categories
  for select to authenticated using (true);
create policy "conteúdos: leitura dos publicados" on public.library_articles
  for select to authenticated using (status = 'publicado');
create policy "áudios: leitura dos publicados" on public.audio_practices
  for select to authenticated using (status = 'publicado');
