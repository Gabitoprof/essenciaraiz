import { Route, Routes } from 'react-router-dom'
import Captacao from './pages/Captacao'
import Inicio from './pages/Inicio'

export default function App() {
  return (
    <Routes>
      {/* Landing de atração: primeira página que o visitante vê */}
      <Route path="/" element={<Captacao />} />
      {/* Index inicial do app: convida o usuário a começar a usar */}
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
  )
}
