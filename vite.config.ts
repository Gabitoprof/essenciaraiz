import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Metadados que dependem do ambiente:
 * - com VITE_SITE_URL (endereço final do site), adiciona o link canônico e endereços absolutos para redes sociais;
 * - sem Supabase configurado (modo demonstração), pede aos buscadores para não indexar o site.
 */
function environmentMeta(env: Record<string, string>, base: string): Plugin {
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '')
  const isDemo = !env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY
  return {
    name: 'essencia-raiz:metadados',
    transformIndexHtml() {
      const tags: { tag: string; attrs: Record<string, string> }[] = [
        { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}${base}og-imagem.png` } },
      ]
      if (siteUrl) {
        tags.push({ tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}${base}` } })
        tags.push({ tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}${base}` } })
      }
      if (isDemo) tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } })
      return tags.map((item) => ({ ...item, injectTo: 'head' as const }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  // "/" por padrão. O workflow do GitHub Pages define BASE_PATH=/essenciaraiz/ (o site fica em uma subpasta).
  const base = process.env.BASE_PATH || '/'
  return {
    base,
    plugins: [react(), tailwindcss(), environmentMeta(env, base)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
