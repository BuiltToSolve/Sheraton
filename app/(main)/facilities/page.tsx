import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { CTA } from '@/components/sections/cta';
import { facilities } from '@/lib/data';
import {
  UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2,
  Plane, Waves, KeyRound,
  type LucideIcon,
} from 'lucide-react';

export const metadata = {
  title: 'Facilities - Samrat Sheraton',
  description: 'Explore the world-class facilities and amenities at Samrat Sheraton.',
};

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

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Hotel Facilities"
        breadcrumb="Facilities"
        image="https://images.pexels.com/photos/38127493/pexels-photo-38127493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Amenities"
            title="World-Class Facilities"
            subtitle="Discover the extensive range of facilities designed to make your stay at Samrat Sheraton truly exceptional."
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, i) => {
              const Icon = iconMap[facility.icon];
              return (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border bg-white"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg">
                      {Icon && <Icon className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
