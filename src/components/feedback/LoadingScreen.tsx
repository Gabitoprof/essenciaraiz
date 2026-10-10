import { LoadingState } from './LoadingState'

/** Tela cheia de carregamento, usada enquanto a sessão é verificada. */
export function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center">
      <LoadingState />
    </div>
  )
}
