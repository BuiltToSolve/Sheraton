"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { MenuCategory, DietaryType, FoodAllergen } from "@prisma/client";

export async function saveMenuItem(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const allergens = formData.getAll("allergens") as FoodAllergen[];
    const available = formData.get("available") === "on";
    
    await db.menuItem.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name as string,
        category: data.category as MenuCategory,
        cuisine: data.cuisine ? (data.cuisine as string) : null,
        price: Number(data.price),
        dietaryType: data.dietaryType as DietaryType,
        description: data.description as string,
        image: data.image as string,
        available,
        preparationTime: Number(data.preparationTime),
        calories: data.calories ? Number(data.calories) : null,
        allergens,
      }
    });

    revalidatePath("/admin/menu");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
