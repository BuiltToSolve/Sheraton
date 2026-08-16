"use server";

import { db } from "@/lib/db";
import { Department, Shift, StaffStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getStaffMembers() {
  try {
    const staff = await db.staffMember.findMany({
      orderBy: { joiningDate: "desc" },
    });
    return staff;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
}

export type StaffMemberInput = {
  id?: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  department: Department;
  designation: string;
  shift: Shift;
  phone: string;
  email?: string | null;
  joiningDate: string;
  status: StaffStatus;
};

export async function addStaffMember(data: StaffMemberInput) {
  try {
    if (!/^\d{10}$/.test(data.phone)) {
      return { success: false, error: "Phone number must be exactly 10 digits." };
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: "Invalid email format." };
    }

    const id = data.id || `STAFF-${Date.now()}`;
    await db.staffMember.create({
      data: {
        id,
        employeeCode: data.employeeCode,
        firstName: data.firstName,
        lastName: data.lastName,
        department: data.department,
        designation: data.designation,
        shift: data.shift,
        phone: data.phone,
        email: data.email,
        joiningDate: new Date(data.joiningDate),
        status: data.status,
      },
    });
    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error) {
    console.error("Error adding staff:", error);
    return { success: false, error: "Failed to add staff member." };
  }
}

export async function updateStaffMember(id: string, data: Partial<StaffMemberInput>) {
  try {
    if (data.phone && !/^\d{10}$/.test(data.phone)) {
      return { success: false, error: "Phone number must be exactly 10 digits." };
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: "Invalid email format." };
    }

    const updateData: any = { ...data };
    if (data.joiningDate) {
      updateData.joiningDate = new Date(data.joiningDate);
    }
    delete updateData.id;

    await db.staffMember.update({
      where: { id },
      data: updateData,
    });
    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error) {
    console.error("Error updating staff:", error);
    return { success: false, error: "Failed to update staff member." };
  }
}

export async function deleteStaffMember(id: string) {
  try {
    await db.staffMember.delete({
      where: { id },
    });
    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error) {
    console.error("Error deleting staff:", error);
    return { success: false, error: "Failed to delete staff member." };
  }
}
