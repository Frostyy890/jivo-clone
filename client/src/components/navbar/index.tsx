import { useMatch, useResolvedPath } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import {MessageSquare} from "lucide-react"

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
      <div className="flex items-center justify-between h-14 py-2 px-8">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-semibold">
          <MessageSquare className="w-6 h-6" />
            {/* Jivo */}
          </a>
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
      className={`${!isOnPage && "text-muted-foreground"} transition-colors hover:text-foreground`}
    >
      {name}
    </a>
  );
}

export default Navbar;
