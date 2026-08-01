import { Users, BedDouble, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: CreditCard,
  },
  {
    name: "Occupancy Rate",
    value: "82%",
    change: "+4.1%",
    trend: "up",
    icon: BedDouble,
  },
  {
    name: "Active Guests",
    value: "142",
    change: "-2.1%",
    trend: "down",
    icon: Users,
  },
];

const recentBookings = [
  { id: "BK-1029", name: "Sarah Jenkins", room: "Presidential Suite", date: "Today", status: "Checked In" },
  { id: "BK-1030", name: "Michael Chen", room: "Deluxe King", date: "Today", status: "Pending" },
  { id: "BK-1031", name: "Emily Watson", room: "Family Room", date: "Tomorrow", status: "Confirmed" },
  { id: "BK-1032", name: "James Bond", room: "Standard Room", date: "Tomorrow", status: "Confirmed" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg transition-colors font-medium">
            Download Report
          </button>
          <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
            New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-medium">{stat.name}</span>
              <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                <stat.icon className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className={`flex items-center text-sm font-medium ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--color-card-border)] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
          <button className="text-[var(--color-primary)] text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1f1f22]">
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Booking ID</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Guest Name</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Room Type</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Arrival</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-300">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{booking.name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{booking.room}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{booking.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      booking.status === "Checked In" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      booking.status === "Pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
