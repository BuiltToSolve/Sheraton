'use client';

import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { galleryImages } from '@/lib/data';
import { ImageLightbox, type LightboxImage } from '@/components/image-lightbox';
import { ZoomIn } from 'lucide-react';

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = useMemo(
    () => galleryImages.map((img) => ({ src: img.src, alt: img.alt })),
    []
  );

  return (
    <section className="py-20 lg:py-28 bg-cream section-pattern">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Gallery"
          title="See Our Hotel View"
          subtitle="Take a visual tour of Samrat Sheraton and experience the beauty and elegance that awaits you. Click any image to zoom in."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
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

        <div className="text-center mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 border border-navy/20 hover:border-gold hover:text-gold-dark text-navy px-8 py-3.5 rounded-full font-medium text-sm transition-colors"
          >
            View Full Gallery
          </a>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
