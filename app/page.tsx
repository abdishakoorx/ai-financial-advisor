"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Markdown from "react-markdown";
import BudgetChart from "@/components/BudgetChart";
import { toast } from "sonner";
import { saveToHistory } from "./services/historyServices";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [budgetData, setBudgetData] = useState<Record<string, number> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      toast.error("Error", {
        description: "Please enter a financial question",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.response);

      if (
        data.budget_breakdown &&
        Object.keys(data.budget_breakdown).length > 0
      ) {
        setBudgetData(data.budget_breakdown);
      } else {
        setBudgetData(null);
      }

      // Save to localStorage
      saveToHistory({
        query,
        response: data.response,
        timestamp: new Date().toISOString(),
        budgetBreakdown: data.budget_breakdown,
      });

      router.push("/history")

    } catch (error) {
      console.error("Error:", error);
      toast.error("Error", {
        description: "Failed to get advice. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    "How should I budget for a $60,000 salary in Austin with $25,000 in student loans?",
    "What's the best way to save for retirement if I'm 35 and haven't started yet?",
    "How can I pay off $10,000 in credit card debt while earning $48,000 a year?",
    "What should my investment strategy be as a 42-year-old planning to retire at 65?",
    "How do I create a budget for my first apartment with a roommate?",
  ];

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6 mt-16">
        <div className="space-y-2">
          <label htmlFor="query" className="text-lg font-medium">
            Ask your financial question:
          </label>
          <Textarea
            id="query"
            placeholder="Example: How should I budget for a Kes 60,000 salary in Nakuru with Kes 25,000 in student loans?"
            className="min-h-[120px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer hover:bg-emerald-600" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Get Financial Advice"}
        </Button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Example questions:</h2>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              className="text-sm bg-slate-100 hover:bg-slate-200 rounded px-3 py-1 transition-colors cursor-pointer"
              onClick={() => setQuery(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {response && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Financial Advice</CardTitle>
            <CardDescription>Based on your query: {query}</CardDescription>
          </CardHeader>
          <CardContent>
            {budgetData && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Budget Breakdown</h3>
                <div className="h-80">
                  <BudgetChart data={budgetData} />
                </div>
              </div>
            )}
            <div className="prose prose-sm max-w-none">
              <Markdown>{response}</Markdown>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
