"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BedType, RoomStatus, HKStatus } from "@prisma/client";
import { validateRoomLimit } from "./validations";

export async function saveRoomType(data: any) {
  const {
    id,
    name,
    price,
    count,
    maxOccupancy,
    bedType,
    floorRange,
    images,
    description,
    amenities,
    smokingAllowed,
    petFriendly,
    accessible,
    area,
  } = data;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const roomData = {
    name,
    slug,
    basePrice: Number(price),
    totalRooms: Number(count),
    maxOccupancy: Number(maxOccupancy),
    bedType: bedType as BedType,
    floorRange,
    area: area ? Number(area) : null,
    images,
    description,
    amenities,
    smokingAllowed,
    petFriendly,
    accessible,
  };

  if (id) {
    await db.roomType.update({
      where: { id },
      data: roomData,
    });
  } else {
    await db.roomType.create({
      data: {
        id: crypto.randomUUID(),
        ...roomData,
      },
    });
  }

  revalidatePath("/admin/rooms");
  return { success: true };
}

export async function deleteRoomType(id: string) {
  await db.roomType.delete({
    where: { id }
  });
  revalidatePath("/admin/rooms");
  return { success: true };
}

export async function getRoomTypes() {
  return await db.roomType.findMany({
    select: { id: true, name: true },
    orderBy: { sortOrder: 'asc' }
  });
}

export async function saveRoom(data: any) {
  try {
    const { roomNumber, roomTypeId, floor, status, hkStatus, notes } = data;
    
    // Validate room limits
    await validateRoomLimit(roomTypeId);

    await db.room.create({
      data: {
        id: crypto.randomUUID(),
        roomNumber,
        roomTypeId,
        floor: Number(floor),
        status: status as RoomStatus,
        hkStatus: hkStatus as HKStatus,
        notes: notes || "",
        lastCleanedAt: new Date()
      }
    });

    revalidatePath("/admin/rooms/all");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateRoomTypeOrder(orderedIds: string[]) {
  try {
    await db.$transaction(
      orderedIds.map((id, index) =>
        db.roomType.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );
    
    revalidatePath("/rooms");
    revalidatePath("/admin/rooms");
    revalidatePath("/admin/rooms/all");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating room type order:", error);
    return { success: false, error: error.message };
  }
}

