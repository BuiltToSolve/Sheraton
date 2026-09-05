'use client';

import { useState } from 'react';
import { ImageLightbox } from '@/components/image-lightbox';

export function RoomImageGrid({ images, name }: { images: string[]; name: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const lightboxImages = images.map((img) => ({ src: img, alt: name }));

  return (
    <>
      <div className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-3 h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
        <div className="md:col-span-8 h-full relative cursor-pointer group overflow-hidden" onClick={() => setLightboxIndex(0)}>
          <img src={images[0]} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        {images.length > 1 && (
          <div className="hidden md:flex md:col-span-4 flex-col gap-3 h-full">
            <div className="h-1/2 overflow-hidden relative cursor-pointer group rounded-xl" onClick={() => setLightboxIndex(1)}>
              <img src={images[1]} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            {images.length > 2 && (
              <div className="h-1/2 overflow-hidden relative cursor-pointer group rounded-xl" onClick={() => setLightboxIndex(2)}>
                <img src={images[2]} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                {images.length > 3 && (
                  <div className="absolute inset-0 bg-navy/60 flex items-center justify-center backdrop-blur-[2px] group-hover:bg-navy/70 transition-colors">
                    <span className="text-white font-medium text-lg tracking-wide">+{images.length - 3} Photos</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
