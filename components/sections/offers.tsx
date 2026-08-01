import { SectionHeading } from '@/components/section-heading';
import { offers } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export function Offers() {
  return (
    <section className="py-20 lg:py-28 bg-cream section-pattern">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Special Deals"
          title="Best Summer Offer"
          subtitle="Take advantage of our exclusive seasonal discounts and enjoy a luxurious stay at unbeatable prices."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <span className="font-heading text-xl font-bold text-white">{offer.discount}%</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{offer.title}</h3>
                <p className="text-sm text-white/70 mb-4 leading-relaxed">{offer.description}</p>
                <a
                  href="/rooms"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors group/link"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 relative rounded-3xl overflow-hidden bg-gradient-to-r from-navy to-navy-light p-8 md:p-12 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-sm text-gold uppercase tracking-widest font-medium mb-2">Get 20% Off On 1st Booking!</p>
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">
              Use Code: <span className="text-gold">BOOK-NOW-0256</span>
            </h3>
            <p className="text-white/60 mb-6">This Summer Offer — Limited Time Only</p>
            <a
              href="/rooms"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full font-medium text-sm transition-colors"
            >
              Grab The Offer
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
