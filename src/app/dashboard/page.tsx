import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  return (
    <div className="min-h-screen bg-white">
      {/* Dashboard Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero / Welcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-rubik">
                Hi, {firstName} <span className="wave">👋</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Let&apos;s get your strategy aligned and your roadmap prioritized. Start with a the First Assessment, then add your Product Features or upload an existing Product Roadmap to see the priorities come to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-brand-yellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-sm transition-colors">
                  Start First Assessment
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-colors">
                  Manage Features & Roadmap
                </button>
              </div>
            </div>

            {/* Illustration Placeholder (Target/Arrow) */}
            <div className="relative">
               <div className="aspect-[4/3] bg-amber-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                   {/* Abstract representation of the target/arrow graphic */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-100 via-transparent to-transparent opacity-50"></div>
                   <div className="text-center p-8">
                        <div className="w-32 h-32 mx-auto bg-white rounded-full border-4 border-brand-yellow flex items-center justify-center shadow-lg mb-4">
                            <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-400 italic">Target your roadmap</p>
                   </div>
               </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-16 border-t border-gray-200"></div>

          {/* FAQ Section Reuse */}
           <div className="py-8">
             <FAQ />
           </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
