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
        className={`flex h-[56px] w-full rounded-[12px] border bg-[#1D1E29] px-4 text-[18px] tracking-[0.02em] text-[#e2e2e8] shadow-none outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          hasError
            ? 'border-[#ef8aaa] focus:border-[#ef5d8d] focus:ring-4 focus:ring-[#ef5d8d]/10'
            : 'border-[#2C2D3C] focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10'
        }`}
      />
    )
  }

  return (
    <div className="flex min-h-[56px] items-center rounded-[12px] border border-[#2C2D3C] bg-[#111219] px-4 text-[18px] tracking-[0.02em] text-[#e2e2e8] shadow-none">
      {value || placeholder}
    </div>
  )
}

export default StaticInput
