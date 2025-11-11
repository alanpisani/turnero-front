import ActionalBtn from "../../../components/shared/ActionalBtn/ActionalBtn";
import ActionButton from "../../../components/shared/ActionButton/ActionButton";
import { Btn } from "../../../components/shared/Btn/Btn";
import { API_URL } from "../../../config/apiConfig";
import { useAuth } from "../../../hooks/useAuth";
import type { TurnoProp } from "../../../types/MyTurns/turno";
import type { ResponseProps } from "../../../types/ResponseProps";
import "./TurnosListComponent.css";

interface TurnosListComponentProps {
  response: ResponseProps<TurnoProp[]> | null;
  onClick: () => void;
  dniInput: string;
  reload: () => void;
}

export default function TurnosListComponent({
  response,
  onClick,
  dniInput,
  reload,
}: TurnosListComponentProps) {
  const { isLoggedIn, user } = useAuth();

  const handleAction = async (
    accion: "reprogramar" | "cancelar",
    idTurno: number,
    estadoTurno: string
  ) => {
    if (!isLoggedIn) {
      alert("Debes estar logueado para realizar esta acción.");
      return;
    }

    if (dniInput !== user?.dni) {
      alert("No podés modificar turnos de otro paciente.");
      return;
    }

    if (!confirm(`¿Estás seguro que querés ${accion} el turno?`)) return;

    try {
      const res = await fetch(`${API_URL}/turno/${idTurno}/cancelar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dniDelCancelador: dniInput, nuevoEstado:  estadoTurno}),
      });

      const fetchResponse: ResponseProps<unknown> = await res.json();

      if (!fetchResponse.success) {
        alert(fetchResponse.message ?? "Error al cancelar el turno");
        return;
      }

      alert("Turno cancelado correctamente");
      reload();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la acción.");
    }
  };

  // Manejo de caso nulo o vacío
  if (!response) {
    return (
      <div className="turnos-list-container">
        <p>Cargando tus turnos...</p>
      </div>
    );
  }

  if (!response.success) {
    return (
      <div className="turnos-list-container">
        <p>{response.message || "No se pudieron obtener los turnos."}</p>
        <Btn label="Reintentar" onClick={reload} />
        <ActionalBtn leyend="Volver a inicio" linkTo="/" isTertiary />
      </div>
    );
  }

  const turnos = response.data ?? [];

  return (
    <div className="turnos-list-container">
      
      {turnos.length === 0 ? (
        <p>No tenés turnos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.idTurno}>
                <td>{turno.idTurno}</td>
                <td>{turno.especialidad}</td>
                <td>{turno.fecha}</td>
                <td>
                  <ActionButton
                    leyend="Cancelar"
                    isCancelButton
                    onClick={() => handleAction("cancelar", turno.idTurno, "Cancelado")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Btn label="Quiero un nuevo turno" onClick={onClick} />
      <ActionalBtn leyend="Volver a inicio" linkTo="/" isTertiary />
    </div>
  );
}