import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FormAlert } from '@/components/feedback/FormAlert'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useFormErrors } from '@/hooks/useFormErrors'
import { authErrorMessage } from '@/services/auth'
import { validateEmail } from '@/utils/validation'
import { AuthCard, authLinkClasses } from './AuthCard'

export function ForgotPasswordPage() {
  useDocumentTitle('Recuperar senha')
  const { requestPasswordReset } = useAuth()
  const { errors, validate, clearError } = useFormErrors<'email'>()
  const [formError, setFormError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get('email') ?? '')
    setFormError(undefined)
    if (!validate(form, { email: validateEmail(email) })) return

    setIsSubmitting(true)
    try {
      await requestPasswordReset(email.trim())
      setSent(true)
    } catch (error) {
      setFormError(authErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Recuperar senha"
      description={sent ? undefined : 'Informe o e-mail da sua conta e enviaremos um link para você criar uma nova senha.'}
      footer={
        <Link to={paths.login} className={authLinkClasses}>
          Voltar para o login
        </Link>
      }
    >
      {sent ? (
        // A mensagem é a mesma exista ou não a conta, para não revelar quais e-mails estão cadastrados.
        <FormAlert tone="sucesso">
          Se houver uma conta com este e-mail, você vai receber as instruções em alguns minutos. Confira também a caixa
          de spam.
        </FormAlert>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
          {formError && <FormAlert>{formError}</FormAlert>}
          <TextField
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            error={errors.email}
            onChange={() => clearError('email')}
          />
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            {isSubmitting ? 'Enviando…' : 'Enviar link'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
