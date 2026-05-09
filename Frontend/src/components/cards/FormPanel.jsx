function FormPanel({ icon: Icon, title, subtitle, children }) {
  return (
   <section className="rounded-[24px] border border-[#e8e1f2] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(253,252,255,0.96)_100%)] px-5 py-4 shadow-[0_18px_40px_rgba(90,69,148,0.08)] sm:px-6">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f6efff_0%,#ece5ff_100%)] text-[#7a54f3] shadow-[0_10px_24px_rgba(138,106,242,0.12)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#191632]">
            {title}
          </h2>
          <p className="text-[14px] text-[#8f88a5]">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export default FormPanel
