import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../../../config/apiConfig";
import "./UserManagement.css";
import type { ResponseProps } from "../../../../types/ResponseProps";
import type { PagedResult } from "../../../../types/PagedResult";
import Paginator from "../../Paginator/Paginator";
import type { usuario } from "../../../../types/Entidades/Usuario";
import { useUserStatus } from "../../../../hooks/useUserStatus";
import SwitchUserStatusBtn from "../../SwitchUserStatusBtn/SwitchUserStatusBtn";

export default function UserManagement() {
  const [response, setResponse] = useState<ResponseProps<
    PagedResult<usuario>
  > | null>(null);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  const fetchUsuarios = useCallback(async () => {
    if (!token) return;

    const response = await fetch(
      `${API_URL}/admin_recepcionista?pageNumber=${page}`,
      {
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

    if (!data.success) alert(data.message);
  }, [page, token]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const titulos = ["ID", "Nombre", "Email", "Rol", "Estado", "Acción"];

  const totalPages = response?.data?.totalPages ?? 0;

  const { handleUserStatus } = useUserStatus(token, fetchUsuarios);

  return (
    <section className="admin-section">
      <h2>Gestión de usuarios</h2>

      <table className="admin-table">
        <thead>
          <tr>
            {
              titulos.map((titulo, index) => (
                <th key={index}>{titulo}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {response?.data?.data.map((usuario, index) => (
            <tr key={index}>
              <td data-label="id">{usuario.idUsuario}</td>
              <td data-label="Nombre">
                {usuario.nombre} {usuario.apellido ?? ""}
              </td>
              <td data-label="E-mail">{usuario.email ?? "No proporcionado"}</td>
              <td data-label="rol">{usuario.rol}</td>
              <td data-label="estado"
                className={
                  "status " + (usuario.isActive ? "active" : "inactive")
                }
              >
                {usuario.isActive ? "Activo" : "Inactivo"}
              </td>
              <td data-label="Acción">
                <SwitchUserStatusBtn handleUserStatus={handleUserStatus} idUsuario={usuario.idUsuario} isActiveUser={usuario.isActive} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginator totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
}
