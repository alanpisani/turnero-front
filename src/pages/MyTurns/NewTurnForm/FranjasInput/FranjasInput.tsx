interface FranjasInputProps {
  condicion: boolean;
  franjaSeleccionada: string;
  setFranjaSeleccionada: React.Dispatch<React.SetStateAction<string>>;
  franjas: string[];
  fechaSeleccionada: Date | null;
  hasLabel?: boolean
}

export default function FranjasInput({
  condicion,
  franjaSeleccionada,
  setFranjaSeleccionada,
  franjas,
  fechaSeleccionada,
  hasLabel
}: FranjasInputProps) {
  return (
    <>
      {condicion && (
        <label>
          {hasLabel ? "Horario disponible:" : ""}
          <select
            value={franjaSeleccionada}
            onChange={(e) => setFranjaSeleccionada(e.target.value)}
          >
            <option value="">Seleccioná un horario</option>
            {franjas.map((franja, idx) => (
              <option key={idx} value={franja}>
                {franja}
              </option>
            ))}
          </select>
        </label>
      )}

      {fechaSeleccionada && franjas.length === 0 && (
        <p>No hay horarios disponibles para esta fecha.</p>
      )}
    </>
  );
}
