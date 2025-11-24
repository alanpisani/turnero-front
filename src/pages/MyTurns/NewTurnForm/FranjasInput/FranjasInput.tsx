interface FranjasInputProps {
  condicion: boolean;
  franjaSeleccionada: string;
  setFranjaSeleccionada: React.Dispatch<React.SetStateAction<string>>;
  franjas: string[];
  fechaSeleccionada: Date | null;
  hasLabel?: boolean;
}

export default function FranjasInput({
  condicion,
  franjaSeleccionada,
  setFranjaSeleccionada,
  franjas,
  fechaSeleccionada,
  hasLabel,
}: FranjasInputProps) {
  return (
    <label>
      {hasLabel ? "Horario disponible:" : ""}

      <select
        disabled={!condicion}
        value={franjaSeleccionada}
        onChange={(e) => setFranjaSeleccionada(e.target.value)}
      >
        <option value="">
          {!condicion
            ? "Seleccione primero un profesional"
            : "Seleccioná un horario"}
        </option>

        {condicion &&
          franjas.map((franja, idx) => (
            <option key={idx} value={franja}>
              {franja}
            </option>
          ))}
      </select>

      {fechaSeleccionada && franjas.length === 0 && condicion && (
        <p>No hay horarios disponibles para esta fecha.</p>
      )}
    </label>
  );
}