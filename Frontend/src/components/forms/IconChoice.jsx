function IconChoice({ active, children, onClick, icon: Icon, compact = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center whitespace-nowrap justify-center rounded-[10px] border font-medium tracking-[-0.02em] transition ${
        compact
          ? 'h-[40px] gap-1.5 px-2.5 text-[12px]'
          : 'h-[54px] gap-3 px-4 text-[17px]'
      } ${
        active
          ? 'border-[#8b63ff] bg-white text-[#252042] shadow-[0_12px_22px_rgba(138,106,242,0.12)]'
          : 'border-[#ddd6ea] bg-white/75 text-[#45405f] hover:border-[#c7b9eb] hover:bg-white'
      }`}
    >
      <Icon
        className={`${
          compact ? 'h-3.5 w-3.5' : 'h-5 w-5'
        } ${active ? 'text-[#7a54f3]' : 'text-[#59536f]'}`}
      />
      {children}
    </button>
  )
}

export default IconChoice