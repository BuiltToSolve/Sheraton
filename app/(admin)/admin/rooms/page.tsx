import * as LucideIcons from "lucide-react";
import { Edit } from "lucide-react";
import { CURRENCY } from '@/lib/constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { db } from "@/lib/db";
import { RoomImageGallery } from "./room-image-gallery";
import { AddRoomModal } from "./add-room-modal";
import { SUGGESTED_AMENITIES } from "./constants";
export default async function RoomsPage() {
  const roomTypes = await db.roomType.findMany();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Rooms & Accommodation</h1>
          <p className="text-zinc-400 mt-1">Manage dynamic room inventory and types.</p>
        </div>
        <AddRoomModal />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roomTypes.map((room) => (
          <div key={room.id} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden flex flex-col hover:border-[var(--color-primary)]/50 transition-colors">
            <RoomImageGallery images={room.images} roomName={room.name} available={room.totalRooms} />

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{room.name}</h2>
                  <AddRoomModal room={room} />
                </div>
                <span className="text-[var(--color-primary)] font-bold">{CURRENCY.SYMBOL}{room.basePrice}/night</span>
              </div>
              <div className="text-sm text-zinc-400 mb-6 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {room.description || ""}
                </ReactMarkdown>
              </div>

              <div className="mt-auto">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => {
                    const amenityEntry = SUGGESTED_AMENITIES.find(a => a[0] === amenity);
                    const iconName = amenityEntry ? amenityEntry[1] : "Bed";
                    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Bed;

                    return (
                      <span key={amenity} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300">
                        <Icon className="w-3 h-3" />
                        {amenity}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
