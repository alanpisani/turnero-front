import { NavLink, useNavigate } from "react-router-dom";
import "./SideMenu.css";
import type { sideMenuDataProps } from "../../../types/SideMenuProps";
import Alerta from "../../../components/shared/Alerta/Alerta";

interface SideMenuProps {
  sideMenuData: sideMenuDataProps[];
}

export default function SideMenu({ sideMenuData }: SideMenuProps) {

  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    const alerta = await Alerta({
      titulo: "Atencion",
      texto: "¿Estás seguro que querés cerrar la sesión?",
      icono: "info",
      isCancelButton: true,
    });

    if (alerta.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/conectate");
    }
  };

  return (
    <aside className="side-menu">
      <nav>
        {sideMenuData.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {item.name}
          </NavLink>
        ))}
        <button className="cerrar-sesion-profesional" onClick={handleSubmit}>
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
