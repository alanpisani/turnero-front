import { Link } from "react-router-dom";
import "./ActionalBtn.css"
import Spinner from "../Spinner/Spinner";

interface ActionalBtnProps{
    linkTo?: string;
    isTertiary?: boolean;
    leyend: string;
    isDisabled?: boolean;
    onClick?: ()=> void;
}

export default function ActionalBtn({ linkTo, isTertiary, leyend, isDisabled ,onClick }: ActionalBtnProps) {
    
    const classActional = "secondary-button " + (isTertiary ? "tertiary-button" : "")

    const button = <button onClick={ onClick } className={classActional} disabled={isDisabled}>{ isDisabled ? <Spinner /> : leyend }</button>
    
    return linkTo ? <Link to={ linkTo } className={ classActional }>{ leyend }</Link> : button;


}