import { useEffect, useRef, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  cancelLabel?: string
  isConfirming?: boolean
  onConfirm(): void
  onCancel(): void
}

/**
 * Confirmação com o <dialog> nativo: prende o foco, fecha com Esc e devolve o foco ao botão que abriu.
 * O foco inicial fica em "Cancelar", para que uma tecla Enter por engano não confirme a ação.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = 'Cancelar',
  isConfirming,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      cancelRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirmacao-titulo"
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
      className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-cartao bg-branco-quente p-6 text-tinta shadow-elevada backdrop:bg-tinta/40 sm:p-8"
    >
      <h2 id="confirmacao-titulo" className="text-titulo-2">
        {title}
      </h2>
      <div className="mt-3 text-tinta-suave">{children}</div>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button ref={cancelRef} variant="secondary" onClick={onCancel} disabled={isConfirming}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isConfirming}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  )
}
