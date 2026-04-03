import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import { getTestimonialStatusOptions } from "@/app/admin/_lib/testimonials";
import TestimonialAdminClient from "@/app/admin/_components/TestimonialAdminClient";

export const metadata = {
  title: "Testimonials Admin | Hardik Patel",
  description: "Manage portfolio testimonials stored in PostgreSQL.",
};

export default async function AdminTestimonialsPage() {
  await requireAdminSession();

  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <TestimonialAdminClient
      testimonials={testimonials}
      statusOptions={getTestimonialStatusOptions()}
    />
  );
}
