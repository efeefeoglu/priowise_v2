"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Map,
  Goal,
  Medal,
  Focus,
  PanelLeft,
  PanelRight,
  FileQuestion,
  BookA,
  LifeBuoy,
} from "lucide-react";

export default function DashboardSidebar({
  isCollapsed,
  toggleSidebar,
}: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) {
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
      name: "Roadmap",
      href: "/dashboard/roadmap",
      icon: Map,
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
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-gray-100 h-full transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-100">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
          {isCollapsed ? (
            <PanelRight className="h-6 w-6 text-gray-500" />
          ) : (
            <PanelLeft className="h-6 w-6 text-gray-500" />
          )}
        </button>
        <div className={`flex flex-1 items-center ${isCollapsed ? "justify-center" : ""}`}>
          <Link
            href="/dashboard"
            className={`flex items-center ${isCollapsed ? "" : "ml-2"}`}
          >
            <Image
              src="/Logo-single.png"
              alt="Priowise Logo"
              width={32}
              height={32}
            />
            <span
              className={`font-rubik text-2xl font-bold tracking-tight text-black ${
                isCollapsed ? "hidden" : "ml-2 block"
              }`}
            >
              priowise
            </span>
          </Link>
        </div>
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
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    active
                      ? "text-yellow-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  } ${isCollapsed ? "" : "mr-3"}`}
                />
                <span className={isCollapsed ? "hidden" : "block"}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex-shrink-0 flex flex-col border-t border-gray-100 p-4 space-y-1">
        {[
          {
            name: "How to use Priowise",
            href: "/dashboard/how-to-use-priowise",
            icon: FileQuestion,
          },
          { name: "Dictionary", href: "/dashboard/dictionary", icon: BookA },
          { name: "Help & Support", href: "mailto:support@priowise.com", icon: LifeBuoy },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <item.icon
              className={`h-5 w-5 text-gray-400 group-hover:text-gray-500 ${
                isCollapsed ? "" : "mr-3"
              }`}
            />
            <span className={isCollapsed ? "hidden" : "block"}>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
