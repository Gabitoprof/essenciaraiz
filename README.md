# Essência Raiz | Consciência

Site e área da participante da mentoria feminina **Essência Raiz | Consciência**:
"Seu prazer pela vida de volta em 21 dias."

Todas as áreas estão implementadas. O que ainda depende de conteúdo ou de configuração (dias 4 a 21, áudios,
projeto Supabase, textos institucionais em rascunho) está listado em [docs/auditoria.md](docs/auditoria.md).

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React (ícones)
- Supabase (Auth e banco Postgres com RLS, `@supabase/supabase-js`), opcional: sem configuração, o site usa o modo demonstração

## Pré-requisitos

- Node.js 20.19 ou mais recente (testado com Node 22)
- npm

## Instalação e execução

```sh
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve a versão de produção localmente |
| `npm run lint` | Analisa o código com o oxlint |
| `npm run test:db` | Testa as migrations e as regras de acesso (RLS) num Postgres local, sem internet |

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` gera o site e publica no GitHub Pages a cada push em `main` ou
`base-landing-pages` (ou manualmente, em Actions > "Publicar no GitHub Pages" > Run workflow).
O endereço fica `https://<usuario>.github.io/<repositorio>/`, por exemplo https://gabitoprof.github.io/essenciaraiz/.

Configuração única no GitHub:

1. **Settings > Pages > Build and deployment > Source:** escolha **GitHub Actions**. A opção "Deploy from a branch"
   publica o código-fonte sem compilar e a página fica em branco.
2. **Settings > Environments > github-pages > Deployment branches and tags:** adicione `base-landing-pages`
   enquanto o site for publicado a partir desta branch. Por padrão só a branch principal pode publicar.
   Depois que o PR for incorporado à `main`, essa regra não é mais necessária.
3. Opcional, quando houver Supabase: em **Settings > Secrets and variables > Actions > Variables**, crie
   `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (valores públicos). Sem elas o site publica em modo demonstração.
   No Supabase, acrescente às Redirect URLs `https://gabitoprof.github.io/essenciaraiz/redefinir-senha` e
   `https://gabitoprof.github.io/essenciaraiz/app/boas-vindas`.

Como funciona: o build usa `BASE_PATH=/<repositorio>/` (o site fica em uma subpasta), o React Router usa esse caminho
como base e uma cópia do `index.html` vira `404.html`, para que abrir um endereço interno direto (ex.: `/essenciaraiz/app`)
carregue o app em vez da página de erro do GitHub. Para testar localmente: `BASE_PATH=/essenciaraiz/ npm run build`.

## Autenticação

A entrada da participante (cadastro, login, recuperação de senha e onboarding) funciona em dois modos,
escolhidos automaticamente em `src/services/auth/index.ts`:

| | Modo demonstração | Supabase Auth |
| --- | --- | --- |
| Quando | `VITE_SUPABASE_URL` ou `VITE_SUPABASE_ANON_KEY` vazias | As duas variáveis preenchidas |
| Contas | Só no localStorage deste navegador | No Supabase |
| Senha | Não é verificada nem guardada | Verificada pelo Supabase (nunca fica no site) |
| E-mails (confirmação e recuperação) | Não são enviados | Enviados pelo Supabase |
| Aviso na tela | Faixa "Modo demonstração" em todas as telas de conta | Nenhum |

O modo demonstração serve só para navegar e testar as telas. Ele **não é seguro** e não deve ser publicado
como se fosse uma plataforma real.

### Configurar o Supabase

1. Crie um projeto em https://supabase.com e copie a **Project URL** e a chave **anon / publishable**
   (Project Settings > API).
2. Copie `.env.example` para `.env.local` e preencha as duas variáveis. Reinicie o `npm run dev`.
3. Em **Authentication > URL Configuration**:
   - **Site URL**: o endereço do site (em desenvolvimento, `http://localhost:5173`).
   - **Redirect URLs**: inclua `http://localhost:5173/redefinir-senha` e `http://localhost:5173/app/boas-vindas`,
     e os mesmos caminhos no domínio de produção.
