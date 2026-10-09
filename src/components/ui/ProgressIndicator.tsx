interface ProgressIndicatorProps {
  /** Quantidade concluída (ex.: dias concluídos). */
  value: number
  max: number
  label: string
  /** Texto exibido ao lado do rótulo; por padrão "x de y". */
  valueText?: string
  /** Mostra um ponto por etapa abaixo da barra (bom para os 21 dias). */
  showSteps?: boolean
}

/** Barra de progresso acessível (role="progressbar"), com marcação opcional por etapa. */
export function ProgressIndicator({ value, max, label, valueText, showSteps }: ProgressIndicatorProps) {
  const safeValue = Math.min(Math.max(value, 0), max)
  const percent = max > 0 ? (safeValue / max) * 100 : 0
  const text = valueText ?? `${safeValue} de ${max}`

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4 text-apoio">
        <span className="font-medium text-tinta">{label}</span>
        <span className="text-tinta-suave">{text}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={safeValue}
        aria-valuetext={text}
        className="h-2 overflow-hidden rounded-full bg-salvia-100"
      >
        <div
          className="h-full rounded-full bg-oliva-600 transition-[width] duration-500 ease-suave"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showSteps && (
        <ol aria-hidden="true" className="mt-3 flex justify-between gap-1">
          {Array.from({ length: max }, (_, index) => (
            <li
              key={index}
              className={`size-1.5 rounded-full ${index < safeValue ? 'bg-oliva-600' : 'bg-areia-300'}`}
            />
          ))}
        </ol>
      )}
    </div>
  )
}
