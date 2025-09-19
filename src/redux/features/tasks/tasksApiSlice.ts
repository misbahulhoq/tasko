import { Response } from "@/interfaces/response.interface";
import { baseApi } from "../api/baseApi";
import { ITask } from "@/interfaces/task.interface";

const tasksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Response<ITask[]>, void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<Response<ITask>, { id: string }>({
      query: ({ id }) => `/tasks/${id}`,
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
    deleteTask: builder.mutation<Response<ITask>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
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
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} = tasksApiSlice;
