import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <AppNavbar />
      <Outlet />
      <AppFooter />
    </div>
  );
};

export default AppLayout;
