import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <div className="hero bg-base-100 py-20">
      <div className="hero-content flex-col text-center">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold">
            Ready to Boost Your Productivity?
          </h2>
          <p className="py-6">
            Join thousands of users who are taking control of their day. Sign up
            is free and takes less than a minute.
          </p>
          <Link href="/signup" className="btn btn-primary btn-wide">
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
