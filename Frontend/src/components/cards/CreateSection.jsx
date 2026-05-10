function CreateSection({ icon: Icon, title, subtitle, extra, children }) {
  return (
    <section className="mb-7">
      <div className="mb-3 flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#2d2d38] text-[#7a54f3] ">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#e2e2e8]">
            {title}
            {extra ? (
              <span className="font-normal text-[#a1a1aa]"> {extra}</span>
            ) : null}
          </h2>
          <p className="text-[14px] text-[#a1a1aa]">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export default CreateSection
