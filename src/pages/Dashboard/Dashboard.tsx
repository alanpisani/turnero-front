import { Navigate, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../../hooks/useAuth";
import type { sideMenuDataProps } from "../../types/SideMenuProps";
import SideMenu from "./ProfessionalPanel/SideMenu/SideMenu";

interface DashboardProps {
  rol: string;
  sideMenuData: sideMenuDataProps[];
}

export default function Dashboard({ rol, sideMenuData }: DashboardProps) {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) return null;

  if (!isLoggedIn) return <Navigate to="/" />;

  if (user?.rol != rol) return <Navigate to="/forbidden" />;

  return (
    <div className="panel">
      <div className="panel-body">
        <SideMenu sideMenuData={sideMenuData} />
        <main className="panel-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
