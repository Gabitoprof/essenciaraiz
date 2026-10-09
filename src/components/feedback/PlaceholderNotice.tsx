import { EmptyState } from './EmptyState'

/** Aviso usado nas páginas que ainda serão desenvolvidas nas próximas etapas. */
export function PlaceholderNotice({ text = 'Esta página será desenvolvida nas próximas etapas.' }: { text?: string }) {
  return <EmptyState title="Em preparação" description={text} />
}
