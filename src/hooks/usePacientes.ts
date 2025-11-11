import { useEffect, useState } from "react";
import type { ResponseProps } from "../types/ResponseProps";
import { API_URL } from "../config/apiConfig";

interface Paciente{
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    email: string,
    telefono: string;
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/paciente`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: ResponseProps<Paciente[]> = await res.json();

        if (data.success && data.data) {
          setPacientes(data.data);
        } else {
          setPacientes([]);
          console.log(res);
        }
      } catch (err) {
        console.error("Error cargando pacientes:", err);
        setPacientes([]);
      }
    };

    fetchPacientes();
  }, []);

  return pacientes;
}
