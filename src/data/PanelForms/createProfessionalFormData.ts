import type { ExtendedFormDataType } from "../../types/FormDataType";

export const createProfesionalFormData: ExtendedFormDataType[] = [
  {
    label: "Nombre",
    type: "text",
    name: "nombre",
  },
  {
    label: "Apellido",
    type: "text",
    name: "apellido",
  },
  {
    label: "DNI",
    type: "number",
    name: "dni",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Contraseña",
    type: "password",
    name: "contrasenia",
  },
  {
    label: "Reingresar contraseña",
    type: "password",
    name: "contraseniaRepetida",
  },
  {
    label: "Matrícula",
    type: "number",
    name: "matricula",
  },
  {
    label: "Especialidades",
    type: "select",
    name: "especialidades",
    options: [
      { label: "Endodoncia", value: "1" },
      { label: "Ortodoncia", value: "2" },
      { label: "Anestesia", value: "3" },
      { label: "Cirugía", value: "4" },
    ],
  },
  {
    label: "Horarios laborales",
    type: "group",
    name: "horariosLaborales",
    fields: [
      {
        label: "Día laboral",
        type: "select",
        name: "diaLaboral",
        options: [
          { label: "Lunes", value: "1" },
          { label: "Martes", value: "2" },
          { label: "Miércoles", value: "3" },
          { label: "Jueves", value: "4" },
          { label: "Viernes", value: "5" },
          { label: "Sábado", value: "6" },
          { label: "Domingo", value: "7" },
        ],
      },
      {
        label: "Duración del turno (minutos)",
        type: "number",
        name: "duracionTurno",
      },
      {
        label: "Hora de inicio",
        type: "time",
        name: "horaInicio",
      },
      {
        label: "Hora de fin",
        type: "time",
        name: "horaFin",
      },
    ],
  },
];
