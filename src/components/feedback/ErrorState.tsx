import { CloudRain } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StateMessage } from './StateMessage'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

/** Estado de erro acolhedor, com opção de tentar de novo. */
export function ErrorState({
  title = 'Algo não saiu como esperado',
  description = 'Não foi possível carregar este conteúdo agora. Respire e tente de novo em instantes.',
  onRetry,
}: ErrorStateProps) {
  return (
    <StateMessage
      role="alert"
      className="bg-erro-100/60"
      icon={<CloudRain aria-hidden="true" className="size-6" strokeWidth={1.5} />}
      title={title}
      description={description}
      action={
        onRetry && (
          <Button variant="secondary" onClick={onRetry}>
            Tentar novamente
          </Button>
        )
      }
    />
  )
}
