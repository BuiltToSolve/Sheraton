import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { Stats } from '@/components/sections/stats';
import { CTA } from '@/components/sections/cta';
import { Award, Heart, Shield, Sparkles, Coffee, Wifi, Car, Hotel } from 'lucide-react';

export const metadata = {
  title: 'About - Hotel Samrat Sheraton',
  description: 'Learn about Hotel Samrat Sheraton, our story, our mission, and our commitment to luxury hospitality.',
};

export default function AboutPage() {
  const values = [
    { icon: Award, title: 'Hospitality', desc: 'Delivering warm, personalized service that makes every guest feel special and valued.' },
    { icon: Heart, title: 'Guest First', desc: 'Every decision we make is centered around your comfort and satisfaction.' },
    { icon: Shield, title: 'Safe & Secure', desc: 'Your safety is our priority with 24/7 security and secure facilities.' },
    { icon: Sparkles, title: 'Impeccable Service', desc: 'Our dedicated staff provides personalized service around the clock.' },
  ];

  const amenities = [
    { icon: Coffee, label: 'Restaurant' },
    { icon: Wifi, label: 'Free High-Speed WiFi' },
    { icon: Car, label: 'Valet Parking' },
    { icon: Hotel, label: 'Banquet' },
  ];

  return (
    <>
      <PageHero
        title="About Us"
        breadcrumb="About"
        image="images/IMG_5283.jpg"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="images/reception.jpeg"
                  alt="Hotel reception"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold rounded-2xl p-8 shadow-xl hidden md:block">
                <p className="font-heading text-4xl font-bold text-white">20+</p>
                <p className="text-sm text-white/80 mt-1">Luxury Rooms</p>
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
                Welcome to Hotel Samrat Sheraton, a comfortable 3-star hotel located in the spiritual and historic city of Varanasi, India.
                We offer luxurious and thoughtfully designed stay options to make every visit relaxing and memorable.
                Our dedicated team is committed to providing warm hospitality and attentive service throughout your stay.
              </p>
              <p>
                Guests can enjoy convenient facilities including transport services, secure lockers, an in-house restaurant, and car parking.
                Whether you are visiting Varanasi for pilgrimage, leisure, or business, we provide a welcoming base to explore the city.
                At Hotel Samrat Sheraton, we bring together comfort, convenience, and genuine Indian hospitality for an enjoyable stay.
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
            subtitle="The principles that guide everything we do at Hotel Samrat Sheraton."
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

      {/* <Stats /> */}
      <hr className="h-2 w-full bg-gold" />
      <CTA />
    </>
  );
}
