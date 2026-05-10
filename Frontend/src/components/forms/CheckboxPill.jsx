function CheckboxPill({ checked, label, onToggle }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-[14px] text-[#e2e2e8]">
      <button
        type="button"
        onClick={onToggle}
        className={`flex h-5 w-5 items-center justify-center rounded-[5px] border transition-all duration-200 ${
          checked
            ? 'border-transparent bg-[#B8C2FF] text-[#131318]'
            : 'border-[#2C2D3C] bg-[#1D1E29] text-transparent group-hover:border-[#B8C2FF]'
        }`}
      >
        ✓
      </button>

      <span>{label}</span>
    </label>
  )
}

export default CheckboxPill