import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    //disable consoles in production mode.
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
