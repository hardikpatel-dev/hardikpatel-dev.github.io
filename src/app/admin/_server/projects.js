import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/app/admin/_lib/auth";
import { normalizeProjectPayload } from "@/app/admin/_lib/projects";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function parseProjectId(id) {
  const parsedId = Number.parseInt(id, 10);
  return Number.isNaN(parsedId) ? null : parsedId;
}

function revalidateProjectSurfaces() {
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function listAdminProjects() {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ projects });
}

export async function createAdminProject(request) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = await request.json();
    const { data, errors, isValid } = normalizeProjectPayload(payload);

    if (!isValid) {
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors: errors },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({ data });

    revalidateProjectSurfaces();

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    console.error("Failed to create project:", error);

    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}

export async function updateAdminProject(request, { params }) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  const resolvedParams = await params;
  const projectId = parseProjectId(resolvedParams.id);

  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id." }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const { data, errors, isValid } = normalizeProjectPayload(payload);

    if (!isValid) {
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors: errors },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data,
    });

    revalidateProjectSurfaces();

    return NextResponse.json({ project });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    console.error("Failed to update project:", error);

    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function deleteAdminProject(_request, { params }) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  const resolvedParams = await params;
  const projectId = parseProjectId(resolvedParams.id);

  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id." }, { status: 400 });
  }

  try {
    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidateProjectSurfaces();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    console.error("Failed to delete project:", error);

    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
