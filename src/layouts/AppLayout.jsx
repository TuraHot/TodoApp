import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <AppNavbar />
      <div className="container my-4">
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
