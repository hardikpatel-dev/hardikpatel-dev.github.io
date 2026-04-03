import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import fallbackTestimonials from "@/data/testimonials";
import TestimonialClient from "@/sections/TestimonialClient";

export default async function Testimonial() {
  const isExport = process.env.EXPORT === "true";

  const testimonials = isExport
    ? fallbackTestimonials
        .slice()
        .sort((a, b) => a.id - b.id)
        .map((testimonial, index) => ({
          id: testimonial.id,
          name: testimonial.name,
          designation: testimonial.designation,
          imageUrl: testimonial.image,
          feedback: testimonial.feedback,
          linkedinUrl: testimonial.linkedin,
          sortOrder: index + 1,
          status: "PUBLISHED",
        }))
    : await (async () => {
        noStore();

        return prisma.testimonial.findMany({
          where: {
            status: "PUBLISHED",
          },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        });
      })();

  const mappedTestimonials = testimonials.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    designation: testimonial.designation,
    image: testimonial.imageUrl || "/assets/hardik-ai.png",
    feedback: testimonial.feedback,
    linkedin: testimonial.linkedinUrl,
  }));

  return <TestimonialClient testimonials={mappedTestimonials} />;
}
