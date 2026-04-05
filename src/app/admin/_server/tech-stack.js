"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Public: Get all active tech stack items
 */
export async function getTechStackItems() {
  try {
    if (!prisma.techStackItem) {
      console.error("Prisma techStackItem model is missing!");
      return [];
    }
    return await prisma.techStackItem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching tech stack items:", error);
    return [];
  }
}

/**
 * Admin: Get all tech stack items (including inactive)
 */
export async function getAllTechStackItems() {
  try {
    await requireAdminSession();
    if (!prisma.techStackItem) {
      console.error("Prisma techStackItem model is missing in Admin context!");
      console.error("Available Prisma models:", Object.keys(prisma).filter(k => !k.startsWith('$')));
      return [];
    }
    return await prisma.techStackItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching all tech stack items:", error);
    return [];
  }
}

/**
 * Admin: Add new tech stack item
 */
export async function addTechItem(data) {
  try {
    await requireAdminSession();
    if (!prisma.techStackItem) throw new Error("Prisma techStackItem model is missing!");

    const item = await prisma.techStackItem.create({
      data: {
        name: data.name,
        iconCode: data.iconCode,
        link: data.link,
        sortOrder: data.sortOrder || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/tech-stack");
    return item;
  } catch (error) {
    console.error("Error adding tech item:", error);
    throw error;
  }
}

/**
 * Admin: Update tech stack item
 */
export async function updateTechItem(id, data) {
  try {
    await requireAdminSession();
    if (!prisma.techStackItem) throw new Error("Prisma techStackItem model is missing!");

    const item = await prisma.techStackItem.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        iconCode: data.iconCode,
        link: data.link,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/tech-stack");
    return item;
  } catch (error) {
    console.error("Error updating tech item:", error);
    throw error;
  }
}

/**
 * Admin: Delete tech stack item
 */
export async function deleteTechItem(id) {
  await requireAdminSession();
  await prisma.techStackItem.delete({
    where: { id: parseInt(id) },
  });
  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
  return { success: true };
}

/**
 * Admin: Toggle item status
 */
export async function toggleTechStatus(id, currentStatus) {
  await requireAdminSession();
  const item = await prisma.techStackItem.update({
    where: { id: parseInt(id) },
    data: { isActive: !currentStatus },
  });
  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
  return item;
}

/**
 * Admin: Update sort orders
 */
export async function updateTechSortOrders(idOrderMap) {
  await requireAdminSession();
  const updates = Object.entries(idOrderMap).map(([id, order]) =>
    prisma.techStackItem.update({
      where: { id: parseInt(id) },
      data: { sortOrder: order },
    })
  );
  await Promise.all(updates);
  revalidatePath("/");
  return { success: true };
}
