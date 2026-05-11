function FieldBlock({
  label,
  required = false,
  hint,
  hintText,
  errorText = '',
  children,
}) {
  return (
    <div>
      <div className="mb-3 outfit-font text-[17px] font-semibold tracking-[-0.015em] text-[#e2e2e8]">
        {label}
        {required ? <span className="text-[#f2708f]"> *</span> : null}
        {!required && hint ? (
          <span className="font-normal text-[#a1a1aa] lowercase"> ({hint})</span>
        ) : null}
      </div>
      {children}
      {errorText ? (
        <p className="mt-3 text-[14px] leading-6 text-[#da5f86]">{errorText}</p>
      ) : null}
      {hint && required ? (
        <p className="mt-3 text-[14px] leading-6 text-[#a1a1aa]">{hint}</p>
      ) : null}
      {hintText ? (
        <p className="mt-3 text-[14px] leading-6 text-[#a1a1aa]">{hintText}</p>
      ) : null}
    </div>
  )
}

export default FieldBlock
