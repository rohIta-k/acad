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
          ? 'bg-[linear-gradient(135deg,#5f36e9_0%,#e26db8_100%)] shadow-[0_8px_18px_rgba(125,85,255,0.10)]'
          : 'border border-[#ddd6ea] bg-white/75 hover:border-[#c7b9eb] hover:bg-white'
      }`}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-[11px] ${
          compact ? 'gap-1.5 px-2.5' : 'gap-3 px-4'
        } ${
          active
            ? 'bg-white text-[#252042]'
            : 'bg-transparent text-[#45405f]'
        }`}
      >
        <Icon
          className={`${
            compact ? 'h-3.5 w-3.5' : 'h-5 w-5'
          } ${active ? 'text-[#7a54f3]' : 'text-[#59536f]'}`}
        />

        {children}
      </div>
    </button>
  )
}

export default IconChoice