4. Em **Authentication > Sign In / Providers > Email**, decida se a confirmação de e-mail fica ligada.
   Ligada: após o cadastro aparece a tela "Confirme seu e-mail". Desligada: a participante entra direto no onboarding.
5. Opcional: traduza os modelos de e-mail para português em **Authentication > Emails** e configure um SMTP próprio
   (o envio padrão do Supabase tem limite baixo por hora).

Nunca coloque a chave `service_role` em variáveis `VITE_`: elas vão para o navegador.

### Como os dados ficam guardados

Perfil, progresso e diário ficam em tabelas do Supabase protegidas por **Row Level Security** (cada participante
só acessa os próprios registros). Esquema, regras, como aplicar a migration e testes estão em
[docs/banco-de-dados.md](docs/banco-de-dados.md). As rotas privadas do site (`ProtectedRoute`) só organizam a
navegação: quem protege os dados de verdade é o banco.

### O que foi testado e o que depende do Supabase real

- **Testado no navegador (modo demonstração):** validação dos formulários, mensagens de erro, estados de carregamento,
  mostrar/esconder senha, links entre as telas, onboarding com perguntas puladas, proteção de rotas, redirecionamentos,
  encerramento de sessão e acessibilidade (axe-core).
- **Testado contra um servidor falso que imita a API do Supabase Auth:** cadastro com e sem confirmação de e-mail,
  login com senha errada, sessão mantida ao recarregar, onboarding salvo na tabela `profiles`, troca de senha,
  e-mail duplicado, limite de tentativas e saída.
- **Ainda não testado com um projeto Supabase real:** envio e conteúdo dos e-mails, abertura dos links de confirmação
  e de recuperação (a sessão que volta pela URL), configuração de Redirect URLs e regras de senha do projeto.

## Painel e progresso

O painel (`/app`) mostra o dia atual, o tema, o progresso, as três práticas do dia (Despertar, Presença e Integrar)
e atalhos para as outras áreas. Os textos ficam em `src/data/dashboard.ts`.

O progresso só muda quando a participante usa os botões "Comecei esta prática" e "Marcar como concluída"
na página do dia. Abrir uma página não marca nada.

- **Regras** (`src/utils/journeyProgress.ts`): o dia 1 está sempre liberado; cada dia seguinte abre quando a prática
  da noite (Integrar) do dia anterior é concluída; um dia conta como concluído quando os três momentos foram concluídos.
  "Continuar minha jornada" leva à prática iniciada mais recente ou ao próximo momento não concluído do dia atual.
- **Onde fica guardado**: com o Supabase configurado, na tabela `practice_progress` (uma linha por dia e momento,
  protegida por RLS); no modo demonstração, só no localStorage deste navegador, e o painel avisa isso.
  As duas versões seguem o mesmo contrato (`ProgressService`).

## Jornada de 21 dias

Todos os dias usam uma única página (`src/pages/app/JourneyDayPage.tsx`), alimentada pelos dados em `src/data/journey/`:

- `index.ts`: as três semanas, a lista dos 21 dias com os títulos e `getJourneyDay`.
- `days/dia-01.ts` a `dia-03.ts`: conteúdo completo (tema, objetivo, introdução, manhã, microprática, reflexão noturna,
  pergunta de integração, escrita, roteiro do áudio noturno, durações e bases do conteúdo).
- Os dias 4 a 21 têm `status: 'pendente'`: aparecem com número, semana e título, e a página diz que o conteúdo
  está em preparação. Os momentos desses dias não podem ser marcados.

Para publicar um dia: copie `days/dia-01.ts`, escreva o conteúdo, troque a linha `pendingDay(...)` do dia em `index.ts`
e use `status: 'publicado'`. O formato de cada campo está em `src/types/journey.ts`.

Regras de conteúdo seguidas nos dias publicados: reflexões originais, sem frases atribuídas a autores; cada dia separa o
que é base científica, reflexão filosófica e prática experiencial; nenhuma promessa de cura ou transformação garantida;
meditações e visualizações apresentadas como práticas de bem-estar, com aviso de cuidado e link para as orientações de
segurança. Os áudios ainda não foram gravados: a página mostra o roteiro em texto e diz isso, sem player falso.

