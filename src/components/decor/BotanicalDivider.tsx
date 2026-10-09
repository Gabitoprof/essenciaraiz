import { LeafMark } from './LeafMark'

/** Divisor entre blocos: duas linhas finas com um raminho no centro. */
export function BotanicalDivider({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-4 text-salvia-400 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-areia-300" />
      <LeafMark className="size-5" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-areia-300" />
    </div>
  )
}
