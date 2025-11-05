export default function RolesManagement() {
  return (
    <section className="admin-section">
      <h2>Gestión de Roles</h2>

      <div className="specialty-actions">
        <input
          type="text"
          placeholder="Nuevo rol..."
          className="specialty-input"
        />
        <button className="create-btn">Agregar</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Permisos</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Admin</td>
            <td>Todos</td>
            <td>
              <button className="disable-btn">Deshabilitar</button>
            </td>
          </tr>
          <tr>
            <td>Profesional</td>
            <td>Panel profesional</td>
            <td>
              <button className="disable-btn">Deshabilitar</button>
            </td>
          </tr>
          <tr>
            <td>Recepcionista</td>
            <td>Gestión de turnos</td>
            <td>
              <button className="enable-btn">Habilitar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
