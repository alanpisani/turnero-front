import { useState, type ChangeEvent, type FormEvent } from "react";
import "./ProfessionalProfile.css";

export default function ProfessionalProfile() {
  const [formData, setFormData] = useState({
    nombre: "Christian Garriazo",
    especialidad: "Endodoncia",
    email: "cgarriazo@clinicadental.com",
    telefono: "+54 9 11 5555-5555",
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
      <h2>Mi Perfil Profesional</h2>

      <form className="professional-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Matrícula profesional</label>
          <input
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-button">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
