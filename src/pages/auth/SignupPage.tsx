import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { FormAlert } from '@/components/feedback/FormAlert'
import { Button } from '@/components/ui/Button'
import { PasswordField } from '@/components/ui/PasswordField'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useFormErrors } from '@/hooks/useFormErrors'
import { authErrorMessage } from '@/services/auth'
import {
  PASSWORD_MIN_LENGTH,
  validateDisplayName,
  validateEmail,
  validateNewPassword,
  validatePasswordConfirmation,
} from '@/utils/validation'
import { AuthCard, authLinkClasses } from './AuthCard'

type Field = 'displayName' | 'email' | 'password' | 'passwordConfirmation'

export function SignupPage() {
  useDocumentTitle('Criar conta')
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { errors, validate, clearError } = useFormErrors<Field>()
  const [formError, setFormError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationSentTo, setConfirmationSentTo] = useState<string>()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const displayName = String(data.get('displayName') ?? '')
    const email = String(data.get('email') ?? '')
    const password = String(data.get('password') ?? '')
    const passwordConfirmation = String(data.get('passwordConfirmation') ?? '')
    setFormError(undefined)

    const valid = validate(form, {
      displayName: validateDisplayName(displayName),
      email: validateEmail(email),
      password: validateNewPassword(password),
      passwordConfirmation: validatePasswordConfirmation(password, passwordConfirmation),
    })
    if (!valid) return

    setIsSubmitting(true)
    try {
      const result = await signUp({ displayName: displayName.trim(), email: email.trim(), password })
      if (result.needsEmailConfirmation) {
        setConfirmationSentTo(email.trim())
        setIsSubmitting(false)
        return
      }
      navigate(paths.onboarding, { replace: true })
    } catch (error) {
      setFormError(authErrorMessage(error))
      setIsSubmitting(false)
    }
  }

  if (confirmationSentTo) {
    return (
      <AuthCard
        title="Confirme seu e-mail"
        footer={
          <Link to={paths.login} className={authLinkClasses}>
            Ir para o login
          </Link>
        }
      >
        <div className="flex flex-col items-start gap-4">
          <span className="grid size-12 place-items-center rounded-full bg-salvia-100 text-oliva-700">
            <MailCheck aria-hidden="true" className="size-6" strokeWidth={1.5} />
          </span>
          <p role="status">
            Enviamos um link de confirmação para <strong>{confirmationSentTo}</strong>. Abra o e-mail e toque no link
            para ativar sua conta. Se não encontrar, confira a caixa de spam.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Criar conta"
      description="Leva menos de um minuto. Depois, você conhece a proposta dos 21 dias."
      footer={
        <p>
          Já tem conta?{' '}
          <Link to={paths.login} className={authLinkClasses}>
            Entrar
          </Link>
        </p>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        {formError && <FormAlert>{formError}</FormAlert>}
        <TextField
          label="Nome de exibição"
          name="displayName"
          autoComplete="nickname"
          hint="Como você quer aparecer na plataforma."
          required
          maxLength={60}
          error={errors.displayName}
          onChange={() => clearError('displayName')}
        />
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
          autoComplete="new-password"
          hint={`Pelo menos ${PASSWORD_MIN_LENGTH} caracteres, com letras e números.`}
          required
          error={errors.password}
          onChange={() => clearError('password')}
        />
        <PasswordField
          label="Confirme a senha"
          name="passwordConfirmation"
          autoComplete="new-password"
          required
          error={errors.passwordConfirmation}
          onChange={() => clearError('passwordConfirmation')}
        />
        <p className="text-legenda tracking-normal text-tinta-suave">
          Ao criar sua conta, você concorda com os{' '}
          <Link to={paths.terms} className={authLinkClasses}>
            termos de uso
          </Link>{' '}
          e a{' '}
          <Link to={paths.privacy} className={authLinkClasses}>
            política de privacidade
          </Link>
          .
        </p>
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          {isSubmitting ? 'Criando conta…' : 'Criar conta'}
        </Button>
      </form>
    </AuthCard>
  )
}
