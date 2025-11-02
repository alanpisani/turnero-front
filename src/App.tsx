import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { SignUp } from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Questions from './pages/Questions/Questions'
import MyTurns from './pages/MyTurns/MyTurns'
import ProfessionalPanel from './pages/ProfessionalPanel/ProfessionalPanel'
import TurnsOfTheDay from './pages/ProfessionalPanel/TurnsOfTheDay/TursOfTheDay'
import MyPatients from './pages/ProfessionalPanel/MyPatients/MyPatients'
import ClinicalRecords from './pages/ProfessionalPanel/ClinicalRecords/ClinicalRecords'
import ProfessionalProfile from './pages/ProfessionalPanel/ProfessionalProfile/ProfessionalProfile'
import IntroProfessionalPanel from './pages/ProfessionalPanel/IntroProfessionalPanel/IntroProfessionalPanel'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/turnos" element={<MyTurns/>} />
      <Route path="/registrarse" element={<SignUp title='Registrate'/>} />
      <Route path="/conectate" element={<Login />} />
      <Route path="/preguntas" element={<Questions />} />
      <Route path="/panel/profesional" element={<ProfessionalPanel />}>
        <Route path="turnos" element={<TurnsOfTheDay />}/>
        <Route path="historiales-clinicos" element={<ClinicalRecords />}/>
        <Route path="pacientes" element={<MyPatients />}/>
        <Route path="perfil" element={<ProfessionalProfile />}/>
        <Route path="" element={<IntroProfessionalPanel />}/>
      </Route>
    </Routes>
  )
}

export default App
