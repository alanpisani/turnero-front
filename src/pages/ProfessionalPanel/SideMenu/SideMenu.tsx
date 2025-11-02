import { NavLink } from "react-router-dom";
import "./SideMenu.css"

export default function SideMenu() {

  const handleSubmit = () => {
    if(confirm("¿Estás seguro que querés cerrar la sesión?")){
      localStorage.removeItem("token");
      window.location.href = "/conectate";
    }
  }

  return (
    <aside className="side-menu">
      <nav>
        <NavLink to={"turnos"} className={({ isActive }) => isActive ? "active" : ""}>Turnos del dia</NavLink>
        <NavLink to={"historiales-clinicos"} className={({ isActive }) => isActive ? "active" : ""}>Historiales clínicos</NavLink>
        <NavLink to={"pacientes"} className={({ isActive }) => isActive ? "active" : ""}>Pacientes</NavLink>
        <NavLink to={"perfil"} className={({ isActive }) => isActive ? "active" : ""}>Mi perfil</NavLink>
        <button className="cerrar-sesion-profesional" onClick={handleSubmit}>Cerrar sesión</button>
      </nav>
    </aside>
  );
}
