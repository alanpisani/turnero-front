
import { Link } from "react-router-dom";
import type NavItemType from "../../../types/Header/navItemType";
import "./NavItem.css";

function NavItem({ title, navItemId, linkTo }: NavItemType) {

    if (linkTo){
        return <Link to={linkTo}> <li><a href={navItemId}>{title}</a></li> </Link>
    }
    return (
        <li>
            <a href={navItemId}>{title}</a>
        </li>
    );
}

export default NavItem; 