'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CalendarDays, CheckCircle, XCircle } from 'lucide-react';
import { Suspense } from 'react';

function SidebarNavContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'upcoming';

  const navItems = [
    {
      name: 'Upcoming Bookings',
      href: '/account/bookings',
      type: 'upcoming',
      icon: CalendarDays,
    },
    {
      name: 'Completed Bookings',
      href: '/account/bookings?type=completed',
      type: 'completed',
      icon: CheckCircle,
    },
    {
      name: 'Cancelled Bookings',
      href: '/account/bookings?type=cancelled',
      type: 'cancelled',
      icon: XCircle,
    },
  ];

  return (
    <nav className="p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {navItems.map((item) => {
        const isActive = type === item.type;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors shrink-0 ${
              isActive
                ? 'bg-gold/10 text-gold-dark'
                : 'text-navy/70 hover:bg-muted hover:text-navy'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="whitespace-nowrap">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarNav() {
  return (
    <Suspense fallback={
      <nav className="p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        <div className="h-11 bg-muted rounded-lg animate-pulse" />
        <div className="h-11 bg-muted rounded-lg animate-pulse" />
        <div className="h-11 bg-muted rounded-lg animate-pulse" />
      </nav>
    }>
      <SidebarNavContent />
    </Suspense>
  );
}
