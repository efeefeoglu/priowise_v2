import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Bell
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-100">
           <Link href="/dashboard" className="font-rubik font-bold text-2xl tracking-tight text-black">
              priowise
           </Link>
        </div>

        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-4 space-y-1">
            <Link href="/dashboard" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md bg-brand-yellow/10 text-yellow-800">
               <LayoutDashboard className="mr-3 h-5 w-5 text-yellow-600" />
               Dashboard
            </Link>
            <Link href="/dashboard/analytics" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
               <BarChart2 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
               Analytics
            </Link>
            <Link href="/dashboard/team" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
               <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
               Team
            </Link>
            <Link href="/dashboard/settings" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
               <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
               Settings
            </Link>
          </nav>
        </div>

        <div className="flex-shrink-0 flex border-t border-gray-100 p-4">
           <Link href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                 <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                    Help & Support
                 </div>
              </div>
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex justify-between items-center h-16 bg-white border-b border-gray-100 px-6 sm:px-8">
           <div className="flex-1 flex">
              <h1 className="text-xl font-bold text-gray-800 sm:hidden">Priowise</h1>
           </div>
           <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                 <Bell className="h-6 w-6" />
                 <span className="sr-only">View notifications</span>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2" />
              <UserButton afterSignOutUrl="/" />
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gray-50/50">
           {children}
        </main>
      </div>
    </div>
  );
}
