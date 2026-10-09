import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ao trocar de página, volta ao topo.
 * Se o endereço tiver uma âncora (ex.: /#como-funciona), rola até a seção e move o foco para ela,
 * para que leitores de tela e teclado acompanhem o salto.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  // `key` muda a cada navegação: clicar de novo na mesma âncora volta a rolar até ela.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return
    target.scrollIntoView({ block: 'start' })
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [pathname, hash, key])

  return null
}
