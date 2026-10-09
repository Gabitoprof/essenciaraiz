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
  pages/        Uma pasta por área: public, auth, app, legal
  components/   Componentes reutilizáveis (ui, navigation, feedback, home)
  layouts/      Layout público, de autenticação e da área da participante
  data/         Conteúdo separado da apresentação: textos da home, jornada, menus
  hooks/        useAuth, useDocumentTitle
  services/     Serviços externos (autenticação; futuramente Supabase)
  providers/    Contextos React (sessão)
  types/        Tipos TypeScript
  styles/       CSS global e tema do Tailwind (cores e fontes)
  config/       Configurações do app, rotas e variáveis de ambiente
```

O alias `@/` aponta para `src/`.
