export const fetchJobs = async (
  search = "",
  location = "",
  company = "",
  category = "",
  page = "",
  limit = ""
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    const queryParams = new URLSearchParams();

    if (search) queryParams.append("search", search);
    if (location) queryParams.append("location", location);
    if (category) queryParams.append("category", category);
    if (company) queryParams.append("company", company);
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);

    const url = `${baseUrl}/api/v1/jobs/getAllJobs?${queryParams.toString()}`;
    console.log("Final request URL:", url); // Verify this shows correct params

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });
    console.log("response from fetchjobs", response);
    // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // In case it's not JSON
      return {
        message:
          errorData?.message ||
          `Failed to fetch jobs. Status: ${response.status}`,
        jobs: [],
        totalPages: 0,
      };
    }

    const data = await response.json();
    // console.log("data from fetchjobs", data);
    // console.log("dat.data frmo fechjobs", data.data);
    // if()
    return {
      message: "jobs are successully fetched",
      jobs: data?.data || [],
      totalPages: data?.totalPages || 0,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      message: "internal server error while fetching jobs",
      jobs: [],
      totalPages: 0,
    };
  }
};
