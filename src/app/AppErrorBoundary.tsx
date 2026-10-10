import { Component, type ReactNode } from 'react'

interface State {
  hasError: boolean
}

/**
 * Última proteção: se algo quebrar durante a renderização, mostra uma mensagem acolhedora
 * com a opção de recarregar, em vez de uma tela em branco. Não registra detalhes da participante.
 */
export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <main className="grid min-h-screen place-items-center bg-branco-quente px-5 text-center text-tinta">
        <div className="max-w-md">
          <h1 className="text-titulo-1">Algo não saiu como esperado</h1>
          <p className="mt-3 text-tinta-suave">
            A página encontrou um problema. Seus dados salvos não foram afetados. Recarregar costuma resolver.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex min-h-12 items-center rounded-botao bg-oliva-600 px-6 font-medium text-branco-quente hover:bg-oliva-700"
          >
            Recarregar a página
          </button>
        </div>
      </main>
    )
  }
}
