"use client";

import { useState, useTransition, useRef } from "react";
import { toast } from "sonner";
import {
  IconUpload,
  IconX,
  IconDotsVertical,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconArrowUp,
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
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
  const [selectedIndex, setSelectedIndex] = useState(null);
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
    if (!window.confirm("Are you sure you want to delete this image?")) return;

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

  const moveUp = (index) => {
    if (index === 0) return;
    const newItems = [...images];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setImages(newItems);
    saveOrder(newItems);
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    const newItems = [...images];
    [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    setImages(newItems);
    saveOrder(newItems);
  };

  // Slider controls
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : Object.keys(images).length - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <AdminTopbar title="Gallery Showcase" />

      <div className="flex items-center justify-between gap-4 mb-4 mt-2 px-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-black">Images</h2>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400 flex items-center gap-1.5">
            <span className="text-gray-900">{images.length}</span>
            <span className="text-gray-300">/</span>
            <span className="opacity-70">16 Max Recommended</span>
          </p>
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
          className="flex h-8 items-center gap-1.5 rounded-md bg-black px-3 text-xs font-medium text-white transition hover:bg-black/80 disabled:opacity-50"
        >
          {isUploading ? (
            <div className="h-3 w-3 animate-spin rounded-full border border-white/20 border-r-white" />
          ) : (
            <IconUpload size={14} />
          )}
          Upload
        </button>
      </div>

      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white" style={{ height: 'calc(100vh - 190px)' }}>
        {images.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">No images yet</p>
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto overflow-y-auto scroll-smooth">
            <table className="w-full text-left text-xs text-gray-600 relative border-collapse isolate">
              <thead className="sticky top-0 z-20 bg-gray-800 text-[10px] sm:text-[11px] uppercase tracking-wider text-white border-b border-gray-900 shadow-sm">
                <tr>
                  <th className="px-5 py-3.5 font-medium w-[80px]">Preview</th>
                  <th className="px-5 py-3.5 font-medium">Details</th>
                  <th className="px-5 py-3.5 font-medium w-[100px]">Status</th>
                  <th className="px-5 py-3.5 font-medium w-[80px]">Order</th>
                  <th className="px-5 py-3.5 font-medium text-right w-[100px] whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80 bg-white">
                {images.map((img, index) => (
                  <tr key={img.id} className="group relative hover:bg-[#FAFAFA] hover:shadow-[inset_2px_0_0_0_#4B5563] transition-all duration-200">
                    <td className="px-5 py-3">
                      <div 
                         className="h-10 w-16 cursor-pointer overflow-hidden rounded bg-gray-100 border border-black/5"
                         onClick={() => setSelectedIndex(index)}
                      >
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.imageUrl}
                          alt="preview"
                          className={`h-full w-full object-cover transition duration-300 ${!img.isActive && 'opacity-40 grayscale-[50%]'}`}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="max-w-[200px] truncate font-mono text-[10.5px] text-gray-500 font-medium group-hover:text-black transition-colors">
                         {img.imageUrl.split('/').pop()}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                       <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${img.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                          {img.isActive ? (
                             <span className="block h-1.5 w-1.5 rounded-full bg-green-500"></span> 
                          ) : (
                             <span className="block h-1.5 w-1.5 rounded-full bg-gray-300"></span> 
                          )}
                          {img.isActive ? "Live" : "Draft"}
                       </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-black disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        >
                          <IconArrowUp size={15} stroke={2.5}/>
                        </button>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === images.length - 1}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-black disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        >
                          <IconArrowDown size={15} stroke={2.5}/>
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-nowrap whitespace-nowrap">
                        <button
                          onClick={() => handleToggleActive(img.id, img.isActive)}
                          className={`group/btn relative rounded-full p-2 transition-colors ${img.isActive ? 'text-gray-400 hover:bg-orange-50 hover:text-orange-500' : 'text-gray-400 hover:bg-green-50 hover:text-green-600'}`}
                        >
                          {img.isActive ? <IconEyeOff size={16} stroke={2} /> : <IconEye size={16} stroke={2} />}
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/btn:opacity-100 z-10">
                            {img.isActive ? "Hide" : "Publish"}
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></span>
                          </span>
                        </button>
                        
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="group/btn relative rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <IconTrash size={16} stroke={2} />
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/btn:opacity-100 z-10">
                            Delete
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></span>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Full View Slider Modal */}
      {selectedIndex !== null && images[selectedIndex] && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar inside Modal */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 px-6 opacity-80" onClick={e => e.stopPropagation()}>
             <p className="text-xs font-mono text-white/50">{selectedIndex + 1} / {images.length}</p>
             <button 
                onClick={() => setSelectedIndex(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
             >
                <IconX size={18} />
             </button>
          </div>

          <div className="relative flex w-full max-w-7xl flex-1 items-center justify-center">
             {/* Left Arrow */}
             <button 
               onClick={handlePrev}
               className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 transition lg:-ml-12"
             >
               <IconChevronLeft size={20} />
             </button>

             {/* The Image */}
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
                src={images[selectedIndex].imageUrl}
                alt="Full View" 
                className="max-h-[85vh] max-w-full object-contain shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
             />

             {/* Right Arrow */}
             <button 
               onClick={handleNext}
               className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 transition lg:-mr-12"
             >
               <IconChevronRight size={20} />
             </button>
          </div>
        </div>
      )}
    </>
  );
}
