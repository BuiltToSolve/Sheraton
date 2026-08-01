"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BedDouble, UtensilsCrossed, ConciergeBell,
  CalendarHeart, Car, CreditCard, Settings, X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSidebar } from "./sidebar-provider";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { name: "Dining", href: "/admin/dining", icon: UtensilsCrossed },
  { name: "Services", href: "/admin/services", icon: ConciergeBell },
  { name: "Banquets", href: "/admin/events", icon: CalendarHeart },
  { name: "Transport", href: "/admin/transport", icon: Car },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-[#27272a] shrink-0">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-yellow-200">
          Luxe HMS
        </h1>
        <button onClick={close} className="md:hidden p-1 text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={close}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                isActive ? "text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent rounded-xl border border-[var(--color-primary)]/30"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-colors",
                  isActive ? "text-[var(--color-primary)]" : "group-hover:text-zinc-200"
                )}
              />
              <span className="relative z-10 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#27272a] shrink-0">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all w-full text-left">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-full bg-[var(--color-sidebar)] border-r border-[#27272a] flex-col shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-[var(--color-sidebar)] border-r border-[#27272a] flex flex-col z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
