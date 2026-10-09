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
- Supabase (previsto para autenticação e banco de dados, ainda não configurado)

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

## Autenticação (provisória)

Enquanto o Supabase não é integrado, o login é **apenas de desenvolvimento**:
qualquer e-mail e senha entram, e a sessão fica salva no navegador (localStorage).
Para trocar pelo Supabase, crie uma implementação de `AuthService`
(`src/services/auth/authService.ts`) e aponte para ela em `src/services/auth/index.ts`.
As variáveis previstas estão em `.env.example`.

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
| `/entrar` | Login | público |
| `/cadastro` | Cadastro | público |
| `/recuperar-senha` | Recuperação de senha | público |
| `/privacidade` | Política de privacidade | público |
| `/termos` | Termos de uso | público |
| `/orientacoes-de-seguranca` | Orientações de segurança | público |
| `/contato` | Contato (provisório) | público |
| `/guia-visual` | Guia visual dos componentes | só em desenvolvimento |
| `/app` | Painel pessoal | logado |
| `/app/boas-vindas` | Onboarding da participante | logado |
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
  hooks/        useAuth, useDocumentTitle, useJourneyProgress
  services/     Serviços externos (autenticação; futuramente Supabase)
  providers/    Contextos React (sessão)
  types/        Tipos TypeScript
  styles/       theme.css (tokens), base.css (estilos globais) e index.css
  config/       Configurações do app, rotas e variáveis de ambiente
```

O alias `@/` aponta para `src/`.
