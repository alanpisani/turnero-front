import "./Header.css"

import Logo from "../Logo/Logo";
import { navItems } from "../../data/navItems";
import NavItem from "../NavItem/NavItem";

function Header(){
    return (
        <header>
            <nav> 
                <a href="index.html">
                    <Logo />
                </a>
    
                <ul id="nav-list">
                    {navItems.map((item, index) => (
                        <NavItem key= {index} title={item.title.toUpperCase()} navItemId={item.id} />
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;