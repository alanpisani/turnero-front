import "./LogContainer.css";
import ActionalBtn from "../../shared/ActionalBtn/ActionalBtn";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LogContainer() {
  const { isLoggedIn, user } = useAuth();
  const [aparecer, setAparecer] = useState<boolean>(false);

  const handleLogOut = () => {
    if (confirm("¿Estás seguro que querés cerrar sesíon?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const handleDespliegue = () => setAparecer(!aparecer);

  if (isLoggedIn && user?.rol != "Paciente") {
    return (
      <div className="log-container-logged">
        <button className="header-btn" onClick={handleDespliegue}>
          {user?.nombre}
        </button>
        <nav className={"nav-oculto " + (aparecer ? "aparecer" : "")}>
          <div className="log-container-logged-btns">
            <ActionalBtn
              leyend="Cerrar sesión"
              isTertiary
              onClick={handleLogOut}
            />
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="log-container">
      {isLoggedIn && user?.rol == "Paciente" ? (
        <div className="log-container-logged">
          <ActionalBtn linkTo="/turnos" leyend="Mis turnos" />
          <button className="header-btn" onClick={handleDespliegue}>
            {user?.nombre}
          </button>
          <nav className={"nav-oculto " + (aparecer ? "aparecer" : "")}>
            <div className="log-container-logged-btns">
              <ActionalBtn
                leyend="Cerrar sesión"
                isTertiary
                onClick={handleLogOut}
              />
            </div>
          </nav>
        </div>
      ) : (
        <Link to="conectate" className="header-btn">
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}
