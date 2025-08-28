import Dropdown from "./dropdown";
import Logo from "./logo";
import Menulist from "./menulist";

function Navbar({ showLogo = true, isSignIn = false, user = null }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-stretch justify-between mx-auto lg:gap-4">
        <div className="flex flex-1 sm:flex-initial sm:gap-6">
          <Logo className={showLogo ? "" : "hidden"} />
          <Menulist />
        </div>

        <div className="flex w-1/3 sm:w-fit justify-center items-center">
          <Dropdown isSignIn={isSignIn} user={user} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
