function FormPanel({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(17,18,25,0.76)] px-5 py-4 shadow-[0_14px_32px_rgba(0,0,0,0.20),0_0_0_1px_rgba(184,194,255,0.04)] backdrop-blur-xl sm:px-6">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_24%,rgba(255,255,255,0.015))]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[23px] border border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_12px_rgba(184,194,255,0.04)]" />
      <div className="relative z-10 mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/6 text-[#B8C2FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_14px_rgba(184,194,255,0.06)] backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="outfit-font text-[20px] font-semibold tracking-[-0.015em] text-[#e2e2e8]">
            {title}
          </h2>

          <p className="mt-1 outfit-font text-[15px] tracking-[-0.01em] text-[#a1a1aa]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  )
}

export default FormPanel