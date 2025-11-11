import { useState, useEffect } from "react";
import useFranjas from "../../../../../hooks/useFranjas";
import { API_URL } from "../../../../../config/apiConfig";

interface PanelTurnoProps {
  profesionalId: number;
  idPaciente: number;
  idEspecialidad: number;
}

export default function PanelTurno({
  profesionalId,
  idPaciente,
  idEspecialidad,
}: PanelTurnoProps) {
  const [dias, setDias] = useState<string[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(
    null
  );
  const [loadingDias, setLoadingDias] = useState(false);

  // ✅ Hook que devuelve franjas horarias disponibles
  const franjas = useFranjas(profesionalId, diaSeleccionado);

  // 🔹 Cargar días disponibles del profesional
  useEffect(() => {
    if (!profesionalId) return;

    const fetchDias = async () => {
      setLoadingDias(true);
      try {
        const res = await fetch(
          `${API_URL}/profesional/${profesionalId}/disponibilidad`
        );
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setDias(data.data);
        } else {
          console.warn("Formato de respuesta inesperado:", data);
          setDias([]);
        }
      } catch (err) {
        console.error("Error cargando días:", err);
        setDias([]);
      } finally {
        setLoadingDias(false);
      }
    };

    fetchDias();
  }, [profesionalId]);

  // 🔹 Seleccionar día (lo convertimos a Date una sola vez)
  const seleccionarDia = (dia: string) => {
    setDiaSeleccionado(new Date(dia));
    setHorarioSeleccionado(null);
  };

  // 🔹 Confirmar turno
  const confirmarTurno = async () => {
    if (!diaSeleccionado || !horarioSeleccionado)
      return alert("Seleccioná día y horario antes de confirmar.");

    const turnoData = {
      idPaciente,
      idEspecialidad,
      idProfesional: profesionalId,
      dia: diaSeleccionado.toISOString().split("T")[0],
      hora: horarioSeleccionado,
    };

    try {
      const res = await fetch(`${API_URL}/turno`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(turnoData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Turno asignado correctamente ✅");
        setDiaSeleccionado(null);
        setHorarioSeleccionado(null);
      } else {
        alert("No se pudo asignar el turno ❌");
        console.log(data)
      }
    } catch (err) {
      console.error("Error al confirmar turno:", err);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Seleccionar día y horario
      </h2>

      {loadingDias ? (
        <p className="text-gray-500">Cargando días disponibles...</p>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Días disponibles</h3>
            <div className="flex flex-wrap gap-2">
              {dias.length === 0 && (
                <p className="text-sm text-gray-500">Sin días disponibles</p>
              )}
              {dias.map((d) => (
                <button
                  key={d}
                  onClick={() => seleccionarDia(d)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    diaSeleccionado?.toISOString().split("T")[0] ===
                    new Date(d).toISOString().split("T")[0]
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {new Date(d).toLocaleDateString("es-AR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })}
                </button>
              ))}
            </div>
          </div>

          {diaSeleccionado && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Horarios disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {franjas.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Sin horarios disponibles
                  </p>
                )}
                {franjas.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHorarioSeleccionado(h)}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      horarioSeleccionado === h
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={confirmarTurno}
            disabled={!diaSeleccionado || !horarioSeleccionado}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
          >
            Confirmar turno
          </button>
        </>
      )}
    </div>
  );
}
