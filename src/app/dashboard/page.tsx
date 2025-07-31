"use client";
import React, { useState } from "react";

const categories = [
  {
    name: "Arts and Craft",
    slug: "arts-and-craft",
  },
  {
    name: "Nature",
    slug: "nature",
  },
  {
    name: "Family",
    slug: "family",
  },
  {
    name: "Sport",
    slug: "sport",
  },
  {
    name: "Friends",
    slug: "friends",
  },
  {
    name: "Meditation",
    slug: "meditation",
  },
];
const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    slug: string;
  } | null>(null);

  const handleSelect = (category: { name: string; slug: string }) => {
    // If the clicked category is already selected, unselect it (set to null).
    // Otherwise, select the new category.
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="dropdown dropdown-hover rounded-lg border border-gray-300 shadow">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        {selectedCategory ? selectedCategory.name : "Select Category"}
        {/* Chevron down icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow-lg"
      >
        {categories.map((category) => (
          <li key={category.slug} onClick={() => handleSelect(category)}>
            <a
              className={
                selectedCategory?.slug === category.slug
                  ? "bg-primary text-primary-content"
                  : ""
              }
            >
              <input
                type="checkbox"
                readOnly
                checked={selectedCategory?.slug === category.slug}
                className="checkbox checkbox-primary"
              />
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <section className="">
      <CategoryDropdown />
    </section>
  );
};

export default DashboardHome;
