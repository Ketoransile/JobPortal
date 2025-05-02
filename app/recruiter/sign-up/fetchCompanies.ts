export const fetchCompanies = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}/api/v1/companies/getAllCompanies`, {
      method: "GET",
      cache: "no-store", // Ensures fresh data on each SSR
    });

    if (!res.ok) {
      console.error("Failed to fetch companies:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data?.companies || data; // Handle both array and wrapped response
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};
