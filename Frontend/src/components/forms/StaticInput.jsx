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
        className={`flex h-[56px] w-full rounded-[12px] border bg-white px-4 text-[18px] tracking-[-0.02em] text-[#28243f] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          hasError
            ? 'border-[#ef8aaa] focus:border-[#ef5d8d] focus:ring-4 focus:ring-[#ef5d8d]/10'
            : 'border-[#ddd6ea] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10'
        }`}
      />
    )
  }

  return (
    <div className="flex min-h-[56px] items-center rounded-[12px] border border-[#e4def1] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,245,255,0.96)_100%)] px-4 text-[18px] tracking-[-0.02em] text-[#28243f] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      {value || placeholder}
    </div>
  )
}

export default StaticInput
