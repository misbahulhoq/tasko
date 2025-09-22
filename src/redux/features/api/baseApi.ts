import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "http://localhost:5000/api/v1";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: () => ({}),
  tagTypes: ["Task"],
});
