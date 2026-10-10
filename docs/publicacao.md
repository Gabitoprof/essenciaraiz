# Publicação em produção

Guia para colocar a Essência Raiz | Consciência no ar com contas e dados reais.

## Situação hoje (10/10/2026)

| | Situação |
| --- | --- |
| **Projeto preparado** | Sim. Arquivos da Vercel (`vercel.json`) e da Netlify (`netlify.toml`), com rotas do React Router, cabeçalhos de segurança e cache. Conferência das variáveis antes do build (`npm run build:producao`), metadados, ícones, página 404 e tela de erro. |
| **Build validado** | Sim, localmente. O build de produção foi testado num servidor que imita a Vercel, com os mesmos cabeçalhos e a política de segurança (CSP) e um Supabase simulado: cadastro, login, recuperação de senha, jornada, diário, perfil, exclusão de conta e isolamento entre contas passaram. |
| **Site de produção publicado** | **Não.** Nenhuma conta na Vercel, na Netlify ou no Supabase foi criada ou alterada. |
| **GitHub Pages** | Está no ar em **modo demonstração**: https://gabitoprof.github.io/essenciaraiz/. É uma vitrine para testar as telas: os dados ficam só no navegador e o site pede aos buscadores para não indexá-lo. **Não é o site de produção.** |

## 1. Passo a passo de publicação

A recomendação é a **Vercel**: plano gratuito, publica sozinha a cada envio para o GitHub e cria uma prévia para
cada PR. A Netlify funciona igual; os dois arquivos de configuração já estão no projeto, então basta escolher uma.

### 1.1 Supabase de produção (uma vez)

1. Crie um projeto em https://supabase.com com o nome `essencia-raiz-producao` e a região **South America (São Paulo)**.
   Guarde a senha do banco num gerenciador de senhas.
2. **Banco:** abra o SQL Editor, cole todo o arquivo `supabase/migrations/20261010120000_esquema_inicial.sql` e clique em Run.
   Em Table Editor, confira as 7 tabelas com o selo "RLS enabled".
3. **Chaves:** em Project Settings > API, copie a **Project URL** e a chave **anon** (ou `sb_publishable_...`).
   Nunca copie a `service_role` nem a `sb_secret_...` para nenhum lugar do site.
4. **Authentication > URL Configuration** (preencha depois de saber o domínio, passo 1.2):
   - **Site URL:** `https://SEU-DOMINIO`
   - **Redirect URLs:** `https://SEU-DOMINIO/app/boas-vindas` e `https://SEU-DOMINIO/redefinir-senha`.
     Para as prévias da Vercel, adicione também `https://*-SEU-USUARIO.vercel.app/**`.
5. **Authentication > Sign In / Providers > Email:** deixe a **confirmação de e-mail ligada**. Em Password, exija
   pelo menos 8 caracteres e ligue a proteção contra senhas vazadas, se o plano permitir.
6. **Authentication > Emails:** traduza os modelos (confirmação, recuperação, troca de e-mail) para português e
   configure um **SMTP próprio** (ex.: Resend, Brevo). O envio padrão do Supabase tem limite baixo por hora e não
   serve para lançamento.
7. **Plano e cópias de segurança:** o plano gratuito pausa o projeto depois de uma semana sem uso e não tem backups
   para restaurar. Para dados reais de participantes, considere o plano pago (backups diários).

### 1.2 Hospedagem na Vercel

1. Entre em https://vercel.com com a conta do GitHub e clique em **Add New > Project**. Escolha o repositório `Gabitoprof/essenciaraiz`.
2. A Vercel lê o `vercel.json`: o framework é Vite, o build é `npm run build:producao` e a pasta é `dist`. Não mude nada.
3. Em **Environment Variables**, cadastre as 3 variáveis da seção 2, marcando **Production**. Para as prévias, use
   **Preview** com um projeto Supabase de testes, se tiver um.
4. Clique em **Deploy**. Se faltar alguma variável, o build para com a mensagem "Build de produção interrompido".
   Isso é de propósito: impede publicar o modo demonstração.
5. **Domínio:** em Settings > Domains, adicione o seu (ex.: `essenciaraiz.com.br`) e siga as instruções de DNS.
   O HTTPS é automático.
