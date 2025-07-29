"use client";
import { ISignupData } from "@/interfaces/signupdata";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupData>();
  const [visibiliy, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const password = watch("password");

  const onSubmit: SubmitHandler<ISignupData> = (data: ISignupData) => {
    (async () => {
      localStorage.setItem("signupEmail", data.email);
    })().then(() => {
      router.push("/verify-otp?type=signup");
    });
  };
  return (
    <section className="bg-base-200 grid min-h-screen lg:grid-cols-2">
      {/* left column */}
      <div className="relative hidden h-full lg:block">
        <Image
          src={`/signup.png`}
          className="h-full w-full"
          //   className="block h-full w-full"
          fill
          alt="Signup illustration"
          priority
        />
      </div>

      <div className="right-column min-h-screen p-6 lg:col-span-1 lg:p-16">
        <div>
          <h2 className="mb-2 text-center text-4xl font-semibold">Signup </h2>
          <p className="text-center">
            To Create Account, Please Fill in the From Below.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 max-w-[550px] space-y-6"
          >
            <div>
              <label htmlFor="fullName" className="mb-2 block font-semibold">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="input bg-base-100 w-full max-w-[550px] outline-none focus:outline-0"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <span className="text-error text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-semibold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="input bg-base-100 w-full max-w-[550px] outline-none focus:outline-0"
                placeholder="Enter your email address"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-error text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="mb-2 block font-semibold">
                Password
              </label>
              <input
                id="password"
                type={visibiliy.password ? "text" : "password"}
                className="input bg-base-100 w-full max-w-[550px] outline-none focus:outline-0"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
              {errors.password && (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              )}
              <button
                type="button"
                className="absolute top-[51px] right-4 z-10 -translate-y-1/2 text-[#667085]"
                onClick={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              >
                {!visibiliy.password ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-semibold"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={visibiliy.confirmPassword ? "text" : "password"}
                placeholder="Retype password"
                className="input bg-base-100 w-full max-w-[550px] outline-none focus:outline-0"
                {...register("confirmPassword", {
                  required: "Pleae confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-error text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
              <button
                type="button"
                className="absolute top-[51px] right-4 z-10 -translate-y-1/2 text-[#667085]"
                onClick={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              >
                {!visibiliy.confirmPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
