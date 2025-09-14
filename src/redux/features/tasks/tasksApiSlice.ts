import { Response } from "@/interfaces/response.interface";
import { baseApi } from "../api/baseApi";
import { ITask } from "@/interfaces/task.interface";

const tasksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Response<ITask[]>, void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Response<ITask>, ITask>({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTaskStatus: builder.mutation<Response<ITask>, ITask>({
      query: (data) => ({
        url: `/tasks/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = tasksApiSlice;
