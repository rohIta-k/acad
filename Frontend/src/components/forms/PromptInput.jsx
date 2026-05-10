function PromptInput({ value, count, onChange, placeholder = '' }) {
  return (
    <div className="rounded-[14px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-4 ">
      <textarea
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="min-h-[94px] w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-7 tracking-[-0.02em] text-[#e2e2e8] placeholder-[#766f8d] outline-none sm:text-[17px]"
      />
      <div className="text-right text-[14px] text-[#8e87a5]">{count}</div>
    </div>
  )
}

export default PromptInput
