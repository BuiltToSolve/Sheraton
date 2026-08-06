"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Maximize2 } from "lucide-react";

interface RoomImageGalleryProps {
  images: string[];
  roomName: string;
  available: number;
}

export function RoomImageGallery({ images, roomName, available }: RoomImageGalleryProps) {
  // Use provided images or fallback to a default image
  const displayImages = images && images.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800'];
  
  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  return (
    <>
      <div className="h-48 w-full bg-zinc-800 relative group">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-0 h-full">
            {displayImages.map((img, idx) => (
              <CarouselItem key={idx} className="pl-0 h-48">
                <div 
                  className="w-full h-full relative cursor-pointer"
                  onClick={() => {
                    setStartIndex(idx);
                    setOpen(true);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${roomName} - ${idx + 1}`} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {displayImages.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/10 hover:bg-black/80 text-white" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/10 hover:bg-black/80 text-white" />
            </>
          )}
        </Carousel>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-sm font-medium text-white z-10 pointer-events-none">
          {available} Available
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-transparent border-none p-0 shadow-none">
          <Carousel className="w-full" opts={{ startIndex, loop: true }}>
            <CarouselContent>
              {displayImages.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative w-full aspect-video flex items-center justify-center bg-black/40 rounded-xl overflow-hidden backdrop-blur-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${roomName} - ${idx + 1}`} className="max-w-full max-h-[80vh] object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {displayImages.length > 1 && (
              <>
                <CarouselPrevious className="left-4 w-12 h-12 bg-black/50 border-white/10 hover:bg-black/80 text-white" />
                <CarouselNext className="right-4 w-12 h-12 bg-black/50 border-white/10 hover:bg-black/80 text-white" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
