"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BedType } from "@prisma/client";

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
