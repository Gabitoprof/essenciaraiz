import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import type { AuthRedirectState } from '@/utils/authRedirect'

/**
 * Rotas privadas: só passa quem tem sessão; caso contrário, vai para o login lembrando a página pedida.
 *
 * Importante: esta verificação melhora a navegação, mas NÃO protege dados. Todo o código do site
 * chega ao navegador. A proteção real dos dados de cada participante deve ficar no Supabase,
 * com Row Level Security (RLS) nas tabelas, exigindo um token válido em cada requisição.
 */
export function ProtectedRoute() {
  const { session, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <LoadingScreen />
  if (!session) {
    const state: AuthRedirectState = { from: location.pathname + location.search }
    return <Navigate to={paths.login} replace state={state} />
  }
  return <Outlet />
}
