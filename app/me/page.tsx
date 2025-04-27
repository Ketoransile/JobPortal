"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MePage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
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
    <div className="flex flex-col items-start pt-20">
      <h1 className="text-4xl text-center">My profile page</h1>
      <div className="flex flex-col gap-4">
        <h1>My Information</h1>
        {userData && (
          <div className="mt-4 p-4 border border-gray-300 rounded-2xl">
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
