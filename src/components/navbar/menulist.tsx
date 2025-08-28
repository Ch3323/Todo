"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ListTodo } from "lucide-react";

function Menulist() {
  const pathname = usePathname();

  const baseStyle =
    "flex px-4 gap-1 justify-center items-center border-b-2 w-full h-full transition duration-200 hover:text-blue-400 hover:border-b-blue-400";
  const activeStyle = "text-blue-400 border-b-blue-400";

  return (
    <ul className="flex w-full items-center select-none">
      <Link href={"/"} className="flex-1 h-full sm:flex-initial sm:w-30">
        <li
          className={`${baseStyle} ${
            pathname === "/" ? activeStyle : "border-b-transparent"
          }`}
        >
          <House className="p-1" />
          <span className="hidden sm:inline">Home</span>
        </li>
      </Link>
      <Link href={"/mytodo"} className="flex-1 h-full sm:flex-initial sm:w-30">
        <li
          className={`${baseStyle} ${
            pathname === "/mytodo" ? activeStyle : "border-b-transparent"
          }`}
        >
          <ListTodo className="p-1" />
          <span className="hidden sm:inline">MyTodo</span>
        </li>
      </Link>
    </ul>
  );
}
export default Menulist;
