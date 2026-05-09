function SidebarSteps({ steps, activeStep, onStepChange }) {
  return (
    <nav className="mt-16 space-y-7">
      {steps.map((item) => {
        const active = activeStep === item.id
        return (
          <button
            key={item.id}
            onClick={() => onStepChange(item.id)}
            className={`group flex w-full items-center gap-5 rounded-[18px] px-3 py-3 text-left transition-all duration-150 ${active
                ? 'scale-[1.02] bg-white shadow-[0_6px_18px_rgba(126,79,243,0.08)]'
                : 'hover:scale-[1.01] hover:bg-white/70'
              }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-[18px] font-semibold transition ${active
                ? 'border-[#7e4ff3] bg-[linear-gradient(135deg,#7e4ff3_0%,#9f7bff_100%)] text-white shadow-[0_6px_16px_rgba(126,79,243,0.16)]'
                : 'border-[#ddd6ea] bg-white text-[#443d58] group-hover:border-[#c8bbec]'
                }`}
            >
              {item.id}
            </span>
            <span
              className={`text-[19px] font-semibold tracking-[-F0.03em] transition-all duration-150 ${active
                ? 'translate-x-[2px] text-[#5d34eb]'
                : 'text-[#575169] group-hover:translate-x-[1px] group-hover:text-[#433d60]'
                }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default SidebarSteps
