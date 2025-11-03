import { NavLink } from "react-router-dom";
import "./SideMenu.css"
import type { sideMenuDataProps } from "../../../types/SideMenuProps";

interface SideMenuProps{
  sideMenuData: sideMenuDataProps[];
}

export default function SideMenu({ sideMenuData }: SideMenuProps ) {

  const handleSubmit = () => {
    if(confirm("¿Estás seguro que querés cerrar la sesión?")){
      localStorage.removeItem("token");
      window.location.href = "/conectate";
    }
  }

  return (
    <aside className="side-menu">
      <nav>
        {
          sideMenuData.map((item, index) => (
            <NavLink key={index} to={item.to} className={({ isActive }) => isActive ? "active" : ""}>{ item.name }</NavLink>
          ))
        }
        <button className="cerrar-sesion-profesional" onClick={handleSubmit}>Cerrar sesión</button>
      </nav>
    </aside>
  );
}
