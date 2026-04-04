import About from "@/sections/About";
import Hero from "@/sections/Hero";
import TechStack from "@/sections/TechStack";
import Testimonial from "@/sections/Testimonial";
import Loader from "@/components/Loader";
import Work from "@/sections/Work";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

const GridWorkShowcase = dynamic(
  () => import("@/sections/GridWorkShowcase"),
  { loading: () => <Loader /> }
);

export default async function Home() {
  // Safe fallback to prevent crashes during Next.js Hot Module Reloads 
  // before the user restarts the server to pick up the new Prisma client.
  const galleryDocs = prisma.galleryImage
    ? await prisma.galleryImage.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      })
    : [];

  const dbImages = galleryDocs.map((img) => img.imageUrl);

  return (
    <>
      <Hero />
      <Work />
      <GridWorkShowcase dynamicImages={dbImages} />
      <TechStack />
      <About />
      <Testimonial />
    </>
  );
}
