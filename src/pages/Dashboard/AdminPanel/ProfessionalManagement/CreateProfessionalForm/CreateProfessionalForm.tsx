import { useState } from "react";
import { API_URL } from "../../../../../config/apiConfig";
import "./CreateProfessionalForm.css";
import { useEspecialidades } from "../../../../../hooks/useEspecialidades";

interface HorarioLaboral {
  diaLaboral: string;
  horaInicio: string;
  horaFin: string;
}

interface EspecialidadConHorario {
  idEspecialidad: number;
  horarios: HorarioLaboral[];
}

interface ProfessionalRequestProps {
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  contrasenia: string;
  contraseniaRepetida: string;
  matricula: number;
  especialidadesConHorarios: EspecialidadConHorario[];
}

export default function CreateProfessionalForm({ token }) {
  const [formData, setFormData] = useState<ProfessionalRequestProps>({
    nombre: "",
    apellido: "",
    dni: 0,
    email: "",
    contrasenia: "",
    contraseniaRepetida: "",
    matricula: 0,
    especialidadesConHorarios: [],
  });

  const especialidades = useEspecialidades();
  const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  /*** Genéricos ***/
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  /*** Especialidades ***/
  const addEspecialidad = () => {
    if (especialidades.length === 0) return;

    // Por defecto agregamos la primera especialidad
    setFormData((prev) => ({
      ...prev,
      especialidadesConHorarios: [
        ...prev.especialidadesConHorarios,
        {
          idEspecialidad: especialidades[0].idEspecialidad,
          horarios: [],
        },
      ],
    }));
  };

  const removeEspecialidad = (index: number) => {
    const newList = [...formData.especialidadesConHorarios];
    newList.splice(index, 1);
    setFormData({ ...formData, especialidadesConHorarios: newList });
  };

  const handleEspecialidadChange = (espIndex: number, id: number) => {
    const newList = [...formData.especialidadesConHorarios];
    newList[espIndex].idEspecialidad = id;
    setFormData({ ...formData, especialidadesConHorarios: newList });
  };

  /*** Horarios ***/
  const addHorario = (espIndex: number) => {
    const newList = [...formData.especialidadesConHorarios];
    newList[espIndex].horarios.push({
      diaLaboral: "Lunes",
      horaInicio: "08:00",
      horaFin: "17:00",
    });

    setFormData({ ...formData, especialidadesConHorarios: newList });
  };

  const removeHorario = (espIndex: number, horarioIndex: number) => {
    const newList = [...formData.especialidadesConHorarios];
    newList[espIndex].horarios.splice(horarioIndex, 1);
    setFormData({ ...formData, especialidadesConHorarios: newList });
  };

  const handleHorarioChange = (
    espIndex: number,
    horarioIndex: number,
    field: keyof HorarioLaboral,
    value: string
  ) => {
    const newList = [...formData.especialidadesConHorarios];
    newList[espIndex].horarios[horarioIndex][field] = value;

    setFormData({ ...formData, especialidadesConHorarios: newList });
  };

  /*** Submit ***/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const especialidadesIds = formData.especialidadesConHorarios.map(
      (e) => e.idEspecialidad
    );

    const horariosLaborales = formData.especialidadesConHorarios.flatMap(
      (esp) =>
        esp.horarios.map((h) => ({
          diaLaboral: DIAS.indexOf(h.diaLaboral) + 1,
          duracionTurno: 30,
          horaInicio: h.horaInicio,
          horaFin: h.horaFin,
        }))
    );

    const payload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      dni: formData.dni,
      email: formData.email,
      contrasenia: formData.contrasenia,
      contraseniaRepetida: formData.contraseniaRepetida,
      matricula: formData.matricula,
      especialidades: especialidadesIds,
      horariosLaborales,
    };

    const res = await fetch(`${API_URL}/profesional`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="create-professional-form">
      <h3>Registrar profesional</h3>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} />
      <input name="dni" type="number" placeholder="DNI" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="contrasenia" type="password" placeholder="Contraseña" onChange={handleChange} />
      <input
        name="contraseniaRepetida"
        type="password"
        placeholder="Repetir contraseña"
        onChange={handleChange}
      />
      <input
        name="matricula"
        type="number"
        placeholder="Matrícula"
        onChange={handleChange}
      />

      <h4>Especialidades con Horarios</h4>

      {formData.especialidadesConHorarios.map((esp, espIndex) => (
        <div key={espIndex} className="especialidad-block">
          {/* Select POR CADA ESPECIALIDAD */}
          <select
            value={esp.idEspecialidad}
            onChange={(e) =>
              handleEspecialidadChange(espIndex, Number(e.target.value))
            }
          >
            {especialidades.map((e) => (
              <option key={e.idEspecialidad} value={e.idEspecialidad}>
                {e.nombreEspecialidad}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => removeEspecialidad(espIndex)}>
            Eliminar Especialidad
          </button>

          {/* HORARIOS */}
          <div className="horarios-block">
            {esp.horarios.map((h, hIndex) => (
              <div key={hIndex}>
                <select
                  value={h.diaLaboral}
                  onChange={(e) =>
                    handleHorarioChange(
                      espIndex,
                      hIndex,
                      "diaLaboral",
                      e.target.value
                    )
                  }
                >
                  {DIAS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <input
                  type="time"
                  value={h.horaInicio}
                  onChange={(e) =>
                    handleHorarioChange(
                      espIndex,
                      hIndex,
                      "horaInicio",
                      e.target.value
                    )
                  }
                />

                <input
                  type="time"
                  value={h.horaFin}
                  onChange={(e) =>
                    handleHorarioChange(
                      espIndex,
                      hIndex,
                      "horaFin",
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() => removeHorario(espIndex, hIndex)}
                >
                  Eliminar Horario
                </button>
              </div>
            ))}

            <button type="button" onClick={() => addHorario(espIndex)}>
              Agregar Horario
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addEspecialidad}>
        Agregar Especialidad
      </button>

      <button type="submit">Guardar Profesional</button>
    </form>
  );
}
