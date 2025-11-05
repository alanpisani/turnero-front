import Modal from "../../../../components/shared/Modal/Modal";
import "./TurnsOfTheDay.css";

export default function TurnsOfTheDay() {
  return (
    <div className="professional-turns-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th>Hora</th>
            <th className="th-action">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>PEPITO</td>
            <td>Endodoncia</td>
            <td>15:00</td>
            <td className="td-action">
              <button>Marcar como atendido</button>
              <button>Marcar como ausente</button>

              {/* Modal */}
              <Modal triggerText="Ver historial clínico">
                <div className="modal-ficha-paciente">
                  <h3>PEPITO</h3>
                  <div className="datos-generales-ficha-paciente">
                    <div className="dato-general-ficha-paciente">
                      <i></i>
                      <div className="dato-texto-ficha-general">
                        <p className="dato-title-ficha-general">Tratamiento</p>
                        <p className="dato-data-ficha-general">Endodoncia</p>
                      </div>
                    </div>
                    <div className="dato-general-ficha-paciente">
                      <i></i>
                      <div className="dato-texto-ficha-general">
                        <p className="dato-title-ficha-general">Fecha y hora</p>
                        <p className="dato-data-ficha-general">
                          Martes 3 de noviembre a las 15:hs
                        </p>
                      </div>
                    </div>
                    <div className="dato-general-ficha-paciente">
                      <i></i>
                      <div className="dato-texto-ficha-general">
                        <p className="dato-title-ficha-general">Dentista</p>
                        <p className="dato-data-ficha-general">
                          Christian Garriazo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="patient-personal-info-container">
                    <h4>Información general</h4>
                    <div className="patient-personal-info-content">
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                      <div className="patient-personal-info-item">
                        <p className="patient-personal-info-label">Nombre</p>
                        <p className="patient-personal-info-data">Alan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
