import { useCallback, useEffect, useState } from "react";
import type { ResponseProps } from "../../../../types/ResponseProps";
import type { PagedResult } from "../../../../types/PagedResult";
import type { TurnoProp } from "../../../../types/MyTurns/turno";
import { API_URL } from "../../../../config/apiConfig";
import Paginator from "../../Paginator/Paginator";
import { useAuth } from "../../../../hooks/useAuth";

export default function HistorialTurnos() {
  const [response, setResponse] = useState<ResponseProps<
    PagedResult<TurnoProp>
  > | null>(null);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const { isLoggedIn, user } = useAuth();

  const fetchTurnos = useCallback(async () => {
    if (!token) return;

    const response = await fetch(`${API_URL}/turno?pageNumber=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      alert("La sesión expiró.");
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await response.json();
    setResponse(data);

    if (!data.success) alert(data.message);
  }, [page, token]);

  useEffect(() => {
    fetchTurnos();
  }, [fetchTurnos]);

  const totalPages = response?.data
    ? Math.ceil(response.data.totalRecords / response.data.pageSize)
    : 0;

  const handleAction = async (
    accion: "marcar como ausente" | "cancelar",
    idTurno: number,
    estadoTurno: string
  ) => {
    if (!isLoggedIn) {
      alert("Debes estar logueado para realizar esta acción.");
      return;
    }

    if (!confirm(`¿Estás seguro que querés ${accion} el turno?`)) return;

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

      alert("Turno modificado correctamente");
      await fetchTurnos();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la acción.");
    }
  };

  // Manejo de caso nulo o vacío
  if (!response) {
    return (
      <div className="turnos-list-container">
        <p>Cargando turnos...</p>
      </div>
    );
  }

  return (
    <section>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Especialidad</th>
            <th>fecha</th>
            <th>Estado del turno</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.data.map((turno, index) => (
            <tr key={index}>
              <td>{turno.especialidad}</td>
              <td>{turno.fecha}</td>
              <td>{turno.estadoTurno}</td>
              <td>
                <button
                  className="create-btn"
                  onClick={() =>
                    handleAction(
                      "marcar como ausente",
                      turno.idTurno,
                      "Ausente"
                    )
                  }
                >
                  Marcar como ausente
                </button>
                <button
                  className="disable-btn"
                  onClick={() =>
                    handleAction("cancelar", turno.idTurno, "Cancelado")
                  }
                >
                  Cancelar turno
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
}
