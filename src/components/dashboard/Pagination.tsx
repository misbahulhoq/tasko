"use client";
import { TaskContext } from "@/app/dashboard/page";
import React, { useContext } from "react";

interface PaginationProps {
  totalPages: number;
}
const Pagination = ({ props }: { props: PaginationProps }) => {
  const { totalPages } = props;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const { page: queryPage, limit, updatePagination } = useContext(TaskContext);

  return (
    <section className="flex items-center justify-between">
      <div className="join">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              className={`join-item btn ${page === queryPage && "btn-active"}`}
              onClick={() => updatePagination({ page })}
            >
              {page}
            </button>
          );
        })}
      </div>

      <select
        defaultValue={`${limit} per page`}
        className="select w-[180px]"
        onChange={(e) => {
          updatePagination({ limit: Number(e.target.value) });
        }}
      >
        <option value={10}>10 items per page</option>
        <option value={5}>5 items per page</option>
        <option value={20}>20 items per page</option>
      </select>
    </section>
  );
};

export default Pagination;
