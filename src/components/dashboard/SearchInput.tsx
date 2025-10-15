"use client";

import React, { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TaskFilterContext } from "@/context/TaskFilterContext";
const SearchInput = () => {
  const { createQueryString, removeQuery } = useContext(TaskFilterContext);
  const [search, setSearch] = React.useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => {
      setSearch(value);
      createQueryString()("search", value);
    }, 500);
  };
  const handleInputClear = () => {
    const searchInput = document.querySelector(
      'input[name="search"]',
    ) as HTMLInputElement;

    // It's a good practice to check if the element was actually found
    if (searchInput) {
      setSearch("");
      searchInput.value = "";
      removeQuery("search");
      searchInput.blur();
    }
  };

  return (
    <label className="input !rounded-md">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="text"
        name="search"
        placeholder="Search"
        className="rounded-full"
        onInput={handleSearch}
      />
      {search?.length > 0 && (
        <XMarkIcon
          height={20}
          onClick={handleInputClear}
          className="btn btn-xs btn-ghost z-10 mx-0 px-0"
        />
      )}
    </label>
  );
};

export default SearchInput;
