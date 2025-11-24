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
      contrasenia: formData.contrasenia,
      contraseniaRepetida: formData.contraseniaRepetida,
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

      if (!response.ok || data.success === false) {
        alert(
          data.errors
            ? JSON.stringify(data.errors)
            : data.message || "Error al registrar el turno"
        );
        return;
      }

      alert(
        "Registro y turno confirmados con éxito! Conectate para poder ver tus turnos"
      );
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="fila fila-1">
        <div className="sign-input-container">
          <label htmlFor="">Ingresá tu nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sign-input-container">
          <label htmlFor="">Ingresá tu apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="fila fila-2">
        <div className="sign-input-container">
          <label htmlFor="">Ingresá tu email</label>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="fila fila-3">
        <div className="sign-input-container">
          <label htmlFor="">Ingresá la contraseña</label>
          <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formData.contrasenia}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sign-input-container">
          <label htmlFor="">Reingresá la contraseña</label>
          <input
            type="password"
            name="contraseniaRepetida"
            placeholder="Reingrese contraseña"
            value={formData.contraseniaRepetida}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="fila fila-4">
        <div className="sign-input-container">
          <label htmlFor="">Ingresá tu número de celular</label>
          <input
            type="text"
            name="celular"
            placeholder="Celular"
            value={formData.celular}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sign-input-container">
          <label htmlFor="">Elegí la especialidad</label>
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
      </div>

      <div className="fila fila-5">
        <div className="sign-input-container">
          <label htmlFor="">Ingresá tu DNI</label>
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
      </div>

      <div className="fila fila-6">
        <div className="sign-input-container">
          <label htmlFor="">Elegí al profesional</label>
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
        </div>
        <div className="sign-input-container">
          <label htmlFor="">Elegi la fecha</label>
          <CalendarioProfesional
            idUsuario={profesionalSeleccionado?.idUsuario ?? null}
            disabled={!profesionalSeleccionado}
            onDateChange={setFechaSeleccionada}
          />
        </div>
        <div className="sign-input-container">
          <label htmlFor="">Elegí la hora</label>
          <FranjasInput
            condicion={!!(fechaSeleccionada && franjas.length)}
            franjaSeleccionada={franjaSeleccionada}
            setFranjaSeleccionada={setFranjaSeleccionada}
            franjas={franjas}
            fechaSeleccionada={fechaSeleccionada}
          />
        </div>
      </div>

      <ActionButton leyend="Confirmar turno" />
    </form>
  );
}
