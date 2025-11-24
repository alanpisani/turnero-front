import { useState } from "react";
import Logo from "../../Logo/Logo";

import "./MobileHeader.css";
import { navItems } from "../../../data/navItems";

export default function MobileHeader() {
  const [goodbye, setGoodbye] = useState<boolean>(true);

  const handleHamburguesaClick = () => {
    setGoodbye(!goodbye);
  };

  return (
    <div className="mobile-nav">
      <Logo title="CLÍNICA" subtitle="DE VERDAD" />
      <div className="hamburguesa" onClick={handleHamburguesaClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={"mobile-nav-items " + (goodbye ? "goodbye" : "")}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
