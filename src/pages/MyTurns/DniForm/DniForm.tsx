import type { FormEventHandler } from "react";
import { Btn } from "../../../components/shared/Btn/Btn";
import "./DniForm.css"

interface DniFormProps{
    handleSubmit: FormEventHandler<HTMLFormElement>;
    dni: string;
    setDni: React.Dispatch<React.SetStateAction<string>>
}

export default function DniForm({handleSubmit, dni, setDni}: DniFormProps){
    return(
        <form onSubmit={handleSubmit}>
            <div className="my-turns-input-container">
            <p>Ingresá el DNI del paciente para ver, modificar, cancelar o tomar nuevos turnos</p>
            <input
                type="number"
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)} 
                minLength={6}
            />
            </div>
            <Btn label="BUSCAR TURNOS" />
        </form>
    );
}