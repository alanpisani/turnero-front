import { useCallback, useEffect, useState } from "react";
import type { ResponseProps } from "../../../../types/ResponseProps";
import type Profesional from "../../../../types/MyTurns/profesional";
import { API_URL } from "../../../../config/apiConfig";
import Paginator from "../../Paginator/Paginator";
import type { PagedResult } from "../../../../types/PagedResult";
import Modal from "../../../../components/shared/Modal/Modal";

import "./ProfessionalManagement.css";
import { useUserStatus } from "../../../../hooks/useUserStatus";
import SwitchUserStatusBtn from "../../SwitchUserStatusBtn/SwitchUserStatusBtn";
import CreateProfessionalForm from "./CreateProfessionalForm/CreateProfessionalForm";



export default function ProfessionalManagement() {
  const [response, setResponse] = useState<ResponseProps<
    PagedResult<Profesional>
  > | null>(null);

  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");

  const fetchProfesionales = useCallback(async () => {
    const response = await fetch(`${API_URL}/profesional?pageNumber=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      alert("La sesión expiró.");
      window.location.href = "/";
    }

    const data = await response.json();
    setResponse(data);

    if (!data.success) alert(data.message);
  }, [page, token]);

  useEffect(() => {
    fetchProfesionales();
  }, [fetchProfesionales]);

  const totalPages = response?.data
    ? Math.ceil(response.data.totalRecords / response.data.pageSize)
    : 0;

  const { handleUserStatus } = useUserStatus(token, fetchProfesionales);

  return (
    <section className="admin-section">
      <h2>Gestión de Profesionales</h2>
      <div className="modal-create-pro-container">
        <Modal triggerText="Crear profesional">
          <CreateProfessionalForm token={token}/>
        </Modal>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Matrícula</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.data.map((prof, index) => (
            <tr key={index}>
              <td>{prof.idUsuario}</td>
              <td>
                Dr. {prof.nombreProfesional} {prof.apellidoProfesional}
              </td>
              <td>{prof.matricula}</td>
              <td
                className={"status " + (prof.isActive ? "active" : "inactive")}
              >
                {prof.isActive ? "Activo" : "Inactivo"}
              </td>
              <td>
                <SwitchUserStatusBtn
                  handleUserStatus={handleUserStatus}
                  idUsuario={prof.idUsuario}
                  isActiveUser={prof.isActive}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
}
