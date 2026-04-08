export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import GalleryAdminClient from "@/app/admin/_components/GalleryAdminClient";

export const metadata = {
  title: "Gallery Admin | Hardik Patel",
  description: "Manage portfolio gallery images.",
};

export default async function AdminGalleryPage() {
  await requireAdminSession();
  
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <GalleryAdminClient images={images} />
    </>
  );
}
