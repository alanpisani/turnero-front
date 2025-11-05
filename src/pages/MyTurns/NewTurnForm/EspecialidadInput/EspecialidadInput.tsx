import type Especialidad from "../../../../types/MyTurns/especialidad";

interface EspecialidadInputProps {
  idEspecialidad: number | null;
  setIdEspecialidad: React.Dispatch<React.SetStateAction<number | null>>;
  especialidades: Especialidad[];
  onReset: () => void;
  hasLabel?: boolean;
}

export default function EspecialidadInput({
  idEspecialidad,
  setIdEspecialidad,
  especialidades,
  onReset,
  hasLabel
}: EspecialidadInputProps) {
  return (
    <label>
      {hasLabel ? "Especialidad:" : ""}
      <select
        value={idEspecialidad ?? ""}
        onChange={(e) => {
          setIdEspecialidad(Number(e.target.value) || null);
          onReset();
        }}
      >
        <option value="">Seleccioná una especialidad</option>
        {especialidades.map((esp) => (
          <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
            {esp.nombreEspecialidad}
          </option>
        ))}
      </select>
    </label>
  );
}
