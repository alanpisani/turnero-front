import { useState } from "react";
import ActionButton from "../../../../components/shared/ActionButton/ActionButton";
import { API_URL } from "../../../../config/apiConfig";
import ProfesionalInput from "../../../MyTurns/NewTurnForm/ProfesionalInput/ProfesionalInput";
import useProfesionales from "../../../../hooks/useProfesionales";
import { useEspecialidades } from "../../../../hooks/useEspecialidades";
import EspecialidadInput from "../../../MyTurns/NewTurnForm/EspecialidadInput/EspecialidadInput";
import type Profesional from "../../../../types/MyTurns/profesional";
import useFranjas from "../../../../hooks/useFranjas";
import CalendarioProfesional from "../../../MyTurns/NewTurnForm/CalendarioProfesional/CalendarioProfesional";
import FranjasInput from "../../../MyTurns/NewTurnForm/FranjasInput/FranjasInput";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    contraseniaRepetida: "",
    celular: "",
    documento: "",
    especialidad: "",
    profesional: "",
    fecha: "",
    horario: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //adaptamos los datos al formato que espera el back
    const payload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      dni: Number(formData.documento),
      email: formData.correo,
      contrasenia: "string", // o campo real si tenés input
      contraseniaRepetida: "string",
      isComplete: true,
      telefono: formData.celular,
      turno: {
        idEspecialidad: Number(idEspecialidad),
        idProfesional: Number(profesionalSeleccionado?.idUsuario),
        dia: fechaSeleccionada?.toISOString().split("T")[0],
        hora: franjaSeleccionada,
      },
    };

    try {
      const response = await fetch(`${API_URL}/paciente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // si tu backend devuelve Success=false con código 200, hay que revisar eso también
      if (!response.ok || data.success === false) {
        console.error("Error del servidor:", data);
        alert(
          data.errors
            ? JSON.stringify(data.errors)
            : data.message || "Error al registrar el turno"
        );
        return;
      }

      alert("Registro y turno confirmados con éxito! Conectate para poder ver tus turnos");
      console.log("Respuesta del backend:", data);
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="fila fila-1">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div className="fila fila-2">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="fila fila-3">
        <input
          type="password"
          name="contrasenia"
          placeholder="Contraseña"
          value={formData.contrasenia}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseniaRepetida"
          placeholder="Reingrese contraseña"
          value={formData.contraseniaRepetida}
          onChange={handleChange}
          required
        />
      </div>

      <div className="fila fila-4">
        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={formData.celular}
          onChange={handleChange}
          required
        />
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
      </div>

      <div className="fila fila-5">
        <input
          type="number"
          name="documento"
          placeholder="Documento"
          min={10000000}
          max={99999999}
          value={formData.documento}
          onChange={handleChange}
          required
        />
      </div>

      <div className="fila fila-6">
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
      </div>

      <ActionButton leyend="Confirmar turno" />
    </form>
  );
}
