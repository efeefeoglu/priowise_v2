"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, ExternalLink, Inbox } from "lucide-react";
import { getUserNotifications, markNotificationAsRead, markAllNotificationsAsRead, type Notification } from "@/app/actions/notifications";
import Link from "next/link";
import { cn } from "@/components/ui/utils";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function fetchNotifications() {
    try {
      const data = await getUserNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMarkAsRead(id: string) {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    try {
      await markNotificationAsRead(id);
    } catch (error) {
      console.error("Failed to mark as read", error);
      // Revert if needed, but for read status it's not critical
    }
  }

  async function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    try {
      await markAllNotificationsAsRead();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 relative transition-colors"
        aria-label="View notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden ring-1 ring-black/5">
          <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-700 text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center gap-2 text-gray-400">
                <Inbox className="h-8 w-8 text-gray-300" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 transition-colors hover:bg-gray-50 flex gap-3",
                      !notification.is_read ? "bg-blue-50/30" : "bg-white"
                    )}
                  >
                    <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                             <p className={cn("text-sm font-medium leading-none", !notification.is_read ? "text-gray-900" : "text-gray-600")}>
                                {notification.title}
                             </p>
                             {!notification.is_read && (
                                 <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                             )}
                        </div>
                      {notification.message && (
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {notification.message}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-gray-400">
                            {new Date(notification.created_at).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                          </span>

                          {notification.link && (
                            <Link
                                href={notification.link}
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                            >
                                Open <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}

                          {!notification.is_read && !notification.link && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-xs text-gray-400 hover:text-gray-600"
                              >
                                Mark read
                              </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
