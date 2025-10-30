import { useState } from "react";
import CalendarioProfesional from "./CalendarioProfesional/CalendarioProfesional";
import ActionalBtn from "../../../components/shared/ActionalBtn/ActionalBtn";
import EspecialidadInput from "./EspecialidadInput/EspecialidadInput";
import ProfesionalInput from "./ProfesionalInput/ProfesionalInput";
import type Profesional from "../../../types/MyTurns/profesional";
import FranjasInput from "./FranjasInput/FranjasInput";
import { useEspecialidades } from "../../../hooks/useEspecialidades";
import useProfesionales from "../../../hooks/useProfesionales";
import useFranjas from "../../../hooks/useFranjas";

interface NewTurnFormProp {
  dniPaciente: number;
  redirect: () => void;
}

export default function NewTurnForm({
  dniPaciente,
  redirect,
}: NewTurnFormProp) {
  const [idEspecialidad, setIdEspecialidad] = useState<number | null>(null);
  const [profesionalSeleccionado, setProfesionalSeleccionado] =
    useState<Profesional | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [franjaSeleccionada, setFranjaSeleccionada] = useState<string>("");

  const especialidades = useEspecialidades();
  const profesionales = useProfesionales(idEspecialidad);
  const franjas = useFranjas(
    profesionalSeleccionado?.idUsuario ?? null,
    fechaSeleccionada
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !idEspecialidad ||
      !profesionalSeleccionado ||
      !fechaSeleccionada ||
      !franjaSeleccionada
    ) {
      alert("Faltan datos para generar el turno.");
      return;
    }

    const turnoDTO = {
      dniPaciente: dniPaciente,
      idEspecialidad: idEspecialidad,
      idProfesional: profesionalSeleccionado.idUsuario,
      dia: fechaSeleccionada.toISOString().split("T")[0], // "YYYY-MM-DD"
      hora: franjaSeleccionada, // "HH:mm"
    };

    try {
      const response = await fetch("http://localhost:5295/api/turno/rapido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(turnoDTO),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        alert("Turno registrado correctamente");
        redirect();
      } else {
        alert("No se pudo registrar el turno.");
      }
    } catch (error) {
      console.error("Error al registrar turno:", error);
      alert("Hubo un error al registrar el turno.");
    }
  };

  // Render
  return (
    <form onSubmit={handleSubmit}>
      <EspecialidadInput
        idEspecialidad={idEspecialidad}
        setIdEspecialidad={setIdEspecialidad}
        especialidades={especialidades}
        onReset={() => {
          setProfesionalSeleccionado(null);
          setFechaSeleccionada(null);
          setFranjaSeleccionada("");
        }}
      />

      <ProfesionalInput
        profesionalSeleccionado={profesionalSeleccionado}
        idEspecialidad={idEspecialidad}
        profesionales={profesionales}
        setProfesionalSeleccionado={setProfesionalSeleccionado}
        onReset={() => {
          setFechaSeleccionada(null);
          setFranjaSeleccionada("");
        }}
      />

      <CalendarioProfesional
        idUsuario={profesionalSeleccionado?.idUsuario ?? null}
        disabled={!profesionalSeleccionado}
        onDateChange={setFechaSeleccionada}
      />

      <FranjasInput
        condicion={!!(fechaSeleccionada && franjas.length)}
        franjaSeleccionada={franjaSeleccionada}
        setFranjaSeleccionada={setFranjaSeleccionada}
        franjas={franjas}
        fechaSeleccionada={fechaSeleccionada}
      />
      <ActionalBtn leyend="Crear turno" />
    </form>
  );
}
