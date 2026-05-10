function FeatureCard({ tint, label, title, meta, icon: Icon }) {
  const styles = {
    violet:
      'border-[#cdb7fb] text-[#7a54f3] ',
    amber:
      'border-[#ecd7a4] text-[#d29b2f] ',
    sky:
      'border-[#b7dcef] text-[#39a7e4] ',
  }

  return (
    <div
      className={`w-full rounded-[20px] border bg-[#1D1E29]/82 px-5 py-5 backdrop-blur-xl md:max-w-[250px] md:px-6 ${styles[tint]}`}
    >
      <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em]">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-3 text-[20px] font-medium tracking-[-0.04em] text-[#26223c]">
        {title}
      </div>
      <div className="mt-2 font-mono text-[13px] tracking-[0.02em] text-[#7d7694]">
        {meta}
      </div>
    </div>
  )
}

export default FeatureCard
