const RELOAD_FLAG = 'essencia-raiz:recarregou-apos-atualizacao'

/**
 * Depois de uma nova publicação, quem estava com o site aberto pode pedir um arquivo antigo que já não existe.
 * O Vite avisa com o evento `vite:preloadError`: recarregamos uma vez para buscar a versão nova.
 */
export function reloadOnStaleChunks() {
  window.addEventListener('vite:preloadError', (event) => {
    try {
      if (sessionStorage.getItem(RELOAD_FLAG)) return
      sessionStorage.setItem(RELOAD_FLAG, '1')
    } catch {
      return
    }
    event.preventDefault()
    window.location.reload()
  })
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_FLAG)
      } catch {
        // sem armazenamento: nada a limpar
      }
    }, 10_000)
  })
}
