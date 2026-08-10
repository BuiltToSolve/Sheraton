import { Utensils, Coffee, Wine, ChefHat } from "lucide-react";
import Link from "next/link";

const diningOptions = [
  {
    name: "Samrat Sheraton : Multi Cuisine Restaurant",
    type: "Restaurant",
    hours: "11:00 AM - 11:30 PM",
    description: "Fine dining experience featuring global cuisines prepared by Michelin-star chefs.",
    icon: Utensils,
  },
  {
    name: "Sunrise Breakfast Buffet",
    type: "Buffet",
    hours: "6:30 AM - 10:30 AM",
    description: "Complimentary breakfast buffet with live counters and healthy dietary options.",
    icon: ChefHat,
  },
  {
    name: "The Grand Lounge",
    type: "Bar & Lounge",
    hours: "4:00 PM - 2:00 AM",
    description: "Premium spirits, signature cocktails, and elegant ambiance with live music.",
    icon: Wine,
  },
  {
    name: "Oasis Café",
    type: "Coffee Shop",
    hours: "24 Hours",
    description: "Artisanal coffees, freshly baked pastries, and quick bites any time of the day.",
    icon: Coffee,
  }
];

export default function DiningPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dining Services</h1>
          <p className="text-zinc-400 mt-1">Manage restaurants, cafes, and room service.</p>
        </div>
        <Link href="/admin/menu">
          <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
            Manage Menu
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diningOptions.map((option) => (
          <div key={option.name} className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                <option.icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{option.name}</h3>
                  <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700">
                    {option.type}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-primary)] font-medium mt-1 mb-3">{option.hours}</p>
                <p className="text-zinc-400 text-sm">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#18181b] to-[#1f1f22] p-8 rounded-2xl border border-[var(--color-card-border)] mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">24/7 Room Service</h2>
          <p className="text-zinc-400 max-w-lg">
            Guests can order from our special in-room dining menu around the clock. We offer vegan, vegetarian, and gluten-free dietary options.
          </p>
        </div>
        <Link href="/admin/orders">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
            View Active Orders
          </button>
        </Link>
      </div>
    </div>
  );
}
