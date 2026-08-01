import { ConciergeBell, Sparkles, Dumbbell, ShieldCheck, Waves } from "lucide-react";

const services = [
  { name: "24-Hour Reception", icon: ConciergeBell, category: "Front Desk" },
  { name: "Express Check-in/out", icon: Sparkles, category: "Front Desk" },
  { name: "Spa & Wellness", icon: Waves, category: "Recreation" },
  { name: "Fitness Centre", icon: Dumbbell, category: "Recreation" },
  { name: "24/7 Security & CCTV", icon: ShieldCheck, category: "Safety" },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Guest Services & Amenities</h1>
          <p className="text-zinc-400 mt-1">Front desk, housekeeping, wellness, and safety.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.name} className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex items-center gap-4 hover:bg-white/5 transition-colors">
            <div className="p-3 bg-white/5 rounded-lg text-[var(--color-primary)]">
              <service.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{service.name}</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">{service.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
