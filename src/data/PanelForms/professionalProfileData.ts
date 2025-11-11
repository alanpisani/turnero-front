import type { formDataType } from "../../types/FormDataType";

export const professionalProfileData: formDataType[] = [
  {
    label: "Nombre",
    type: "text",
    name: "name",
  },
  {
    label: "Especialidad",
    type: "text",
    name: "especialidad",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Matrícula profesional",
    type: "text",
    name: "matricula",
  },
  {
    label: "DNI",
    type: "number",
    name: "dni",
  },
  {
    label: "Contraseña",
    type: "password",
    name: "contrasenia",
  },
];
