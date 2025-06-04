"use client";

import React, { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { fetchCompanies } from "./fetchCompanies"; // Adjust the path if needed

interface Company {
  _id: string;
  name: string;
}

export default function RecruiterSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getCompanies() {
      try {
        const fetchedCompanies = await fetchCompanies();
        setCompanies(fetchedCompanies);
      } catch (err) {
        setError("Failed to load companies");
        console.error("Failed to load companies", err);
      }
    }
    getCompanies();
  }, []);

  if (!isLoaded || !signUp) {
    return null;
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!emailAddress || !password) {
        setError("Email and password are required.");
        setLoading(false);
        return;
      }

      // const signUpResult = await signUp.create({
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          company,
          role: "recruiter",
        },
      });

      // if (signUpResult.createdUser && company) {
      //   const clerkUserId = signUpResult.createdUser.id;
      //   await signUp.update({
      //     userId: clerkUserId,
      //     publicMetadata: {
      //       company,
      //       role: "recruiter",
      //     },
      //   });
      // }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      const message =
        err?.errors?.[0]?.message || err.message || "Sign up failed.";
      setError(message);
      console.error("Error in handleSignUp:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        if (setActive) {
          await setActive({ session: result.createdSessionId }); // Optional: log them in
        }
        router.push("/recruiter/dashboard/add-jobs");
      } else {
        throw new Error("Verification not complete.");
      }
    } catch (err: unknown) {
      const message =
        err?.errors?.[0]?.message || err.message || "Verification failed.";
      setError(message);
      console.error("Error in handleVerification:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="bg-white dark:bg-neutral-600 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Recruiter Sign Up
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {!pendingVerification ? (
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Company Email
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="your@company.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full dark:bg-neutral-600 px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>
                  Select your company
                </option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Create Recruiter Account"}
            </Button>

            <div className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                href="/recruiter/sign-in"
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerification} className="space-y-4">
            <label className="block text-sm font-medium">
              Enter the verification code sent to your email
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
