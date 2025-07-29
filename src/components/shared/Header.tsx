"use client";
import Image from "next/image";
import React from "react";
const Header = () => {
  return (
    <header className="">
      <div className={`img-wrapper hidden`}>
        <Image
          src={"/Desktop.svg"}
          alt="Background Image"
          width={100}
          height={100}
          className="relative z-0 h-[144px] w-full object-cover"
          priority
        />
      </div>
    </header>
  );
};

export default Header;
