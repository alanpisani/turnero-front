import { navItems } from "../../../data/navItems";
import Logo from "../../Logo/Logo";
import LogContainer from "../LogContainer/LogContainer";
import NavItem from "../NavItem/NavItem";

import "./DesktopHeader.css";

export default function DesktopHeader() {
  return (
    <nav>
      <div className="header-nav">
        <Logo title="CLÍNICA" subtitle="DE VERDAD" />

        <ul id="nav-list">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              title={item.title.toUpperCase()}
              navItemId={item.navItemId}
              linkTo={item.linkTo}
            />
          ))}
        </ul>
      </div>
      <LogContainer />
    </nav>
  );
}
