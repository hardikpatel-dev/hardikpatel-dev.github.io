import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/app/admin/_lib/auth";
import { normalizeTestimonialPayload } from "@/app/admin/_lib/testimonials";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function parseTestimonialId(id) {
  const parsedId = Number.parseInt(id, 10);
  return Number.isNaN(parsedId) ? null : parsedId;
}

function revalidateTestimonialSurfaces() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
}

export async function listAdminTestimonials() {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ testimonials });
}

export async function createAdminTestimonial(request) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = await request.json();
    const { data, errors, isValid } = normalizeTestimonialPayload(payload);

    if (!isValid) {
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors: errors },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({ data });

    revalidateTestimonialSurfaces();

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error("Failed to create testimonial:", error);

    return NextResponse.json(
      { error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

export async function updateAdminTestimonial(request, { params }) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  const resolvedParams = await params;
  const testimonialId = parseTestimonialId(resolvedParams.id);

  if (!testimonialId) {
    return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const { data, errors, isValid } = normalizeTestimonialPayload(payload);

    if (!isValid) {
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors: errors },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: testimonialId },
      data,
    });

    revalidateTestimonialSurfaces();

    return NextResponse.json({ testimonial });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    console.error("Failed to update testimonial:", error);

    return NextResponse.json(
      { error: "Failed to update testimonial." },
      { status: 500 }
    );
  }
}

export async function deleteAdminTestimonial(_request, { params }) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  const resolvedParams = await params;
  const testimonialId = parseTestimonialId(resolvedParams.id);

  if (!testimonialId) {
    return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  }

  try {
    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    revalidateTestimonialSurfaces();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    console.error("Failed to delete testimonial:", error);

    return NextResponse.json(
      { error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}
