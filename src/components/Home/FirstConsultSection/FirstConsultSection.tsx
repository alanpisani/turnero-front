import { Btn } from "../../shared/Btn/Btn";
import "./FirstConsultSection.css";

import img2 from "./img-2.png";


export function FirstConsultSection(){
    return (
        <section id="first-consult" className="primera-consulta-section">
            <div className="primera-consulta-container">
                <div className="consulta-content">
                    <img src={img2} alt="" />
                    <div className="consulta-text-container">
                        <p>Sacá turno para tu consulta</p>
                        <p>Registrate <Btn label= "acá"/></p>
                    </div>
                </div>
            </div>
        </section>
    );
}