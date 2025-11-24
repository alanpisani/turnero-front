import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ResponseProps } from "../../../../types/ResponseProps";
import { API_URL } from "../../../../config/apiConfig";

interface CalendarioProfesionalProps {
  idUsuario: number | null;
  disabled: boolean;
  onDateChange: (date: Date | null) => void;
  hasLabel?: boolean;
  isInline?: boolean;
}

export default function CalendarioProfesional({
  idUsuario,
  disabled,
  onDateChange,
  hasLabel,
  isInline,
}: CalendarioProfesionalProps) {
  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(null);
    onDateChange(null);

    if (!idUsuario) {
      setAvailableDays([]);
      return;
    }

    async function fetchDisponibilidad() {
      try {
        const res = await fetch(
          `${API_URL}/profesional/${idUsuario}/disponibilidad`
        );
        const data: ResponseProps<string[]> = await res.json();

        if (data.success && data.data) {
          const parsed = data.data.map((d) => {
            const [y, m, day] = d.split("-").map(Number);
            return new Date(y, m - 1, day);
          });
          setAvailableDays(parsed);
        } else {
          setAvailableDays([]);
        }
      } catch (err) {
        console.error("Error cargando disponibilidad:", err);
        setAvailableDays([]);
      }
    }

    fetchDisponibilidad();
  }, [idUsuario, onDateChange]);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const isAvailable = (date: Date) =>
    availableDays.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

  return (
    <div>
      <label>{hasLabel ? "Seleccioná un día disponible:" : ""}</label>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        filterDate={isAvailable}
        dateFormat="dd/MM/yyyy"
        placeholderText={
          disabled ? "Seleccioná un profesional primero" : "Elegí una fecha"
        }
        inline={isInline}
        disabled={disabled}
      />
    </div>
  );
}
