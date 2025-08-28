import Link from "next/link";

function Logo({ className = "" }) {
  return (
    <Link href={"/"}>
      <h1
        className={`text-2xl text-primary font-light tracking-tight select-none py-4 pl-4 lg:block ${className}`}
      >
        TODO
      </h1>
    </Link>
  );
}
export default Logo;
