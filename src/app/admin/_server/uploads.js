import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/admin/_lib/auth";
import { Buffer } from "node:buffer";
import { v2 as cloudinary } from "cloudinary";
import path from "node:path";
import { randomUUID } from "node:crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadConfig = {
  favicon: {
    folder: "portfolio/favicons",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/x-icon"],
    allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"],
    maxBytes: 5 * 1024 * 1024,
  },
  thumbnail: {
    folder: "portfolio/thumbnails",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif"],
    allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".avif"],
    maxBytes: 10 * 1024 * 1024,
  },
  video: {
    folder: "portfolio/videos",
    allowedMimeTypes: ["video/mp4", "video/webm", "video/quicktime"],
    allowedExtensions: [".mp4", ".webm", ".mov"],
    maxBytes: 100 * 1024 * 1024,
  },
  gallery: {
    folder: "portfolio/gallery",
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = `${sanitizeFilenamePart(projectSlug)}-${randomUUID()}`;

    // Upload to Cloudinary directly from memory
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: config.folder,
          public_id: safeName,
          resource_type: "auto", // Works for both images and videos
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      name: file.name,
      size: file.size,
      type: file.type,
      // Pass the cloudinary public_id if needed for future deleting
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Asset upload failed:", error);
    return NextResponse.json({ error: "Asset upload failed: " + (error?.message || "Unknown error") }, { status: 500 });
  }
}
