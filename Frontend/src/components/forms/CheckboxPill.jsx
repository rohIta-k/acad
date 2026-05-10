function CheckboxPill({ checked, label, onToggle }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-[14px] text-[#312d49]">
      <button
        type="button"
        onClick={onToggle}
        className={`flex h-5 w-5 items-center justify-center rounded-[5px] border transition-all duration-200 ${
          checked
            ? 'border-transparent bg-[linear-gradient(135deg,#5f36e9_0%,#e26db8_100%)] text-white shadow-[0_6px_14px_rgba(125,85,255,0.12)]'
            : 'border-[#d5cfea] bg-white text-transparent group-hover:border-[#b59eff]'
        }`}
      >
        ✓
      </button>

      <span>{label}</span>
    </label>
  )
}

export default CheckboxPill