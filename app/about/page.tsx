import Link from "next/link"
import { BarChart3, Coins, CreditCard, HelpCircle, LineChart, PiggyBank, Shield, Target, Wallet } from "lucide-react"

export default function About() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
          Your Financial Companion
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          About Personal Finance Advisor
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Your AI-powered guide to making smarter financial decisions, creating personalized plans, and achieving your
          financial goals with confidence.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/history"
            className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            View History
          </Link>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Personalized Financial Guidance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Wallet className="h-8 w-8 text-emerald-600" />,
              title: "Budget Management",
              description: "Create and manage personalized budgets based on your income and spending habits.",
            },
            {
              icon: <CreditCard className="h-8 w-8 text-emerald-600" />,
              title: "Debt Repayment",
              description: "Develop strategic plans to pay off debts efficiently and reduce interest payments.",
            },
            {
              icon: <PiggyBank className="h-8 w-8 text-emerald-600" />,
              title: "Savings Plans",
              description: "Build savings strategies tailored to your goals, from emergency funds to major purchases.",
            },
            {
              icon: <Coins className="h-8 w-8 text-emerald-600" />,
              title: "Cost Reduction",
              description: "Identify opportunities to reduce expenses and optimize your spending patterns.",
            },
            {
              icon: <LineChart className="h-8 w-8 text-emerald-600" />,
              title: "Investment Guidance",
              description: "Receive personalized investment recommendations based on your risk tolerance and goals.",
            },
            {
              icon: <Target className="h-8 w-8 text-emerald-600" />,
              title: "Goal Setting",
              description: "Define and track progress toward your short and long-term financial objectives.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 bg-emerald-50 inline-block rounded-lg">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Share Your Situation",
              description: "Enter details about your income, location, debts, and financial goals.",
            },
            {
              step: "02",
              title: "AI Analysis",
              description: "Our Gemini AI analyzes your information to create personalized recommendations.",
            },
            {
              step: "03",
              title: "Take Action",
              description: "Receive actionable advice and visualizations to improve your financial health.",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-lg mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Powered By Modern Technology</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-emerald-600" />
              Frontend & User Experience
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Next.js for fast, SEO-friendly rendering</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>TailwindCSS for responsive, modern styling</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>shadcn/ui for accessible, reusable components</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Recharts for interactive data visualizations</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
              Backend & Intelligence
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Python FastAPI for efficient backend processing</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Google Gemini AI for advanced financial analysis</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Secure data handling and privacy protection</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Real-time financial data integration</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "Is my financial data secure?",
              answer:
                "Yes, we prioritize your privacy. We don't store your personal financial details beyond your current session unless you explicitly save them to your history.",
            },
            {
              question: "How accurate is the financial advice?",
              answer:
                "Our AI provides guidance based on general financial principles and your specific situation. While comprehensive, it should complement, not replace, professional financial advice.",
            },
            {
              question: "Can I save my financial plans?",
              answer:
                "Yes, you can save your queries and the generated advice in your history section for future reference and to track your progress.",
            },
            {
              question: "Is there a cost to use this service?",
              answer:
                "The basic features are available at no cost. Premium features with advanced planning tools and deeper insights may be available in the future.",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 flex items-start">
                <HelpCircle className="h-5 w-5 mr-2 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item.question}</span>
              </h3>
              <p className="text-gray-600 ml-7">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold mb-2 text-amber-800">Important Disclaimer</h3>
        <p className="text-amber-700">
          This application is for informational purposes only and should not replace professional financial advice.
          Always consult with a certified financial planner for major financial decisions. The AI-generated
          recommendations are based on the information you provide and general financial principles.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-8 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve your financial future?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Start your journey to financial wellness today with personalized guidance tailored to your unique situation.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
        >
          Get Started Now
        </Link>
      </section>
    </main>
  )
}
