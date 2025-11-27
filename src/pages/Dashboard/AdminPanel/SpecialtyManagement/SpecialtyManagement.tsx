import { useEffect, useState } from "react";
import type { ResponseProps } from "../../../../types/ResponseProps";
import type Especialidad from "../../../../types/MyTurns/especialidad";
import { API_URL } from "../../../../config/apiConfig";
import type { PagedResult } from "../../../../types/PagedResult";
import Paginator from "../../Paginator/Paginator";
import SpecialtyCreator from "./SpecialtyCreator/SpecialtyCreator";

interface ChangeEspecialidadRequest {
  activo: boolean;
}

export default function SpecialtyManagement() {
  const [response, setResponse] = useState<ResponseProps<
    PagedResult<Especialidad>
  > | null>(null);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEspecialidad = async () => {
      if (!token) return;

      const response = await fetch(
        `${API_URL}/especialidad?pageNumber=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        alert("La sesión expiró.");
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      const data = await response.json();
      setResponse(data);

      if (!data.success) alert(data.message);
    };

    fetchEspecialidad();
  }, [page, token]);

  const totalPages = response?.data?.totalPages ?? 0;

  const toggleEspecialidad = async (id: number, estado: boolean) => {
    if (!token) return;

    const confirmacion = confirm(
      "¿Deseás cambiar el estado de esta especialidad?"
    );
    if (!confirmacion) return;

    const dto: ChangeEspecialidadRequest = {
      activo: !estado,
    };

    const response = await fetch(`${API_URL}/especialidad/cambiar/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (response.status === 401) {
      alert("La sesión expiró.");
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await response.json();
    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Estado actualizado correctamente.");
    reloadEspecialidades();
  };

  const reloadEspecialidades = async () => {
    if (!token) return;

    const response = await fetch(`${API_URL}/especialidad?pageNumber=${page}`, {
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
  };

  return (
    <section className="admin-section">
      <h2>Gestión de Especialidades</h2>

      {/* Creador de especialidades */}
      <SpecialtyCreator reset={reloadEspecialidades} />

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.data.map((especialidad, index) => (
            <tr key={index}>
              <td data-label="ID">{especialidad.idEspecialidad}</td>
              <td data-label="Nombre">{especialidad.nombreEspecialidad}</td>
              <td data-label="Estado"
                className={`status ${
                  especialidad.isActive ? "active" : "inactive"
                }`}
              >
                {especialidad.isActive ? "Activa" : "Inactiva"}
              </td>
              <td data-label="Acción">
                <button
                  className={
                    especialidad.isActive ? "disable-btn" : "enable-btn"
                  }
                  onClick={() =>
                    toggleEspecialidad(
                      especialidad.idEspecialidad,
                      especialidad.isActive
                    )
                  }
                >
                  {especialidad.isActive ? "Deshabilitar" : "Habilitar"}
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
