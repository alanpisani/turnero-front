import { useCallback, useEffect, useState } from "react";
import ActionButton from "../../../../components/shared/ActionButton/ActionButton";
import type { ResponseProps } from "../../../../types/ResponseProps";
import type { usuario } from "../../../../types/Entidades/Usuario";
import { API_URL } from "../../../../config/apiConfig";
import { useAuth } from "../../../../hooks/useAuth";

export default function MyPatients() {
  const [response, setResponse] = useState<ResponseProps<usuario[]> | null>(
    null
  );
  const { isLoggedIn, user } = useAuth();
  const token = localStorage.getItem("token");

  const fetchUsuarios = useCallback(
    async (idProfesional: number) => {
      if (!token || !isLoggedIn) return;

      const res = await fetch(
        `${API_URL}/profesional/${idProfesional}/mis_pacientes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        alert("La sesión expiró.");
        localStorage.removeItem("token");
        window.location.href = "/";
      }

      const data = await res.json();
      setResponse(data);

      if (!data.success) alert(data.message);
      else console.log(data.data);
    },
    [isLoggedIn, token]
  );

  useEffect(() => {
    if (user?.id) {
      fetchUsuarios(Number(user.id));
    }
  }, [fetchUsuarios, user?.id]);

  return (
    <div className="patients-table-container">
      <h2>Pacientes</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.idUsuario}</td>
              <td>
                {usuario.nombre} {usuario.apellido}
              </td>
              <td>
                <ActionButton leyend="Ver"/>
                <ActionButton leyend="Editar" isCreateButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
