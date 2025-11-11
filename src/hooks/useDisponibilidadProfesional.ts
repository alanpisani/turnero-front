import { useEffect, useState } from "react";
import { API_URL } from "../config/apiConfig";

export function useDisponibilidadProfesional(profesionalId: number) {
  const [diasDisponibles, setDiasDisponibles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisponibilidad = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/profesional/${profesionalId}/disponibilidad`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener disponibilidad");

        const data = await response.json();
        setDiasDisponibles(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDisponibilidad();
  }, [profesionalId]);

  return { diasDisponibles, loading, error };
}
