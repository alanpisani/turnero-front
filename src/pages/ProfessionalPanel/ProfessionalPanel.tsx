import { Outlet } from "react-router-dom";
import "./ProfessionalPanel.css";
import SideMenu from "./SideMenu/SideMenu";

export default function ProfessionalPanel() {
  return (
    <div className="professional-panel">
      <div className="panel-body">
        <SideMenu />
        <main className="panel-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
