// Confere a configuração antes do build de produção (npm run build:producao).
// Impede publicar por engano o modo demonstração ou uma chave secreta no site.
// Lê as mesmas fontes que o Vite: variáveis do ambiente (painel da hospedagem) e arquivos .env.production(.local).
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), 'VITE_')
const errors = []
const warnings = []

const url = env.VITE_SUPABASE_URL ?? ''
const key = env.VITE_SUPABASE_ANON_KEY ?? ''
const site = env.VITE_SITE_URL ?? ''

if (!url) errors.push('VITE_SUPABASE_URL está vazia. Sem ela o site vai ao ar em MODO DEMONSTRAÇÃO (dados só no navegador).')
else if (!/^https:\/\/[^/]+$/.test(url.replace(/\/$/, ''))) errors.push('VITE_SUPABASE_URL deve ser o endereço do projeto, começando com https:// (ex.: https://abcdefgh.supabase.co).')

if (!key) errors.push('VITE_SUPABASE_ANON_KEY está vazia.')
else if (key.startsWith('sb_secret_')) errors.push('VITE_SUPABASE_ANON_KEY contém uma chave SECRETA (sb_secret_...). Use a chave pública (anon ou sb_publishable_...). Troque a chave secreta no Supabase se ela foi exposta.')
else if (key.split('.').length === 3) {
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString('utf8'))
    if (payload.role === 'service_role') errors.push('VITE_SUPABASE_ANON_KEY contém a chave service_role. Ela ignora todas as regras de acesso e nunca pode ir para o site. Use a chave anon e gere uma nova service_role no Supabase.')
  } catch {
    warnings.push('Não foi possível ler a chave pública para conferir o tipo. Confirme que é a chave anon ou sb_publishable_.')
  }
}

if (!site) warnings.push('VITE_SITE_URL está vazia: o link canônico e a imagem para redes sociais ficam sem endereço completo.')
else if (!/^https:\/\//.test(site)) errors.push('VITE_SITE_URL deve começar com https:// (ex.: https://essenciaraiz.com.br).')

for (const message of warnings) console.warn(`Aviso: ${message}`)
if (errors.length) {
  console.error('\nBuild de produção interrompido:\n' + errors.map((message) => `  - ${message}`).join('\n'))
  console.error('\nConfigure as variáveis no painel da hospedagem (veja docs/publicacao.md).\n')
  process.exit(1)
}
console.log('Configuração de produção conferida: Supabase e endereço do site definidos.')
