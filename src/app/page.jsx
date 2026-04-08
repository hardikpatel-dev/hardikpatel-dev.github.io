import About from "@/sections/About";
import Hero from "@/sections/Hero";
import TechStack from "@/sections/TechStack";

export const dynamic = "force-dynamic";
import Testimonial from "@/sections/Testimonial";
import Loader from "@/components/Loader";
import Work from "@/sections/Work";
import nextDynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

const GridWorkShowcase = nextDynamic(
  () => import("@/sections/GridWorkShowcase"),
  { loading: () => <Loader /> }
);

export default async function Home() {
  let galleryDocs = [];
  let techStackItems = [];
  try {
    galleryDocs = prisma.galleryImage
      ? await prisma.galleryImage.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        })
      : [];

    techStackItems = prisma.techStackItem
      ? await prisma.techStackItem.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        })
      : [];
  } catch (error) {
    console.error("Prisma error during home page render:", error.message);
  }

  const dbImages = galleryDocs.map((img) => img.imageUrl);

  return (
    <>
      <Hero />
      <Work />
      <GridWorkShowcase dynamicImages={dbImages} />
      <TechStack items={techStackItems} />
      <About />
      <Testimonial />
    </>
  );
}
