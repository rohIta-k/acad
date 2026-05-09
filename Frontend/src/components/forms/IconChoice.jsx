function IconChoice({ active, children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-[54px] items-center justify-center gap-3 rounded-[12px] border px-4 text-[17px] font-medium tracking-[-0.02em] transition ${
        active
          ? 'border-[#8b63ff] bg-white text-[#252042] shadow-[0_12px_22px_rgba(138,106,242,0.12)]'
          : 'border-[#ddd6ea] bg-white/75 text-[#45405f] hover:border-[#c7b9eb] hover:bg-white'
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? 'text-[#7a54f3]' : 'text-[#59536f]'}`} />
      {children}
    </button>
  )
}

export default IconChoice
