import { db } from "@/lib/db";

export async function validateRoomLimit(roomTypeId: string) {
  const roomType = await db.roomType.findUnique({
    where: { id: roomTypeId },
    select: { totalRooms: true, name: true }
  });

  if (!roomType) {
    throw new Error("Room type not found.");
  }

  const existingRoomsCount = await db.room.count({
    where: { roomTypeId }
  });

  if (existingRoomsCount >= roomType.totalRooms) {
    throw new Error(`Cannot add room. The limit of ${roomType.totalRooms} rooms for ${roomType.name} has been reached.`);
  }

  return true;
}
