"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="lg:relative lg:block lg:min-h-0">
      <div className="container-center z-10 lg:relative">
        <DashboardNav />
      </div>
      {/* welcome message */}
      <div className={`container-center relative z-10 mt-11 hidden lg:block`}>
        <h3 className="text-primary text-2xl font-semibold">Hi Thomas</h3>
        <h2 className="mt-2 text-4xl font-semibold text-white">
          Welcome to Dashboard
        </h2>
      </div>

      <div className={`img-wrapper inset-0 z-0 hidden lg:absolute lg:block`}>
        <Image
          src={"/Desktop.svg"}
          alt="Background Image"
          width={100}
          height={100}
          className="relative z-0 h-[294px] w-full object-cover"
          priority
        />
      </div>

      <div className="container-center bg-base-100 min-h-screen rounded-xl shadow-none lg:relative lg:top-12 lg:shadow">
        <div className="lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
