import { useMatch, useResolvedPath } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useAuth } from "@/store/auth/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { authState } = useAuth();
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
        {/* Logo */}
        <a href="/" className="text-2xl font-semibold">
          Jivo
        </a>

        {/* Tabs */}
        <div className="hidden md:flex gap-8">
          {tabs.map(({ path, name }, index) => (
            <NavLink key={index} path={path} name={name} />
          ))}
        </div>

        {authState.isLoggedIn ? (
          <ProfileDropdown />
        ) : (
          <div className="hidden md:flex gap-4">
            <a
              href="/auth/sign-in"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Sign in
            </a>
            <a
              href="/auth/sign-up"
              className={buttonVariants({
                variant: "default",
              })}
            >
              Sign up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

function NavLink({ path, name }: { path: string; name: string }) {
  const resolvedPath = useResolvedPath(path);
  const isOnPage = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <a href={path} className={`hover:underline underline-offset-2 ${isOnPage ? "underline" : ""}`}>
      {name}
    </a>
  );
}

export default Navbar;
