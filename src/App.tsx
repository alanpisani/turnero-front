import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { SignUp } from './pages/SignUp/SignUp'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registrarse" element={<SignUp title='Registrate'/>} />
    </Routes>
  )
}

export default App
