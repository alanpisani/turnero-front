import { useState } from "react";
import "./MyTurns.css";
import DniForm from "./DniForm/DniForm";
import { Btn } from "../../components/shared/Btn/Btn";
import ActionButton from "../../components/shared/ActionButton/ActionButton";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import type { ResponseProps } from "../../types/ResponseProps";
import NewTurnForm from "./NewTurnForm/NewTurnForm";

interface TurnoProp {
  idTurno: number;
  especialidad: string;
  fecha: string;
}

export default function MyTurns() {
  const [dni, setDni] = useState("");
  const [view, setView] = useState<"consulta" | "nuevo-turno">("consulta");
  const [response, setResponse] = useState<ResponseProps<TurnoProp[]> | null>(
    null
  );

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5295/api/Turno/turnos/${dni}`);
      const data = await res.json();
      setResponse(data);

      if (!data.success) {
        console.warn("Error lógico:", data.message);
      }
    } catch (error) {
      console.error("Error al buscar turnos:", error);
    }
  }

  function renderContent() {
    if (response === null)
      return <DniForm handleSubmit={handleSubmit} dni={dni} setDni={setDni} />;

    if (view === "nuevo-turno") {
      return (
        <div className="nuevo-turno-container">
          <h3>Nuevo turno</h3>

          <NewTurnForm
            dniPaciente={Number(dni)}
            redirect={() => setView("consulta")}
          />
          <ActionalBtn
            leyend="Volver a tus turnos"
            onClick={() => setView("consulta")}
          />
        </div>
      );
    }

    if (!response.success) {
      // Caso de error o paciente no encontrado
      return (
        <>
          <div className="no-paciente-container">
            <p>{response.message ?? "No se encontró el paciente."}</p>
          </div>
          <DniForm handleSubmit={handleSubmit} dni={dni} setDni={setDni} />
        </>
      );
    }

    //Caso de exito
    return (
      <div className="turnos-list-container">
        <p>{response.message}</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {response.data?.map((turno, index) => (
              <tr key={index}>
                <td>{turno.idTurno}</td>
                <td>{turno.especialidad}</td>
                <td>{turno.fecha}</td>
                <td>
                  <ActionButton leyend="Reprogramar" />
                  <ActionButton leyend="Cancelar" isCancelButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Btn
          label="Quiero un nuevo turno"
          onClick={() => setView("nuevo-turno")}
        />
        <ActionalBtn leyend="Volver a inicio" linkTo="/" isTertiary />
      </div>
    );
  }

  return (
    <main>
      <section className="my-turns-section">
        <div className="my-turns-container">
          <h2>Mis turnos</h2>
          {renderContent()}
        </div>
      </section>
    </main>
  );
}
