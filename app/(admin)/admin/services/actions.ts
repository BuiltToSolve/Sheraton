"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveService(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const icon = formData.get("icon") as string;

    if (!name || !description || !image || !icon) {
      throw new Error("Missing required fields");
    }

    const data = { name, description, image, icon };

    if (id) {
      await db.service.update({
        where: { id },
        data,
      });
    } else {
      await db.service.create({
        data,
      });
    }

    revalidatePath("/admin/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteService(id: string) {
  try {
    await db.service.delete({
      where: { id },
    });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleMaintenance(id: string, currentStatus: boolean) {
  try {
    await db.service.update({
      where: { id },
      data: { underMaintenance: !currentStatus },
    });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
