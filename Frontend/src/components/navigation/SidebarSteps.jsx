function SidebarSteps({ steps, activeStep, onStepChange }) {
  return (
    <nav className="mt-16 space-y-3">
      {steps.map((item) => {
        const active = activeStep === item.id
        return (
          <button
            key={item.id}
            onClick={() => {
              onStepChange(item.id)

              const section = document.getElementById(`step-${item.id}`)

              if (section) {
                section.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            }}
            className={`group flex w-full items-center gap-5 rounded-[18px] px-3 py-3 text-left transition-all duration-150 ${active
              ? ' bg-[#111219] border border-[#2C2D3C] '
              : ' hover:bg-[#111219]'
              }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-[18px] font-semibold transition ${active
                ? 'border-[#7e4ff3] bg-[#B8C2FF]-[#131318] '
                : 'border-[#2C2D3C] bg-[#1D1E29] text-[#443d58] group-hover:border-[#c8bbec]'
                }`}
            >
              {item.id}
            </span>
            <span
              className={`text-[17px] font-semibold tracking-[-F0.03em] transition-all duration-150 ${active
                ? 'text-[#5d34eb]'
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
