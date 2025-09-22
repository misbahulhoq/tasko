"use client";
import React from "react";
import { BoltIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/redux.hook";

const Navbar = () => {
  const pathName = usePathname();
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (pathName.includes("/dashboard")) return null;
  return (
    <nav className="bg-base-100 sticky top-0 z-50 flex min-h-16 items-center px-4 shadow-md lg:px-6">
      <div className="flex-1">
        <Link href={"/"} className="flex items-center gap-1 text-xl">
          <BoltIcon className="text-primary h-6 w-6" />
          <span className="font-bold">Tasko</span>
        </Link>
      </div>
      <div className={`flex-none ${isLoading && "hidden"}`}>
        {user ? (
          <Link href={"/dashboard"} className="btn btn-primary">
            Dashboard
          </Link>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost">
              Log In
            </Link>
            <Link href="/signup" className="btn btn-primary ml-2">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
