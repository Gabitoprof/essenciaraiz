import { PlaceholderNotice } from '@/components/feedback/PlaceholderNotice'
import { SignOutButton } from '@/components/navigation/SignOutButton'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { availabilityChoices, intentionChoices } from '@/data/onboarding'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

function choiceLabel(choices: { value: string; label: string }[], value?: string) {
  return choices.find((choice) => choice.value === value)?.label ?? 'Não informado'
}

export function ProfilePage() {
  useDocumentTitle('Perfil e configurações')
  const { session, mode } = useAuth()
  if (!session) return null
  const { user } = session

  const rows = [
    { label: 'Nome de exibição', value: user.displayName },
    { label: 'Como prefere ser chamada', value: user.preferences.preferredName || user.displayName },
    { label: 'E-mail', value: user.email },
    { label: 'Intenção', value: choiceLabel(intentionChoices, user.preferences.intention) },
    { label: 'Período preferido', value: choiceLabel(availabilityChoices, user.preferences.availability) },
    { label: 'Tipo de conta', value: mode === 'demo' ? 'Demonstração (não é uma conta real)' : 'Conta Essência Raiz' },
  ]

  return (
    <section>
      <PageHeader title="Perfil e configurações" description="Seus dados e preferências na plataforma." />
      <Card>
        <dl className="divide-y divide-areia-300/60">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4">
              <dt className="text-apoio text-tinta-suave">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 max-w-[10rem]">
          <SignOutButton />
        </div>
      </Card>
      <div className="mt-10">
        <PlaceholderNotice text="Edição dos dados, troca de senha e preferências de notificação virão nas próximas etapas." />
      </div>
    </section>
  )
}
