import { ArrowLeft, Sparkles } from 'lucide-react'
import BrandForgeLogo from '../shared/BrandForgeLogo'
import Pill from '../shared/Pill'
import ProfileMenu from './ProfileMenu'

function CreateHeader({
  navigate,
  menuOpen,
  onMenuToggle,
  menuItems,
  onMenuItemClick,
  onBackToSetup,
}) {
  return (
    <header className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        <button
          onClick={onBackToSetup}
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7340f6_0%,#e57ac5_100%)] text-white shadow-[0_12px_30px_rgba(125,85,255,0.22)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_16px_38px_rgba(125,85,255,0.30)] active:scale-[0.98]"
        >
          <ArrowLeft className="h-6 w-6 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
        </button>


        <div className="hidden h-5 w-px bg-[#e3ddef] md:block" />

        <BrandForgeLogo />
      </div>

      <div className="flex items-center gap-3 self-start sm:self-end lg:self-auto">
        <Pill icon={Sparkles} className="max-w-full px-4 text-[13px] sm:px-5 sm:text-[15px]">
          AI-Powered Brand Media
        </Pill>
      </div>
    </header>
  )
}

export default CreateHeader
