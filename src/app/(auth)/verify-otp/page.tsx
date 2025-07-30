"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const maskEmail = (email: string | null) => {
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [email, setEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeOfOtp = searchParams.get("type") as "signup" | "login";

  useEffect(() => {
    (async () => {
      setEmail(localStorage.getItem("email"));
    })().then(() => {
      if (!localStorage.getItem("email")) {
        router.push(typeOfOtp);
      }
    });
  }, [email, router, typeOfOtp]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setError("Please enter all 6 digits of the code.");
      return;
    }

    // Simulate verification
    setTimeout(() => {
      if (fullOtp === "123456") {
        setMessage("✅ OTP verified successfully!");
        setError("");
      } else {
        setError("❌ Invalid OTP. Please try again.");
        setMessage("");
      }
    }, 1000);
  };

  return (
    <section className="bg-base-200 flex min-h-screen items-center justify-center px-4">
      <div className="bg-base-100 w-full max-w-md rounded-2xl p-8 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          🔐 Verify Your Code
        </h2>
        <p className="mb-6 text-center">
          We sent a 6-digit code to your email:
          <br />
          <strong>{maskEmail(email)}</strong>
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
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="focus:ring-primary h-14 w-12 rounded-md border border-gray-300 text-center text-xl focus:ring-2 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-error text-center text-sm">{error}</p>}
          {message && (
            <p className="text-success text-center text-sm">{message}</p>
          )}

          <button type="submit" className="btn btn-primary w-full rounded-lg">
            Verify Code
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyOtpPage;
