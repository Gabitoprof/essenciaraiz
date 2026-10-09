import { ArrowRight } from 'lucide-react'
import { PlaceholderNotice } from '@/components/feedback/PlaceholderNotice'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function DashboardPage() {
  useDocumentTitle('Painel')
  const { session } = useAuth()
  const firstName = session?.user.name.split(' ')[0]

  return (
    <section>
      <PageHeader
        title={firstName ? `Olá, ${firstName}` : 'Olá'}
        description="Este é o seu espaço pessoal na jornada Essência Raiz."
        actions={
          <ButtonLink to={paths.journey}>
            Ver jornada <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        }
      />
      <PlaceholderNotice text="O painel com o dia atual, o progresso e os atalhos será desenvolvido nas próximas etapas." />
    </section>
  )
}
