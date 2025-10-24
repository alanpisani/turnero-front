import "./Header.css"

import Logo from "../Logo/Logo";
import { navItems } from "../../data/navItems";
import NavItem from "./NavItem/NavItem";
import LogContainer from "./LogContainer/LogContainer";

export default function Header(){
    return (
        <header>
            <nav>
                <div className="algo">
    
                    <Logo title="CLÍNICA" subtitle="DE VERDAD" />
                    
                    <ul id="nav-list">
                        {navItems.map((item, index) => (
                            <NavItem key= {index} title={item.title.toUpperCase()} navItemId={item.navItemId} linkTo={ item.linkTo }/>
                        ))}
                    </ul>
                </div>
                <LogContainer />
            </nav>
        </header>
    );
}