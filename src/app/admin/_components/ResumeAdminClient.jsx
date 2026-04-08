"use client";

import { useState, useTransition, useRef } from "react";
import { toast } from "sonner";
import {
  IconPlus,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconArrowUp,
  IconArrowDown,
  IconPencil,
  IconX,
  IconUpload,
  IconFileText,
  IconLink
} from "@tabler/icons-react";
import AdminTopbar from "./AdminTopbar";
import {
  addResumeItem,
  updateResumeItem,
  deleteResumeItem,
  toggleResumeItemStatus,
  updateResumeSortOrders,
  updateResumePdf
} from "@/app/admin/_server/resume";

const SECTION_OPTIONS = [
  { value: "EXPERIENCE", label: "Experience" },
  { value: "EDUCATION", label: "Education" },
  { value: "PROJECT", label: "Projects" },
  { value: "SKILL", label: "Skills" },
  { value: "ACHIEVEMENT", label: "Achievements" },
  { value: "HOBBY", label: "Hobbies" }
];

export default function ResumeAdminClient({ initialItems = [], initialSettings = null }) {
  const [items, setItems] = useState(initialItems);
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("EXPERIENCE");
  
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Settings / PDF
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    type: "EXPERIENCE",
    title: "",
    subtitle: "",
    dateRange: "",
    link: "",
    bulletsText: "", // Internal state to map lines to `bullets` array
    isActive: true,
  });

  const filteredItems = items.filter((it) => it.type === activeTab).sort((a,b) => a.sortOrder - b.sortOrder);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ 
      type: activeTab, 
      title: "", 
      subtitle: "", 
      dateRange: "", 
      link: "", 
      bulletsText: "", 
      isActive: true 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      subtitle: item.subtitle || "",
      dateRange: item.dateRange || "",
      link: item.link || "",
      bulletsText: (item.bullets || []).join("\n"),
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const payload = {
          ...formData,
          bullets: formData.bulletsText.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        };

        if (editingItem) {
          const updated = await updateResumeItem(editingItem.id, payload);
          setItems((prev) => prev.map((it) => (it.id === editingItem.id ? updated : it)));
          toast.success("Resume item updated");
        } else {
          // Sort order validation
          const typeItemsLength = items.filter(it => it.type === formData.type).length;
          payload.sortOrder = typeItemsLength;

          const created = await addResumeItem(payload);
          setItems((prev) => [...prev, created]);
          toast.success("Resume item added");
        }
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.message || "Failed to save item");
      }
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume item forever?")) return;
    startTransition(async () => {
      try {
        await deleteResumeItem(id);
        setItems((prev) => prev.filter((it) => it.id !== id));
        toast.success("Item deleted");
      } catch (error) {
        toast.error(error.message || "Failed to delete");
      }
    });
  };

  const handleToggleActive = async (id, currentStatus) => {
    startTransition(async () => {
      try {
        await toggleResumeItemStatus(id, currentStatus);
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, isActive: !currentStatus } : it))
        );
        toast.success(!currentStatus ? "Item Live" : "Item Hidden");
      } catch (error) {
        toast.error("Failed to update status");
      }
    });
  };

  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= filteredItems.length) return;

    const currentArr = [...filteredItems];
    [currentArr[index], currentArr[newIndex]] = [currentArr[newIndex], currentArr[index]];
    
    // Create mapping of new sort orders just for this type
    const newItems = [...items];
    const idOrderMap = {};
    
    currentArr.forEach((it, idx) => {
      idOrderMap[it.id] = idx;
      const indexInOverall = newItems.findIndex(x => x.id === it.id);
      if (indexInOverall !== -1) {
        newItems[indexInOverall].sortOrder = idx;
      }
    });

    setItems(newItems); // Optimistic UI update

    startTransition(async () => {
      try {
        await updateResumeSortOrders(idOrderMap);
      } catch (error) {
        toast.error("Failed to save reorder");
      }
    });
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    try {
      setIsUploadingPdf(true);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("assetType", "resume_pdf");
      
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error || "Failed to upload file");
      }

      const uploadData = await res.json();
      
      // Save global settings
      await updateResumePdf(uploadData.url);
      setSettings(prev => ({ ...prev, pdfUrl: uploadData.url }));
      toast.success("Resume PDF updated securely!");
      
    } catch (error) {
      toast.error(error.message || "PDF Upload Error");
    } finally {
      setIsUploadingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-full flex-col space-y-3">
      {/* Header Section */}
      <section className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,241,244,0.95))] px-5 py-4 shadow-[0_12px_40px_rgba(17,17,17,0.05)] sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.42em] text-gray-500">
              Personal Portfolio
            </p>
            <h1 className="mt-2 font-whyte text-[clamp(2.1rem,3vw,3rem)] leading-[0.94] text-gray-900">
              Resume Manager
            </h1>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
            <IconPlus size={16} stroke={1.8} />
            Add item
          </button>
        </div>
      </section>

      {/* Tabs & Settings Section */}
      <section className="flex flex-col flex-1 min-h-0 bg-white rounded-2xl shadow-[0_12px_40px_rgba(17,17,17,0.05)] overflow-hidden">
        <div className="flex gap-2 overflow-x-auto border-b border-black/5 px-4 bg-[#F9FAFB] scrollbar-hide shrink-0">
          {SECTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveTab(opt.value)}
              className={`whitespace-nowrap flex-shrink-0 px-5 border-b-2 text-xs font-medium uppercase tracking-widest transition-all ${
                activeTab === opt.value
                  ? "border-yellow-400 text-yellow-600 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]"
                  : "border-transparent text-gray-400 hover:text-gray-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab("SETTINGS")}
            className={`whitespace-nowrap flex-shrink-0 px-5 py-3.5 border-b-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
              activeTab === "SETTINGS"
                ? "border-yellow-400 text-yellow-600 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]"
                : "border-transparent text-gray-400 hover:text-gray-900"
            }`}
          >
            PDF & Settings
          </button>
        </div>

        <div className="p-1 flex-1 overflow-hidden flex flex-col">
          {activeTab === "SETTINGS" ? (
            <div className="bg-white p-6 rounded-lg border border-gray-200 w-full max-w-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Resume PDF Management</h2>
              <p className="text-sm text-gray-500 mb-6">
                Upload the official resume PDF down to the cloud. Visitors pressing "Preview & Download" will receive this file directly.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                    <IconFileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {settings?.pdfUrl ? "resume_official.pdf" : "No PDF uploaded yet"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {settings?.pdfUrl ? <a href={settings.pdfUrl} target="_blank" className="text-blue-500 hover:underline">View File</a> : "Upload to get started"}
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handlePdfUpload}
                      disabled={isUploadingPdf}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingPdf}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                    >
                      {isUploadingPdf ? "Uploading..." : <><IconUpload size={14}/> Upload New PDF</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col overflow-hidden rounded-lg  h-full">
              <div className="flex items-center justify-between p-4 border-b border-black/5 bg-white">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{activeTab} Entries</h3>
                <p className="text-[10px] text-gray-400 font-medium">{filteredItems.length} records found</p>
              </div>
              {filteredItems.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center p-12">
                  <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
                    <IconFileText size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-900">No content here yet</p>
                  <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Click the "Add Item" button above to populate your {activeTab.toLowerCase()} section.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-auto">
                  <table className="w-full text-left text-xs relative border-collapse">
                    <thead className="sticky top-0 z-10 bg-gray-100 text-[10px] uppercase tracking-wider text-gray-600 shadow-sm border-b border-gray-200">
                      <tr>
                        <th className="px-5 py-3 font-semibold">Title & Subtitle</th>
                        <th className="px-5 py-3 font-semibold w-[150px]">Meta (Date/Link)</th>
                        <th className="px-5 py-3 font-semibold w-[100px]">Status</th>
                        <th className="px-5 py-3 font-semibold w-[80px]">Order</th>
                        <th className="px-5 py-3 text-right font-semibold w-[120px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredItems.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-[#FAFAFA] transition-colors">
                          <td className="px-5 py-3">
                            <p className="font-bold text-gray-900 text-sm truncate max-w-sm">{item.title}</p>
                            {item.subtitle && <p className="text-gray-500 mt-0.5 truncate max-w-sm">{item.subtitle}</p>}
                          </td>
                          <td className="px-5 py-3 text-gray-500 truncate max-w-[150px]">
                            {item.dateRange && <p>{item.dateRange}</p>}
                            {item.link && <a href={item.link} className="flex gap-1 text-yellow-600 hover:underline"><IconLink size={12}/> Link</a>}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              <span className={`h-1 w-1 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                              {item.isActive ? "Live" : "Hidden"}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100">
                              <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 text-gray-400 hover:text-black disabled:opacity-20">
                                <IconArrowUp size={15} stroke={2.5} />
                              </button>
                              <button onClick={() => moveItem(index, 1)} disabled={index === filteredItems.length - 1} className="p-1 text-gray-400 hover:text-black disabled:opacity-20">
                                <IconArrowDown size={15} stroke={2.5} />
                              </button>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:bg-yellow-100 hover:text-yellow-700 rounded-full transition-colors">
                                <IconPencil size={16} />
                              </button>
                              <button onClick={() => handleToggleActive(item.id, item.isActive)} className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-800 rounded-full transition-colors">
                                {item.isActive ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors">
                                <IconTrash size={16} />
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
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-hidden animate-in fade-in duration-200">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-yellow-400">
              <h3 className="font-bold text-yellow-950 uppercase tracking-widest">{editingItem ? "Edit Item" : `Add ${activeTab}`}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-yellow-900/50 hover:text-yellow-950">
                <IconX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder="e.g. Frontend Engineer, B.Tech CSE"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                    placeholder="e.g. Company Name, College Name, Tech Stack"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Date / Timeline</label>
                  <input
                    type="text"
                    value={formData.dateRange}
                    onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                    placeholder="e.g. Oct 2023 - Present, 2023"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Link (Optional)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Content / Bullet Points</label>
                <p className="text-[10px] text-gray-400 mb-2">Write each point on a new line. Empty lines are ignored.</p>
                <textarea
                  value={formData.bulletsText}
                  onChange={(e) => setFormData({ ...formData, bulletsText: e.target.value })}
                  className="w-full h-32 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white resize-none"
                  placeholder="Led development of...\nImproved performance by 40%..."
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded accent-yellow-500"
                  />
                  <label className="text-xs font-semibold text-gray-700">Mark as Live</label>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-xs font-semibold text-gray-500 hover:text-gray-900">Cancel</button>
                  <button type="submit" disabled={isPending} className="bg-yellow-400 text-yellow-950 px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-yellow-500 disabled:opacity-50 transition-colors">
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
