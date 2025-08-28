"use client";

import Darkmode from "@/components/navbar/darkmode";
import Logo from "@/components/navbar/logo";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function NavbarLayout() {
  const { data: session } = useSession();
  const pathname: string = usePathname();

  return pathname !== "/signin" && pathname !== "/signup" ? (
    session ? (
      <Navbar showLogo={false} isSignIn={true} user={session?.user} />
    ) : (
      <Navbar showLogo={false} isSignIn={false} />
    )
  ) : (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex justify-between items-center mx-auto gap-4">
        <Logo />
        <Darkmode />
      </div>
    </nav>
  );
}
export default NavbarLayout;
