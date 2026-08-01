import { CalendarHeart, Presentation, GlassWater } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Banquets & Events</h1>
          <p className="text-zinc-400 mt-1">Manage wedding venues, corporate spaces, and catering.</p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
          New Event Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)]">
          <CalendarHeart className="w-10 h-10 text-[var(--color-primary)] mb-4" />
          <h3 className="text-xl font-bold text-white">Wedding Venues</h3>
          <p className="text-zinc-400 text-sm mt-2">Spacious halls and outdoor gardens for luxurious weddings.</p>
        </div>
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)]">
          <Presentation className="w-10 h-10 text-[var(--color-primary)] mb-4" />
          <h3 className="text-xl font-bold text-white">Corporate Halls</h3>
          <p className="text-zinc-400 text-sm mt-2">Equipped with projectors, high-speed Wi-Fi, and sound systems.</p>
        </div>
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)]">
          <GlassWater className="w-10 h-10 text-[var(--color-primary)] mb-4" />
          <h3 className="text-xl font-bold text-white">Event Catering</h3>
          <p className="text-zinc-400 text-sm mt-2">Customizable menus for any event size and dietary preference.</p>
        </div>
      </div>
    </div>
  );
}
