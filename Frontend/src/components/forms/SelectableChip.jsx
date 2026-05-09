function SelectableChip({ active, children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[10px] border px-6 py-3 text-[15px] font-medium tracking-[-0.02em] transition ${
        active
          ? 'border-[#7e4ff3] bg-[linear-gradient(180deg,#8457ff_0%,#7343f2_100%)] text-white shadow-[0_12px_24px_rgba(126,79,243,0.22)]'
          : 'border-[#ddd6ea] bg-white text-[#58526d] hover:border-[#c7b9eb] hover:bg-[#faf8ff]'
      } ${disabled ? 'cursor-default opacity-90 hover:border-inherit hover:bg-inherit' : ''}`}
    >
      {children}
    </button>
  )
}

export default SelectableChip
