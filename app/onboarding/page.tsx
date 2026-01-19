"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner"; // Assuming you have sonner or similar
import { useState } from "react";
// import { UploadDropzone } from "@/utils/uploadthing"; // Use if you have uploadthing set up

const formSchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    location: z.string().min(2, "Location is required."),
    iconUrl: z.string().optional(),
});

export default function OnboardingPage() {
    const router = useRouter();
    const { getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            website: "",
            location: "",
            iconUrl: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const token = await getToken();
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

            const response = await fetch(`${baseUrl}/api/v1/companies/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create company");
            }

            toast.success("Company created successfully! You are now a recruiter.");
            // Refresh page or user session might be needed to reflect role change
            // For now, redirect to dashboard
            // Force a window reload to ensure Clerk/User session updates the role
            window.location.href = "/recruiter/dashboard/add-jobs";
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50/50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-2xl shadow-xl border-gray-100 dark:border-zinc-800">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold">Setup Your Company</CardTitle>
                    <p className="text-gray-500 dark:text-gray-400">
                        To start posting jobs, tell us a bit about your company.
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Acme Corp" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://acme.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Headquarters Location</FormLabel>
                                            <FormControl>
                                                <Input placeholder="San Francisco, CA" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About Company</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="We are a leading innovator..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="iconUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Logo URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        {/* 
                     // TODO: Implement actual file upload
                     <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                            toast.info("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            toast.error("Upload failed");
                        }}
                     /> 
                     */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500" disabled={isLoading}>
                                {isLoading ? "Creating Profile..." : "Complete Setup"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
