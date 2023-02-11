import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Navbar from "components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const LoginedLayout = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <Outlet />
    </div>
  );
};

export default LoginedLayout;