'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { facilities } from '@/lib/data';
import {
  UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2,
  Plane, Waves, KeyRound, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Car,
  Dumbbell,
  Flower2,
  Gamepad2,
  Plane,
  Waves,
  KeyRound,
};

export function Facilities() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 section-pattern opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="Core Features"
          title="Hotel Facilities"
          subtitle="World-class amenities designed to make your stay extraordinary, from fine dining to wellness and entertainment."
          light
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-2">
            {facilities.map((facility, i) => {
              const Icon = iconMap[facility.icon];
              const isActive = active === i;
              return (
                <button
                  key={facility.name}
                  onClick={() => setActive(i)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 group',
                    isActive
                      ? 'bg-gold text-white shadow-lg'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                    isActive ? 'bg-white/20' : 'bg-white/10'
                  )}>
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <span className="font-heading text-lg font-semibold flex-1">{facility.name}</span>
                  <ArrowRight className={cn('w-4 h-4 transition-transform', isActive ? 'translate-x-1' : 'opacity-0 group-hover:opacity-50')} />
                </button>
              );
            })}
          </div>

          <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-2xl">
            {facilities.map((facility, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">{facility.name}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
