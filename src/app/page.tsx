"use client";
import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
const LandingPage = () => {
  return (
    <div className="bg-base-200">
      {/* 1. Hero Section */}
      <Hero />

      {/* 3. Features Section */}
      <Features />

      {/* 4. Final Call to Action (CTA) */}
      <CTA />
    </div>
  );
};

export default LandingPage;
