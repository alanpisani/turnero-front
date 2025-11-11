import { useState } from "react";
import { API_URL } from "../../../../../config/apiConfig";
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

export default function CreateProfessionalForm({token}) {
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

  const ESPECIALIDADES = [
    { id: 1, nombre: "Anestesia" },
    { id: 2, nombre: "Odontología" },
    { id: 3, nombre: "Pediatría" },
  ];

  const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  /**** Funciones para formulario ****/
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const addEspecialidad = () => {
    setFormData((prev) => ({
      ...prev,
      especialidadesConHorarios: [
        ...prev.especialidadesConHorarios,
        { idEspecialidad: ESPECIALIDADES[0].id, horarios: [] },
      ],
    }));
  };

  const removeEspecialidad = (index: number) => {
    const newEspecialidades = [...formData.especialidadesConHorarios];
    newEspecialidades.splice(index, 1);
    setFormData({ ...formData, especialidadesConHorarios: newEspecialidades });
  };

  const handleEspecialidadChange = (index: number, idEspecialidad: number) => {
    const newEspecialidades = [...formData.especialidadesConHorarios];
    newEspecialidades[index].idEspecialidad = idEspecialidad;
    setFormData({ ...formData, especialidadesConHorarios: newEspecialidades });
  };

  const addHorario = (espIndex: number) => {
    const newEspecialidades = [...formData.especialidadesConHorarios];
    newEspecialidades[espIndex].horarios.push({
      diaLaboral: "Lunes",
      horaInicio: "08:00",
      horaFin: "17:00",
    });
    setFormData({ ...formData, especialidadesConHorarios: newEspecialidades });
  };

  const removeHorario = (espIndex: number, horarioIndex: number) => {
    const newEspecialidades = [...formData.especialidadesConHorarios];
    newEspecialidades[espIndex].horarios.splice(horarioIndex, 1);
    setFormData({ ...formData, especialidadesConHorarios: newEspecialidades });
  };

  const handleHorarioChange = (
    espIndex: number,
    horarioIndex: number,
    field: keyof HorarioLaboral,
    value: string
  ) => {
    const newEspecialidades = [...formData.especialidadesConHorarios];
    newEspecialidades[espIndex].horarios[horarioIndex][field] = value;
    setFormData({ ...formData, especialidadesConHorarios: newEspecialidades });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertimos nuestro arreglo especialidad + horarios a la estructura del backend
    const especialidadesIds = formData.especialidadesConHorarios.map(
      (esp) => esp.idEspecialidad
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
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
      />
      <input
        name="dni"
        type="number"
        placeholder="DNI"
        value={formData.dni}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="contrasenia"
        type="password"
        placeholder="Contraseña"
        value={formData.contrasenia}
        onChange={handleChange}
      />
      <input
        name="contraseniaRepetida"
        type="password"
        placeholder="Repetir contraseña"
        value={formData.contraseniaRepetida}
        onChange={handleChange}
      />
      <input
        name="matricula"
        type="number"
        placeholder="Matrícula"
        value={formData.matricula}
        onChange={handleChange}
      />

      <h4>Especialidades con Horarios</h4>
      {formData.especialidadesConHorarios.map((esp, espIndex) => (
        <div key={espIndex} className="especialidad-block">
          <select
            value={esp.idEspecialidad}
            onChange={(e) =>
              handleEspecialidadChange(espIndex, Number(e.target.value))
            }
          >
            {ESPECIALIDADES.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => removeEspecialidad(espIndex)}>
            Eliminar Especialidad
          </button>

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
