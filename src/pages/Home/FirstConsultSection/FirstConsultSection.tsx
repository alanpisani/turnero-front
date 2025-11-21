import { Link } from "react-router-dom";
import "./FirstConsultSection.css";

import img2 from "./img-2.png";
import { useAuth } from "../../../hooks/useAuth";

export function FirstConsultSection() {
  const { isLoggedIn, user } = useAuth();

  return (
    <section id="first-consult" className="primera-consulta-section">
      <div className="primera-consulta-container">
        <div className="consulta-content">
          <img src={img2} alt="" />
          {isLoggedIn && user?.rol == "Paciente" ? (
            <div className="consulta-text-container">
              <p>Consultá tus turnos</p>
              <p>
                Ingresando
                <Link to="/turnos" className="conectate">
                  acá
                </Link>
              </p>
            </div>
          ) : !isLoggedIn ? (
            <div className="consulta-text-container">
              <p>¿Ya estás registrado?</p>
              <p>
                Conectate{" "}
                <Link to="/conectate" className="conectate">
                  acá
                </Link>
              </p>
            </div>
          ) : (
            <Link to={`/panel/${user?.rol.toLowerCase()}`} className="conectate">
              Ir al panel
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
