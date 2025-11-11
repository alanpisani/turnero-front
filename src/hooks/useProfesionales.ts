import { useEffect, useState } from "react";
import type Profesional from "../types/MyTurns/profesional";
import type { ResponseProps } from "../types/ResponseProps";
import { API_URL } from "../config/apiConfig";

export default function useProfesionales(idEspecialidad: number | null) {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);

  useEffect(() => {
    if (!idEspecialidad) {
      setProfesionales([]);
      return;
    }

    fetch(`${API_URL}/profesional/especialidad/${idEspecialidad}`)
      .then((res) => res.json())
      .then((data: ResponseProps<Profesional[]>) => {
        if (data.success && data.data) setProfesionales(data.data);
      })
      .catch(() => setProfesionales([]));
  }, [idEspecialidad]);

  return profesionales;
}
