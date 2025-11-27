import { NavLink, useNavigate } from "react-router-dom";
import type { sideMenuDataProps } from "../../../../types/SideMenuProps";

import "./MobileSideMenu.css";
import { useState } from "react";
import Alerta from "../../../../components/shared/Alerta/Alerta";

interface SideMenuProps {
  sideMenuData: sideMenuDataProps[];
}

export default function MobileSideMenu({ sideMenuData }: SideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const cerrarSesion = async () => {
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
    <>
      <div className="side-menu-mobile-btn" onClick={handleOpen}>
        <p>Abrir panel</p>
      </div>
      <nav className={`side-menu-mobile ${isOpen ? "open" : ""}`}>
        <ul>
          {sideMenuData.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleOpen}
            >
              {item.name}
            </NavLink>
          ))}
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </ul>
      </nav>
    </>
  );
}
