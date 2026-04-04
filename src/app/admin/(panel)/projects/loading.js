import { TableSkeleton } from "@/app/admin/_components/AdminSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200/60 dark:bg-white/5" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-gray-200/60 dark:bg-white/5" />
        </div>
      </div>
      <TableSkeleton rows={6} />
    </div>
  );
}
