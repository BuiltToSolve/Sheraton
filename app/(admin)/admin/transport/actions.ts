"use server";

import { db } from "@/lib/db";
import { VehicleStatus, VehicleType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getVehicles() {
  try {
    const vehicles = await db.vehicle.findMany({
      include: {
        driver: true 
      }
    });
    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

export async function getAvailableDrivers() {
  try {
    const drivers = await db.staffMember.findMany({
      where: {
        department: "Transport",
        // The user said "designation is driver", we'll check designation field
        designation: {
          contains: "Driver",
          mode: "insensitive"
        },
        status: "Active"
      }
    });
    return drivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
}

export type VehicleInput = {
  id?: string;
  vehicleNumber: string;
  type: VehicleType;
  brand: string;
  capacity: number;
  status: VehicleStatus;
  driverId?: string | null;
  isEV: boolean;
  image?: string | null;
};

export async function addVehicle(data: VehicleInput) {
  try {
    const existing = await db.vehicle.findFirst({
      where: { vehicleNumber: { equals: data.vehicleNumber, mode: 'insensitive' } }
    });
    if (existing) {
      return { success: false, error: "Vehicle with this number already exists." };
    }

    const id = data.id || `CAB-${Date.now()}`;
    await db.vehicle.create({
      data: {
        id,
        vehicleNumber: data.vehicleNumber,
        type: data.type,
        brand: data.brand,
        capacity: data.capacity,
        status: data.status,
        driverId: data.driverId || null,
        isEV: data.isEV,
        image: data.image || null,
      }
    });
    revalidatePath("/admin/transport");
    return { success: true };
  } catch (error) {
    console.error("Error adding vehicle:", error);
    return { success: false, error: "Failed to add vehicle." };
  }
}

export async function updateVehicle(id: string, data: Partial<VehicleInput>) {
  try {
    if (data.vehicleNumber) {
      const existing = await db.vehicle.findFirst({
        where: { 
          vehicleNumber: { equals: data.vehicleNumber, mode: 'insensitive' },
          id: { not: id }
        }
      });
      if (existing) {
        return { success: false, error: "Vehicle with this number already exists." };
      }
    }

    const updateData: any = { ...data };
    delete updateData.id;
    if (updateData.driverId === "") updateData.driverId = null;

    await db.vehicle.update({
      where: { id },
      data: updateData
    });
    revalidatePath("/admin/transport");
    return { success: true };
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return { success: false, error: "Failed to update vehicle." };
  }
}

export async function deleteVehicle(id: string) {
  try {
    await db.vehicle.delete({
      where: { id },
    });
    revalidatePath("/admin/transport");
    return { success: true };
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return { success: false, error: "Failed to delete vehicle." };
  }
}
