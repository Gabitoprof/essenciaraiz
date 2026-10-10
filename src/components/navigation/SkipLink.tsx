export const MAIN_CONTENT_ID = 'conteudo-principal'

/** Permite pular direto para o conteúdo usando o teclado. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-botao focus:bg-white focus:px-4 focus:py-2 focus:text-apoio focus:font-medium focus:text-oliva-700 focus:shadow-elevada"
    >
      Pular para o conteúdo
    </a>
  )
}
