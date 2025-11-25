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
import { API_URL } from "../../../config/apiConfig";

import "./NewTurnForm.css";
import Alerta from "../../../components/shared/Alerta/Alerta";

interface NewTurnFormProp {
  idPaciente: number;
  redirect: () => void;
  reload: () => void;
}

export default function NewTurnForm({
  idPaciente,
  redirect,
  reload,
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
      idPaciente: idPaciente,
      idEspecialidad: idEspecialidad,
      idProfesional: profesionalSeleccionado.idUsuario,
      dia: fechaSeleccionada.toISOString().split("T")[0], // "YYYY-MM-DD"
      hora: franjaSeleccionada, // "HH:mm"
    };

    try {
      const response = await fetch(`${API_URL}/turno`, {
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
        Alerta({ titulo: "Exito", texto: result.message, icono: "success" });
        reload();
        redirect();
      } else {
        Alerta({ titulo: "Error", texto: result.errors, icono: "error" });
        console.log(result.errors)
      }
    } catch {
      Alerta({ titulo: "Error", texto: "No se pudo conectar con el servidor.", icono: "error" });
    }
  };

  // Render
  return (
    <form onSubmit={handleSubmit} className="new-turn-form">
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
