"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BedType, RoomStatus, HKStatus } from "@prisma/client";
import { validateRoomLimit } from "./validations";
import { promises as fs } from "fs";
import path from "path";

export async function saveRoomType(formData: FormData) {
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const count = formData.get("count") as string;
  const maxOccupancy = formData.get("maxOccupancy") as string;
  const bedType = formData.get("bedType") as string;
  const floorRange = formData.get("floorRange") as string;
  const area = formData.get("area") as string | null;
  const description = formData.get("description") as string;
  
  const smokingAllowed = formData.get("smokingAllowed") === "true";
  const petFriendly = formData.get("petFriendly") === "true";
  const accessible = formData.get("accessible") === "true";
  const bookableFromWebsite = formData.get("bookableFromWebsite") === "true";
  
  const amenities = formData.getAll("amenities") as string[];
  const existingImages = formData.getAll("existingImages") as string[];
  const newImages = formData.getAll("newImages") as File[];

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const uploadDir = path.join(process.cwd(), "public", slug);
  await fs.mkdir(uploadDir, { recursive: true });

  const savedImages = [...existingImages];

  for (const file of newImages) {
    if (file.size === 0) continue;
    
    const fileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filePath = path.join(uploadDir, fileName);
    
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    
    savedImages.push(`/${slug}/${fileName}`);
  }
  
  const roomData = {
    name,
    slug,
    basePrice: Number(price),
    totalRooms: Number(count),
    maxOccupancy: Number(maxOccupancy),
    bedType: bedType as BedType,
    floorRange,
    area: area ? Number(area) : null,
    images: savedImages,
    description,
    amenities,
    smokingAllowed,
    petFriendly,
    accessible,
    bookableFromWebsite,
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

