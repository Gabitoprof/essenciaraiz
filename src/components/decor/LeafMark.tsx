/** Raminho de folhas em traço fino. Decorativo: sempre escondido de leitores de tela. */
export function LeafMark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16 29V9" />
      <path d="M16 13c-4.5 0-7.5-3-7.5-7.5 4.5 0 7.5 3 7.5 7.5Z" />
      <path d="M16 19c4.5 0 7.5-3 7.5-7.5-4.5 0-7.5 3-7.5 7.5Z" />
      <path d="M16 24.5c-3.5 0-6-2.3-6-5.8 3.5 0 6 2.3 6 5.8Z" />
    </svg>
  )
}
