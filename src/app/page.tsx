"use client";
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";

const LandingPage = () => {
  useEffect(() => {
    function displayOfflinePage() {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register("sw_offline_page.js");
      }
    }
    displayOfflinePage();
    return () => displayOfflinePage();
  });
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
