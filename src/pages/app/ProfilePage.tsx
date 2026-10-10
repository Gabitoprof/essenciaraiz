import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Download, Lock, Trash2 } from 'lucide-react'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { FormAlert } from '@/components/feedback/FormAlert'
import { SignOutButton } from '@/components/navigation/SignOutButton'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { availabilityChoices, intentionChoices } from '@/data/onboarding'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authErrorMessage } from '@/services/auth'
import { fileDate } from '@/utils/dates'
import { buildMyDataExport } from '@/utils/exportMyData'
import { downloadText } from '@/utils/journalExport'
import type { Availability, UserProfile } from '@/types/user'

const storageTexts = {
  demo: 'Conta de demonstração: seus dados ficam apenas neste navegador e não são sincronizados com nenhum servidor.',
  supabase: 'Seus dados ficam guardados na sua conta, protegidos para que só ela tenha acesso a eles pela plataforma.',
}

function ProfileForm({ user }: { user: UserProfile }) {
  const { updateProfile } = useAuth()
  const [displayName, setDisplayName] = useState(user.displayName)
  const [preferredName, setPreferredName] = useState(user.preferences.preferredName ?? '')
  const [intention, setIntention] = useState(user.preferences.intention ?? '')
  const [availability, setAvailability] = useState<Availability | ''>(user.preferences.availability ?? '')
  const [nameError, setNameError] = useState<string>()
  const [result, setResult] = useState<{ tone: 'erro' | 'sucesso'; text: string }>()
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setResult(undefined)
    if (!displayName.trim()) {
      setNameError('Informe um nome de exibição.')
      return
    }
    setNameError(undefined)
    setIsSaving(true)
    try {
      await updateProfile({
        displayName: displayName.trim(),
        preferences: {
          preferredName: preferredName.trim() || undefined,
          intention: intention || undefined,
          availability: availability || undefined,
        },
      })
      setResult({ tone: 'sucesso', text: 'Dados atualizados.' })
    } catch (error) {
      setResult({ tone: 'erro', text: authErrorMessage(error) })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {result && <FormAlert tone={result.tone}>{result.text}</FormAlert>}
      <TextField
        label="Nome de exibição"
        value={displayName}
        maxLength={80}
        autoComplete="name"
        required
        error={nameError}
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <TextField
        label="Como prefere ser chamada"
        hint="Opcional. Se ficar vazio, usamos o nome de exibição."
        value={preferredName}
        maxLength={60}
        onChange={(event) => setPreferredName(event.target.value)}
      />
      <TextField label="E-mail" value={user.email} readOnly disabled hint="O e-mail de acesso não pode ser alterado aqui." />
      <SelectField label="Intenção" value={intention} onChange={(event) => setIntention(event.target.value)}>
        <option value="">Prefiro não informar</option>
        {intentionChoices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </SelectField>
      <SelectField
        label="Período preferido para as práticas"
        value={availability}
        onChange={(event) => setAvailability(event.target.value as Availability | '')}
      >
        <option value="">Prefiro não informar</option>
        {availabilityChoices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </SelectField>
      <div>
        <Button type="submit" isLoading={isSaving}>
          Salvar alterações
        </Button>
      </div>
    </form>
  )
}

export function ProfilePage() {
  useDocumentTitle('Perfil e configurações')
  const { session, mode, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [exportState, setExportState] = useState<{ busy: boolean; error?: string }>({ busy: false })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string>()
  if (!session) return null
  const { user } = session

  async function handleExport() {
    if (!session) return
    setExportState({ busy: true })
    try {
      const json = await buildMyDataExport(session)
      downloadText(`essencia-raiz-meus-dados-${fileDate(new Date())}.json`, json, 'application/json;charset=utf-8')
      setExportState({ busy: false })
    } catch (error) {
      setExportState({
        busy: false,
        error: error instanceof Error ? error.message : 'Não foi possível reunir seus dados agora. Tente novamente.',
      })
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    setDeleteError(undefined)
    try {
      await deleteAccount()
      navigate(paths.home, { replace: true })
    } catch (error) {
      setDeleteError(authErrorMessage(error))
      setIsDeleting(false)
      setConfirmOpen(false)
    }
  }

  return (
    <section>
      <PageHeader title="Perfil e configurações" description="Consulte, edite, baixe ou exclua seus dados." />

      <div className="flex flex-col gap-8">
        <Card>
          <h2 className="text-titulo-2">Seus dados</h2>
          <p className="mt-2 mb-6 flex gap-2.5 text-apoio text-tinta-suave">
            <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {storageTexts[mode]}
          </p>
          <ProfileForm key={user.id} user={user} />
        </Card>

        <Card>
          <h2 className="text-titulo-2">Baixar meus dados</h2>
          <p className="mt-2 text-tinta-suave">
            Um arquivo com seu perfil, seu progresso na jornada e todos os registros do diário. O arquivo é gerado e baixado no seu aparelho.
          </p>
          {exportState.error && (
            <div className="mt-4">
              <FormAlert>{exportState.error}</FormAlert>
            </div>
          )}
          <div className="mt-5">
            <Button variant="secondary" onClick={() => void handleExport()} isLoading={exportState.busy}>
              <Download aria-hidden="true" className="size-4" />
              Baixar meus dados (JSON)
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-titulo-2">Excluir minha conta</h2>
          <p className="mt-2 text-tinta-suave">
            Apaga definitivamente seu perfil, seu progresso e o seu diário. Não é possível desfazer. Se quiser guardar seus registros, baixe seus dados antes.
          </p>
          {deleteError && (
            <div className="mt-4">
              <FormAlert>{deleteError}</FormAlert>
            </div>
          )}
          <div className="mt-5">
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              <Trash2 aria-hidden="true" className="size-4" />
              Excluir minha conta
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-apoio text-tinta-suave">
            Saiba como cuidamos das suas informações na{' '}
            <Link to={paths.privacy} className="underline underline-offset-4">
              política de privacidade
            </Link>
            .
          </p>
          <div className="max-w-[10rem]">
            <SignOutButton />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir sua conta?"
        confirmLabel="Excluir definitivamente"
        isConfirming={isDeleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setConfirmOpen(false)}
      >
        <p>Seu perfil, seu progresso e todos os registros do diário serão apagados. Essa ação não pode ser desfeita.</p>
      </ConfirmDialog>
    </section>
  )
}
