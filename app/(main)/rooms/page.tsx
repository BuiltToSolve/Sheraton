import { PageHero } from '@/components/page-hero';
import { rooms } from '@/lib/data';
import { BedDouble, Users, Maximize, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Rooms - Samrat Sheraton',
  description: 'Browse our selection of luxury rooms and suites at Samrat Sheraton.',
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        title="Rooms & Suites"
        breadcrumb="Rooms"
        image="https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-20 lg:py-28 bg-cream section-pattern">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border"
              >
                <Link href={`/rooms/${room.slug}`} className="block relative overflow-hidden h-64">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-gold text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    ${room.price}<span className="text-xs text-white/80">/night</span>
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors">
                    <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-gold" />
                      {room.beds}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold" />
                      {room.guests}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-gold" />
                      {room.size}
                    </span>
                  </div>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-dark transition-colors group/link"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
