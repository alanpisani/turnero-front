import type Profesional from "../../../../types/MyTurns/profesional";

interface Props {
  idEspecialidad: number | null;
  profesionales: Profesional[];
  profesionalSeleccionado: Profesional | null;
  setProfesionalSeleccionado: (p: Profesional | null) => void;
  onReset: () => void;
}

export default function ProfesionalInput({
  idEspecialidad,
  profesionales,
  profesionalSeleccionado,
  setProfesionalSeleccionado,
  onReset,
}: Props) {
  if (!idEspecialidad) return null;

  return (
    <label>
      Profesional:
      <select
        value={profesionalSeleccionado?.nombreProfesional ?? ""}
        onChange={(e) => {
          const nuevo = profesionales.find((p) => p.nombreProfesional === e.target.value) || null;
          setProfesionalSeleccionado(nuevo);
          onReset();
        }}
      >
        <option value="">Seleccione profesional</option>
        {profesionales.map((prof) => (
          <option key={prof.idUsuario} value={prof.nombreProfesional}>
            {prof.nombreProfesional}
          </option>
        ))}
      </select>
    </label>
  );
}