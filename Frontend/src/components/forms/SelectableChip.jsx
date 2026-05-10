function SelectableChip({ active, children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[12px] border px-5 py-2.5 text-[14px] font-medium tracking-[-0.02em] transition-all duration-200 ${
        active
          ? 'border-transparent bg-[#B8C2FF] text-[#131318]'
          : 'border-[#2C2D3C] bg-[#1D1E29] text-[#e2e2e8] hover:border-[#B8C2FF] hover:bg-[#111219]'
      } ${disabled ? 'cursor-default opacity-90' : ''}`}
    >
      {children}
    </button>
  )
}

export default SelectableChip