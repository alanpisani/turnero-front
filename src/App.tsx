import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { SignUp } from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Questions from './pages/Questions/Questions'
import MyTurns from './pages/MyTurns/MyTurns'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/turnos" element={<MyTurns/>} />
      <Route path="/registrarse" element={<SignUp title='Registrate'/>} />
      <Route path="/conectate" element={<Login />} />
      <Route path="/preguntas" element={<Questions />} />
    </Routes>
  )
}

export default App
