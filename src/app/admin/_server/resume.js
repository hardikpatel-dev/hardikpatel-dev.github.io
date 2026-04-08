"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import { revalidatePath } from "next/cache";

export async function getResumeItems() {
  return prisma.resumeItem.findMany({
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }],
  });
}

export async function addResumeItem(data) {
  await requireAdminSession();
  try {
    const item = await prisma.resumeItem.create({
      data: {
        type: data.type,
        title: data.title || "",
        subtitle: data.subtitle || null,
        dateRange: data.dateRange || null,
        link: data.link || null,
        bullets: Array.isArray(data.bullets) ? data.bullets : [],
        sortOrder: data.sortOrder || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
    revalidatePath("/resume");
    return item;
  } catch (error) {
    console.error("Error adding resume item:", error);
    throw new Error("Failed to add resume item: " + (error?.message || "Unknown error"));
  }
}

export async function updateResumeItem(id, data) {
  await requireAdminSession();
  try {
    const item = await prisma.resumeItem.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        dateRange: data.dateRange,
        link: data.link,
        bullets: Array.isArray(data.bullets) ? data.bullets : undefined,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
    });
    revalidatePath("/resume");
    return item;
  } catch (error) {
    console.error("Error updating resume item:", error);
    throw new Error("Failed to update resume item: " + (error?.message || "Unknown error"));
  }
}

export async function deleteResumeItem(id) {
  await requireAdminSession();
  try {
    await prisma.resumeItem.delete({ where: { id } });
    revalidatePath("/resume");
    return { success: true };
  } catch (error) {
    console.error("Error deleting resume item:", error);
    throw new Error("Failed to delete resume item: " + (error?.message || "Unknown error"));
  }
}

export async function toggleResumeItemStatus(id, currentStatus) {
  await requireAdminSession();
  try {
    const item = await prisma.resumeItem.update({
      where: { id },
      data: { isActive: !currentStatus },
    });
    revalidatePath("/resume");
    return item;
  } catch (error) {
    console.error("Error toggling resume item status:", error);
    throw new Error("Failed to toggle resume item status.");
  }
}

export async function updateResumeSortOrders(idOrderMap) {
  await requireAdminSession();
  try {
    const updates = Object.entries(idOrderMap).map(([id, sortOrder]) =>
      prisma.resumeItem.update({
        where: { id: parseInt(id, 10) },
        data: { sortOrder },
      })
    );
    await prisma.$transaction(updates);
    revalidatePath("/resume");
    return { success: true };
  } catch (error) {
    console.error("Error reordering resume items:", error);
    throw new Error("Failed to reorder resume items.");
  }
}

// Global Resume Settings
export async function getResumeSettings() {
  const settings = await prisma.resumeSettings.findFirst();
  return settings || null;
}

export async function updateResumePdf(pdfUrl) {
  await requireAdminSession();
  try {
    let settings = await prisma.resumeSettings.findFirst();
    if (settings) {
      settings = await prisma.resumeSettings.update({
        where: { id: settings.id },
        data: { pdfUrl },
      });
    } else {
      settings = await prisma.resumeSettings.create({
        data: { pdfUrl },
      });
    }
    revalidatePath("/resume");
    return settings;
  } catch (error) {
    console.error("Error updating resume pdf:", error);
    throw new Error("Failed to update resume pdf: " + (error?.message || "Unknown error"));
  }
}
