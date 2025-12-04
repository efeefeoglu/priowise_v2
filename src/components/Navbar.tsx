import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-rubik font-bold text-2xl tracking-tight">
              priowise
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="#features" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              About
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/sign-in" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium mr-2">
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-yellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Get Started <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
