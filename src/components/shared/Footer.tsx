"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathName = usePathname();
  return pathName === "/" ? (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Tasko
        </p>
      </aside>
    </footer>
  ) : null;
};

export default Footer;
