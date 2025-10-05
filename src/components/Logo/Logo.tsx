import "./Logo.css"

import logo from "./logo.png";

function Logo(){
    return <div className="logo-container">
        <img  className="logo" src={logo} alt=""/>
        <div className="logo-text-content">
            <p>Clínica</p>
            <p><strong>DE MENTIRA</strong></p>
        </div>
    </div>
}

export default Logo;