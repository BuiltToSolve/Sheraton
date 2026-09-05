import { notFound } from 'next/navigation';
import { CURRENCY } from '@/lib/constants';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BedDouble, Users, Maximize, ArrowLeft, Calendar } from 'lucide-react';
import * as LucideIcons from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { SUGGESTED_AMENITIES } from '@/app/(admin)/admin/rooms/constants';
import { RoomImageGrid } from '@/components/room-image-grid';
import { SectionHeading } from '@/components/section-heading';

export async function generateStaticParams() {
  const roomTypes = await db.roomType.findMany({ select: { slug: true } });
  return roomTypes.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const roomType = await db.roomType.findFirst({ where: { slug: resolvedParams.slug } });
  if (!roomType) return { title: 'Room Not Found' };
  return {
    title: `${roomType.name} - Samrat Sheraton`,
    description: roomType.description,
  };
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const roomType = await db.roomType.findFirst({ where: { slug: resolvedParams.slug } });
  if (!roomType) notFound();

  const otherRoomTypes = await db.roomType.findMany({
    where: { slug: { not: resolvedParams.slug } },
    take: 3,
  });

  const room = {
    name: roomType.name,
    price: roomType.basePrice,
    description: roomType.description,
    image: roomType.images[0] || 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    beds: `1 ${roomType.bedType} Bed`,
    guests: roomType.maxOccupancy,
    size: roomType.area ? `${roomType.area} m²` : '45 m²',
    amenities: roomType.amenities,
  };

  const otherRooms = otherRoomTypes.map(rt => ({
    slug: rt.slug,
    name: rt.name,
    image: rt.images[0] || 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: rt.basePrice,
    beds: `1 ${rt.bedType} Bed`,
    guests: rt.maxOccupancy,
  }));

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-body uppercase tracking-[0.2em] text-gold font-medium">
              {CURRENCY.SYMBOL}{room.price} / night
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">{room.name}</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/70">
            <Link href="/">Home</Link>
            <span className="text-gold">/</span>
            <Link href="/rooms">Rooms</Link>
            <span className="text-gold">/</span>
            <span className="text-gold">{room.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-gold" />
                <span className="text-xs font-body uppercase tracking-[0.2em] text-gold-dark font-medium">
                  Room Details
                </span>
              </div>

              <RoomImageGrid images={roomType.images} name={roomType.name} />

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-6">
                {room.name}
              </h2>
              <div className="text-muted-foreground leading-relaxed mb-8 prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {room.description || ""}
                </ReactMarkdown>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-cream rounded-xl p-5 text-center">
                  <BedDouble className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">{room.beds}</p>
                </div>
                <div className="bg-cream rounded-xl p-5 text-center">
                  <Users className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">{room.guests} Guests</p>
                </div>
                <div className="bg-cream rounded-xl p-5 text-center">
                  <Maximize className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">{room.size}</p>
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-navy mb-4">Room Amenities</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {room.amenities.map((amenity, i) => {
                  const amenityEntry = SUGGESTED_AMENITIES.find(a => a[0] === amenity);
                  const iconName = amenityEntry ? amenityEntry[1] : "Check";
                  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Check;

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-gold-dark" />
                      </div>
                      <span className="text-sm text-navy">{amenity}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Rooms
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-cream rounded-2xl p-8 shadow-lg border border-border">
                <h3 className="font-heading text-2xl font-bold text-navy mb-2">Book This Room</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Starting from <span className="text-gold-dark font-semibold">{CURRENCY.SYMBOL}{room.price}</span> per night
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Check In</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Check Out</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Guests</label>
                      <input
                        type="number"
                        min={1}
                        defaultValue={2}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Rooms</label>
                      <input
                        type="number"
                        min={1}
                        defaultValue={1}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Check Availability
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="font-heading text-2xl font-bold text-navy mb-8">Other Rooms</h3>
            <div className="grid sm:grid-cols-3 gap-8">
              {otherRooms.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rooms/${r.slug}`}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                      {CURRENCY.SYMBOL}{r.price}/night
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-heading font-bold text-navy group-hover:text-gold-dark transition-colors">
                      {r.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{r.beds} · {r.guests} Guests</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
