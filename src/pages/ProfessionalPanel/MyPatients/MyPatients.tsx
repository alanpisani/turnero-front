import ActionButton from "../../../components/shared/ActionButton/ActionButton";
import "./MyPatients.css"

export default function MyPatients() {
  return (
    <div className="patients-table-container">
      <h2>Pacientes</h2>
      <table className="patients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Juan Pérez</td>
            <td>35</td>
            <td>+54 9 11 2345 6789</td>
            <td>
              <button className="actional view">Ver</button>
              <ActionButton leyend="Editar" />
              <ActionButton leyend="Eliminar" isCancelButton/>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Lucía Gómez</td>
            <td>29</td>
            <td>+54 9 11 9876 5432</td>
            <td>
              <button className="actional view">Ver</button>
              <ActionButton leyend="Editar" />
              <ActionButton leyend="Eliminar" isCancelButton/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
