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
      <div className="mb-3 text-[15px] font-medium tracking-[-0.02em] text-[#211d38]">
        {label}
        {required ? <span className="text-[#f2708f]"> *</span> : null}
        {!required && hint ? (
          <span className="font-normal text-[#9d96b3]"> ({hint})</span>
        ) : null}
      </div>
      {children}
      {errorText ? (
        <p className="mt-3 text-[14px] leading-6 text-[#da5f86]">{errorText}</p>
      ) : null}
      {hint && required ? (
        <p className="mt-3 text-[14px] leading-6 text-[#9590a9]">{hint}</p>
      ) : null}
      {hintText ? (
        <p className="mt-3 text-[14px] leading-6 text-[#9590a9]">{hintText}</p>
      ) : null}
    </div>
  )
}

export default FieldBlock
