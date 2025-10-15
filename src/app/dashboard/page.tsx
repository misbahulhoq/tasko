"use client";
import TaskCard from "@/components/dashboard/TaskCard";
import React, { useCallback, useEffect, useState } from "react";
import { useGetTasksQuery } from "@/redux/features/tasks/tasksApiSlice";
import AddTaskForm from "@/components/dashboard/AddTaskForm";
import SearchInput from "@/components/dashboard/SearchInput";
import Pagination from "@/components/dashboard/Pagination";
import { prepareQuery } from "@/utils/prepareQuery";
import { TaskFilterContext } from "@/context/TaskFilterContext";
import { useSearchParams, useRouter } from "next/navigation";
import TaskStatusDropdown from "@/components/dashboard/TaskStatusDropdown";

const DashboardHome = () => {
  const searchParams = useSearchParams();
  const [taskFilter, setTaskFilter] = useState<{
    page: string | null;
    limit: string | null;
    search: string | null;
    status: string | null;
  }>({
    page: searchParams.get("page"),
    limit: searchParams.get("pageSize"),
    search: searchParams.get("search"),
    status: searchParams.get("status"),
  });

  const queryString = prepareQuery(taskFilter);
  const { data, isLoading } = useGetTasksQuery({ queryString });
  const router = useRouter();

  useEffect(() => {
    router.push(`${queryString}`);
  }, [queryString, router]);

  const createQueryString = useCallback(
    () => (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (name === "search") {
        setTimeout(() => {
          setTaskFilter((prev) => {
            return {
              ...prev,
              [name]: value,
            };
          });
        }, 500);
      } else {
        setTaskFilter((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const removeQuery = (name: string) => {
    setTaskFilter((prev) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);
      return {
        ...prev,
        [name]: null,
      };
    });
  };

  const tasks = data?.data?.tasks;
  const totalPages = data?.data?.totalPages;

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
      value={{
        createQueryString,
        removeQuery,
      }}
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

export default DashboardHome;
