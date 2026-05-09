function CreateSection({ icon: Icon, title, subtitle, extra, children }) {
  return (
    <section className="mb-7">
      <div className="mb-3 flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#f5eeff_0%,#ebe3ff_100%)] text-[#7a54f3] shadow-[0_10px_22px_rgba(138,106,242,0.12)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#191632]">
            {title}
            {extra ? (
              <span className="font-normal text-[#7c7592]"> {extra}</span>
            ) : null}
          </h2>
          <p className="text-[14px] text-[#8f88a5]">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export default CreateSection