6. Volte ao Supabase (passo 1.1.4) e preencha o Site URL e as Redirect URLs com o domínio final.
7. Atualize `VITE_SITE_URL` na Vercel com o domínio final e faça um novo deploy (Deployments > ... > Redeploy).
8. **Branch de produção:** em Settings > Git, a branch de produção é `main`. Enquanto o trabalho estiver no PR #1,
   a Vercel cria só prévias. O site de produção sai quando o PR for mesclado na `main`.

### 1.3 Alternativa: Netlify

1. Em https://app.netlify.com, clique em **Add new site > Import an existing project > GitHub** e escolha o repositório.
2. O `netlify.toml` já define o build (`npm run build:producao`), a pasta (`dist`), o Node 22, as rotas e os cabeçalhos.
3. Em **Site configuration > Environment variables**, cadastre as 3 variáveis da seção 2.
4. Faça o deploy, configure o domínio em **Domain management** e siga os passos 1.1.4 e 1.2.6 e 1.2.7 com o domínio da Netlify.

### 1.4 GitHub Pages depois do lançamento

O workflow "Publicar no GitHub Pages" continua publicando o **modo demonstração** a cada envio para `main` e
`base-landing-pages`. **Não cadastre as variáveis do Supabase de produção no GitHub**: isso transformaria o Pages
num segundo site de produção, sem os cabeçalhos de segurança, que o GitHub Pages não permite configurar.
Quando a produção estiver no ar, você pode manter o Pages como vitrine ou desligá-lo em Settings > Pages.

## 2. Variáveis de ambiente

| Variável | Obrigatória em produção | Valor | Onde fica |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Sim | Project URL do Supabase (`https://xxxx.supabase.co`) | painel da hospedagem; `.env.local` no seu computador |
| `VITE_SUPABASE_ANON_KEY` | Sim | chave pública `anon` ou `sb_publishable_...` | idem |
| `VITE_SITE_URL` | Recomendada | endereço final, sem barra no fim (`https://essenciaraiz.com.br`) | idem |

- Os três valores são públicos por natureza, porque vão para o navegador. A segurança dos dados vem do RLS.
- **Desenvolvimento:** use `.env.local`, que não vai para o Git. Copie de `.env.example`. Se deixar vazio, o site roda em modo demonstração.
- **Produção:** os valores ficam só no painel da hospedagem. Use projetos Supabase diferentes para testes e para
  produção, assim os testes nunca tocam dados reais.
- **Nunca** use as chaves `service_role` ou `sb_secret_...` em variáveis `VITE_`. O `npm run build:producao`
  recusa as duas.

## 3. Comandos de build e verificação

```sh
npm ci                    # instala exatamente as versões do package-lock.json (Node 22, veja .nvmrc)
npm run lint              # análise do código
npm run test:db           # testa a migration e as regras de acesso (RLS) num Postgres local
npm run build             # build comum (sem variáveis = modo demonstração)
npm run build:producao    # confere as variáveis de produção e faz o build; é o que a Vercel e a Netlify rodam
npm run preview           # serve o build localmente em http://localhost:4173
```

Depois de publicar, confira no navegador:
- Abra um endereço interno direto (ex.: `/app/jornada`) e recarregue a página: ela deve abrir, não dar 404 da hospedagem.
- Abra um endereço que não existe (ex.: `/qualquer-coisa`): deve aparecer "Este caminho não existe".
- **Cabeçalhos:** em DevTools > Network, clique no documento e confira em Response Headers que aparecem
  `content-security-policy`, `x-frame-options: DENY` e `strict-transport-security`.
- A faixa "Modo demonstração" **não** deve aparecer. Se aparecer, faltam as variáveis do Supabase.

## 4. Configurações que ainda precisam ser feitas manualmente

- [ ] Criar o projeto Supabase de produção, aplicar a migration e conferir o RLS (1.1).
- [ ] Configurar Auth: Site URL, Redirect URLs, confirmação de e-mail, regras de senha, modelos de e-mail em português e SMTP próprio (1.1).
- [ ] Criar o projeto na Vercel (ou Netlify), cadastrar as 3 variáveis e o domínio (1.2).
- [ ] Mesclar o PR #1 na `main` quando decidir lançar.
- [ ] Preencher os campos entre colchetes em `src/data/privacy.ts` e `src/data/institutional.ts` (responsável,
      CPF/CNPJ, e-mail, idade mínima, pagamento e reembolso, foro) e passar os textos por revisão jurídica.
