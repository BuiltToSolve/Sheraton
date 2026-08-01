import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { Stats } from '@/components/sections/stats';
import { CTA } from '@/components/sections/cta';
import { Award, Heart, Shield, Sparkles, Coffee, Wifi, Car, Dumbbell } from 'lucide-react';

export const metadata = {
  title: 'About - Samrat Sheraton',
  description: 'Learn about Samrat Sheraton, our story, our mission, and our commitment to luxury hospitality.',
};

export default function AboutPage() {
  const values = [
    { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in hospitality with multiple industry awards.' },
    { icon: Heart, title: 'Guest First', desc: 'Every decision we make is centered around your comfort and satisfaction.' },
    { icon: Shield, title: 'Safe & Secure', desc: 'Your safety is our priority with 24/7 security and secure facilities.' },
    { icon: Sparkles, title: 'Impeccable Service', desc: 'Our dedicated staff provides personalized service around the clock.' },
  ];

  const amenities = [
    { icon: Coffee, label: 'Restaurant & Bar' },
    { icon: Wifi, label: 'Free High-Speed WiFi' },
    { icon: Car, label: 'Valet Parking' },
    { icon: Dumbbell, label: 'Fitness Center' },
  ];

  return (
    <>
      <PageHero
        title="About Samrat"
        breadcrumb="About"
        image="https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/6876590/pexels-photo-6876590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Hotel reception"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold rounded-2xl p-8 shadow-xl hidden md:block">
                <p className="font-heading text-4xl font-bold text-white">25+</p>
                <p className="text-sm text-white/80 mt-1">Years of Excellence</p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="A Legacy of Luxury Hospitality"
                align="left"
              />
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Since 1999, Samrat Sheraton has been a beacon of luxury and elegance in the heart of New York. What began as a small boutique hotel has grown into one of the most celebrated luxury destinations in the world.
                </p>
                <p>
                  Our journey is defined by an unwavering commitment to excellence. Every corner of Samrat tells a story of craftsmanship, from the carefully curated interiors to the meticulously landscaped gardens. We believe that true luxury lies in the details — the warmth of a welcome, the perfection of a meal, the comfort of a room.
                </p>
                <p>
                  Today, Samrat Sheraton stands as a testament to what hospitality can be when passion meets precision. Our team of over 500 dedicated professionals works tirelessly to ensure that every guest experiences the very best.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-cream">
                    <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-gold-dark" />
                    </div>
                    <span className="text-sm font-medium text-navy">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream section-pattern">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Values"
            title="What Makes Us Different"
            subtitle="The principles that guide everything we do at Samrat Sheraton."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 group-hover:bg-gold flex items-center justify-center mx-auto mb-5 transition-colors">
                  <value.icon className="w-7 h-7 text-gold-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
