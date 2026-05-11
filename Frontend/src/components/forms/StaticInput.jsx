function StaticInput({
  value,
  isEditing = false,
  onChange,
  placeholder = '',
  disabled = false,
  hasError = false,
}) {
  if (isEditing) {
    return (
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        className={`flex h-[56px] w-full rounded-[12px] border border-white/12 bg-[rgba(29,30,41,0.78)] px-4 text-[18px] tracking-[0.02em] text-[#e2e2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.03)] outline-none transition backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-70 ${
          hasError
            ? 'focus:border-[#ef5d8d] focus:ring-4 focus:ring-[#ef5d8d]/10'
            : 'focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10'
        }`}
      />
    )
  }

  return (
    <div className="flex min-h-[56px] items-center rounded-[12px] border border-white/12 bg-[rgba(17,18,25,0.78)] px-4 text-[18px] tracking-[0.02em] text-[#e2e2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md">
      {value || placeholder}
    </div>
  )
}

export default StaticInput
