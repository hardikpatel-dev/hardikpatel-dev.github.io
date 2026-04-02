export default function AdminTopbar({ title, meta }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,241,244,0.95))] px-5 py-4 sm:px-6 sm:py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.42em] text-text-muted">
            Website Admin
          </p>
          <h1 className="mt-2 font-whyte text-[clamp(2.1rem,3vw,3rem)] leading-[0.94] text-text-heading">
            {title}
          </h1>
        </div>
        {meta ? (
          <div className="rounded-full bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-text-muted">
            {meta}
          </div>
        ) : null}
      </div>
    </div>
  );
}
