import { Response } from "@/interfaces/response.interface";
import { baseApi } from "../api/baseApi";

const tasksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Response, void>({
      query: () => "/tasks",
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApiSlice;
