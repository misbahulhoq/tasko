"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  UserIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { getProfileChars } from "@/utils/getProfileChars";
import { useLogoutMutation } from "@/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import EnableNotificationsButton from "./EnableNotificationsButton";
import { useAppSelector } from "@/hooks/redux.hook";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { icon: UserIcon, label: "Profile", badge: null },
    { icon: Cog6ToothIcon, label: "Settings", badge: null },
  ];

  const handleLogOut = async () => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout.",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .unwrap()
          .then(() => {
            router.push("/login");
          })
          .catch(console.error);
      }
    });
  };

  if (!user)
    return (
      <div className="bg-base-100 flex h-[42px] w-[70px] items-center rounded-xl">
        <div className="skeleton ml-2 h-8 w-8 rounded-full"></div>
      </div>
    );

  return (
    <div className="relative z-10" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        id="user-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 rounded-xl border border-white/20 bg-white/80 px-1.5 py-1 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl"
      >
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-md">
            <span className="text-xs font-semibold text-white">
              {getProfileChars(user?.name)}
            </span>
          </div>
          <div className="absolute -top-1 -right-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-white bg-emerald-400"></div>
        </div>

        {/* <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div> */}

        <ChevronDownIcon
          className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } group-hover:text-gray-800`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-72 origin-top-right rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
              <span className="font-bold text-white">
                {getProfileChars(user?.name)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <div className="mt-1 flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-medium text-emerald-600">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gray-50 p-2 transition-all duration-200 group-hover:bg-white group-hover:shadow-md">
                  <item.icon className="h-4 w-4 text-gray-600 transition-colors duration-200 group-hover:text-violet-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                  {item.label}
                </span>
              </div>
            </button>
          ))}

          <EnableNotificationsButton
            closeModal={() => {
              setIsOpen(false);
            }}
          />
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-100"></div>

        {/* Logout */}
        <div className="p-2" onClick={handleLogOut}>
          <button
            className="group flex w-full items-center space-x-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-red-50"
            onClick={() => setIsOpen(false)}
          >
            <div className="rounded-lg bg-gray-50 p-2 transition-all duration-200 group-hover:bg-red-100">
              <ArrowLeftEndOnRectangleIcon className="h-4 w-4 text-gray-600 transition-colors duration-200 group-hover:text-red-600" />
            </div>
            <span
              id="logout"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-red-600"
            >
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
