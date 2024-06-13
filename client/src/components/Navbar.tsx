import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const tabs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/",
      name: "About",
    },
    {
      link: "/",
      name: "Contacts",
    },
    {
      link: "/",
      name: "Blog",
    },
    {
      link: "/",
      name: "Chats",
    },
  ];
  return (
    <nav className="w-full fixed top-0 z-50 bg-white border shadow-sm py-2 px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-semibold">
          Jivo
        </a>

        {/* Tabs */}
        <div className="flex gap-4 items-center">
          {tabs.map(({ link, name }) => (
            <a
              href={link}
              className={`text-base ${buttonVariants({ variant: "link" })}`}
            >
              {name}
            </a>
          ))}
        </div>

        {/* Sign in / Sign up */}
        <div className="flex gap-4">
          <a
            href="/sign-in"
            className={`font-semibold ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Sign in
          </a>
          <a
            href="/sign-up"
            className={`font-semibold ${buttonVariants({
              variant: "default",
            })}`}
          >
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
