import { Menu, X } from 'lucide-react'
import BrandForgeLogo from '../shared/BrandForgeLogo'
import SidebarSteps from './SidebarSteps'

function SetupSidebar({ steps, activeStep, onStepChange, open, onOpen, onClose }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between rounded-[18px] border border-[#ebe5f5] bg-white/80 px-4 py-3 shadow-[0_12px_30px_rgba(89,68,148,0.08)] backdrop-blur lg:hidden">
        <BrandForgeLogo />
        <button
          onClick={onOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5def2] bg-[#faf8ff] text-[#5d5780] transition hover:bg-white hover:text-[#7a54f3]"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <aside className="hidden border-r border-[#f0ebf7] py-5 px-6 lg:block">
        <div className="-mt-2 ml-[-30px] flex items-center gap-3">
          <BrandForgeLogo />
        </div>
        <div className="mt-10 ml-1">
          <SidebarSteps
            steps={steps}
            activeStep={activeStep}
            onStepChange={onStepChange}
          />
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-[#1c1830]/30 backdrop-blur-sm transition lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[min(84vw,320px)] border-r border-[#e6e0f2] bg-white/95 backdrop-blur-xl px-5 py-5 shadow-[0_24px_60px_rgba(48,31,96,0.16)] transition duration-300 lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between gap-4">
          <BrandForgeLogo />
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f1ff] text-[#655f80] transition hover:bg-[#ede7ff] hover:text-[#463f60]"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <SidebarSteps
          steps={steps}
          activeStep={activeStep}
          onStepChange={(value) => {
            onStepChange(value)
            onClose()
          }}
        />
      </aside>
    </>
  )
}

export default SetupSidebar
