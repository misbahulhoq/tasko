"use client";

import { TaskFilterContext } from "@/context/TaskFilterContext";
import React, { useContext } from "react";

interface PaginationProps {
  queryPage: string;
  limit: string;
  totalPages: number;
}
const Pagination = ({ props }: { props: PaginationProps }) => {
  const { totalPages, limit, queryPage } = props;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const { createQueryString } = useContext(TaskFilterContext);

  console.log(limit);

  const updatePage = (page: number) => {
    createQueryString()("page", page.toString());
  };
  const updateLimit: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    console.log(value);
    createQueryString()("limit", value);
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-3 lg:gap-5">
      <div className="join">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              className={`join-item btn ${page === Number(queryPage) && "btn-active"}`}
              onClick={() => {
                updatePage(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>

      <select
        defaultValue={limit}
        className="select w-[180px]"
        onChange={updateLimit}
      >
        {[5, 10, 20].map((_limit, index) => {
          return (
            <option key={index} value={_limit}>
              {_limit} items per page
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default Pagination;
