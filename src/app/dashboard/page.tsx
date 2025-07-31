"use client";
import TaskCard from "@/components/dashboard/TaskCard";
import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";

const DashboardHome = () => {
  return (
    <section className="">
      <div className="top-part flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-3xl font-semibold">Task List</h3>
        <div className="flex flex-wrap items-center gap-3 lg:gap-5">
          <CategoryDropdown />
          <TaskStatusDropdown />
          <AddTaskForm />
        </div>
      </div>

      <div className="task-card-wrapper mt-10 grid md:grid-cols-2 lg:grid-cols-3">
        <TaskCard />
      </div>
    </section>
  );
};

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
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="dropdown dropdown-hover w-[160px] rounded-lg border border-gray-300 shadow">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost w-full justify-between px-3"
      >
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

const taskStatus = [
  {
    name: "All Task",
    slug: "",
  },
  {
    name: "Pending",
    slug: "pending",
  },
  {
    name: "Ongoing",
    slug: "ongoing",
  },
  {
    name: "Done",
    slug: "done",
  },
];
const TaskStatusDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    slug: string;
  } | null>(taskStatus[0]);

  const handleSelect = (category: { name: string; slug: string }) => {
    setSelectedCategory(category);
  };

  return (
    <div className="dropdown dropdown-end dropdown-hover w-28 rounded-lg border border-gray-300 shadow">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost w-full justify-between px-2"
      >
        {selectedCategory?.name}
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
        {taskStatus.map((category) => (
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

export default DashboardHome;
