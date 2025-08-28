"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import Link from "next/link";
import type { User } from "@prisma/client";

type DropdownProps = {
  isSignIn?: boolean;
  user?: User | null;
};

function Dropdown({ isSignIn = false, user = null }: DropdownProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="outline-none focus-visible:ring-0 select-none flex-1"
        asChild
      >
        <Button
          className="rounded-none lg:rounded-md lg:gap-3"
          variant={"ghost"}
        >
          <span className="text-md sm:text-lg font-light">
            {isSignIn && user ? user.name : "Username"}
          </span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Submissions</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Label className="font-normal pr-6" htmlFor="dark-mode">
            Darkmode
          </Label>
          <Switch
            onClick={toggleTheme}
            checked={theme === "dark" ? true : false}
            id="dark-mode"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {isSignIn ? (
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        ) : (
          <div>
            <DropdownMenuItem>
              <Link href={"/signin"} className="w-full h-full">
                Signin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/signup"} className="w-full h-full">
                Signup
              </Link>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default Dropdown;
