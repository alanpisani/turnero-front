import { useState } from "react";
import "./MyTurns.css";
import DniForm from "./DniForm/DniForm";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import type { ResponseProps } from "../../types/ResponseProps";
import NewTurnForm from "./NewTurnForm/NewTurnForm";
import FastSignUp from "./FastSignUp/FastSignUp";
import type { TurnoProp } from "../../types/MyTurns/turno";
import TurnosListComponent from "./TurnosListComponent/TurnosListComponent";

export default function MyTurns() {
  const [dni, setDni] = useState("");
  const [view, setView] = useState<
    "consulta" | "nuevo-turno" | "registro-rapido"
  >("consulta");
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

    if (view === "registro-rapido")
      return (
        <FastSignUp
          dni={Number(dni)}
          redirect={() => {
            setResponse(null);
            setView("consulta");
          }}
        />
      );

    if (!response.success) {
      // Caso de error o paciente no encontrado
      return (
        <>
          <div className="no-paciente-container">
            <p>{response.message ?? "No se encontró el paciente."}</p>
            <br />
            <p>
              ¿No estás registrado?{" "}
              <ActionalBtn
                leyend="Registrate ahora"
                isTertiary
                onClick={() => setView("registro-rapido")}
              />{" "}
            </p>
          </div>
          <DniForm handleSubmit={handleSubmit} dni={dni} setDni={setDni} />
        </>
      );
    }

    //Caso de exito
    return (
      <TurnosListComponent
        response={response}
        onClick={() => setView("nuevo-turno")}
        dniInput={dni}
      />
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
