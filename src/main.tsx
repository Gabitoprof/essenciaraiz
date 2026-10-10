import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { AppErrorBoundary } from '@/app/AppErrorBoundary'
import { reloadOnStaleChunks } from '@/app/reloadOnStaleChunks'
import '@/styles/index.css'

reloadOnStaleChunks()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
