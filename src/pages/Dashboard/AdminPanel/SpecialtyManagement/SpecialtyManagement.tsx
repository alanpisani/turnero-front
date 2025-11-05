export default function SpecialtyManagement() {

  return (
    <section className="admin-section">
      <h2>Gestión de Especialidades</h2>

      <div className="specialty-actions">
        <input
          type="text"
          placeholder="Nueva especialidad..."
          className="specialty-input"
        />
        <button className="create-btn">Agregar</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Endodoncia</td>
            <td className="status active">Activa</td>
            <td>
              <button className="disable-btn">Deshabilitar</button>
            </td>
          </tr>
          <tr>
            <td>Ortodoncia general</td>
            <td className="status inactive">Inactiva</td>
            <td>
              <button className="enable-btn">Habilitar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
