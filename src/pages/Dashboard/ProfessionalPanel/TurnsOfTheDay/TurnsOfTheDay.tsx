import { useState, useCallback, useEffect } from "react";
import type { ResponseProps } from "../../../../types/ResponseProps";
import "./TurnsOfTheDay.css";
import { API_URL } from "../../../../config/apiConfig";
import { useAuth } from "../../../../hooks/useAuth";
import FichaPaciente from "./FichaPaciente/FichaPaciente";

interface TurnoDelDiaProps{
  idTurno: number;
  idPaciente: number;
  nombrePaciente: string;
  especialidad: string;
  hora: string;
}

export default function TurnsOfTheDay() {
  const [response, setResponse] = useState<ResponseProps<TurnoDelDiaProps[]> | null>(
    null
  );
  const { isLoggedIn, user } = useAuth();
  const token = localStorage.getItem("token");

  const fetchTurnosDelDia = useCallback(
    async (idProfesional: number) => {
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
    },
    [token, isLoggedIn]
  );

  useEffect(() => {
    fetchTurnosDelDia(Number(user?.id));
  }, [fetchTurnosDelDia, user?.id]);

  if (response?.data?.length === 0) {
    return <h2>{response.message}</h2>;
  }

  return (
    <div className="professional-table">
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
          {response?.data?.map((turno, index) => (
            <tr key={index}>
              <td>{ turno.idTurno}</td>
              <td>{turno.nombrePaciente}</td>
              <td>{ turno.especialidad}</td>
              <td>{ turno.hora}</td>
              <td className="td-action">
                <button>Marcar como atendido</button>
                <button>Marcar como ausente</button>

                <FichaPaciente idPaciente={turno.idPaciente}/>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
