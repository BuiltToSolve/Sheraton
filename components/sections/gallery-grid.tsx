'use client';

import { useState, useMemo } from 'react';
import { galleryImages } from '@/lib/data';
import { ImageLightbox, type LightboxImage } from '@/components/image-lightbox';
import { ZoomIn } from 'lucide-react';

export function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = useMemo(
    () => galleryImages.map((img) => ({ src: img.src, alt: img.alt })),
    []
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`group relative rounded-xl overflow-hidden cursor-pointer ${img.span}`}
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/50 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </div>
          </div>
        ))}
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
