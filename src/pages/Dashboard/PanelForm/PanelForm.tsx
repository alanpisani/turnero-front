import type { ExtendedFormDataType, formDataType } from "../../../types/FormDataType";
import "./PanelForm.css";

interface PanelFormProps {
  title: string;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: Record<string, any>;
  datas: ExtendedFormDataType[] | formDataType[];
}

export default function PanelForm({
  title,
  handleSubmit,
  handleChange,
  datas,
  formData,
}: PanelFormProps) {
  return (
    <div className="professional-profile-container">
      <h2>{title}</h2>

      <form className="professional-profile-form" onSubmit={handleSubmit}>
        {datas.map((data, index) => (
          <div className="form-group" key={index}>
            <label>{data.label}</label>

            {data.type === "select" ? (
              <select
                name={data.name}
                value={formData[data.name]?.toString() ?? ""}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                {data.options?.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={data.type}
                name={data.name}
                value={formData[data.name]?.toString() ?? ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <button type="submit" className="save-button">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
