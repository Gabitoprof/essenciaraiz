/**
 * Caminho base do site. "/" no computador e "/essenciaraiz/" no GitHub Pages
 * (definido pela variável BASE_PATH no build, ver vite.config.ts).
 */
const BASE = import.meta.env.BASE_URL

/** Para o React Router: "" quando o site está na raiz. */
export const routerBasename = BASE.replace(/\/$/, '')

/** Endereço completo de uma rota do app (usado nos links enviados por e-mail pelo Supabase). */
export function absoluteAppUrl(path: string) {
  return new URL(routerBasename + path, window.location.origin).toString()
}

/** Arquivo da pasta public/ (fotos, áudios), respeitando o caminho base. Endereços externos ficam como estão. */
export function publicAsset(path: string) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return BASE + path.replace(/^\//, '')
}
