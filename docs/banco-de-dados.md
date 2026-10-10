# Banco de dados e privacidade (Supabase)

Este documento descreve onde ficam os dados das participantes, o esquema do banco, as regras de acesso
(Row Level Security), as variáveis de ambiente e como aplicar e testar tudo.

> **Situação atual:** o código está pronto para o Supabase, mas **nenhum projeto Supabase real foi criado ou
> configurado**. Enquanto as variáveis `VITE_SUPABASE_*` estiverem vazias, o site roda em **modo demonstração**
> e tudo fica só no navegador. Os passos da seção [Ativar](#ativar-o-supabase-passo-a-passo) dependem de quem
> administra o projeto.

## Onde os dados ficam

| Dado | Modo demonstração (sem Supabase) | Com Supabase configurado |
| --- | --- | --- |
| Conta (e-mail, senha) | localStorage `essencia-raiz:demo:contas`, sem senha | Supabase Auth (senha nunca passa pelo nosso código além do envio) |
| Sessão | localStorage `essencia-raiz:demo:sessao` | localStorage `sb-<projeto>-auth-token` (gerido pelo supabase-js) |
| Perfil e onboarding | dentro da conta de demonstração | tabela `profiles` |
| Progresso da jornada | localStorage `essencia-raiz:progresso:<id>` | tabela `practice_progress` |
| Diário | localStorage `essencia-raiz:diario:<id>` | tabela `journal_entries` |
| Posição dos áudios | localStorage `essencia-raiz:audio-posicao:<áudio>` | igual (não é dado pessoal; fica no aparelho) |
| Conteúdos e áudios (metadados) | arquivos em `src/data/` | arquivos em `src/data/` (as tabelas `library_*` e `audio_practices` já existem para uma futura gestão pelo painel) |

A escolha é automática: `src/services/{auth,progress,journal}/index.ts` usam a versão Supabase quando
`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão preenchidas. As páginas só conhecem o contrato de cada serviço.

A interface só diz "salvo apenas neste navegador" no modo demonstração. Com o Supabase, os textos dizem que os
dados ficam na conta.

## Esquema

Migration: [`supabase/migrations/20261010120000_esquema_inicial.sql`](../supabase/migrations/20261010120000_esquema_inicial.sql)

| Tabela | Chave | Principais colunas e restrições |
| --- | --- | --- |
| `profiles` | `id` → `auth.users.id` (cascade) | `display_name` (≤ 80), `preferred_name` (≤ 60), `intention` (lista fechada), `availability` (`manha`/`tarde`/`noite`/`varia`), `onboarding_completed` |
| `participant_settings` | `user_id` → `auth.users.id` (cascade) | `audio_resume` (preparada para novas preferências) |
| `practice_progress` | (`user_id`, `day`, `moment`) | `day` 1 a 21, `moment` `despertar`/`presenca`/`integrar`, `state` `iniciado`/`concluido`, `started_at`, `completed_at` (obrigatória só quando concluída) |
| `journal_entries` | `id` uuid | `user_id` (padrão `auth.uid()`), `title` (≤ 120), `body` (1 a 20 000 caracteres, sem só espaços), `day` 1 a 21, `prompt` (≤ 500) |
| `library_categories` | `id` texto | nome, nível de evidência, descrição, limites, ordem |
| `library_articles` | `id` texto | categoria, título, resumo, `status`, `sections` (jsonb) |
| `audio_practices` | `id` texto | título, `status`, `duration_seconds`, `file_path` (obrigatório para publicar), `related_day` |

Todas as tabelas têm `created_at`/`updated_at` (atualizado por gatilho). Ao criar uma conta, o gatilho
`handle_new_user` cria o perfil (com o nome informado no cadastro) e as configurações.

## Regras de acesso (RLS)

- **RLS ligado em todas as tabelas.** Quem protege os dados é o banco, não o site.
- **Visitantes sem login (`anon`): nenhum acesso** a nenhuma tabela.
- **Dados pessoais** (`profiles`, `participant_settings`, `practice_progress`, `journal_entries`): políticas
  separadas de leitura, criação, edição e exclusão, todas com `auth.uid() = user_id` (ou `= id` no perfil).
  Uma conta não lê, não altera, não apaga e não cria registros em nome de outra.
- **Colunas protegidas:** a participante só pode editar as colunas de conteúdo (ex.: não pode trocar `id`,
  `user_id` ou datas de criação).
- **Perfil não é apagado diretamente:** a exclusão acontece pela função `delete_my_account()`, que apaga a conta
  em `auth.users` e, em cascata, perfil, configurações, progresso e diário. Só a própria participante logada pode
  chamá-la.
- **Conteúdos:** participantes logadas leem categorias e apenas itens `publicado`. Ninguém escreve pelo site;
  a edição é feita no painel do Supabase.
- **Chave `service_role`:** ignora o RLS e por isso **nunca** vai para o site nem para variáveis `VITE_`.

## Variáveis de ambiente

| Variável | Onde | Valor |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `.env.local` (local) e variáveis do GitHub/hospedagem | Project URL (Project Settings > API) |
| `VITE_SUPABASE_ANON_KEY` | idem | chave pública `anon` ou `sb_publishable_...` |

São valores públicos por natureza (vão para o navegador); a segurança vem do RLS. No GitHub Pages, cadastre-as em
**Settings > Secrets and variables > Actions > Variables** (o workflow já as lê).

## Ativar o Supabase (passo a passo)

1. Crie o projeto em https://supabase.com (escolha a região mais próxima das participantes, ex.: São Paulo).
2. **Aplique a migration**, por um dos caminhos:
   - **Painel:** SQL Editor > New query > cole todo o conteúdo de
     `supabase/migrations/20261010120000_esquema_inicial.sql` > Run.
   - **Supabase CLI:** `npx supabase login`, `npx supabase link --project-ref <ref-do-projeto>`,
     `npx supabase db push`.
3. Confira em **Table Editor** que as 7 tabelas aparecem com o selo "RLS enabled".
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (local e na hospedagem) e configure Auth conforme o
   README (Site URL, Redirect URLs, confirmação de e-mail).
5. Faça o teste manual abaixo com duas contas.

Contas criadas antes da migration continuam funcionando: o site cria o perfil na primeira edição. Se o site for
ligado ao Supabase antes de a migration ser aplicada, o perfil cai temporariamente no `user_metadata`, mas
progresso e diário mostram erro até as tabelas existirem.

## Testes

- **`npm run test:db`** roda a migration num Postgres local (PGlite, sem internet e sem projeto Supabase) e verifica
  8 cenários: criação automática do perfil, isolamento de perfis, diário (ler, editar, excluir e criar em nome de
  outra conta), restrições do diário, regras do progresso, bloqueio total para visitantes, visibilidade só do
  conteúdo publicado e exclusão de conta em cascata sem afetar outra conta.
  O arquivo `supabase/tests/supabase-stub.sql` simula o mínimo do Supabase para isso e **não deve ser aplicado**
  num projeto real.
- **Testado no navegador contra um servidor falso** que executa a mesma migration com RLS: onboarding gravado em
  `profiles`, progresso e diário gravados e relidos após recarregar, edição do perfil, exportação, erro de conexão
  ao salvar (o texto não se perde), segunda conta sem acesso aos dados da primeira (nem pela API direta) e
  exclusão de conta.
- **Ainda não testado num projeto Supabase real.** Depois de ativar, faça este roteiro:
  1. Crie a conta A, conclua o onboarding, marque uma prática e escreva no diário.
  2. Em outro navegador (ou janela anônima), crie a conta B: o diário e o progresso devem aparecer vazios.
  3. Em Table Editor, confira que as linhas de A têm o `user_id` de A.
  4. Em Perfil, baixe os dados de A e depois exclua a conta A: as linhas de A somem; as de B continuam.

## Privacidade (LGPD)

- Em **Perfil e configurações** a participante consulta e edita seus dados, baixa uma cópia completa (JSON com
  perfil, progresso e diário) e exclui a conta com confirmação.
- O diário nunca é registrado no console, não é público e não é enviado a terceiros.
- A página `/privacidade` traz um **rascunho para revisão**: os trechos entre colchetes (responsável, contato,
  fornecedores, retenção de backups) precisam ser preenchidos e o texto deve passar por revisão jurídica antes
  da publicação.
