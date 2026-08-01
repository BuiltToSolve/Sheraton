'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/3011575/pexels-photo-3011575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    eyebrow: 'To Visit Our',
    title: 'Samrat Sheraton',
  },
  {
    image: 'https://images.pexels.com/photos/18649226/pexels-photo-18649226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    eyebrow: 'Welcome To',
    title: 'Luxury Redefined',
  },
  {
    image: 'https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    eyebrow: 'Experience',
    title: 'Timeless Elegance',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div key={current} className="animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-sm font-body uppercase tracking-[0.3em] text-gold font-medium">
              {slides[current].eyebrow}
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Discover the epitome of luxury and comfort at Samrat Sheraton, where every moment is crafted for an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/rooms"
              className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all hover:shadow-xl hover:scale-105"
            >
              Book Your Stay
            </a>
            <a
              href="/about"
              className="border border-white/40 hover:border-gold hover:text-gold text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all"
            >
              Discover More
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gold" />
      </div>

      <div className="absolute bottom-10 right-10 z-10 hidden md:flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 transition-all duration-300 rounded-full ${
              i === current ? 'h-8 bg-gold' : 'h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
