import { getAllTechStackItems } from "@/app/admin/_server/tech-stack";
import TechStackAdminClient from "@/app/admin/_components/TechStackAdminClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tech Stack Management | Admin",
};

export default async function TechStackPage() {
  const items = await getAllTechStackItems();

  return <TechStackAdminClient initialItems={items} />;
}
