import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../../../config/apiConfig";
import "./UserManagement.css";
import type { ResponseProps } from "../../../../types/ResponseProps";

interface usuario {
  nombre: string;
  apellido: string | null;
  dni: number;
  email: string | null;
  rol: string;
  fechaNacimiento: string;
  isComplete: boolean;
}

export default function UserManagement() {
  const didFetch = useRef(false);
  const [response, setResponse] = useState<ResponseProps<usuario[]> | null>(
    null
  );

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const fetchUsuarios = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/admin_recepcionista`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setResponse(data);

      if (!data.success) alert(data.message);
      else console.log(data.data);
    };

    fetchUsuarios();
  }, []);

  return (
    <section className="admin-section">
      <h2>Gestión de usuarios</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nombre} { usuario.apellido ?? ""}</td>
              <td>{usuario.email ?? "No proporcionado"}</td>
              <td>{usuario.rol}</td>
              <td className="status active">Activo</td>
              <td>
                <button className="disable-btn">Deshabilitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
