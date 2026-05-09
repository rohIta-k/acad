function Pill({ icon: Icon, children, className = '' }) {
  return (
    <div
      className={`inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-[#e8e1f2] bg-white/75 px-4 py-2 text-[14px] font-medium tracking-[-0.02em] text-[#706985] shadow-[0_10px_30px_rgba(110,87,175,0.08)] backdrop-blur-xl sm:min-h-12 sm:px-5 sm:text-[15px] ${className}`}
    >
      <Icon className="h-4 w-4 text-[#7a54f3]" />
      <span className="truncate">{children}</span>
    </div>
  )
}

export default Pill
