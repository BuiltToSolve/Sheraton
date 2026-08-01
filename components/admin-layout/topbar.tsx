"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, Menu, LogOut, UserCircle } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

export function Topbar() {
  const { toggle } = useSidebar();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-[#27272a] bg-[var(--background)]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 bg-[#18181b] px-3 py-2 rounded-lg border border-[#27272a] w-80 focus-within:border-[var(--color-primary)]/50 transition-colors">
          <Search className="w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search bookings, guests..."
            className="bg-transparent border-none outline-none text-sm w-full text-zinc-200 placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-primary)] rounded-full border-2 border-[var(--background)]" />
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative ml-1" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-yellow-600 p-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            <div className="w-full h-full bg-[#18181b] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-300" />
            </div>
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#18181b] border border-[#27272a] rounded-xl shadow-lg py-1 z-50 overflow-hidden">
              <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                <UserCircle className="w-4 h-4" />
                User Profile
              </button>
              <div className="h-px bg-[#27272a] my-1" />
              <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
