"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Image from "next/image";
import React, { ReactNode } from "react";
import WelcomeMessage from "@/components/dashboard/WelcomeMessage";
import { useAppSelector } from "@/hooks/redux.hook";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (isLoading) return null;
  if (!user) {
    setTimeout(() => {
      router.push("/login");
    }, 500);
  }

  return (
    <div className="lg:relative lg:block">
      <div className="container-center lg:relative lg:top-0 lg:z-10">
        <DashboardNav />
      </div>
      {/* welcome message */}

      <div className={`container-center relative z-10 mt-8 hidden lg:block`}>
        <WelcomeMessage user={user} isLoading={isLoading} />
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
