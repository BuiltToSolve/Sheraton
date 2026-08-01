'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';

export function Stats() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          stats.forEach((stat, i) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const interval = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(interval);
              }
              setCounts((prev) => {
                const next = [...prev];
                next[i] = Math.floor(current);
                return next;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-navy-dark relative overflow-hidden">
      <div className="absolute inset-0 section-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="group">
              <p className="font-heading text-5xl md:text-6xl font-bold text-gold mb-2">
                {counts[i].toLocaleString()}{stat.suffix}
              </p>
              <p className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
