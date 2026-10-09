/**
 * Linhas orgânicas inspiradas em raízes, para o fundo de áreas de destaque.
 * Bem discretas (traço sálvia com baixa opacidade) e sem interação.
 */
export function RootLines({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none text-salvia-400/60 [mask-image:linear-gradient(to_bottom,transparent,black_45%)] ${className}`}
    >
      <path d="M200 0v60c0 22-18 30-40 44s-38 40-46 96" />
      <path d="M200 60c0 22 18 30 40 44s38 40 46 96" />
      <path d="M160 104c-24 6-52 4-80 30S40 180 20 200" />
      <path d="M240 104c24 6 52 4 80 30s40 46 60 66" />
      <path d="M200 90c-6 30-4 62 0 110" />
      <path d="M114 200c-4-20-16-34-34-44" />
      <path d="M286 200c4-20 16-34 34-44" />
    </svg>
  )
}
