"use client";
import { useAuth, UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MePage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  // const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchUserData() {
      if (!isLoaded) return;
      try {
        const token = await getToken();
        const response = await fetch(
          "http://localhost:5000/api/v1/users/current-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON response, got :${text.substring(0, 50)}...`
          );
        }
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Authentication Failed");
        }
        setUserData(data);
      } catch (err) {
        console.error("Fetch error", err);
        setError(err.message);
        router.push("/sign-in");
      }
    }
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    } else {
      fetchUserData();
    }
  }, [isLoaded, isSignedIn, getToken, router]);

  if (!isLoaded) {
    return <div className="text-4xl text-center pt-20">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 text-2xl text-center pt-20">{error}</div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center  space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">My Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account information and settings
          </p>
        </div>

        <div className="w-full bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Account Information
          </h2>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
