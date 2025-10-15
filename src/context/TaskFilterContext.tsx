import { createContext } from "react";

type TaskContextType = {
  removeQuery: (name: string) => void;
  createQueryString: () => (name: string, value: string) => string;
};

export const TaskFilterContext = createContext<TaskContextType>({
  createQueryString: () => () => "",
  removeQuery: () => {},
});
