import { Response } from "@/interfaces/response.interface";
import { baseApi } from "../api/baseApi";

const emailApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserEmail: builder.query<
      Response<{ email: string; message: string; success: boolean }>,
      void
    >({
      query: () => "/auth/get-email",
    }),
  }),
});

export const { useGetUserEmailQuery } = emailApiSlice;
