import "./LogContainer.css";
import ActionalBtn from "../../shared/ActionalBtn/ActionalBtn";
import { useAuth } from "../../../hooks/useAuth";

export default function LogContainer() {
  const { isLoggedIn, user } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="log-container">
      {(isLoggedIn && user?.rol == "Paciente") ? (
        <>
          <p>Bienvenido, {user?.nombre}</p>
          <div>
            <ActionalBtn linkTo="/turnos" leyend="Mis turnos" />
            <ActionalBtn
              linkTo="/"
              leyend="Cerrar sesión"
              isTertiary
              onClick={handleLogOut}
            />
          </div>
        </>
      ) : (
        
          <ActionalBtn linkTo="/conectate" isTertiary leyend="Conectate" />
        
      )}
    </div>
  );
}
