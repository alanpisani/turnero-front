import { useEffect, useState } from "react";
import { API_URL } from "../config/apiConfig";

export default function useFranjas(
  idProfesional: number | null,
  fechaSeleccionada: Date | null
) {
  const [franjas, setFranjas] = useState<string[]>([]);

  useEffect(() => {
    if (!idProfesional || !fechaSeleccionada) {
      setFranjas([]);
      return;
    }

    const fechaISO = fechaSeleccionada.toISOString().split("T")[0]; // yyyy-mm-dd
    const url = `${API_URL}/profesional/${idProfesional}/franjas?fecha=${fechaISO}`;

    fetch(url)
      .then((res) => res.text()) 
      .then((text) => {
        try {
          const json = JSON.parse(text);
          console.log("JSON parseado:", json);

          
          if (Array.isArray(json)) {
            setFranjas(json);
            return;
          }

          
          if (json.success && Array.isArray(json.data)) {
            setFranjas(json.data);
            return;
          }

          console.warn("El backend no devolvió success/data válidos.");
          setFranjas([]);
        } catch {
          console.error("No se pudo parsear el JSON de respuesta.");
          setFranjas([]);
        }
      })
      .catch(() => setFranjas([]));
  }, [idProfesional, fechaSeleccionada]);

  return franjas;
}
