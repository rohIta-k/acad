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
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-[15px] tracking-[-0.03em] sm:gap-4 sm:text-[18px]">
          <button onClick={() => navigate('/create')} className="font-medium text-[#6c48ed]">
            Create
          </button>
          <span className="text-[#beb8cf]">/</span>
          <span className="text-[#15132d]">New Ad</span>
        </div>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-end lg:self-auto">
        <Pill icon={Sparkles} className="max-w-full px-4 text-[13px] sm:px-5 sm:text-[15px]">
          AI-Powered Brand Media
        </Pill>
        <div className="relative">
          <button
            onClick={onMenuToggle}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f1e9ff_0%,#e3d7ff_100%)] text-[22px] font-medium text-[#7a57f4] shadow-[0_10px_24px_rgba(138,106,242,0.18)] transition hover:scale-[1.03] active:scale-[0.98]"
          >
            R
          </button>
          <ProfileMenu open={menuOpen} items={menuItems} onItemClick={onMenuItemClick} />
        </div>
      </div>
    </header>
  )
}

export default CreateHeader
