"use client";

export function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#e4e5eb] dark:bg-white/5 ${className}`}
    />
  );
}

export function StatsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-8 w-56 sm:w-80" />
        </div>
        <Skeleton className="hidden h-5 w-24 rounded-full sm:block" />
      </div>

      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <article
            key={i}
            className="relative min-w-[140px] flex-1 overflow-hidden rounded-2xl px-3 py-3 bg-[#f6f7fa] dark:bg-white/5"
          >
            <Skeleton className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-60" />
            <Skeleton className="h-2 w-16" />
            <Skeleton className="mt-3 h-8 w-12" />
          </article>
        ))}
      </div>
    </div>
  );
}

export function LatestActivitySkeleton() {
  return (
    <div className="flex-1 overflow-hidden rounded-[1.25rem] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:rounded-[1.5rem]">
      <div className="flex h-full flex-col lg:flex-row items-center">
        <div className="flex flex-[1.4] flex-col p-6 sm:p-10 justify-center w-full">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="mt-6 h-8 w-3/4 sm:w-64" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <div className="w-full p-2 lg:p-2 lg:pl-0 lg:flex-1 lg:max-w-[600px]">
          <Skeleton className="aspect-[16/10] w-full rounded-[0.85rem]" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>
      <div className="space-y-4">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
             <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3 sm:w-1/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
             <Skeleton className="hidden sm:block h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function GalleryTableSkeleton() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300 pt-2">
      <header className="mb-4 flex items-center justify-between xl:mb-6 px-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-20 bg-[#d8d9e0]" />
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <Skeleton className="h-3 w-40 bg-[#d8d9e0]" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md bg-[#d8d9e0]" />
      </header>

      <div className="flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white" style={{ height: 'calc(100vh - 190px)' }}>
        <div className="bg-gray-800 p-3 shadow-sm">
           <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-3 w-16 bg-white/20" />
              <Skeleton className="h-3 w-24 bg-white/20" />
              <Skeleton className="h-3 w-16 bg-white/20" />
              <Skeleton className="h-3 w-16 bg-white/20" />
              <Skeleton className="h-3 w-12 bg-white/20 ml-auto" />
           </div>
        </div>
        <div className="flex-1 space-y-px bg-gray-50/30">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-5 bg-white px-5 py-3 border-b border-gray-100 last:border-0">
               <Skeleton className="h-10 w-16 rounded bg-gray-100" />
               <Skeleton className="h-3 w-32" />
               <Skeleton className="h-5 w-16 rounded-full" />
               <Skeleton className="h-5 w-12" />
               <div className="ml-auto flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminPageSkeleton() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Topbar equivalent */}
      <header className="mb-4 flex items-center justify-between xl:mb-8 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-2 w-28 bg-[#d8d9e0]" />
          <Skeleton className="h-8 w-40 bg-[#d8d9e0]" />
        </div>
        <Skeleton className="hidden sm:block h-3 w-24 bg-[#d8d9e0]" />
      </header>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.18fr)_360px]">
        <div className="flex flex-col gap-3">
          <section className="rounded-2xl bg-white/88 p-4 shadow-[0_12px_40px_rgba(17,17,17,0.05)]">
            <StatsSkeleton />
          </section>
          
          <LatestActivitySkeleton />
        </div>

        {/* Recent Activity Sidebar */}
        <section className="rounded-2xl bg-[#111111] p-4 shadow-[0_14px_34px_rgba(17,17,17,0.12)] min-h-[400px]">
           <div className="flex items-center justify-between gap-3 mb-5">
             <div className="space-y-2">
               <Skeleton className="h-2 w-24 bg-white/20 dark:bg-white/10" />
               <Skeleton className="h-6 w-32 bg-white/20 dark:bg-white/10" />
             </div>
             <Skeleton className="h-6 w-16 rounded-full bg-white/20 dark:bg-white/10" />
           </div>

           <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                 <div key={i} className={`rounded-2xl px-3 py-3 ${i === 0 ? "bg-white" : "bg-white/6"}`}>
                    <div className="flex items-start justify-between gap-3">
                       <div className="space-y-2 flex-1">
                          <Skeleton className={`h-4 w-3/4 ${i === 0 ? "bg-black/10" : "bg-white/20"}`} />
                          <Skeleton className={`h-3 w-1/2 ${i === 0 ? "bg-black/10" : "bg-white/20"}`} />
                       </div>
                       <Skeleton className={`h-5 w-16 rounded-full ${i === 0 ? "bg-black/10" : "bg-white/30"}`} />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                       <Skeleton className={`h-3 w-16 ${i === 0 ? "bg-black/10" : "bg-white/30"}`} />
                       <Skeleton className={`h-3 w-12 ${i === 0 ? "bg-black/10" : "bg-white/30"}`} />
                    </div>
                 </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}
