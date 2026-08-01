'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

  const next = useCallback(() => {
    setZoomed(false);
    setTransform({ x: 0, y: 0, scale: 1 });
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  const prev = useCallback(() => {
    setZoomed(false);
    setTransform({ x: 0, y: 0, scale: 1 });
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const toggleZoom = () => {
    if (zoomed) {
      setTransform({ x: 0, y: 0, scale: 1 });
      setZoomed(false);
    } else {
      setTransform({ x: 0, y: 0, scale: 2 });
      setZoomed(true);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setTransform((prev) => {
      const newScale = Math.max(1, Math.min(4, prev.scale + delta));
      return { ...prev, scale: newScale };
    });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!zoomed) return;
    e.preventDefault();
    setTransform((prev) => ({
      ...prev,
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const current = images[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-navy-dark/95 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-gold text-white flex items-center justify-center transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold text-white flex items-center justify-center transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold text-white flex items-center justify-center transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg select-none transition-transform duration-200"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            cursor: zoomed ? 'grab' : 'default',
          }}
          onWheel={handleWheel}
          onMouseDown={handleDrag}
          draggable={false}
        />

        <button
          onClick={toggleZoom}
          className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-gold text-white flex items-center justify-center transition-colors"
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        >
          {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-white/60 text-sm">
          {index + 1} / {images.length}
        </span>
        <span className="text-white/40 text-sm hidden sm:inline">· {current.alt}</span>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === index ? 'w-8 bg-gold' : 'w-1.5 bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
