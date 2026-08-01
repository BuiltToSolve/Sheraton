import { Car, Plane, BatteryCharging, Shield } from "lucide-react";

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Transportation & Parking</h1>
          <p className="text-zinc-400 mt-1">Manage guest transit, valet, and parking facilities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <Plane className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Airport Shuttle</h3>
            <p className="text-sm text-zinc-400">Complimentary and chargeable pickup and drop services for VIP guests.</p>
          </div>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <Car className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Valet Parking & Car Rental</h3>
            <p className="text-sm text-zinc-400">Secure free or paid parking, valet assistance, and rental cars.</p>
          </div>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <BatteryCharging className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">EV Charging Stations</h3>
            <p className="text-sm text-zinc-400">Dedicated electric vehicle charging spots in the basement parking.</p>
          </div>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <Shield className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Reserved & Accessible Parking</h3>
            <p className="text-sm text-zinc-400">Reserved spots for VIPs and wheelchair-accessible parking near elevators.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
