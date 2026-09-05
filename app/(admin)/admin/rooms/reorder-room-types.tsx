"use client";

import { useState, useTransition } from "react";
import { Reorder } from "framer-motion";
import { GripVertical, Save, X } from "lucide-react";
import { updateRoomTypeOrder } from "./actions";
import { toast } from "sonner";
import { RoomType } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ReorderRoomTypesProps {
  initialRoomTypes: RoomType[];
}

export function ReorderRoomTypes({ initialRoomTypes }: ReorderRoomTypesProps) {
  const [items, setItems] = useState(initialRoomTypes);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClose = () => {
    router.push("/admin/rooms");
  };

  const handleSave = () => {
    startTransition(async () => {
      const orderedIds = items.map((item) => item.id);
      const result = await updateRoomTypeOrder(orderedIds);
      
      if (result.success) {
        toast.success("Room type order saved successfully");
        handleClose();
      } else {
        toast.error(result.error || "Failed to save order");
      }
    });
  };

  return (
    <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden flex flex-col">
      <div className="p-6 border-b border-[var(--color-card-border)] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Reorder Room Types</h2>
          <p className="text-sm text-zinc-400 mt-1">Drag and drop to set the display order of room types.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-navy-900 rounded-xl hover:bg-[var(--color-primary)]/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Saving..." : "Save Order"}
          </button>
        </div>
      </div>

      <div className="p-6">
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
          {items.map((room) => (
            <Reorder.Item
              key={room.id}
              value={room}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors relative z-10"
              whileDrag={{
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                zIndex: 50,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
            >
              <div className="text-zinc-500 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-5 h-5" />
              </div>
              
              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                {room.images && room.images.length > 0 ? (
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">No img</div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-white font-medium">{room.name}</h3>
                <p className="text-xs text-zinc-400 truncate max-w-md">{room.description}</p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-[var(--color-primary)]">
                  ₹{room.basePrice}/night
                </div>
                <div className="text-xs text-zinc-500">
                  {room.totalRooms} rooms
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
