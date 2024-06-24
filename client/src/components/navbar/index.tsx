import { useMatch, useResolvedPath } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const tabs = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/contact",
      name: "Contact",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/chat",
      name: "Chat",
    },
  ];

  return (
    <nav className="w-full fixed inset-x-0 top-0 z-50 bg-white border shadow-sm rounded-b-sm">
      <div className="flex items-center font-medium justify-between h-14 py-2 px-8">
        <a href="/" className="text-xl font-semibold">
          Jivo
        </a>
        <div className="hidden md:flex gap-8">
          {tabs.map(({ path, name }, index) => (
            <NavLink key={index} path={path} name={name} />
          ))}
        </div>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

function NavLink({ path, name }: { path: string; name: string }) {
  const resolvedPath = useResolvedPath(path);
  const isOnPage = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <a
      href={path}
      className={`hover:underline transition-all duration-300 underline-offset-2 ${
        isOnPage ? "underline" : ""
      }`}
    >
      {name}
    </a>
  );
}

export default Navbar;
