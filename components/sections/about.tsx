import { SectionHeading } from '@/components/section-heading';
import { Star, Quote } from 'lucide-react';

export function About() {
  return (
    <section className="py-20 lg:py-28 bg-cream section-pattern">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/14036253/pexels-photo-14036253.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Hotel interior"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-white fill-white" />
                <div>
                  <p className="font-heading text-3xl font-bold text-white">5.0</p>
                  <p className="text-xs text-white/80 uppercase tracking-wider">Rating</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-navy rounded-2xl p-6 shadow-xl hidden md:block">
              <p className="font-heading text-4xl font-bold text-gold">25+</p>
              <p className="text-xs text-white/80 uppercase tracking-wider mt-1">Years of Excellence</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About Samrat"
              title="Find The Best Hotel For Accommodation"
              align="left"
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to the best five-star luxury hotel in New York. Hotel is veryes elementum sesue the aucan vestibulum aliquam justo in sapien on thi rutrum volutpat. Donec in quis the pellentesque velit. Donec id velitel ac arcu posuere blane.
              </p>
              <p>
                Hotel ut nisl quam nestibulum ac quam nec odio elementum oneni sceisuen the aucan ligula. Orci varius natoque penatibus ethemen magnis discustent parturient monte nascete ridiculus musclineorto nellentesque habitant forminy morbine.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-navy">David Wilson</p>
                  <p className="text-sm text-muted-foreground">Hotel Manager</p>
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex gap-6">
                <div>
                  <p className="font-heading text-2xl font-bold text-navy">800+</p>
                  <p className="text-xs text-muted-foreground">Luxury Rooms</p>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-navy">64</p>
                  <p className="text-xs text-muted-foreground">Amenities</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="/about"
                className="bg-navy hover:bg-navy-light text-white px-7 py-3 rounded-full font-medium text-sm transition-colors"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="border border-navy/20 hover:border-gold hover:text-gold-dark text-navy px-7 py-3 rounded-full font-medium text-sm transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
