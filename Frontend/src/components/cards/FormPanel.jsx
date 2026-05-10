function FormPanel({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="relative overflow-visible rounded-[24px] border border-[#ebe7f2] bg-white/92 px-5 py-4 shadow-[0_12px_32px_rgba(15,23,42,0.045)] backdrop-blur-sm sm:px-6">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#ece7f5] bg-[#fcfbff] text-[#7a54f3] shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#191632]">
            {title}
          </h2>

          <p className="mt-1 text-[14px] text-[#8b849e]">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

export default FormPanel