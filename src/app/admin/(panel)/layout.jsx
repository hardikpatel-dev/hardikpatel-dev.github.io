import { redirect } from "next/navigation";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import AdminShell from "@/app/admin/_components/AdminShell";

export default async function AdminPanelLayout({ children }) {
  const session = await requireAdminSession();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
