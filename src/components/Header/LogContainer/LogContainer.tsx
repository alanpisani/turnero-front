import { Link } from "react-router-dom";
import "./LogContainer.css";

export default function LogContainer(){

    const token = localStorage.getItem("token");
    const isLoggedIn: boolean = !!token;

    return (
        
        <div className="log-container">
            {
                isLoggedIn ? (
                    <>
                        <p>Bienvenido, Alan</p>
                        <Link to="perfil">
                            <button className="secondary-button">Mi perfil</button>
                        </Link>
                    </>
                )
                : (
                    <>
                        <Link to="/registrarse">
                            <button className="secondary-button tertiary-button">Registrate</button>
                        </Link>
                        <Link to="/conectate">
                            <button className="secondary-button">Conectate</button>
                        </Link>
                    </>
 
                )
            }


        </div>
    );
}
