"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { useGetUser } from "@/hooks/user.hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, isLoading } = useGetUser();

  return (
    <div className="lg:relative lg:block">
      <div className="container-center lg:relative lg:top-0 lg:z-10">
        <DashboardNav />
      </div>
      {/* welcome message */}
      <div className={`container-center relative z-10 mt-9 hidden lg:block`}>
        <h3 className="text-primary text-2xl font-semibold">
          Hi, {user?.name}
        </h3>
        <h2 className="mt-2 text-4xl font-semibold text-white">
          Welcome to Dashboard
        </h2>
      </div>

      <div className={`img-wrapper z-0 hidden lg:absolute lg:inset-0 lg:block`}>
        <Image
          src={"/Desktop.svg"}
          alt="Background Image"
          width={100}
          height={100}
          className="relative z-0 h-[294px] w-full object-cover"
          priority
        />
      </div>

      <div className="container-center bg-base-100 min-h-screen rounded-xl shadow-none lg:relative lg:top-11 lg:shadow">
        <div className="lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
