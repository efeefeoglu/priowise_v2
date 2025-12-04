import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative bg-white pt-24 pb-16 overflow-hidden sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-rubik font-bold tracking-tight text-gray-900 mb-6 max-w-4xl">
          Master Your Product Strategy. <br className="hidden sm:block" />
          Align Your Team.
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Priowise helps product teams prioritize features, align stakeholders, and build roadmaps that actually work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mb-16">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 appearance-none rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 shadow-sm"
          />
          <button className="flex-shrink-0 rounded-md border border-transparent bg-brand-yellow px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            Get Started Free
          </button>
        </div>

        <div className="relative w-full max-w-5xl mx-auto mt-8">
           {/* Fallback to simple div if image fails, but we try to load the provided asset */}
           <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <Image
                src="/homepage.png"
                alt="Priowise Dashboard Preview"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
           </div>
        </div>
      </div>
    </div>
  );
}
