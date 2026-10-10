import { Navigate, Outlet } from 'react-router-dom'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { useAuth } from '@/hooks/useAuth'
import { destinationAfterAuth } from '@/utils/authRedirect'

/** Cadastro e login: quem já entrou é levado direto para dentro da plataforma. */
export function PublicOnlyRoute() {
  const { session, isLoading } = useAuth()
  if (isLoading) return <LoadingScreen />
  if (session) return <Navigate to={destinationAfterAuth(session)} replace />
  return <Outlet />
}
