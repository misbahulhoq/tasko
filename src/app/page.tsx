import React from "react";

import {
  CheckBadgeIcon,
  CommandLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-base-200">
      {/* 3. Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h1 className="mb-12 text-center text-4xl font-bold">
          Everything You Need, Nothing You Don&apos;t
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <CheckBadgeIcon className="text-success mb-4 h-16 w-16" />
              <h3 className="card-title">Simple & Intuitive</h3>
              <p>
                Create, edit, and delete tasks with a clean and straightforward
                user interface. No clutter, just focus.
              </p>
            </div>
          </div>
          {/* Feature Card 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <CommandLineIcon className="text-accent mb-4 h-16 w-16" />
              <h3 className="card-title">Powerful Organization</h3>
              <p>
                View all your tasks at a glance. Our system ensures you know
                what&apos;s next, keeping you on track.
              </p>
            </div>
          </div>
          {/* Feature Card 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <UserGroupIcon className="text-info mb-4 h-16 w-16" />
              <h3 className="card-title">Secure & Personal</h3>
              <p>
                Your tasks are yours alone. Secure login ensures your to-do
                lists are private and accessible only to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Final Call to Action (CTA) */}
      <div className="hero bg-base-100 py-20">
        <div className="hero-content flex-col text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold">
              Ready to Boost Your Productivity?
            </h2>
            <p className="py-6">
              Join thousands of users who are taking control of their day. Sign
              up is free and takes less than a minute.
            </p>
            <Link href="/signup" className="btn btn-primary btn-wide">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
