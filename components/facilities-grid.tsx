'use client';

import { useState } from 'react';
import { UtensilsCrossed, Car, Dumbbell, Sofa, Flower2, Gamepad2, Plane, Waves, KeyRound, Hotel, X, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed, Car, Dumbbell, Sofa, Flower2, Gamepad2, Plane, Waves, KeyRound, Hotel,
};

type Facility = {
  name: string;
  icon: string;
  images: string[];
  description: string;
};

export function FacilitiesGrid({ facilities }: { facilities: Facility[] }) {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (facility: Facility) => {
    setSelectedFacility(facility);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedFacility(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFacility) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedFacility.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFacility) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedFacility.images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility, i) => {
          const Icon = iconMap[facility.icon];
          return (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border bg-white cursor-pointer"
              onClick={() => openLightbox(facility)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={facility.images[0]}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  {Icon && <Icon className="w-5 h-5 text-white" />}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors">
                  {facility.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedFacility && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center">
            {selectedFacility.images.length > 1 && (
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            <img 
              src={selectedFacility.images[currentImageIndex]} 
              alt={`${selectedFacility.name} - Image ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {selectedFacility.images.length > 1 && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors z-10"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {selectedFacility.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedFacility.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
