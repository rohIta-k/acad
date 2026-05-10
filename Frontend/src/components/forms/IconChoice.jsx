function IconChoice({ active, children, onClick, icon: Icon, compact = false }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center whitespace-nowrap justify-center rounded-[12px] font-medium tracking-[-0.02em] transition-all duration-200 ${
        compact
          ? 'h-[40px] gap-1.5 px-[1px] py-[1px] text-[12px]'
          : 'h-[54px] gap-3 px-[1px] py-[1px] text-[17px]'
      } ${
        active
          ? 'bg-[#B8C2FF] '
          : 'border border-[#2C2D3C] bg-[#1D1E29]/75 hover:border-[#c7b9eb] hover:bg-[#1D1E29]'
      }`}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-[11px] ${
          compact ? 'gap-1.5 px-2.5' : 'gap-3 px-4'
        } ${
          active
            ? 'bg-[#B8C2FF] text-[#131318]'
            : 'bg-transparent text-[#e2e2e8]'
        }`}
      >
        <Icon
          className={`${
            compact ? 'h-3.5 w-3.5' : 'h-5 w-5'
          } ${active ? 'text-[#131318]' : 'text-[#a1a1aa]'}`}
        />

        {children}
      </div>
    </button>
  )
}

export default IconChoice