## Diário

`/app/diario` lista os registros; `/app/diario/novo` cria e `/app/diario/:id` edita ou exclui (com confirmação).
Cada registro tem texto, título opcional, dia da jornada opcional, pergunta opcional (`src/data/journalPrompts.ts`)
e datas de criação e atualização. "Exportar" baixa um arquivo `.txt` legível, gerado no próprio aparelho.
A página de cada dia tem "Escrever no diário", que abre um registro já com o dia e a pergunta de escrita.

O diário é tratado como conteúdo sensível: com o Supabase configurado, fica na tabela `journal_entries`, que só a
própria participante consegue ler ou alterar (RLS); no modo demonstração, só no localStorage deste navegador.
Nunca é registrado no console, não é público e não é enviado a terceiros.

## Perfil e privacidade

Em `/app/perfil` a participante edita nome e preferências, baixa todos os seus dados (`.json` com perfil, progresso
e diário) e exclui a conta com confirmação (no Supabase, pela função `delete_my_account`, que apaga tudo em cascata).
A política em `/privacidade` é um **rascunho para revisão** (`src/data/privacy.ts`): os campos entre colchetes
precisam ser preenchidos antes da publicação. Detalhes em [docs/banco-de-dados.md](docs/banco-de-dados.md).

## Biblioteca

- **Conteúdos** (`src/data/library/`): nove temas, cada um com uma etiqueta de evidência (base científica, ciência em
  desenvolvimento, filosofia, prática e tradição, evidência limitada) e um texto de limites. Os conteúdos com
  `status: 'publicado'` abrem em `/app/biblioteca/conteudos/:id`; os pendentes aparecem com "Em preparação" e sem link.
  Hoje há 4 publicados (neuroplasticidade, respiração lenta, óleos essenciais com segurança e física quântica) e 7 pendentes.
- **Áudios** (`src/data/library/audios.ts`): nenhum arquivo de áudio foi fornecido, então todos aparecem como
  "Em produção", sem player, com link para o roteiro no dia da jornada. Para publicar um áudio, salve o arquivo em
  `public/audios/`, preencha `src`, a duração real e use `status: 'publicado'`. O player (`AudioPlayer`) usa os controles
  nativos do navegador, mostra carregamento e erro com "Tentar novamente" e retoma de onde parou neste aparelho.
  Ele foi testado com um arquivo de teste gerado só para o teste (não incluído no projeto). No guia visual, ele aparece
  se existir `public/audios/teste-guia.mp3`.

## Identidade visual

- **Tokens** (cores, tipografia, espaçamentos, raios, sombras e movimento): `src/styles/theme.css`.
  Mudar um valor ali muda o site inteiro. As regras de contraste estão comentadas no arquivo.
- **Fontes**: Cormorant Garamond (títulos) e Inter (textos), instaladas pelo npm e servidas pelo próprio site,
  sem depender do Google Fonts.
- **Guia visual**: com `npm run dev`, abra http://localhost:5173/guia-visual para ver cores, tipografia
  e todos os componentes. Essa página não existe na versão de produção.

Componentes reutilizáveis:

| Componente | Onde fica | Uso |
| --- | --- | --- |
| `Button`, `ButtonLink` | `components/ui` | Botões primário, secundário e discreto; `ButtonLink` para navegação |
| `TextField`, `TextAreaField` | `components/ui` | Campos com rótulo, dica e erro acessíveis (cadastro, login, diário) |
| `Card` | `components/ui` | Superfície base dos cartões (tons claro, bege e verde) |
| `ContentCard` | `components/journey` | Áudios, leituras e práticas (biblioteca e página do dia) |
| `DailyPracticeCard` | `components/journey` | Prática do dia com status: concluído, hoje, disponível, em breve |
| `PracticeMomentCard`, `PracticeMomentSection` | `components/journey` | Despertar, Presença e Integrar com o estado registrado (disponível, iniciado, concluído) |
| `JourneyOverviewCard`, `ShortcutCard` | `components/dashboard` | Cartão principal e atalhos do painel |
| `ProgressIndicator` | `components/ui` | Barra de progresso acessível, com pontos opcionais para os 21 dias |
| `Badge`, `Eyebrow` | `components/ui` | Etiquetas de status e sobretítulos |
| `Container`, `Section`, `PageHeader` | `components/ui` | Largura de página, faixas com fundo e títulos de página |
| `PublicHeader`, `SiteFooter` | `components/navigation` | Cabeçalho e rodapé das páginas públicas |
| `LoadingState`, `ErrorState`, `EmptyState` | `components/feedback` | Estados de carregamento, erro e conteúdo vazio |
| `LeafMark`, `BotanicalDivider`, `RootLines` | `components/decor` | Ornamentos de folhas e raízes, sempre decorativos |

