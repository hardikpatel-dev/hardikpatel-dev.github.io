"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  IconPlus,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconArrowUp,
  IconArrowDown,
  IconPencil,
  IconExternalLink,
  IconX,
} from "@tabler/icons-react";
import AdminTopbar from "./AdminTopbar";
import {
  addTechItem,
  updateTechItem,
  deleteTechItem,
  toggleTechStatus,
  updateTechSortOrders,
} from "@/app/admin/_server/tech-stack";

export default function TechStackAdminClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    iconCode: "",
    link: "",
    isActive: true,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: "", iconCode: "", link: "", isActive: true });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      iconCode: item.iconCode,
      link: item.link || "",
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (editingItem) {
          const updated = await updateTechItem(editingItem.id, formData);
          setItems((prev) => prev.map((it) => (it.id === editingItem.id ? updated : it)));
          toast.success("Tech item updated");
        } else {
          // Sort order for new item (append to end)
          const newItemData = { ...formData, sortOrder: items.length + 1 };
          const created = await addTechItem(newItemData);
          setItems((prev) => [...prev, created]);
          toast.success("Tech item added");
        }
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Failed to save tech item");
      }
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tech item?")) return;
    startTransition(async () => {
      try {
        await deleteTechItem(id);
        setItems((prev) => prev.filter((it) => it.id !== id));
        toast.success("Tech item deleted");
      } catch (error) {
        toast.error("Failed to delete item");
      }
    });
  };

  const handleToggleActive = async (id, currentStatus) => {
    startTransition(async () => {
      try {
        await toggleTechStatus(id, currentStatus);
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, isActive: !currentStatus } : it))
        );
        toast.success(!currentStatus ? "Published" : "Hidden");
      } catch (error) {
        toast.error("Failed to update status");
      }
    });
  };

  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    
    // Update local state immediately
    setItems(newItems);

    // Sync with DB
    startTransition(async () => {
      try {
        const idOrderMap = {};
        newItems.forEach((it, idx) => {
          idOrderMap[it.id] = idx + 1;
        });
        await updateTechSortOrders(idOrderMap);
      } catch (error) {
        toast.error("Failed to save reorder");
      }
    });
  };

  return (
    <>
      <AdminTopbar title="Tech Stack" />

      <div className="flex items-center justify-between gap-4 mb-4 mt-2 px-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-black">Technologies</h2>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
            <span className="text-gray-900">{items.length}</span> Items
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex h-8 items-center gap-1.5 rounded-md bg-black px-3 text-xs font-medium text-white transition hover:bg-black/80"
        >
          <IconPlus size={14} />
          Add Technology
        </button>
      </div>

      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white" style={{ height: 'calc(100vh - 190px)' }}>
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-xs text-gray-400">No tech items yet</p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto scroll-smooth">
            <table className="w-full text-left text-xs text-gray-600 relative border-collapse">
              <thead className="sticky top-0 z-20 bg-gray-800 text-[10px] uppercase tracking-wider text-white shadow-sm">
                <tr>
                  <th className="px-5 py-3.5 font-medium w-[80px]">Icon</th>
                  <th className="px-5 py-3.5 font-medium">Name</th>
                  <th className="px-5 py-3.5 font-medium">Link</th>
                  <th className="px-5 py-3.5 font-medium w-[100px]">Status</th>
                  <th className="px-5 py-3.5 font-medium w-[80px]">Order</th>
                  <th className="px-5 py-3.5 font-medium text-right w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-5 py-3">
                      <div 
                        className={`h-10 w-10 flex items-center justify-center rounded bg-gray-100 border border-black/5 p-2 ${!item.isActive && 'opacity-40 grayscale-[50%]'}`}
                        dangerouslySetInnerHTML={{ __html: item.iconCode }}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900">{item.name}</p>
                    </td>
                    <td className="px-5 py-3">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline truncate max-w-[150px]">
                          {item.link} <IconExternalLink size={12} />
                        </a>
                      ) : <span className="text-gray-300">N/A</span>}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase ${item.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        {item.isActive ? "Live" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100">
                        <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 text-gray-400 hover:text-black disabled:opacity-20 cursor-pointer">
                          <IconArrowUp size={15} stroke={2.5} />
                        </button>
                        <button onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="p-1 text-gray-400 hover:text-black disabled:opacity-20 cursor-pointer">
                          <IconArrowDown size={15} stroke={2.5} />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors">
                          <IconPencil size={16} />
                        </button>
                        <button onClick={() => handleToggleActive(item.id, item.isActive)} className="p-2 text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-colors">
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-semibold text-gray-900">{editingItem ? "Edit Technology" : "Add New Technology"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <IconX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none transition-colors"
                    placeholder="React, Next.js, etc."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Link</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">SVG Icon Code</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <textarea
                      required
                      value={formData.iconCode}
                      onChange={(e) => setFormData({ ...formData, iconCode: e.target.value })}
                      className="w-full h-32 rounded-lg border border-gray-200 px-3 py-2 text-[10px] font-mono focus:border-black focus:outline-none transition-colors"
                      placeholder="<svg ...>...</svg>"
                    />
                  </div>
                  <div className="w-32 h-32 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4">
                    <span className="text-[9px] font-bold text-gray-400 uppercase mb-2">Preview</span>
                    <div 
                      className="w-12 h-12 flex items-center justify-center text-black"
                      dangerouslySetInnerHTML={{ __html: formData.iconCode }}
                    />
                    {!formData.iconCode && <span className="text-[10px] text-gray-300">No SVG</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded accent-black"
                  />
                  <label htmlFor="isActive" className="text-xs text-gray-600 font-medium">Visible on Site</label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-black/80 transition-colors disabled:opacity-50"
                  >
                    {isPending ? "Saving..." : "Save Technology"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
