function PromptInput({ value, count, onChange, placeholder = '' }) {
  return (
    <div className="rounded-[14px] border border-[#ddd6ea] bg-white px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <textarea
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="min-h-[94px] w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-7 tracking-[-0.02em] text-[#2b2742] outline-none sm:text-[17px]"
      />
      <div className="text-right text-[14px] text-[#8e87a5]">{count}</div>
    </div>
  )
}

export default PromptInput
