"use client";

import { CategoryComboBox } from "@/components/client/CategoryComboBox";
import { LevelComboBox } from "@/components/client/LevelComboBox";
import { LocationComboBox } from "@/components/client/LocationComboBox";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  // You should likely add validation for other fields here too
  username: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  level: z.string().optional(),
  salary: z.string().optional(),
});

export default function AddJobsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      username: "",
      salary: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Post a New Job</h1>
        <p className="text-gray-500 dark:text-gray-400">Create a new job listing to find the best talent.</p>
      </div>

      <Card className="shadow-xl shadow-gray-200/50 dark:shadow-black/20 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Software Engineer"
                            {...field}
                            className="h-12 rounded-xl bg-gray-50/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:ring-blue-500/20 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role, responsibilities, and requirements..."
                            {...field}
                            className="min-h-[150px] rounded-xl bg-gray-50/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:ring-blue-500/20 text-base resize-y"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold mb-2">Category</FormLabel>
                      <FormControl>
                        <CategoryComboBox
                          field={field}
                          className="h-12 w-full rounded-xl bg-gray-50/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold mb-2">Location</FormLabel>
                      <FormControl>
                        <LocationComboBox
                          field={field}
                          className="h-12 w-full rounded-xl bg-gray-50/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold mb-2">Experience Level</FormLabel>
                      <FormControl>
                        <LevelComboBox
                          field={field}
                        // Adjust combo box styles if possible via props, otherwise wrapper handles layout
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Salary Range (CTC)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. $100k - $140k"
                          {...field}
                          className="h-12 rounded-xl bg-gray-50/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:ring-blue-500/20 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-10 h-12 text-base font-medium shadow-lg shadow-blue-500/25 transition-all hover:translate-y-0.5">
                  Post Job
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
