import { useState, type ChangeEvent, type FormEvent } from "react";
import "./ProfessionalProfile.css";
import { professionalProfileData } from "../../../../data/PanelForms/professionalProfileData";
import PanelForm from "../../PanelForm/PanelForm";

export default function ProfessionalProfile() {
  const [formData, setFormData] = useState({
    name: "Christian Garriazo",
    especialidad: "",
    email: "cgarriazo@clinicadental.com",
    dni: 0,
    matricula: "MP-12345",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
  };

  return (
    <div className="professional-profile-container">
      <PanelForm
        title="Registrar profesional"
        handleSubmit={() => handleSubmit}
        handleChange={() => handleChange}
        formData={formData}
        datas={professionalProfileData}
      />
    </div>
  );
}
