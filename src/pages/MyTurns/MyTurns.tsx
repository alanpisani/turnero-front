import { useEffect, useState } from "react";
import "./MyTurns.css";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import type { ResponseProps } from "../../types/ResponseProps";
import NewTurnForm from "./NewTurnForm/NewTurnForm";
import type { TurnoProp } from "../../types/MyTurns/turno";
import TurnosListComponent from "./TurnosListComponent/TurnosListComponent";
import { API_URL } from "../../config/apiConfig";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function MyTurns() {
  const [view, setView] = useState<
    "consulta" | "nuevo-turno" | "registro-rapido"
  >("consulta");
  const [response, setResponse] = useState<ResponseProps<TurnoProp[]> | null>(
    null
  );
  const [loadingTurns, setLoadingTurns] = useState(false);
  const { isLoggedIn, user, loading } = useAuth();

  const fetchTurnos = async () => {
    if (!user?.dni) return;
    setLoadingTurns(true);
    try {
      const res = await fetch(`${API_URL}/Turno/turnos/${user.dni}`);
      const data: ResponseProps<TurnoProp[]> = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error al buscar turnos:", error);
      setResponse({
        success: false,
        message: "Error al conectar con el servidor.",
        data: [],
      });
    } finally {
      setLoadingTurns(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && view === "consulta") {
      fetchTurnos();
    }
  }, [isLoggedIn, view]);

  function renderContent() {
    if (loading || loadingTurns) return <p>Cargando...</p>;

    if (!isLoggedIn) return <Navigate to="/" />;

    switch (view) {
      case "nuevo-turno":
        return (
          <div className="nuevo-turno-container">
            <NewTurnForm
              idPaciente={Number(user?.id)}
              reload={fetchTurnos}
              redirect={() => setView("consulta")}
            />
            <ActionalBtn
              leyend="Volver a tus turnos"
              onClick={() => setView("consulta")}
            />
          </div>
        );

      case "consulta":
      default:
        return (
          <TurnosListComponent
            response={response}
            onClick={() => setView("nuevo-turno")}
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            dniInput={user?.dni!}
            reload={fetchTurnos}
          />
        );
    }
  }

  return (
    <main>
      <section className="my-turns-section">
        <div className="my-turns-container">
          <h2>{ view === "consulta" ? "Mis turnos" : "Solicitar nuevo turno"}</h2>
          {renderContent()}
        </div>
      </section>
    </main>
  );
}
