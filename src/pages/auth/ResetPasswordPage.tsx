import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormAlert } from '@/components/feedback/FormAlert'
import { LoadingState } from '@/components/feedback/LoadingState'
import { Button } from '@/components/ui/Button'
import { PasswordField } from '@/components/ui/PasswordField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useFormErrors } from '@/hooks/useFormErrors'
import { authErrorMessage } from '@/services/auth'
import { PASSWORD_MIN_LENGTH, validateNewPassword, validatePasswordConfirmation } from '@/utils/validation'
import { AuthCard, authLinkClasses } from './AuthCard'

type Field = 'password' | 'passwordConfirmation'

/**
 * Destino do link de recuperação enviado por e-mail.
 * O Supabase abre uma sessão temporária a partir do link; com ela, a participante define a nova senha.
 */
export function ResetPasswordPage() {
  useDocumentTitle('Criar nova senha')
  const { session, isLoading, mode, updatePassword } = useAuth()
  const navigate = useNavigate()
  const { errors, validate, clearError } = useFormErrors<Field>()
  const [formError, setFormError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const password = String(data.get('password') ?? '')
    const passwordConfirmation = String(data.get('passwordConfirmation') ?? '')
    setFormError(undefined)
    const valid = validate(form, {
      password: validateNewPassword(password),
      passwordConfirmation: validatePasswordConfirmation(password, passwordConfirmation),
    })
    if (!valid) return

    setIsSubmitting(true)
    try {
      await updatePassword(password)
      navigate(paths.dashboard, { replace: true })
    } catch (error) {
      setFormError(authErrorMessage(error))
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <LoadingState title="Verificando o link…" />

  if (mode === 'demo' || !session) {
    return (
      <AuthCard
        title="Link inválido ou expirado"
        footer={
          <Link to={paths.forgotPassword} className={authLinkClasses}>
            Pedir um novo link
          </Link>
        }
      >
        <FormAlert tone="info">
          {mode === 'demo'
            ? 'No modo demonstração não há envio de e-mail, então esta etapa só funciona com o Supabase configurado.'
            : 'Para criar uma nova senha, abra esta página pelo link mais recente que enviamos para o seu e-mail.'}
        </FormAlert>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Criar nova senha" description={`Escolha uma nova senha para ${session.user.email}.`}>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        {formError && <FormAlert>{formError}</FormAlert>}
        <PasswordField
          label="Nova senha"
          name="password"
          autoComplete="new-password"
          hint={`Pelo menos ${PASSWORD_MIN_LENGTH} caracteres, com letras e números.`}
          required
          error={errors.password}
          onChange={() => clearError('password')}
        />
        <PasswordField
          label="Confirme a nova senha"
          name="passwordConfirmation"
          autoComplete="new-password"
          required
          error={errors.passwordConfirmation}
          onChange={() => clearError('passwordConfirmation')}
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          {isSubmitting ? 'Salvando…' : 'Salvar nova senha'}
        </Button>
      </form>
    </AuthCard>
  )
}
