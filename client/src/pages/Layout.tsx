import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14 h-full w-full">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
