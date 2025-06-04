"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MAX_SIZE = 1000000;
const formSchema = z.object({
  jobId: z.string(),

  portfolio: z.string(),
  coverLetter: z
    .string()
    .min(100, { message: "Cover Letter must be atleast 100 characters" }),
  resume: z
    .instanceof(File)
    .refine((file) => file.size < MAX_SIZE, {
      message: "Maximum size limit is 1MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});
export function JobApplicationForm({ jobId }) {
  const { isSignedIn, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const router = useRouter();
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId: jobId,

      portfolio: "",
      coverLetter: "",
      resume: undefined,
    },
  });
  useEffect(() => {
    // Check if the user has already applied for this job
    const checkApplicationStatus = async () => {
      try {
        const token = await getToken();
        if (!token) {
          // Handle case where token is missing (user not authenticated)
          setHasApplied(false);
          return;
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

        const response = await fetch(
          `${baseUrl}/api/v1/applications/check-application/${jobId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        // If response is OK, update the state
        if (response.ok) {
          const data = await response.json();
          setHasApplied(data.hasApplied);
        } else {
          console.error("Failed to check application status");
          setHasApplied(false); // Handle failed response
        }
      } catch (error) {
        console.error("Error checking application status:", error);
        setHasApplied(false); // Set to false in case of error
      }
    };

    if (isSignedIn) {
      checkApplicationStatus();
    }
  }, [jobId, isSignedIn, getToken]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = await getToken();

      // console.log("Submitting form with values:", values);
      setLoading(true);
      const formData = new FormData();
      formData.append("jobId", values.jobId);

      formData.append("portfolio", values.portfolio);
      formData.append("coverLetter", values.coverLetter);
      formData.append("resume", values.resume);
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      console.log("base url now is ", baseUrl);
      const response = await fetch(`${baseUrl}/api/v1/applications/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      // console.log("response from jobapplicationform is ", response);
      const data = await response.json();
      console.log("data from jobapplicafionform", data);
      if (!response.ok) {
        setLoading(false);
        console.error("Failed to submit application");
        toast.error("Failed to submit application!");
      } else {
        form.reset();
        setLoading(false);
        router.push("/");
        // console.log("Application submitted successfully!");
        toast.success("Application submitted successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error while submitting form", error);
    } finally {
      setLoading(false);
    }
  }
  // const fileRef = form.register("resume");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Form errors:", errors);
          toast.error("Please fix the form errors");
        })}
        className="space-y-8"
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="dark:border-neutral-900"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  {...field}
                  className="min-h-32  dark:border-neutral-900"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  placeholder="Your resume in pdf format. Max 1MB"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      field.onChange(event.target.files[0]);
                    }
                  }}
                  className="dark:border-neutral-900"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="bg-blue-500 py-2 px-6 rounded-xl text-white hover:bg-blue-300 disabled:bg-blue-300 cursor-pointer"
          disabled={loading || hasApplied}
        >
          {loading ? "Submitting..." : hasApplied ? "Applied" : "Apply"}
        </button>
      </form>
    </Form>
  );
}
