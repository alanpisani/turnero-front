import { useEffect, useState } from "react";
import { solicitarTurnoFormData } from "../../../../data/PanelForms/SolicitarTurnoFormData";
import useProfesionales from "../../../../hooks/useProfesionales";
import { useEspecialidades } from "../../../../hooks/useEspecialidades";
import { usePacientes } from "../../../../hooks/usePacientes";
import PanelTurno from "./PanelTurno/PanelTurno";

export default function SolicitarTurno() {
  const [formData, setFormData] = useState({
    idPaciente: "",
    idEspecialidad: "",
    idProfesional: "",
  });

  const [datas, setDatas] = useState([...solicitarTurnoFormData]);

  const especialidades = useEspecialidades();
  const pacientes = usePacientes();
  const profesionales = useProfesionales(
    formData.idEspecialidad ? Number(formData.idEspecialidad) : null
  );

  useEffect(() => {
    if (pacientes.length === 0) return;

    setDatas((prev) =>
      prev.map((item) =>
        item.name === "idPaciente"
          ? {
              ...item,
              options: pacientes.map((p) => ({
                label: `${p.nombre} ${p.apellido}`,
                value: p.id,
              })),
            }
          : item
      )
    );
  }, [pacientes]);

  useEffect(() => {
    if (especialidades.length === 0) return;

    setDatas((prev) =>
      prev.map((item) =>
        item.name === "idEspecialidad"
          ? {
              ...item,
              options: especialidades.map((e) => ({
                label: e.nombreEspecialidad,
                value: e.idEspecialidad,
              })),
            }
          : item
      )
    );
  }, [especialidades]);

  useEffect(() => {
    if (profesionales.length === 0) return;

    setDatas((prev) =>
      prev.map((item) =>
        item.name === "idProfesional"
          ? {
              ...item,
              options: profesionales.map((p) => ({
                label: `${p.nombreProfesional} ${p.apellidoProfesional}`,
                value: p.idUsuario,
              })),
            }
          : item
      )
    );
  }, [profesionales]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          Seleccionar datos del turno
        </h2>

        {datas.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              {input.label}
            </label>

            {input.type === "select" ? (
              <select
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Seleccione una opción</option>
                {input.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
      </form>

      {/* 🔹 Calendario / Días disponibles */}
      {formData.idProfesional && (
        <PanelTurno profesionalId={Number(formData.idProfesional)}  idPaciente={Number(formData.idPaciente)} idEspecialidad={Number(formData.idEspecialidad)}/>
      )}
    </div>
  );
}
