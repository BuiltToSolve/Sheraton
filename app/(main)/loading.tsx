import React from 'react';

export default function RoomsLoading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-cream section-pattern">
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border-[3px] border-navy/10"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-gold animate-spin" style={{ animationDuration: '1.2s' }}></div>
          
          <div className="absolute inset-3 rounded-full border-[3px] border-navy/10"></div>
          <div className="absolute inset-3 rounded-full border-[3px] border-transparent border-b-navy animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          <div className="w-3 h-3 rounded-full bg-gold animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="font-heading text-navy font-bold tracking-widest text-lg uppercase animate-pulse">Loading...</p>
          <div className="flex gap-1.5 mt-2">
             <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
             <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
             <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
