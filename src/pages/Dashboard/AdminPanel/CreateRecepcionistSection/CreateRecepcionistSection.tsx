import { useState } from "react";
import { API_URL } from "../../../../config/apiConfig";
import PanelForm from "../../PanelForm/PanelForm";
import { createRecepcionistaFormData } from "../../../../data/PanelForms/createRecepcionistFormData";
import type { ExtendedFormDataType } from "../../../../types/FormDataType";

interface ReceptionistFormData {
  nombre: string;
  apellido: string;
  dni: number;
  contrasenia: string;
  contraseniaRepetida: string;
  email: string;
  [key: string]: string | number | boolean;
}

export default function CreateRecepcionistSection() {
  const [formData, setFormData] = useState<ReceptionistFormData>({
    nombre: "",
    apellido: "",
    dni: 0,
    contrasenia: "",
    contraseniaRepetida: "",
    email: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const finalValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const post = await fetch(
        `${API_URL}/admin_recepcionista/registrar_recepcionista`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (post.status === 401) {
        alert("La sesión expiró.");
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      if (!post.ok) {
        alert("Ocurrió un error al registrar recepcionista.");
        return;
      }

      const data = await post.json();

      alert(data.message);
      if (data.errors) {
        console.log(data.errors);
      }
    } catch (ex) {
      console.log("Hubo un error. Error: " + ex);
    }

    setFormData({
      nombre: "",
      apellido: "",
      dni: 0,
      contrasenia: "",
      contraseniaRepetida: "",
      email: "",
    });
  };
  return (
    <PanelForm
      title={"Registrar recepcionista"}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      datas={createRecepcionistaFormData as ExtendedFormDataType[]}
    />
  );
}
