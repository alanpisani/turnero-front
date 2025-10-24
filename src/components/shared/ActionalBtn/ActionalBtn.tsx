import { Link } from "react-router-dom";
import "./ActionalBtn.css"

interface ActionalBtnProps{
    linkTo?: string;
    isTertiary?: boolean;
    leyend: string;
    onClick?: ()=> void;
}

export default function ActionalBtn({ linkTo,  isTertiary, leyend, onClick }: ActionalBtnProps){

    const button = <button onClick={ onClick } className={"secondary-button " + (isTertiary ? "tertiary-button" : "")}>{ leyend }</button>
    
    return linkTo ? <Link to={ linkTo }>{ button }</Link> : button;


}