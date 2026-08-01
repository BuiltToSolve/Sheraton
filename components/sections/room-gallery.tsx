'use client';

import { useState, useMemo } from 'react';
import { roomGalleryCategories, roomGalleryImages } from '@/lib/data';
import { ImageLightbox, type LightboxImage } from '@/components/image-lightbox';
import { ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RoomGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return roomGalleryImages;
    return roomGalleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const lightboxImages: LightboxImage[] = useMemo(
    () => filteredImages.map((img) => ({ src: img.src, alt: img.alt })),
    [filteredImages]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {roomGalleryCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
              activeCategory === category
                ? 'bg-gold text-white shadow-lg'
                : 'bg-cream text-navy hover:bg-gold/20 border border-border'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xs font-medium px-3 py-1 bg-navy-dark/60 rounded-full">
                  {image.category}
                </span>
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
    </div>
  );
}
