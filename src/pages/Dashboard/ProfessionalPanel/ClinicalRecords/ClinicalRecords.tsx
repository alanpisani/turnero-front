import { useState, useEffect } from "react";
import type { ResponseProps } from "../../../../types/ResponseProps";
import { API_URL } from "../../../../config/apiConfig";
import Alerta from "../../../../components/shared/Alerta/Alerta";

interface historialesResponseProp {
  idHistorial: number;
  nombrePaciente: string;
  fechaConsulta: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
}

export default function ClinicalRecords() {
  const [response, setResponse] = useState<ResponseProps<
    historialesResponseProp[]
  > | null>(null);

  useEffect(() => {
    const fetchHistoriales = async () => {
      try {
        const res = await fetch(`${API_URL}/historial`);
        const fetchResponse = await res.json();

        if (!fetchResponse.success) {
          Alerta({
            titulo: "Atención",
            texto: fetchResponse.message!,
            icono: "warning",
          });
        }

        setResponse(fetchResponse);
      } catch (error) {
        console.error(error);
        Alerta({
          titulo: "Error",
          texto: "No se pudo obtener el historial.",
          icono: "error",
        });
      }
    };

    fetchHistoriales();
  }, []);

  return (
    <div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((historial, index) => (
            <tr key={index}>
              <td>{historial.idHistorial}</td>
              <td>{historial.nombrePaciente}</td>
              <td>{historial.fechaConsulta}</td>
              <td>{historial.diagnostico}</td>
              <td>{historial.tratamiento}</td>
              <td>{historial.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
