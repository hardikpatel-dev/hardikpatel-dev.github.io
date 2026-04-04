"use server";

import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/app/admin/_lib/auth";

export async function getGalleryImages() {
  await requireAdminSession();
  
  return prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createGalleryImage({ imageUrl, altText }) {
  await requireAdminSession();
  
  const count = await prisma.galleryImage.count();
  
  return prisma.galleryImage.create({
    data: {
      imageUrl,
      altText,
      sortOrder: count,
      isActive: true,
    },
  });
}

export async function toggleImageActive(id, isActive) {
  await requireAdminSession();
  
  return prisma.galleryImage.update({
    where: { id },
    data: { isActive },
  });
}

export async function deleteGalleryImage(id) {
  await requireAdminSession();
  
  return prisma.galleryImage.delete({
    where: { id },
  });
}

export async function updateGalleryOrder(imageIds) {
  await requireAdminSession();
  
  const updates = imageIds.map((id, index) => 
    prisma.galleryImage.update({
      where: { id },
      data: { sortOrder: index },
    })
  );
  
  await prisma.$transaction(updates);
  return { success: true };
}
