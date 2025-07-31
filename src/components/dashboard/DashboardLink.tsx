"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLinkProps {
  href: string;
  label: string;
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses =
    "px-4 py-2 rounded-md text-sm text-white font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-primary";
  const inactiveClasses = "";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </Link>
  );
};

export default DashboardLink;
