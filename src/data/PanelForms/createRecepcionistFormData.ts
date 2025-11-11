import type { ExtendedFormDataType } from "../../types/FormDataType";

export const createRecepcionistaFormData: ExtendedFormDataType[] = [
  { label: "Nombre", type: "text", name: "nombre" },
  { label: "Apellido", type: "text", name: "apellido" },
  { label: "DNI", type: "number", name: "dni" },
  { label: "Email", type: "email", name: "email" },
  { label: "Contraseña", type: "password", name: "contrasenia" },
  {
    label: "Reingresar contraseña",
    type: "password",
    name: "contraseniaRepetida",
  },
//   {
//     label: "Especialidades",
//     type: "select",
//     name: "especialidades",
//     options: [
//       { label: "Endodoncia", value: "endodoncia" },
//       { label: "Anestesia", value: "anestesia" },
//       { label: "Ortodoncia general", value: "ortodoncia" },
//       { label: "Cirugía bucal", value: "cirugia" },
//     ],
//   },
];
