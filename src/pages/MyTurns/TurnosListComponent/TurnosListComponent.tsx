import ActionalBtn from "../../../components/shared/ActionalBtn/ActionalBtn";
import ActionButton from "../../../components/shared/ActionButton/ActionButton";
import { Btn } from "../../../components/shared/Btn/Btn";
import { API_URL } from "../../../config/apiConfig";
import { useAuth } from "../../../hooks/useAuth";
import type { TurnoProp } from "../../../types/MyTurns/turno";
import type { ResponseProps } from "../../../types/ResponseProps";
import "./TurnosListComponent.css"

interface TurnosListComponentProps {
  response: ResponseProps<TurnoProp[]>;
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
    idTurno: number
  ) => {
    if (!isLoggedIn) {
      alert("Debes estar logueado para realizar esta acción.");
      return;
    }
    if (dniInput != user?.dni) {
      alert("No podés modificar turnos de otro paciente.");
      return;
    }

    const cancelarTurnoDto = { dniDelCancelador: dniInput };

    if (confirm(`¿Estás seguro que queres ${accion} el turno?`)) {
      try {
        const res = await fetch(`${API_URL}/turno/${idTurno}/cancelar`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cancelarTurnoDto),
        });

        const fetchResponse: ResponseProps<unknown> = await res.json();

        if (!fetchResponse.success) {
          alert(fetchResponse.message);
          return;
        }

        alert("Turno cancelado correctamente");
        reload();
      } catch {
        alert("Hubo un error al procesar la acción");
      }
    }
  };

  return (
    <div className="turnos-list-container">
      <p>{response.message}</p>
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
          {response.data?.map((turno: TurnoProp, index: number) => (
            <tr key={index}>
              <td>{turno.idTurno}</td>
              <td>{turno.especialidad}</td>
              <td>{turno.fecha}</td>
              <td>
                {/* <ActionButton
                  leyend="Reprogramar"
                  onClick={() => handleAction("reprogramar", turno.idTurno)}
                /> */}
                <ActionButton
                  leyend="Cancelar"
                  isCancelButton
                  onClick={() => handleAction("cancelar", turno.idTurno)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Btn label="Quiero un nuevo turno" onClick={onClick} />
      <ActionalBtn leyend="Volver a inicio" linkTo="/" isTertiary />
    </div>
  );
}