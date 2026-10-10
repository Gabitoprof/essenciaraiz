import { LeafMark } from '@/components/decor/LeafMark'
import { StateMessage } from './StateMessage'

/** Estado de carregamento: um raminho que "respira" devagar (sem animação se o sistema pedir menos movimento). */
export function LoadingState({ title = 'Carregando…', description }: { title?: string; description?: string }) {
  return (
    <StateMessage
      role="status"
      icon={<LeafMark className="size-7 animate-pulse" />}
      title={title}
      description={description}
    />
  )
}
