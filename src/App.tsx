import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { SignUp } from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Questions from './pages/Questions/Questions'
import MyTurns from './pages/MyTurns/MyTurns'
import Dashboard from './pages/Dashboard/Dashboard'
import TurnsOfTheDay from './pages/ProfessionalPanel/TurnsOfTheDay/TursOfTheDay'
import MyPatients from './pages/ProfessionalPanel/MyPatients/MyPatients'
import ClinicalRecords from './pages/ProfessionalPanel/ClinicalRecords/ClinicalRecords'
import ProfessionalProfile from './pages/ProfessionalPanel/ProfessionalProfile/ProfessionalProfile'
import IntroProfessionalPanel from './pages/ProfessionalPanel/IntroProfessionalPanel/IntroProfessionalPanel'
import Forbidden from './pages/Forbidden/Forbidden'
import { recepcionistSideMenuData } from './data/SideMenu/recepcionistSideMenuData'
import { professionalSideMenuData } from './data/SideMenu/professionalSideMenuData'
import { adminSideMenuData } from './data/SideMenu/adminSideMenuData'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/turnos" element={<MyTurns/>} />
      <Route path="/registrarse" element={<SignUp title='Registrate'/>} />
      <Route path="/conectate" element={<Login />} />
      <Route path="/preguntas" element={<Questions />} />
      <Route path="/panel/profesional" element={<Dashboard rol="Profesional" sideMenuData={professionalSideMenuData}/>}>
        <Route path="turnos" element={<TurnsOfTheDay />}/>
        <Route path="historiales-clinicos" element={<ClinicalRecords />}/>
        <Route path="pacientes" element={<MyPatients />}/>
        <Route path="perfil" element={<ProfessionalProfile />}/>
        <Route path="" element={<IntroProfessionalPanel />}/>
      </Route>
      <Route path="/panel/recepcionista" element={<Dashboard rol="Recepcionista" sideMenuData={recepcionistSideMenuData} />}>
        { /*ACA IRIAN LO DEL RECEPCIONISTA*/}
      </Route>
            <Route path="/panel/admin" element={<Dashboard rol="Admin" sideMenuData={adminSideMenuData} />}>
        { /*ACA IRIAN LO DEL ADMIN*/}
      </Route>
    </Routes>
  )
}

export default App
