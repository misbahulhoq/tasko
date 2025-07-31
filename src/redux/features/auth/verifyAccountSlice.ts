import { baseApi } from "../api/baseApi";

const verifyAccountSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyAccount: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useVerifyAccountMutation } = verifyAccountSlice;
