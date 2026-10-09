import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FormAlert } from '@/components/feedback/FormAlert'
import { Button } from '@/components/ui/Button'
import { PasswordField } from '@/components/ui/PasswordField'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useFormErrors } from '@/hooks/useFormErrors'
import { authErrorMessage } from '@/services/auth'
import { destinationAfterAuth, type AuthRedirectState } from '@/utils/authRedirect'
import { validateEmail, validateRequiredPassword } from '@/utils/validation'
import { AuthCard, authLinkClasses } from './AuthCard'

type Field = 'email' | 'password'

export function LoginPage() {
  useDocumentTitle('Entrar')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as AuthRedirectState | null)?.from
  const { errors, validate, clearError } = useFormErrors<Field>()
  const [formError, setFormError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') ?? '')
    const password = String(data.get('password') ?? '')
    setFormError(undefined)
    if (!validate(form, { email: validateEmail(email), password: validateRequiredPassword(password) })) return

    setIsSubmitting(true)
    try {
      const session = await signIn({ email: email.trim(), password })
      navigate(destinationAfterAuth(session, from), { replace: true })
    } catch (error) {
      setFormError(authErrorMessage(error))
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Entrar"
      description="Que bom ter você de volta."
      footer={
        <>
          <Link to={paths.forgotPassword} className={authLinkClasses}>
            Esqueci minha senha
          </Link>
          <p>
            Ainda não tem conta?{' '}
            <Link to={paths.signup} className={authLinkClasses}>
              Criar conta
            </Link>
          </p>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        {from && !formError && <FormAlert tone="info">Entre na sua conta para continuar.</FormAlert>}
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
        <PasswordField
          label="Senha"
          name="password"
          autoComplete="current-password"
          required
          error={errors.password}
          onChange={() => clearError('password')}
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </AuthCard>
  )
}
