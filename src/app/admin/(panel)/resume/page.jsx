import ResumeAdminClient from "@/app/admin/_components/ResumeAdminClient";
import { getResumeItems, getResumeSettings } from "@/app/admin/_server/resume";
import { requireAdminSession } from "@/app/admin/_lib/auth";

export const metadata = {
  title: "Resume Admin ~ Portfolio",
};

export default async function AdminResumePage() {
  await requireAdminSession();
  
  const [items, settings] = await Promise.all([
    getResumeItems(),
    getResumeSettings()
  ]);

  return (
    <div className="flex h-full flex-col">
      <ResumeAdminClient initialItems={items} initialSettings={settings} />
    </div>
  );
}
