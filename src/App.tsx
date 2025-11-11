import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import Login from './pages/Login/Login'
import Questions from './pages/Questions/Questions'
import MyTurns from './pages/MyTurns/MyTurns'
import Dashboard from './pages/Dashboard/Dashboard'
import Forbidden from './pages/Forbidden/Forbidden'
import TurnsOfTheDay from './pages/Dashboard/ProfessionalPanel/TurnsOfTheDay/TurnsOfTheDay'
import ClinicalRecords from './pages/Dashboard/ProfessionalPanel/ClinicalRecords/ClinicalRecords'
import { professionalSideMenuData } from './data/SideMenu/professionalSideMenuData'
import MyPatients from './pages/Dashboard/ProfessionalPanel/MyPatients/MyPatients'
import ProfessionalProfile from './pages/Dashboard/ProfessionalPanel/ProfessionalProfile/ProfessionalProfile'
import IntroProfessionalPanel from './pages/Dashboard/ProfessionalPanel/IntroProfessionalPanel/IntroProfessionalPanel'
import { recepcionistSideMenuData } from './data/SideMenu/recepcionistSideMenuData'
import { adminSideMenuData } from './data/SideMenu/adminSideMenuData'
import UserManagement from './pages/Dashboard/AdminPanel/UserManagement/UserManagement'
import ProfessionalManagement from './pages/Dashboard/AdminPanel/ProfessionalManagement/ProfessionalManagement'
import SpecialtyManagement from './pages/Dashboard/AdminPanel/SpecialtyManagement/SpecialtyManagement'
import CreateRecepcionistSection from './pages/Dashboard/AdminPanel/CreateRecepcionistSection/CreateRecepcionistSection'
import SolicitarTurno from './pages/Dashboard/RecepcionistPanel/SolicitarTurno/SolicitarTurno'
import HistorialTurnos from './pages/Dashboard/RecepcionistPanel/HistorialTurnos/HistorialTurnos'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/turnos" element={<MyTurns/>} />
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
        
        <Route path='/panel/recepcionista/solicitar-turno' element={ <SolicitarTurno />} />
        <Route path='/panel/recepcionista/historial-turnos' element={ <HistorialTurnos />} />

      </Route>
      <Route path="/panel/admin" element={<Dashboard rol="Admin" sideMenuData={adminSideMenuData} />}>
        
        <Route path="gestion-usuarios" element={ <UserManagement />} />
        <Route path="gestion-profesionales" element={ <ProfessionalManagement />} />
        <Route path="gestion-especialidades" element={ <SpecialtyManagement />} />
        <Route path="crear-recepcionista" element={ <CreateRecepcionistSection />} />
      
      </Route>
    </Routes>
  )
}

export default App
