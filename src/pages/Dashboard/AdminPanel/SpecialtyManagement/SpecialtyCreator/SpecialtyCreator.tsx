import { useState, useCallback } from "react";
import { API_URL } from "../../../../../config/apiConfig";
import "./SpecialtyCreator.css";

interface SpecialtyCreatorProps{
  reset: () => void;
}


export default function SpecialtyCreator({ reset }:SpecialtyCreatorProps) {
  const [nombre, setNombre] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!token) {
        alert("No se encontró un token. Iniciá sesión nuevamente.");
        return;
      }

      if(!confirm(`Vas a crear la especialidad ${nombre}. ¿Estás seguro?`)) return;

      try {
        const response = await fetch(`${API_URL}/especialidad`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombreEspecialidad: nombre }),
        });

        if (response.status === 401) {
          alert("La sesión expiró.");
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }

        if (!response.ok) {
          alert("Ocurrió un error al crear la especialidad.");
          return;
        }

        const data = await response.json();
        alert(`Especialidad ${data["nombreEspecialidad"]} creada con éxito!`)
        setNombre("");
        reset()
      } catch (error) {
        console.error("Error:", error);
        alert("Error en la solicitud.");
      }
    },
    [token, nombre, reset]
  );

  return (
    <form className="specialty-actions" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva especialidad..."
        className="specialty-input"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <button type="submit" className="create-btn">
        Agregar
      </button>
    </form>
  );
}