- [ ] Revisar as orientações de segurança com um profissional de saúde.
- [ ] Enviar os conteúdos dos dias 4 a 21 e os arquivos de áudio. Para os áudios, crie um bucket no Supabase
      Storage; a política de segurança já permite arquivos de `*.supabase.co`.
- [ ] Se usar domínio próprio no Supabase (custom domain), adicione esse endereço à `Content-Security-Policy` em
      `vercel.json` ou `netlify.toml`.

## 5. Checklist de lançamento

Situação conferida nesta etapa. ✓ = verificado; ✗ = pendente.

| Item | Situação |
| --- | --- |
| Formulários funcionando (cadastro, login, recuperação, onboarding, diário, perfil) | ✓ no modo demonstração e no Supabase simulado; ✗ no Supabase real (e-mails e links) |
| Links corretos | ✓ todos os links internos abrem páginas existentes; a 404 funciona |
| Layout responsivo | ✓ 21 telas em 320, 390, 768 e 1280 px, sem rolagem horizontal; axe sem violações |
| Persistência funcionando | ✓ no Supabase simulado com a migration real; ✗ no projeto real |
| Política de privacidade e termos revisados | ✗ rascunhos com campos a preencher |
| Conteúdos e áudios publicados corretamente | ✗ dias 4 a 21 em preparação, nenhum áudio, 7 de 11 conteúdos em preparação; o que falta aparece como "em preparação", nunca como pronto |
| Nenhum conteúdo fictício apresentado como real | ✓ conteúdos pendentes sinalizados e textos jurídicos marcados como rascunho; ✗ a página inicial descreve o Despertar como "um áudio guiado", que ainda não existe |
| Nenhum erro crítico conhecido | ✓ no código (build, lint, testes); o lançamento depende dos itens ✗ acima |
| Segredos fora do repositório e do bundle | ✓ nenhum segredo no código; `.env*` no `.gitignore`; o build de produção recusa chave secreta |
| Rotas do React Router na hospedagem | ✓ rewrite para `index.html` na Vercel e na Netlify, testado localmente com deep links e recarga |
| Metadados (título, descrição, ícone, imagem para redes sociais) | ✓ |
| Página 404 e estados de erro | ✓ 404, estados de erro com "Tentar novamente" e tela de erro geral; depois de uma nova publicação, quem está com o site aberto recarrega uma vez sozinho |

**Antes de anunciar o site**, faça o roteiro com duas contas descrito em [banco-de-dados.md](banco-de-dados.md#testes)
no domínio de produção, incluindo um e-mail de confirmação e uma recuperação de senha reais.

## 6. Como atualizar o site depois

**Código e textos**
1. Faça as mudanças numa branch e abra um PR. A Vercel cria um endereço de prévia para conferir.
2. Confira a prévia. O GitHub roda lint, testes do banco e build no workflow.
3. Mescle o PR na `main`. A Vercel publica sozinha em produção.
4. Se algo der errado, vá em Vercel > Deployments, escolha a publicação anterior e clique em **Promote to Production**. Isso volta a versão na hora.

**Banco de dados** (nova tabela, coluna ou política)
1. Crie um arquivo novo em `supabase/migrations/` com data e hora no nome (ex.: `20261101090000_nova_coluna.sql`).
   Nunca edite uma migration que já foi aplicada.
2. Rode `npm run test:db` e acrescente um teste em `supabase/tests/rls.test.mjs` se mexer em regras de acesso.
3. Aplique primeiro no projeto de testes e depois no de produção, pelo SQL Editor ou por
   `npx supabase link --project-ref <ref>` e `npx supabase db push`.
4. Aplique a migration **antes** de publicar o código que depende dela.

**Conteúdos e áudios**
- Os textos da jornada ficam em `src/data/journey/days/` e os da biblioteca em `src/data/library/`. Para publicar um dia, preencha o arquivo e troque `status: 'pendente'` por `'publicado'`.
- Os áudios devem ser arquivos reais. O player só aparece quando o áudio tem um arquivo (`src`).
