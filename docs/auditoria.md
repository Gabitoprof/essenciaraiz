# Auditoria antes da publicação (etapa 9)

Data: 10/10/2026. Base auditada: branch `base-landing-pages`.

**Resultado:** o build funciona, os fluxos essenciais foram testados e não há erro crítico no código.
**A aplicação ainda não está pronta para receber participantes reais.** Ainda falta o projeto Supabase real,
o conteúdo dos dias 4 a 21, os áudios e a revisão dos textos institucionais (veja
[O que ainda falta](#o-que-ainda-falta)).

## Problemas encontrados e corrigidos

| # | Prioridade | Problema | Correção |
| --- | --- | --- | --- |
| 1 | Alta | Termos de uso, Orientações de segurança e Contato eram páginas provisórias ("será desenvolvida nas próximas etapas"). O cadastro diz que a participante concorda com os termos, e cada dia da jornada indica a página de segurança. | Orientações de segurança escritas: limites, respiração, aromas, emoções e telefones de ajuda (192, 188, 180, 190). Termos e Contato escritos como rascunho, com aviso e campos entre colchetes. Os quatro textos usam um único componente (`DocumentPage`). |
| 2 | Alta | "Minha evolução" aparecia no menu, mas era uma página provisória. | Página real: dias e práticas concluídos, dia atual, avanço por semana e últimas práticas concluídas com data. Também tem os estados de vazio, carregando e erro. |
| 3 | Média | Em tablet (768 a 1023 px), com o menu lateral, os cartões em 3 colunas ficavam estreitos demais. O texto quebrava palavra por palavra e a etiqueta "Disponível" saía do cartão. | Grades do painel, das bibliotecas e do editor do diário ajustadas para a largura útil. |
| 4 | Média | A biblioteca de conteúdos tinha rolagem horizontal da página a partir de 768 px. O filtro de temas esticava o layout. | `min-w-0` na área principal. Em telas largas, os temas quebram linha. |
| 5 | Média | Rolagem horizontal em 320 px no dia da jornada depois de concluir uma prática, por causa da etiqueta de estado. | O cabeçalho da prática agora quebra linha. |
| 6 | Média | Faltava título principal (h1) em quatro telas: dia bloqueado, dia inexistente, conteúdo não encontrado e registro do diário não encontrado. | Os estados de página inteira passaram a usar h1. |
| 7 | Média | O foco do teclado nos campos de formulário quase não aparecia: só a cor da borda mudava. | Os campos ganharam um contorno de foco visível. |
| 8 | Baixa | O `.gitignore` não cobria arquivos como `.env.production`. | Agora ignora `.env.*`, mantendo o `.env.example`. |
| 9 | Baixa | A mensagem de "registro não encontrado" dizia que ele podia "estar salvo em outro aparelho", o que é falso com o Supabase. | Texto ajustado. |
| 10 | Baixa | Código morto: `LegalPage`, `PlaceholderPage` e `PlaceholderNotice`. | Removido (nenhuma referência restante). |

## Testes executados e resultados

Todos executados nesta auditoria, no Chromium (Playwright) sobre o build de produção, salvo indicação.

**Compilação e qualidade**
- `npm run build`: sem erros de TypeScript.
- `npm run lint` (oxlint): sem erros nem avisos.
- `npm run test:db`: 8 de 8 testes de RLS passaram.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- Imports e rotas: todo arquivo é usado; todas as rotas do menu e do rodapé abrem páginas existentes.

**Fluxos (modo demonstração)**
- **Página inicial:** todos os links internos abrem páginas existentes, as âncoras existem e um caminho inexistente mostra "Este caminho não existe".
- **Proteção de rotas:** as 11 rotas privadas redirecionam para `/entrar` sem login. Com login, `/entrar` leva ao painel. O painel só abre depois do onboarding.
- **Formulários de conta:** o cadastro vazio marca 4 erros e foca o primeiro campo. O login com conta inexistente mostra erro. A recuperação de senha explica que, no modo demonstração, nenhum e-mail é enviado.
- **Jornada:** os 21 dias abrem com título. Dias inválidos (0, 22, abc, 1.5) mostram "Dia não encontrado". As três práticas do dia 1 continuam concluídas depois de recarregar, e o dia 2 é liberado em seguida.
- **Diário:** criar, validar texto vazio, editar, listar, exportar e excluir com confirmação. Registro inexistente mostra "Registro não encontrado".
- **Perfil:** editar (com validação), baixar os dados em JSON e excluir a conta, o que apaga os dados locais. Sair encerra a sessão.
- **Player de áudio:** testado com um arquivo de teste no servidor de desenvolvimento, que não entra no projeto. Ele carrega, toca, retoma de onde parou, "Ouvir do início" funciona, a posição é apagada ao terminar e um erro mostra "Tentar novamente". Não há nenhum áudio real publicado.

**Fluxos com Supabase (simulado)**

Servidor falso que roda a mesma migration com RLS:
- **Conta:** cadastro com e sem confirmação de e-mail, onboarding salvo, sessão mantida ao recarregar, senha errada, e-mail duplicado, recuperação de senha, limite de tentativas, troca de senha e link de recuperação inválido.
- **Dados:** progresso e diário gravados e relidos.
- **Falha de conexão:** ao salvar, aparece um aviso e o texto não se perde.
- **Isolamento:** uma segunda conta não lê, não edita, não apaga e não cria dados da primeira, nem chamando a API direto. Visitante sem login recebe "permission denied".
- **Exclusão de conta:** apaga tudo da conta e não toca na outra.
- **Console:** nenhum texto do diário aparece.

**Interface**
- **Rolagem horizontal:** nenhuma, em 21 telas e 4 larguras (320, 390, 768 e 1280 px).
- **Acessibilidade (axe-core, WCAG 2.1 A/AA e boas práticas):** 0 violações em todas as telas, em 390 e 1280 px.
- **Teclado:** "Pular para o conteúdo" é o primeiro item. Todo elemento focável mostra o foco, incluindo campos, selects e cartões de conteúdo. O diálogo de exclusão começa em "Cancelar" e fecha com Esc.
- **Estados:** vazio, carregando e erro existem no painel, no diário, na evolução, nos conteúdos e no perfil.

**Segurança**
- **Bundle:** nenhuma chave secreta (`service_role`, `sb_secret_...`) nem JWT. O texto `sb_secret_` que aparece é código da biblioteca que recusa chaves secretas.
- **Arquivos de ambiente:** `.env` e `.env.local` não estão no Git. O histórico já foi verificado na publicação do Pages.
- **Código:** nenhum `console.log` no código do app; nenhum `innerHTML`, `dangerouslySetInnerHTML` ou `eval`.
- **Diário:** o conteúdo não vai para a URL (só o número do dia e a pergunta escolhida), não aparece no console, e a exportação é gerada no aparelho.
- **RLS:** em todas as tabelas, com políticas por operação. Detalhes em [banco-de-dados.md](banco-de-dados.md).

**Linguagem e conteúdo**
- **Alegações:** os textos foram revisados em busca de promessas de cura, garantias e linguagem culpabilizante. O FAQ diz que não há resultado garantido. O artigo de física quântica diz que ela não mostra que pensamentos atraem acontecimentos. Os conteúdos têm etiquetas de evidência e limites.

## O que ainda falta

Estes itens impedem um lançamento com participantes reais, mas não são erros de código:

1. **Supabase real:** o projeto ainda não existe. É preciso criá-lo, aplicar a migration, preencher as variáveis e configurar Auth (passo a passo em [banco-de-dados.md](banco-de-dados.md)). Sem isso, o site fica em modo demonstração, que não é seguro para dados reais. Também falta testar com o projeto real os e-mails, os links de confirmação e de recuperação e a função `delete_my_account`.
2. **Conteúdo da jornada:** os dias 4 a 21 estão "em preparação", então a jornada para no dia 4.
3. **Áudios:** nenhum arquivo real. Os 5 áudios aparecem como "Em produção", mas a página inicial descreve o Despertar como "um áudio guiado".
4. **Biblioteca:** 7 dos 11 conteúdos estão em preparação.
5. **Textos institucionais:** privacidade, termos e contato estão em rascunho, com campos entre colchetes (responsável, CPF/CNPJ, e-mail, idade mínima, pagamento e reembolso, foro).
6. **Foto:** a imagem da página inicial é uma ilustração provisória (opcional).
7. **Cabeçalhos de segurança:** o GitHub Pages não permite configurar CSP e outros cabeçalhos de segurança. Isso entra na escolha da hospedagem (etapa 10).
8. **Testes no repositório:** os testes de navegador desta auditoria rodaram fora do repositório. Só os testes de RLS (`npm run test:db`) estão versionados e rodam no workflow.

## Riscos que exigem revisão manual

- **Promessa no título:** "Seu prazer pela vida de volta em 21 dias" pode ser lido como resultado garantido. O FAQ e os termos dizem o contrário, mas a decisão de manter o título é da marca.
- **"Mentoria feminina":** a plataforma não tem acompanhamento humano. Se a mentoria inclui encontros ou contato, vale descrever; se não inclui, vale revisar a palavra.
- **Orientações de segurança e conteúdos de respiração e óleos essenciais:** devem ser revisados por um profissional de saúde. Os telefones de ajuda devem ser conferidos.
- **Termos e privacidade:** revisão jurídica (LGPD, Código de Defesa do Consumidor).
- **E-mails de autenticação:** traduzir os modelos para português no Supabase e configurar um SMTP próprio antes do lançamento.
