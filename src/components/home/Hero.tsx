import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">From Chaos to Clarity 🚀</h1>
          <p className="py-6">
            TaskMaster is your new personal assistant for organizing work and
            life. Effortlessly create, manage, and track your tasks in one
            simple, beautiful interface.
          </p>
          <Link href="/signup" className="btn btn-primary">
            Start Organizing for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
