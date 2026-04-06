import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/admin/_lib/auth";
import { Buffer } from "node:buffer";

const uploadConfig = {
  favicon: {
    dir: path.join(process.cwd(), "public", "uploads", "projects", "favicons"),
    publicBase: "/uploads/projects/favicons",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/x-icon"],
    allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"],
    maxBytes: 5 * 1024 * 1024,
  },
  thumbnail: {
    dir: path.join(process.cwd(), "public", "uploads", "projects", "thumbnails"),
    publicBase: "/uploads/projects/thumbnails",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif"],
    allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".avif"],
    maxBytes: 10 * 1024 * 1024,
  },
  video: {
    dir: path.join(process.cwd(), "public", "uploads", "projects", "videos"),
    publicBase: "/uploads/projects/videos",
    allowedMimeTypes: ["video/mp4", "video/webm", "video/quicktime"],
    allowedExtensions: [".mp4", ".webm", ".mov"],
    maxBytes: 100 * 1024 * 1024,
  },
  gallery: {
    dir: path.join(process.cwd(), "public", "uploads", "gallery"),
    publicBase: "/uploads/gallery",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/avif"],
    allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif"],
    maxBytes: 10 * 1024 * 1024,
  },
};

function sanitizeFilenamePart(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "asset";
}

export async function uploadAdminAsset(request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const assetType = String(formData.get("assetType") || "");
    const projectSlug = String(formData.get("projectSlug") || "general");
    const file = formData.get("file");

    if (!uploadConfig[assetType]) {
      return NextResponse.json({ error: "Invalid asset type: " + assetType }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const config = uploadConfig[assetType];

    if (!config.allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type (${file.type}) for ${assetType}.` },
        { status: 400 }
      );
    }

    // Validate file extension independently of MIME type
    const extension = path.extname(file.name || "").toLowerCase();

    if (!extension || !config.allowedExtensions.includes(extension)) {
      return NextResponse.json(
        { error: `File extension "${extension || "(none)"}" is not allowed for ${assetType}.` },
        { status: 400 }
      );
    }

    if (file.size > config.maxBytes) {
      return NextResponse.json(
        { error: `${assetType} file is too large.` },
        { status: 400 }
      );
    }

    const safeName = `${sanitizeFilenamePart(projectSlug)}-${randomUUID()}${extension}`;

    await mkdir(config.dir, { recursive: true });
    const destinationPath = path.join(config.dir, safeName);
    const bytes = await file.arrayBuffer();

    await writeFile(destinationPath, Buffer.from(bytes));

    return NextResponse.json({
      url: `${config.publicBase}/${safeName}`,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Asset upload failed:", error);
    return NextResponse.json({ error: "Asset upload failed: " + (error?.message || "Unknown error") }, { status: 500 });
  }
}
