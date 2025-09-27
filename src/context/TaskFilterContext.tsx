import { createContext } from "react";

type TaskContextType = {
  page: number;
  limit: number;
  query: string | null;
  updatePagination: (pagination: { page?: number; limit?: number }) => void;
  updateSearchQuery: (searchQuery?: string) => void;
};

export const TaskFilterContext = createContext<TaskContextType>({
  page: 1,
  limit: 10,
  query: null,
  updatePagination: () => {},
  updateSearchQuery: () => {},
});
