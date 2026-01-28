import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getDashboardMetrics } from "@/lib/dashboard-data";
import { AlignmentChart } from "@/components/dashboard/AlignmentChart";
import { ConfidenceChart } from "@/components/dashboard/ConfidenceChart";

export default async function Dashboard() {
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  const email = user?.emailAddresses?.[0]?.emailAddress;
  const metrics = email ? await getDashboardMetrics(email) : null;

  return (
    <div className="bg-white">
      {/* Dashboard Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero / Welcome Section */}
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-rubik">
                Hi, {firstName} <span className="wave">👋</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Let&apos;s get your strategy aligned and your roadmap prioritized. Start with a the First Assessment, then add your Product Features or upload an existing Product Roadmap to see the priorities come to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/dashboard/assessment"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-brand-yellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-sm transition-colors"
                >
                  Start First Assessment
                </Link>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-colors">
                  Manage Features & Roadmap
                </button>
              </div>
            </div>

            {/* Illustration Placeholder (Target/Arrow) */}
            <div className="relative lg:w-1/2">
              <Image
                src="/score-mail.png"
                alt="Priowise aligns your product roadmap with business objectives"
                width={800}
                height={600}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-16 border-t border-gray-200"></div>

          {/* Metrics Section */}
          {metrics && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 font-rubik">Your Assessment Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AlignmentChart
                  baseScore={metrics.baseAlignmentScore}
                  improvedScore={metrics.improvedAlignmentScore}
                />
                <ConfidenceChart
                  confidenceIndex={metrics.confidenceIndex}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
