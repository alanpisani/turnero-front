import type NavItemType from "../../types/Header/navItemType";
import "./NavItem.css";

function NavItem({ title, navItemId }: NavItemType) {
  return (
        <li>
            <a href={navItemId}>{title}</a>
        </li>
    );
}

export default NavItem; 