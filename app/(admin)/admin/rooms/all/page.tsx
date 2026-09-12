import { Suspense } from "react";
import { db } from "@/lib/db";
import AllRoomsClient from "./rooms-client";

export default async function AllRoomsPage() {
  const rooms = await db.room.findMany({
    include: {
      RoomType: true,
    },
    orderBy: [
      { floor: 'asc' },
      { roomNumber: 'asc' }
    ]
  });

  return (
    <Suspense fallback={<div className="p-8 text-white">Loading rooms...</div>}>
      <AllRoomsClient initialRooms={rooms} />
    </Suspense>
  );
}
