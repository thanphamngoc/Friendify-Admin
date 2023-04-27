import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Navbar from "components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const LoginedLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Breadcrumb />
      <Outlet />
      <div className="h-10" />
    </div>
  );
};

export default LoginedLayout;