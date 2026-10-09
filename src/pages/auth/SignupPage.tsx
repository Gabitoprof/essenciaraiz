import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { DevAuthNotice } from './DevAuthNotice'

export function SignupPage() {
  useDocumentTitle('Criar conta')
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setIsSubmitting(true)
    await signUp({
      name: String(form.get('name')),
      email: String(form.get('email')),
      password: String(form.get('password')),
    })
    navigate(paths.onboarding, { replace: true })
  }

  return (
    <Card className="sm:p-8">
      <h1 className="text-titulo-1">Criar conta</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <TextField label="Nome" name="name" autoComplete="given-name" required />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" required />
        <TextField
          label="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Criar conta
        </Button>
      </form>
      <p className="mt-8 text-apoio">
        Já tem conta?{' '}
        <Link to={paths.login} className="font-medium text-oliva-700 underline-offset-4 hover:underline">
          Entrar
        </Link>
      </p>
      <DevAuthNotice />
    </Card>
  )
}
