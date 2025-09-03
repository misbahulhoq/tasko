"use client";
import {
  useGetUserEmailQuery,
  useRequestNewOtpMutation,
  useVerifyLoginCodeMutation,
} from "@/redux/features/auth/authApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const maskEmail = (email: string | undefined) => {
  if (email) {
    const [mail, domain] = email.split("@");
    const maskedPart = mail
      .slice(1, mail.length - 1)
      .split("")
      .map(() => "*")
      .join("");

    return mail[0] + maskedPart + mail[mail.length - 1] + "@" + domain;
  }
};

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error: userError,
    isError,
  } = useGetUserEmailQuery();
  const [verifyAccount, { isLoading: isLoadingVerify }] =
    useVerifyLoginCodeMutation();
  const [getNewOtp] = useRequestNewOtpMutation();

  useEffect(() => {
    if (!canResend && timer > 0 && user) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend, user]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(paste)) return;
    const pasteArray = paste.slice(0, 6).split("");
    setOtp(pasteArray);

    pasteArray.forEach((char, i) => {
      inputRefs.current[i]?.focus();
    });

    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setError("Please enter all 6 digits of the code.");
      return;
    }

    verifyAccount({ code: fullOtp })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.message,
          }).then(() => {
            setTimeout(() => {
              router.push("/dashboard");
            }, 100);
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data.message,
        });
        if (err.data.message === "Verification code has expired.") {
          setCanResend(true);
        }
      });
  };

  const handleResend = () => {
    console.log("Resending verification code...");
    setCanResend(false);
    setTimer(60);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    getNewOtp()
      .unwrap()
      .then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.message,
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

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      text: userError?.data?.message,
    });
  }

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3>
          Please{" "}
          <Link href={"/login"} className="font-bold underline">
            Login
          </Link>{" "}
          first.
        </h3>
      </div>
    );

  return (
    <section className="bg-base-200 flex min-h-screen items-center justify-center px-4">
      <div className="bg-base-100 w-full max-w-md rounded-2xl p-8 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          🔐 Verify Your Code
        </h2>
        <p className="mb-6 text-center">
          We sent a 6-digit code to your email:
          <br />
          <strong>{maskEmail(user?.data.email)}</strong>
          <br /> Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="focus:ring-primary h-14 w-12 rounded-md border border-gray-300 text-center text-xl focus:ring-2 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-error text-center text-sm">{error}</p>}
          {message && (
            <p className="text-success text-center text-sm">{message}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg"
            disabled={isLoadingVerify}
          >
            Verify Code
          </button>
        </form>

        <button
          className={`btn btn-outline btn-primary btn-sm mt-2 ml-auto flex justify-end ${!user && "hidden"}`}
          onClick={handleResend}
          disabled={!canResend}
        >
          {canResend ? "Request New Code" : `Request a new code in ${timer}s`}
        </button>
      </div>
    </section>
  );
};

export default VerifyOtpPage;
