import "./Header.css"

import Logo from "../Logo/Logo";
import { navItems } from "../../data/navItems";
import NavItem from "./NavItem/NavItem";

export default function Header(){
    return (
        <header>
            <nav> 
                <a href="index.html">
                    <Logo title="CLÍNICA" subtitle="DE VERDAD" />
                </a>
    
                <ul id="nav-list">
                    {navItems.map((item, index) => (
                        <NavItem key= {index} title={item.title.toUpperCase()} navItemId={item.navItemId} />
                    ))}
                </ul>
            </nav>
        </header>
    );
}