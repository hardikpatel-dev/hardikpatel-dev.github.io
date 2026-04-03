import {
  createAdminTestimonial,
  listAdminTestimonials,
} from "@/app/admin/_server/testimonials";

export const GET = listAdminTestimonials;
export const POST = createAdminTestimonial;
