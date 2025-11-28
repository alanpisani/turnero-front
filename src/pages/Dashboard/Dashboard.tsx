import { Navigate, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../../hooks/useAuth";
import type { sideMenuDataProps } from "../../types/SideMenuProps";
import SideMenu from "./SideMenu/SideMenu";
import { useEffect, useState } from "react";
import MobileSideMenu from "./SideMenu/MobileSideMenu/MobileSideMenu";

interface DashboardProps {
  rol: string;
  sideMenuData: sideMenuDataProps[];
}

export default function Dashboard({ rol, sideMenuData }: DashboardProps) {
  const { isLoggedIn, user, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (loading) return null;

  if (!isLoggedIn) return <Navigate to="/" />;

  if (user?.rol != rol) return <Navigate to="/forbidden" />;

  return (
    <div className="panel">
      <div className="panel-body">
        {
          !isMobile ? <SideMenu sideMenuData={sideMenuData} /> : <MobileSideMenu sideMenuData={sideMenuData}/>
        }
        
        <main className="panel-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
