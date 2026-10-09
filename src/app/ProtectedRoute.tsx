import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'

/** Só deixa passar quem tem sessão; caso contrário, manda para o login e lembra a página pedida. */
export function ProtectedRoute() {
  const { session, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <LoadingScreen />
  if (!session) return <Navigate to={paths.login} replace state={{ from: location.pathname }} />
  return <Outlet />
}
