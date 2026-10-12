export const SectionHeading = ({ children }) => (
  <div className="mb-5 sm:mb-6">
    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{children}</h2>
    <div className="mt-2.5 h-1 w-12 rounded-full bg-orange-500" />
  </div>
);

export const InfoCard = ({ label, value, children }) => (
  <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#151515] p-4 transition-colors duration-300 hover:border-orange-500/40 sm:p-5">
    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-zinc-500 sm:text-[11px]">
      {label}
    </p>
    {children || (
      <h3 className="mt-3 break-words text-base font-bold text-white sm:text-lg">
        {value || "Not Available"}
      </h3>
    )}
  </div>
);
