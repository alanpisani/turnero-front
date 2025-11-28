import Modal from "../../../../../components/shared/Modal/Modal";

import { useState } from "react";
import PanelForm from "../../../PanelForm/PanelForm";
import type { ExtendedFormDataType } from "../../../../../types/FormDataType";
import { API_URL } from "../../../../../config/apiConfig";
import type { ResponseProps } from "../../../../../types/ResponseProps";

interface FichaPacienteProps {
  idTurno: number;
}

export default function FichaPaciente({ idTurno }: FichaPacienteProps) {
  const [formData, setFormData] = useState({
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(idTurno);

    if (
      !confirm(
        "Estás a punto de crear un historial clínico relacionado con este turno. Una vez creado, el turno pasará a tener el estado 'Atendido' y no podrá crearle otro historial. ¿Estás seguro de continuar? "
      )
    )
      return;

    const dto = {
      idTurno: idTurno,
      diagnostico: formData.diagnostico,
      tratamiento: formData.tratamiento,
      observaciones: formData.observaciones,
    };

    const response = await fetch(`${API_URL}/historial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    const fetchResponse: ResponseProps<unknown> = await response.json();

    if (!fetchResponse.success) {
      alert(fetchResponse.message as string)
      return;
    }

    alert(fetchResponse.message as string);
  };

  const datas: ExtendedFormDataType[] = [
    {
      label: "Diagnóstico",
      name: "diagnostico",
      type: "text",
    },
    {
      label: "Tratamiento",
      name: "tratamiento",
      type: "text",
    },
    {
      label: "Observaciones",
      name: "observaciones",
      type: "text",
    },
  ];

  return (
    <Modal triggerText="Armar historial clínico">
      <PanelForm
        title="Historia Clínica"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        datas={datas}
        formData={formData}
      />
    </Modal>
  );
}
