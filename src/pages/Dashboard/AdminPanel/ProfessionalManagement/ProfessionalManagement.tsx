export default function ProfessionalManagement() {
 
  return (
    <section className="admin-section">
      <h2>Gestión de Profesionales</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dr. Christian Garriazo</td>
            <td>juan@example.com</td>
            <td>Endodoncia, Anestesia</td>
            <td className="status active">Activo</td>
            <td>
              <button className="disable-btn">Deshabilitar</button>
            </td>
          </tr>
          <tr>
            <td>Dra. Ana Torres</td>
            <td>ana@example.com</td>
            <td>Ortodoncia general</td>
            <td className="status inactive">Inactivo</td>
            <td>
              <button className="enable-btn">Habilitar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
