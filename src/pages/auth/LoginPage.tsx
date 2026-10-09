import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { DevAuthNotice } from './DevAuthNotice'

export function LoginPage() {
  useDocumentTitle('Entrar')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = (location.state as { from?: string } | null)?.from ?? paths.dashboard

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setIsSubmitting(true)
    await signIn({ email: String(form.get('email')), password: String(form.get('password')) })
    navigate(redirectTo, { replace: true })
  }

  return (
    <Card className="sm:p-8">
      <h1 className="text-titulo-1">Entrar</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <TextField label="E-mail" name="email" type="email" autoComplete="email" required />
        <TextField label="Senha" name="password" type="password" autoComplete="current-password" required />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Entrar
        </Button>
      </form>
      <div className="mt-8 flex flex-col gap-3 text-apoio">
        <Link to={paths.forgotPassword} className="text-oliva-700 underline-offset-4 hover:underline">
          Esqueci minha senha
        </Link>
        <p>
          Ainda não tem conta?{' '}
          <Link to={paths.signup} className="font-medium text-oliva-700 underline-offset-4 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
      <DevAuthNotice />
    </Card>
  )
}
