import { useState, useEffect } from "react";
import type { ResponseProps } from "../../../../types/ResponseProps";
import "./TurnsOfTheDay.css";
import { API_URL } from "../../../../config/apiConfig";
import { useAuth } from "../../../../hooks/useAuth";
import FichaPaciente from "./FichaPaciente/FichaPaciente";
import ActionButton from "../../../../components/shared/ActionButton/ActionButton";
import Alerta from "../../../../components/shared/Alerta/Alerta";

interface TurnoDelDiaProps {
  idTurno: number;
  idPaciente: number;
  nombrePaciente: string;
  especialidad: string;
  hora: string;
  estado: string;
}

export default function TurnsOfTheDay() {
  const [response, setResponse] = useState<ResponseProps<
    TurnoDelDiaProps[]
  > | null>(null);
  const { isLoggedIn, user } = useAuth();
  const token = localStorage.getItem("token");

  const fetchTurnosDelDia = async (idProfesional: number) => {
    if (!token || !isLoggedIn) return;
    try {
      const response = await fetch(
        `${API_URL}/turno/profesional/${idProfesional}/turnos_de_hoy`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        alert("La sesión expiró.");
        localStorage.removeItem("token");
        window.location.href = "/";
      }

      const data = await response.json();
      setResponse(data);

      if (!data.success) console.log(data.message);
    } catch (e) {
      alert("Algo pasó, pa. Sos un burrazo, Error: " + e);
    }
  };

  useEffect(() => {
    if (user?.id) fetchTurnosDelDia(Number(user.id));
  }, [user?.id, token, isLoggedIn]);

  const handleAction = async (
    accion: "marcar como ausente" | "marcar como atendido",
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
          dniDelCancelador: user?.dni,
          nuevoEstado: estadoTurno,
        }),
      });

      const fetchResponse: ResponseProps<unknown> = await res.json();

      if (!fetchResponse.success) {
        alert(fetchResponse.message ?? "Error al cancelar el turno");
        return;
      }

      alert({
        titulo: "Éxito",
        texto: fetchResponse.message ?? `Turno ${accion} correctamente`,
        icono: "success",
      });

      await fetchTurnosDelDia(Number(user?.id));
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la acción.");
    }
  };

  if (response?.data?.length === 0) {
    return <h2>{response.message}</h2>;
  }

  return (
    <div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((turno, index) => (
            <tr key={index}>
              <td>{turno.idTurno}</td>
              <td>{turno.nombrePaciente}</td>
              <td>{turno.especialidad}</td>

              <td>{turno.hora}</td>
              <td>{turno.estado}</td>
              {turno.estado != "Atendido" ? (
                <td className="turnos-acciones-td">
                  <ActionButton
                    leyend="Paciente ausente"
                    isCancelButton
                    onClick={() =>
                      handleAction(
                        "marcar como ausente",
                        turno.idTurno,
                        "Ausente"
                      )
                    }
                  />
                  <FichaPaciente idTurno={turno.idTurno} />
                </td>
              ) : (
                <td>Sin acciones para atendido</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
