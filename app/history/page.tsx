"use client"
import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Markdown from "react-markdown"
import { getHistory, type HistoryItem, clearHistory } from "../services/historyServices"
import { Button } from "@/components/ui/button"
import BudgetChart from "@/components/BudgetChart"
import { toast } from "sonner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Info,
  Layers,
  Search,
  Trash2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date)
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null)

  // Load history data from local storage
  const loadHistory = useCallback(() => {
    try {
      const historyData = getHistory()
      historyData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setHistory(historyData)
      if (historyData.length > 0 && !selectedEntry) {
        setSelectedEntry(historyData[0].id)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error", {
        description: "Failed to load history.",
      })
    } finally {
      setIsLoading(false)
    }
  }, [selectedEntry])

  const handleClearHistory = () => {
    try {
      clearHistory()
      setHistory([])
      setSelectedEntry(null)
      toast.success("Success", {
        description: "History cleared successfully",
      })
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error", {
        description: "Failed to clear history",
      })
    }
  }

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  // Get the selected entry data
  const selectedEntryData = history.find((item) => item.id === selectedEntry)

  // Extract key sections from markdown response
  const extractSections = (markdown: string) => {
    const sections: Record<string, string> = {}

    // Common financial advice sections
    const sectionHeaders = [
      "BUDGET BREAKDOWN",
      "DEBT MANAGEMENT",
      "SAVINGS PLAN",
      "INVESTMENT GUIDANCE",
      "COST-SAVING MEASURES",
      "NEXT STEPS",
    ]

    let currentSection = "overview"
    sections[currentSection] = ""

    const lines = markdown.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Check if line is a header
      const isHeader = line.startsWith("# ") || line.startsWith("## ")
      const headerText = isHeader ? line.replace(/^#+ /, "") : ""

      // Check if it matches one of our section headers
      const matchesSection = sectionHeaders.some(
        (section) => headerText.toUpperCase().includes(section) || line.toUpperCase().includes(section),
      )

      if (isHeader && matchesSection) {
        // Start a new section
        currentSection = headerText || line.replace(/[^a-zA-Z0-9 ]/g, "").trim()
        sections[currentSection] = ""
      } else {
        // Add to current section
        sections[currentSection] += line + "\n"
      }
    }

    return sections
  }

  // Get section icons
  const getSectionIcon = (sectionName: string) => {
    const name = sectionName.toLowerCase()
    if (name.includes("budget")) return <DollarSign className="h-4 w-4" />
    if (name.includes("debt")) return <AlertCircle className="h-4 w-4" />
    if (name.includes("saving")) return <Bookmark className="h-4 w-4" />
    if (name.includes("invest")) return <Layers className="h-4 w-4" />
    if (name.includes("cost")) return <DollarSign className="h-4 w-4" />
    if (name.includes("next")) return <ChevronRight className="h-4 w-4" />
    return <Info className="h-4 w-4" />
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center my-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="mb-4">
                    <Skeleton className="h-5 w-full mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <Bookmark className="h-7 w-7 text-emerald-600" />
            Financial History
          </h1>
          <p className="text-slate-500">Review your past financial advice and insights</p>
        </div>
        {history.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClearHistory}
            className="cursor-pointer text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 w-full sm:w-auto transition-all"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-slate-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No History Found</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            You haven&apos;t asked any financial questions yet. Start by asking a question to get personalized financial
            advice.
          </p>
          <Button
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Ask Your First Question
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar with history list */}
          <div className="md:col-span-1">
            <Card className="h-full overflow-hidden border-slate-200">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Recent Queries
                </CardTitle>
                <CardDescription>
                  {history.length} saved {history.length === 1 ? "query" : "queries"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] sm:h-[600px]">
                  <div className="py-1">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 cursor-pointer transition-all
                          ${
                            selectedEntry === item.id
                              ? "bg-emerald-50 border-l-4 border-emerald-500"
                              : "hover:bg-slate-50 border-l-4 border-transparent"
                          }`}
                        onClick={() => setSelectedEntry(item.id)}
                      >
                        <p className="font-medium text-slate-800 mb-1 line-clamp-2">{item.query}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-2">
            {selectedEntryData ? (
              <Card className="h-full border-slate-200 overflow-hidden">
                <CardHeader className="border-b">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-emerald-50 text-emerald-700 border-emerald-200">
                        Financial Advice
                      </Badge>
                      <CardTitle className="text-xl text-slate-800">{selectedEntryData.query}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(selectedEntryData.timestamp)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <Tabs defaultValue="summary" className="w-full">
                    <div className="border-b">
                      <TabsList className="h-14 w-full justify-start rounded-none bg-white border-b px-4">
                        <TabsTrigger
                          value="summary"
                          className="data-[state=active]:bg-slate-50 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-xl cursor-pointer"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Summary
                        </TabsTrigger>
                        <TabsTrigger
                          value="budget"
                          className="data-[state=active]:bg-slate-50 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-xl cursor-pointer"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Budget
                        </TabsTrigger>
                        <TabsTrigger
                          value="fullResponse"
                          className="data-[state=active]:bg-slate-50 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-xl cursor-pointer"
                        >
                          <Layers className="h-4 w-4 mr-2" />
                          Full Response
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="summary" className="p-6 mt-0">
                      {selectedEntryData.response && (
                        <Accordion type="single" collapsible className="w-full">
                          {Object.entries(extractSections(selectedEntryData.response)).map(
                            ([section, content], index) => (
                              <AccordionItem
                                key={index}
                                value={section}
                                className="border border-slate-200 rounded-lg mb-3 overflow-hidden"
                              >
                                <AccordionTrigger className="text-md font-medium px-4 py-3 hover:bg-slate-50 [&[data-state=open]]:bg-slate-50">
                                  <div className="flex items-center gap-2">
                                    {getSectionIcon(section)}
                                    <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="bg-white px-4 pb-4 pt-2">
                                  <div className="prose prose-emerald prose-sm max-w-none">
                                    <Markdown>{content}</Markdown>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ),
                          )}
                        </Accordion>
                      )}
                    </TabsContent>

                    <TabsContent value="budget" className="p-6 mt-0">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-slate-800">
                          <DollarSign className="h-5 w-5 text-emerald-600" />
                          Budget Breakdown
                        </h3>
                        {selectedEntryData.budgetBreakdown ? (
                          <div className="h-80 border rounded-lg p-6 bg-white shadow-sm">
                            <BudgetChart data={selectedEntryData.budgetBreakdown} />
                          </div>
                        ) : (
                          <div className="py-16 text-center bg-slate-50 rounded-lg border border-slate-200">
                            <DollarSign className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">No budget breakdown available</p>
                            <p className="text-slate-400 text-sm mt-1">This query didn&apos;t include budget information</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="fullResponse" className="mt-0">
                      <div className="p-6 bg-slate-50 border-b">
                        <h3 className="text-lg font-medium flex items-center gap-2 text-slate-800">
                          <FileText className="h-5 w-5 text-emerald-600" />
                          Complete Financial Advice
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">Full response to your financial query</p>
                      </div>
                      <div className="p-6">
                        <ScrollArea className="h-[500px] pr-4">
                          <div className="prose prose-emerald prose-headings:text-emerald-700 prose-a:text-emerald-600 max-w-none">
                            <Markdown>{selectedEntryData.response}</Markdown>
                          </div>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter className="bg-slate-50 border-t py-3 px-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 cursor-pointer"
                    onClick={() => (window.location.href = "/")}
                  >
                    Ask New Question
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center p-12 text-center border-slate-200">
                <Info className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">Select a Query</h3>
                <p className="text-slate-500 max-w-md">
                  Choose a financial query from the list to view its details and recommendations
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
