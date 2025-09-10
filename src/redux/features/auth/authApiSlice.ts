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

    requestNewOtp: builder.mutation<Response, void>({
      query: (data) => ({
        url: "/auth/request-new-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyLoginCode: builder.mutation<Response, { code: string }>({
      query: (data) => ({
        url: "/auth/verify-login",
        method: "POST",
        body: data,
      }),
    }),

    getUserInfo: builder.mutation<
      Response<{ name: string; email: string }>,
      void
    >({
      query: () => ({
        url: "/auth/me",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserEmailQuery,
  useSignupMutation,
  useLoginMutation,
  useRequestNewOtpMutation,
  useVerifyLoginCodeMutation,
  useGetUserInfoMutation,
} = authApiSlice;
