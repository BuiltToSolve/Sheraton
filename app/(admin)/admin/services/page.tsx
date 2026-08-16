import { db } from "@/lib/db";
import { ServiceModal } from "./service-modal";
import { UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2, Plane, Waves, KeyRound, ConciergeBell, Sparkles, ShieldCheck, Wifi, Coffee, Monitor, Wind, Tv, Music, Book, Briefcase, Camera, Key, Lock, Phone, Star, Map, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2, Plane, Waves, KeyRound,
  ConciergeBell, Sparkles, ShieldCheck, Wifi, Coffee, Monitor, Wind, Tv,
  Music, Book, Briefcase, Camera, Key, Lock, Phone, Star, Map
};

export default async function ServicesPage() {
  const dbServices = await db.service.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Guest Services & Facilities</h1>
          <p className="text-zinc-400 mt-1">Manage and view hotel amenities and facilities.</p>
        </div>
        <ServiceModal />
      </div>

      {dbServices.length === 0 ? (
        <div className="text-center py-12 text-zinc-400 bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)]">
          No services found. Click "Add Service" to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dbServices.map((service) => {
            const Icon = ICON_MAP[service.icon] || Waves;
            return (
              <div key={service.id} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden group hover:border-[var(--color-primary)]/50 transition-all flex flex-col relative">
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[var(--color-primary)] p-2.5 rounded-xl text-white shadow-lg shadow-black/50">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ServiceModal service={service} />
                  </div>
                  {service.underMaintenance && (
                    <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border border-amber-400/50 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Maintenance
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
