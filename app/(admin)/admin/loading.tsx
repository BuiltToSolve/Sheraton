"use client";

import React from 'react';

export default function AdminLoading() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-800"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[var(--color-primary)] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-[3px] border-zinc-800"></div>
          <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-[var(--color-primary)] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></div>
        </div>
        <p className="text-zinc-400 font-medium tracking-widest text-sm uppercase animate-pulse">Loading Data</p>
      </div>
    </div>
  );
}
