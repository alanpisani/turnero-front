import { Link } from "react-router-dom";
import "./ActionalBtn.css"

interface ActionalBtnProps{
    linkTo?: string;
    isTertiary?: boolean;
    leyend: string;
    onClick?: ()=> void;
}

export default function ActionalBtn({ linkTo, isTertiary, leyend, onClick }: ActionalBtnProps) {
    
    const classActional = "secondary-button " + (isTertiary ? "tertiary-button" : "")

    const button = <button onClick={ onClick } className={classActional}>{ leyend }</button>
    
    return linkTo ? <Link to={ linkTo } className={ classActional }>{ leyend }</Link> : button;


}