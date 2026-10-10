import { LeafMark } from '@/components/decor/LeafMark'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { paths } from '@/config/routes'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Página não encontrada')
  return (
    <Container size="leitura" className="py-secao-lg text-center">
      <LeafMark className="mx-auto size-10 text-salvia-400" />
      <h1 className="mt-6 text-titulo-1">Este caminho não existe</h1>
      <p className="mt-3 text-tinta-suave">O endereço que você abriu não existe ou mudou de lugar.</p>
      <ButtonLink to={paths.home} className="mt-10">
        Voltar para o início
      </ButtonLink>
    </Container>
  )
}
