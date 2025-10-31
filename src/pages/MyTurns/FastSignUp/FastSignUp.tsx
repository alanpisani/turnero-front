import { useState } from "react";
import ActionalBtn from "../../../components/shared/ActionalBtn/ActionalBtn";

interface FastSignUpProps {
  dni: number;
  redirect: () => void;
}

export default function FastSignUp({ dni, redirect }: FastSignUpProps) {
  const [dniInput, setDniInput] = useState<number>(dni ?? 0);
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pacienteRapidoDto = {
      nombre: nombre,
      dni: dniInput,
    };

    try {
      const response = await fetch(
        "http://localhost:5295/api/paciente/rapido",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pacienteRapidoDto),
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      alert(result.message);
      redirect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="dni-rapido">DNI</label>
      <input
        type="number"
        name="dni-rapido"
        placeholder="Escriba su dni"
        value={dniInput}
        onChange={(e) => setDniInput(Number(e.target.value))}
      />
      <label htmlFor="nombre-rapido">Nombre</label>
      <input
        type="text"
        name="nombre-rapido"
        placeholder="Escribí acá tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <ActionalBtn leyend="Registrar" />
    </form>
  );
}
