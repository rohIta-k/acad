function FormPanel({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="relative overflow-visible rounded-[24px] border border-[#2C2D3C] bg-[#111219]/50 px-5 py-4  backdrop-blur-sm sm:px-6">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#2C2D3C] bg-[#131318] text-[#B8C2FF] ">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-[18px] font-semibold tracking-[0.02em] text-[#e2e2e8] uppercase font-mono">
            {title}
          </h2>

          <p className="mt-1 text-[14px] text-[#a1a1aa]">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

export default FormPanel