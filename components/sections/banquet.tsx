import { SectionHeading } from '@/components/section-heading';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function Banquet() {
  const features = [
    'Elegant & Spacious Hall',
    'Customizable Decor Options',
    'Gourmet Catering Services',
    'State-of-the-Art Audio/Visual',
    'Dedicated Event Planning Team',
    'Ample Guest Parking',
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading
              eyebrow="Weddings & Events"
              title="Host Your Dream Event"
              subtitle="Our majestic banquet hall offers the perfect setting for weddings, corporate galas, and grand celebrations. We provide a magnificent backdrop to make your special moments truly unforgettable."
              align="left"
            />

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-navy-light font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-3.5 rounded-full font-medium text-sm transition-colors"
              >
                Inquire Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/IMG_5283.jpg"
                alt="Sheraton Banquet Hall"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
