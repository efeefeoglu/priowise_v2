"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Footer } from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIsCollapsed = localStorage.getItem("sidebar-collapsed");
      return storedIsCollapsed ? JSON.parse(storedIsCollapsed) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

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
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Action label="manageAccount" />
                  <UserButton.Action label="signOut" />
                </UserButton.MenuItems>
              </UserButton>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 flex flex-col">
           <div className="flex-1 p-6 sm:p-8">
              {children}
           </div>
           <Footer />
        </main>
      </div>
    </div>
  );
}
