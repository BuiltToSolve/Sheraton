import { Suspense } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CheckInClient from "./check-in-client";

export default async function RoomCheckInPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  const room = await db.room.findUnique({
    where: { id: roomId },
    include: {
      RoomType: true,
    }
  });

  if (!room) {
    notFound();
  }

  // Map to the RoomData format expected by the client component
  const roomData = {
    id: room.id,
    number: room.roomNumber,
    floor: room.floor,
    status: room.status,
    type: room.RoomType?.name || 'Unknown',
    typeId: room.RoomType?.id || '',
    bedType: room.RoomType?.bedType || 'Unknown',
    capacityText: `${room.RoomType?.maxOccupancy || 0} Guests`,
    maxCapacity: room.RoomType?.maxOccupancy || 0,
    price: room.RoomType?.basePrice || 0,
    isClean: room.hkStatus === 'Clean' || room.hkStatus === 'Inspected',
    amenities: room.RoomType?.amenities || [],
    notes: room.notes,
  };

  return (
    <Suspense fallback={<div className="p-8 text-white">Loading check-in...</div>}>
      <CheckInClient room={roomData} />
    </Suspense>
  );
}
