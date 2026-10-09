# Essência Raiz | Consciência

Site e área da participante da mentoria feminina **Essência Raiz | Consciência**:
"Seu prazer pela vida de volta em 21 dias."

Esta é a fundação técnica do projeto. As rotas, layouts e a estrutura já existem;
a maior parte das páginas ainda mostra conteúdo provisório.

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React (ícones)
- Supabase Auth (`@supabase/supabase-js`), opcional: sem configuração, o site usa o modo demonstração

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

- Nome de exibição, onboarding concluído e respostas do onboarding (como prefere ser chamada, intenção e período)
  ficam em `user_metadata` do usuário no Supabase Auth. Isso basta por enquanto, mas a própria usuária pode alterar
  esses campos, então eles não servem para decidir permissões.
- Quando houver dados próprios da jornada (diário, progresso), crie tabelas com **Row Level Security** ligada e
  políticas do tipo `auth.uid() = user_id`. As rotas privadas do site (`ProtectedRoute`) só organizam a navegação:
  quem protege os dados de verdade é o Supabase.

### O que foi testado e o que depende do Supabase real

- **Testado no navegador (modo demonstração):** validação dos formulários, mensagens de erro, estados de carregamento,
  mostrar/esconder senha, links entre as telas, onboarding com perguntas puladas, proteção de rotas, redirecionamentos,
  encerramento de sessão e acessibilidade (axe-core).
- **Testado contra um servidor falso que imita a API do Supabase Auth:** cadastro com e sem confirmação de e-mail,
  login com senha errada, sessão mantida ao recarregar, onboarding salvo em `user_metadata`, troca de senha,
  e-mail duplicado, limite de tentativas e saída.
- **Ainda não testado com um projeto Supabase real:** envio e conteúdo dos e-mails, abertura dos links de confirmação
  e de recuperação (a sessão que volta pela URL), configuração de Redirect URLs e regras de senha do projeto.

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
| `/privacidade` | Política de privacidade | público |
| `/termos` | Termos de uso | público |
| `/orientacoes-de-seguranca` | Orientações de segurança | público |
| `/contato` | Contato (provisório) | público |
| `/guia-visual` | Guia visual dos componentes | só em desenvolvimento |
| `/app` | Painel pessoal | logado, após o onboarding |
| `/app/boas-vindas` | Onboarding da participante | logado, até concluir |
| `/app/jornada` | Jornada dos 21 dias | logado |
| `/app/jornada/dia/:dia` | Página de cada dia | logado |
| `/app/biblioteca` | Biblioteca de áudios e conteúdos | logado |
| `/app/diario` | Diário de reflexão | logado |
| `/app/progresso` | Acompanhamento de progresso | logado |
| `/app/perfil` | Perfil e configurações | logado |

Todos os caminhos ficam em `src/config/routes.ts`.

## Estrutura de pastas

```
src/
  app/          App, definição das rotas e proteção da área logada
  pages/        Uma pasta por área: public, auth, app, legal, dev
  components/   Componentes reutilizáveis (ui, navigation, feedback, journey, home, decor)
  layouts/      Layout público, de autenticação e da área da participante
  data/         Conteúdo separado da apresentação: textos da home, jornada, menus
  hooks/        useAuth, useDocumentTitle, useFormErrors, useJourneyProgress
  utils/        Validações de formulário e redirecionamento após o login
  services/     Autenticação: contrato, Supabase Auth e modo demonstração
  providers/    Contextos React (sessão)
  types/        Tipos TypeScript
  styles/       theme.css (tokens), base.css (estilos globais) e index.css
  config/       Configurações do app, rotas e variáveis de ambiente
```

O alias `@/` aponta para `src/`.
