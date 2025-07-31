"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ILogin } from "@/interfaces/login.interface";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import Swal from "sweetalert2";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const [visibiliy, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const [login, { isLoading: isLogging }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
    login(data)
      .unwrap()
      .then((data) => {
        if (data.success) {
          router.push("/verify-otp");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data.message,
        });
      });
  };
  return (
    <section className="bg-base-200 grid min-h-screen lg:grid-cols-2">
      {/* left column */}
      <div className="relative hidden h-full lg:block">
        <Image
          src={`/login.png`}
          className="h-full w-full"
          //   className="block h-full w-full"
          fill
          alt="Login illustration"
          priority
        />
      </div>

      <div className="right-column flex min-h-screen items-center justify-stretch p-6 lg:col-span-1 lg:p-16">
        <div className="w-full">
          <div className="mb-6">
            <h2 className="mb-2 text-center text-4xl font-semibold">Login</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mt-8 max-w-[550px] space-y-6"
            >
              <div>
                <label htmlFor="email" className="mb-2 block font-semibold">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="input bg-base-100 focus:border-primary w-full max-w-[550px] outline-none focus:outline-none"
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
                  className="input bg-base-100 focus:border-primary w-full max-w-[550px] outline-none focus:outline-none"
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
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isLogging}
              >
                Login
              </button>
            </form>
          </div>

          <div className="bottom-area-wrapper mx-auto max-w-[550px]">
            <span className="divider">OR</span>
            <div className="flex items-center justify-between">
              <p className="text-center">
                Don&apos;t have an account?{"  "} &nbsp;
                <Link href={"/signup"} className="text-black">
                  Sign Up
                </Link>
              </p>

              <Link href={"/forgot-password"}>Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
