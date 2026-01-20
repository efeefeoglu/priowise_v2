"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  ClipboardList,
  Map,
  Goal,
  Medal,
  Focus,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Assessments",
      href: "/dashboard/assessment",
      icon: ClipboardList,
    },
    {
      name: "Objectives",
      href: "/dashboard/objectives",
      icon: Goal,
    },
    {
      name: "Initiatives",
      href: "/dashboard/initiatives",
      icon: Focus,
    },
    {
      name: "Roadmap",
      href: "/dashboard/roadmap",
      icon: Map,
    },
    {
      name: "Competition",
      href: "/dashboard/competition",
      icon: Medal,
    },
    {
      name: "Summary Report",
      href: "/dashboard/summary",
      icon: FileText,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-full">
      <div className="flex items-center h-16 px-6 border-b border-gray-100">
        <Link
          href="/dashboard"
          className="font-rubik font-bold text-2xl tracking-tight text-black"
        >
          priowise
        </Link>
      </div>

      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                  active
                    ? "bg-brand-yellow/10 text-yellow-800"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    active
                      ? "text-yellow-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
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
  );
}