## Página inicial

Os textos ficam em `src/data/home.ts` e cada seção é um componente em `src/components/home`.
As âncoras `/#como-funciona`, `/#a-jornada` e `/#perguntas-frequentes` são usadas pelo menu.

Para colocar a foto da seção principal, salve o arquivo em `public/imagens/` e informe o caminho
em `hero.image.src` (ex.: `'/imagens/hero.jpg'`), com uma descrição em `hero.image.alt`.
Enquanto não houver foto, aparece um espaço reservado com a mesma proporção (4:5).

## Rotas

| Caminho | Página | Acesso |
| --- | --- | --- |
| `/` | Página inicial pública | público |
| `/entrar` | Login | só visitantes |
| `/cadastro` | Cadastro | só visitantes |
| `/recuperar-senha` | Recuperação de senha | público |
| `/redefinir-senha` | Nova senha (link do e-mail) | público, exige o link do Supabase |
| `/privacidade` | Política de privacidade (rascunho para revisão) | público |
| `/termos` | Termos de uso (rascunho para revisão) | público |
| `/orientacoes-de-seguranca` | Orientações de segurança | público |
| `/contato` | Contato (rascunho com campos a preencher) | público |
| `/guia-visual` | Guia visual dos componentes | só em desenvolvimento |
| `/app` | Painel pessoal | logado, após o onboarding |
| `/app/boas-vindas` | Onboarding da participante | logado, até concluir |
| `/app/jornada` | Jornada dos 21 dias | logado |
| `/app/jornada/dia/:dia` | Página de cada dia | logado |
| `/app/biblioteca` | Biblioteca (conteúdos e áudios) | logado |
| `/app/biblioteca/audios` | Biblioteca de áudios | logado |
| `/app/biblioteca/conteudos` | Biblioteca de conteúdos | logado |
| `/app/biblioteca/conteudos/:id` | Conteúdo da biblioteca | logado |
| `/app/diario` | Diário: lista de registros | logado |
| `/app/diario/novo` | Novo registro | logado |
| `/app/diario/:id` | Editar ou excluir registro | logado |
| `/app/progresso` | Minha evolução (números, semanas e últimas práticas) | logado |
| `/app/perfil` | Perfil e configurações | logado |

Todos os caminhos ficam em `src/config/routes.ts`.

## Estrutura de pastas

```
src/
  app/          App, definição das rotas e proteção da área logada
  pages/        Uma pasta por área: public, auth, app, legal, dev
  components/   Componentes reutilizáveis (ui, navigation, feedback, journey, home, decor)
  layouts/      Layout público, de autenticação e da área da participante
  data/         Conteúdo separado da apresentação: textos da home, jornada (data/journey), painel, menus
  hooks/        useAuth, useDocumentTitle, useFormErrors, useJourneyProgress
  utils/        Validações de formulário e redirecionamento após o login
  services/     Autenticação, progresso e diário: versão Supabase e versão local (demonstração)
  providers/    Contextos React (sessão e progresso)
  types/        Tipos TypeScript
  styles/       theme.css (tokens), base.css (estilos globais) e index.css
  config/       Configurações do app, rotas e variáveis de ambiente
supabase/
  migrations/   Esquema do banco, RLS e políticas (versionado)
  tests/        Testes das políticas com PGlite (npm run test:db)
docs/           Banco de dados e privacidade
```

O alias `@/` aponta para `src/`.
