import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function ForgotPasswordPage() {
  useDocumentTitle('Recuperar senha')
  const { requestPasswordReset } = useAuth()
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    await requestPasswordReset(String(form.get('email')))
    setSent(true)
  }

  return (
    <Card className="sm:p-8">
      <h1 className="text-titulo-1">Recuperar senha</h1>
      {sent ? (
        <p role="status" className="mt-4 text-tinta-suave">
          Se o e-mail estiver cadastrado, você vai receber as instruções para criar uma nova senha.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <TextField label="E-mail" name="email" type="email" autoComplete="email" required />
          <Button type="submit" fullWidth>Enviar instruções</Button>
        </form>
      )}
      <Link to={paths.login} className="mt-8 inline-block text-apoio text-oliva-700 underline-offset-4 hover:underline">
        Voltar para o login
      </Link>
    </Card>
  )
}
