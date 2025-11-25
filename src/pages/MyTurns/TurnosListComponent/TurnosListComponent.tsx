import ActionalBtn from "../../../components/shared/ActionalBtn/ActionalBtn";
import ActionButton from "../../../components/shared/ActionButton/ActionButton";
import Alerta from "../../../components/shared/Alerta/Alerta";
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
      Alerta({
        titulo: "Error",
        texto: "Debes iniciar sesión para realizar esta acción.",
        icono: "error",
      });
      return;
    }

    if (dniInput !== user?.dni) {
      Alerta({
        titulo: "Error",
        texto: "El DNI ingresado no coincide con el del usuario logueado.",
        icono: "error",
      });
      return;
    }

    const confirmar = await Alerta({
      titulo: "Atención",
      texto: `¿Estás seguro que querés ${accion} el turno?`,
      icono: "warning",
      isCancelButton: true,
    });

    if (!confirmar.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/turno/${idTurno}/modificar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dniDelCancelador: dniInput,
          nuevoEstado: estadoTurno,
        }),
      });

      const fetchResponse: ResponseProps<unknown> = await res.json();

      if (!fetchResponse.success) {
        alert(fetchResponse.message ?? "Error al cancelar el turno");
        return;
      }

      Alerta({ titulo: "Éxito", texto: fetchResponse.message ?? "Turno cancelado correctamente", icono: "success" });
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
        <p>{ response.message }</p>
      ) : (
        <table>
          <thead>
              <tr>
                <th>#</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno, index) => (
              <tr key={turno.idTurno}>
                <td>{index + 1}</td>
                <td>{turno.especialidad}</td>
                <td>{turno.fecha}</td>
                <td>
                  <ActionButton
                    leyend="Cancelar"
                    isCancelButton
                    onClick={() =>
                      handleAction("cancelar", turno.idTurno, "Cancelado")
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="btns-container">
        <ActionalBtn onClick={onClick} leyend="Solicitar nuevo turno" />
        <ActionalBtn
          leyend="Volver a la página principal"
          linkTo="/"
          isTertiary
        />
      </div>
    </div>
  );
}
