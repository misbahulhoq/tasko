import { Response } from "@/interfaces/response.interface";
import { baseApi } from "../api/baseApi";

const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserEmail: builder.query<
      Response<{ email: string; message: string; success: boolean }>,
      void
    >({
      query: () => "/auth/get-email",
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserEmailQuery, useSignupMutation, useLoginMutation } =
  authApiSlice;
