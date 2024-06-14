import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
