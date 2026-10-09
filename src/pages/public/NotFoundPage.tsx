import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { paths } from '@/config/routes'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Página não encontrada')
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <p className="mt-3 text-raiz-700">O endereço que você abriu não existe ou mudou de lugar.</p>
      <ButtonLink to={paths.home} className="mt-8">
        Voltar para o início
      </ButtonLink>
    </Container>
  )
}
