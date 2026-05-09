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
        <BrandForgeLogo />
        <div className="hidden h-5 w-px bg-[#e3ddef] md:block" />
        <button
          onClick={onBackToSetup}
          className="inline-flex items-center gap-2 text-[22px] text-[#4f4971] transition hover:text-[#7b52f3] sm:text-[26px]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
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
