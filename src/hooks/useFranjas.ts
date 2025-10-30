import { useEffect, useState } from "react";

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
    const url = `http://localhost:5295/api/profesional/${idProfesional}/franjas?fecha=${fechaISO}`;

    fetch(url)
      .then((res) => res.text()) // obtenemos texto crudo para mayor control
      .then((text) => {
        try {
          const json = JSON.parse(text);
          console.log("JSON parseado:", json);

          // Si el backend devuelve directamente un array de strings
          if (Array.isArray(json)) {
            setFranjas(json);
            return;
          }

          // Si usa ResponseProps con success/data
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
