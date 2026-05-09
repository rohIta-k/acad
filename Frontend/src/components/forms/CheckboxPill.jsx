function CheckboxPill({ checked, label, onToggle }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-[16px] text-[#312d49]">
      <button
        type="button"
        onClick={onToggle}
        className={`flex h-5 w-5 items-center justify-center rounded-[5px] border transition ${
          checked
            ? 'border-[#7e4ff3] bg-[#7e4ff3] text-white shadow-[0_8px_16px_rgba(126,79,243,0.24)]'
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
