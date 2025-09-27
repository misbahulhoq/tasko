"use client";
import TaskCard from "@/components/dashboard/TaskCard";
import React, { useState } from "react";
import { useGetTasksQuery } from "@/redux/features/tasks/tasksApiSlice";
import AddTaskForm from "@/components/dashboard/AddTaskForm";
import SearchInput from "@/components/dashboard/SearchInput";
import Pagination from "@/components/dashboard/Pagination";
import { prepareQuery } from "@/utils/prepareQuery";
import { TaskFilterContext } from "@/context/TaskFilterContext";

const DashboardHome = () => {
  const [taskFilter, setTaskFilter] = useState<{
    page: number;
    limit: number;
    query: string | null;
  }>({
    page: 1,
    limit: 10,
    query: null,
  });
  const queryString = prepareQuery(taskFilter);
  const { data, isLoading } = useGetTasksQuery({ queryString });
  const updatePagination = (pagination: {
    page?: number;
    limit?: number;
  }): void => {
    const { page, limit } = pagination;
    setTaskFilter({
      ...taskFilter,
      ...(page && { page }),
      ...(limit && { limit }),
    });
  };
  const updateSearchQuery = (searchQuery?: string) => {
    if (searchQuery) {
      setTaskFilter({ ...taskFilter, query: searchQuery });
    } else {
      setTaskFilter({ ...taskFilter, query: null });
    }
  };

  const tasks = data?.data.tasks;
  const totalPages = data?.data.totalPages;

  if (isLoading) {
    return (
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="max-w-[520px]">
            <div
              className={`relative h-[200px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 ease-out hover:shadow-xl`}
            >
              {/* Gradient background accent */}
              <div className="bg-primary to-accent absolute top-0 right-0 left-0 h-1" />
              {/* Top section */}
              <div className="mb-6 flex items-start gap-4">
                {/* Icon skeleton */}
                <div className={`skeleton h-11 w-11 rounded-full`} />

                {/* Content Skeleton*/}
                <div className="flex-1">
                  <div className="mb-3 flex flex-col items-start justify-between gap-3">
                    <div className="skeleton h-5 w-[90px]"></div>
                    <div className="skeleton h-2 w-[100px]"></div>
                    <div className="skeleton h-2 w-[100px]"></div>
                    <div className="skeleton h-2 w-[100px]"></div>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-4">
                {/* Date section */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="rounded-lg bg-gray-100 p-1.5">
                    <div className="skeleton h-3.5 w-3.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="skeleton h-5 w-[70px]"></div>
                    <div className="skeleton h-4 w-[50px]"></div>
                  </div>
                </div>

                {/* Status badge */}
                <div
                  className={`skeleton border-base-200 h-[30px] w-[80px] rounded-full`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <TaskFilterContext.Provider
      value={{ ...taskFilter, updatePagination, updateSearchQuery }}
    >
      <div className="top-part flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-3xl font-semibold">Task List</h3>
        <SearchInput />
        <div className="flex flex-wrap items-center gap-3 lg:gap-5">
          <TaskStatusDropdown />
          <AddTaskForm />
        </div>
      </div>

      <div className="task-card-wrapper mt-6 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3">
        {tasks?.map((task) => (
          <TaskCard key={task?._id} task={task} />
        ))}
      </div>

      <div className="mt-10 pb-8">
        <Pagination props={{ totalPages: totalPages as number }} />
      </div>
    </TaskFilterContext.Provider>
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
