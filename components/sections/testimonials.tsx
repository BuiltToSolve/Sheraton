'use client';

import { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { testimonials } from '@/lib/data';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Guests Say"
          subtitle="We are always keeping our guests happy. Read what they have to say about their experience at Samrat Sheraton."
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative">
            <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 text-gold/20" />

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="w-full shrink-0 px-4">
                    <div className="text-center">
                      <div className="flex justify-center gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, idx) => (
                          <Star key={idx} className="w-5 h-5 text-gold fill-gold" />
                        ))}
                      </div>
                      <p className="text-lg text-navy/80 leading-relaxed mb-6 italic max-w-2xl mx-auto">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold/30">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-heading font-semibold text-navy">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border hover:bg-gold hover:border-gold hover:text-white text-navy flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === current ? 'w-8 bg-gold' : 'w-2 bg-border hover:bg-gold/50'
                    )}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border hover:bg-gold hover:border-gold hover:text-white text-navy flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
