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
    <Card>
      <h1 className="text-2xl font-semibold">Recuperar senha</h1>
      {sent ? (
        <p role="status" className="mt-4 text-raiz-700">
          Se o e-mail estiver cadastrado, você vai receber as instruções para criar uma nova senha.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <TextField label="E-mail" name="email" type="email" autoComplete="email" required />
          <Button type="submit">Enviar instruções</Button>
        </form>
      )}
      <Link to={paths.login} className="mt-6 inline-block text-sm text-terra-700 hover:underline">
        Voltar para o login
      </Link>
    </Card>
  )
}
