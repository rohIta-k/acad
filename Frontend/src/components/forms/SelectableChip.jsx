function SelectableChip({ active, children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[12px] border px-5 py-2.5 text-[14px] font-medium tracking-[-0.02em] transition-all duration-200 ${
        active
          ? 'border-transparent bg-[linear-gradient(135deg,#7340f6_0%,#e57ac5_100%)] text-white shadow-[0_10px_24px_rgba(125,85,255,0.16)]'
          : 'border-[#ebe7f2] bg-[#fcfbfe] text-[#645d78] hover:border-[#d9cffa] hover:bg-white'
      } ${disabled ? 'cursor-default opacity-90' : ''}`}
    >
      {children}
    </button>
  )
}

export default SelectableChip