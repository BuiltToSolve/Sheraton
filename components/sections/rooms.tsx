import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { rooms } from '@/lib/data';
import { BedDouble, Users, Maximize, ArrowRight } from 'lucide-react';

export function Rooms() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our Rooms"
          title="Luxury Rooms & Suites"
          subtitle="Choose from our carefully curated selection of rooms and suites, each designed to provide the utmost comfort and elegance."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4 text-gold" />
                    {room.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold" />
                    {room.guests} Guest
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

        <div className="text-center mt-12">
          <a
            href="/rooms"
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-3.5 rounded-full font-medium text-sm transition-colors"
          >
            View All Rooms
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
