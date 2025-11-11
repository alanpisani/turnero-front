import type { ExtendedFormDataType } from "../../types/FormDataType";

export const solicitarTurnoFormData: ExtendedFormDataType[] = [
  {
    label: "Paciente",
    name: "idPaciente",
    type: "select",
    options: [],
  },
  {
    label: "Especialidad",
    name: "idEspecialidad",
    type: "select",
    options: [
      { label: "Endodoncia", value: "1" },
    ],
  },
  {
    label: "Profesional",
    name: "idProfesional",
    type: "select",
    options: [],
  },
];
