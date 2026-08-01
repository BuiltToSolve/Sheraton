'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setDone(true), 1400);
    const removeTimer = setTimeout(() => setHidden(true), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[300] flex items-center justify-center bg-navy-dark transition-all duration-700',
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <div className="absolute inset-0 section-pattern opacity-20" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-heading text-4xl md:text-5xl font-bold text-white overflow-hidden">
            <span className="inline-block animate-preloader-text">Samrat</span>
          </span>
          <span className="font-heading text-4xl md:text-5xl font-bold text-gold overflow-hidden">
            <span className="inline-block animate-preloader-text" style={{ animationDelay: '0.15s' }}>
              .
            </span>
          </span>
        </div>

        <div className="relative h-0.5 w-40 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gold rounded-full animate-preloader-bar" />
        </div>

        <p className="text-xs font-body uppercase tracking-[0.3em] text-white/40 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Luxury Hotel
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold animate-preloader-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
