"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  IconPlus,
  IconTrash,
  IconGripVertical,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import AdminTopbar from "./AdminTopbar";
import {
  createGalleryImage,
  toggleImageActive,
  deleteGalleryImage,
  updateGalleryOrder,
} from "@/app/admin/_server/gallery";

export default function GalleryAdminClient({ images: initialImages }) {
  const [images, setImages] = useState(initialImages);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large (max 5MB)");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gallery");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      startTransition(async () => {
        const newDoc = await createGalleryImage({
          imageUrl: data.url,
          altText: file.name,
        });

        // Add to local state
        setImages((prev) => [...prev, newDoc]);
        toast.success("Image uploaded successfully");
      });
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    startTransition(async () => {
      try {
        await deleteGalleryImage(id);
        setImages((prev) => prev.filter((img) => img.id !== id));
        toast.success("Image deleted");
      } catch (e) {
        toast.error("Failed to delete image");
      }
    });
  };

  const handleToggleActive = async (id, currentStatus) => {
    startTransition(async () => {
      try {
        await toggleImageActive(id, !currentStatus);
        setImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, isActive: !currentStatus } : img
          )
        );
        toast.success(!currentStatus ? "Image published" : "Image hidden");
      } catch (e) {
        toast.error("Failed to update status");
      }
    });
  };

  // Simple drag & drop logic for reordering (visual only without heavy libraries)
  // For a basic gallery, we can just allow moving up and down
  const moveUp = async (index) => {
    if (index === 0) return;
    const newItems = [...images];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setImages(newItems);
    saveOrder(newItems);
  };

  const moveDown = async (index) => {
    if (index === images.length - 1) return;
    const newItems = [...images];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setImages(newItems);
    saveOrder(newItems);
  };

  const saveOrder = (newItems) => {
    startTransition(async () => {
      try {
        const ids = newItems.map((img) => img.id);
        await updateGalleryOrder(ids);
      } catch (error) {
        toast.error("Failed to save order");
      }
    });
  };

  return (
    <>
      <AdminTopbar title="Gallery Showcase" />

      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Homepage Gallery</h2>
          <p className="text-sm text-gray-500">Manage the masonry images displayed on the homepage.</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-medium text-white shadow transition-all hover:bg-black/90 active:scale-95 disabled:opacity-50"
        >
          {isUploading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-r-white" />
          ) : (
            <IconUpload size={18} />
          )}
          Upload Image
        </button>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {images.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center text-center">
            <IconUpload className="mb-2 text-gray-300" size={32} />
            <p className="text-sm font-medium text-gray-500">No images yet</p>
            <p className="text-xs text-gray-400">Upload an image to start building your showcase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-black/10 bg-gray-50"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.altText || "Gallery image"}
                  fill
                  className={`object-cover transition-opacity duration-300 ${
                    img.isActive ? "opacity-100" : "opacity-30"
                  }`}
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-between items-start">
                    <span
                      onClick={() => handleToggleActive(img.id, img.isActive)}
                      className={`cursor-pointer rounded min-w-[60px] text-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        img.isActive ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {img.isActive ? "Live" : "Hidden"}
                    </span>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="text-white/70 hover:text-red-400 transition"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end text-white/70">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1 hover:text-white disabled:opacity-30"
                      title="Move Up"
                    >
                       ↑
                    </button>
                    <IconGripVertical size={16} className="opacity-50" />
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === images.length - 1}
                      className="p-1 hover:text-white disabled:opacity-30"
                      title="Move Down"
                    >
                       ↓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
