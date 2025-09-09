"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { Loader2, MapPin, Lightbulb, Bot } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { categorizeIssueReport } from "@/ai/flows/categorize-issue-reports";
import type { CategorizeIssueReportOutput } from "@/ai/flows/categorize-issue-reports";

const issueCategories = ["Roads & Potholes", "Waste Management", "Streetlights", "Parks & Rec", "Traffic Signals"] as const;

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long.").max(100),
  description: z.string().min(25, "Description must be at least 25 characters long.").max(1000),
  category: z.enum(issueCategories),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
});

type IssueFormValues = z.infer<typeof formSchema>;

export function IssueForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isLocationLoading, setLocationLoading] = useState(false);
  const [isAiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<CategorizeIssueReportOutput | null>(null);

  const form = useForm<IssueFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const descriptionValue = form.watch("description");

  const handleGetLocation = () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue("location", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLoading(false);
        toast({ title: "Location captured successfully!" });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationLoading(false);
        toast({
          variant: "destructive",
          title: "Error getting location",
          description: "Please ensure location services are enabled for your browser.",
        });
      }
    );
  };

  const handleGetAiSuggestions = () => {
    if (!descriptionValue || descriptionValue.length < 25) {
      toast({ variant: 'destructive', title: 'Please provide more details in the description before using the AI assistant.'})
      return;
    }
    
    setAiLoading(true);
    setAiSuggestions(null);
    startTransition(async () => {
      try {
        const result = await categorizeIssueReport({ description: descriptionValue });
        setAiSuggestions(result);
      } catch (error) {
        console.error("AI suggestion error:", error);
        toast({
          variant: 'destructive',
          title: 'AI Assistant Error',
          description: 'Could not get suggestions at this time.'
        });
      } finally {
        setAiLoading(false);
      }
    });
  };
  
  function onSubmit(values: IssueFormValues) {
    startTransition(() => {
      console.log(values);
      toast({
        title: "Issue Reported!",
        description: "Your report has been submitted. Thank you for your contribution.",
      });
      form.reset();
      setAiSuggestions(null);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Large pothole on Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue in detail. What is it, where is it, and what is the impact?"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-start">
                <Bot className="h-6 w-6 mr-3 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">Stuck? Let our AI suggest a category and provide helpful tips.</p>
                </div>
            </div>
            
            <Button type="button" variant="outline" onClick={handleGetAiSuggestions} disabled={isAiLoading}>
                {isAiLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                    </>
                ) : "Analyze Description"}
            </Button>
            
            {aiSuggestions && (
                <div className="space-y-4 pt-2">
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Helpful Tips</AlertTitle>
                        <AlertDescription>{aiSuggestions.helpfulTips}</AlertDescription>
                    </Alert>
                    <div>
                        <FormLabel className="text-sm font-medium">Suggested Categories</FormLabel>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {aiSuggestions.suggestedCategories.map((cat, index) => (
                                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => {
                                    if (issueCategories.includes(cat as any)) {
                                        form.setValue("category", cat as any);
                                        toast({ title: `Category set to: ${cat}`});
                                    }
                                }}>
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>


        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {issueCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormDescription>
                Use your device's GPS to accurately pinpoint the issue.
              </FormDescription>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLocationLoading}>
                  {isLocationLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="mr-2 h-4 w-4" />
                  )}
                  Get My Location
                </Button>
                {field.value && (
                  <span className="text-sm text-green-600 font-medium">
                    Location captured!
                  </span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Report
        </Button>
      </form>
    </Form>
  );
}
