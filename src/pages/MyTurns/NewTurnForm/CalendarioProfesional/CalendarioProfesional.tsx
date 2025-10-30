import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ResponseProps } from "../../../../types/ResponseProps";

interface CalendarioProfesionalProps {
  idUsuario: number | null;
  disabled: boolean;
  onDateChange: (date: Date | null) => void;
}

export default function CalendarioProfesional({
  idUsuario,
  disabled,
  onDateChange,
}: CalendarioProfesionalProps) {
  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!idUsuario) {
      setAvailableDays([]);
      return;
    }

    async function fetchDisponibilidad() {
      try {
        const res = await fetch(
          `http://localhost:5295/api/profesional/${idUsuario}/disponibilidad`
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
  }, [idUsuario]);

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
      <label>Seleccioná un día disponible:</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        filterDate={isAvailable}
        dateFormat="dd/MM/yyyy"
        placeholderText={
          disabled ? "Seleccioná un profesional primero" : "Elegí una fecha"
        }
        inline
        disabled={disabled}
      />
    </div>
  );
}
