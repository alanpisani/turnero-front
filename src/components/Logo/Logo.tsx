import { Link } from "react-router-dom";
import "./Logo.css"

import logo from "./logo.png";

interface LogoProps{
    title: string;
    subtitle: string;
}

function Logo( { title, subtitle }: LogoProps ){
    return (
        <Link to='/'>
            <div className="logo-container">
                <img  className="logo" src={ logo } alt=""/>
                <div className="logo-text-content">
                    <p>{ title }</p>
                    <p><strong>{ subtitle }</strong></p>
                </div>
            </div>
        </Link>
    );
}

export default Logo;