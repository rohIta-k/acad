import { ArrowLeft, FolderOpen, Sparkles } from 'lucide-react'
import BrandForgeLogo from '../shared/BrandForgeLogo'
import Pill from '../shared/Pill'

function CreateHeader({
  onBackToBrands,
  onOpenMyStuff,
}) {
  return (
    <header className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        <button
          onClick={onBackToBrands}
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7340f6_0%,#e57ac5_100%)] text-white shadow-[0_12px_30px_rgba(125,85,255,0.22)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_16px_38px_rgba(125,85,255,0.30)] active:scale-[0.98]"
        >
          <ArrowLeft className="h-6 w-6 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
        </button>


        <div className="hidden h-5 w-px bg-[#e3ddef] md:block" />

        <BrandForgeLogo />
      </div>

      <div className="flex items-center gap-3 self-start sm:self-end lg:self-auto">
        <button
          onClick={onOpenMyStuff}
          className="inline-flex items-center gap-2 rounded-[12px] border border-[#ded4f7] bg-white/90 px-4 py-2.5 text-[14px] font-medium text-[#5a4f80] shadow-[0_10px_24px_rgba(89,68,148,0.10)] transition hover:border-[#cfc0f1]"
        >
          <FolderOpen className="h-4 w-4" />
          My Stuff
        </button>
        <Pill icon={Sparkles} className="max-w-full px-4 text-[13px] sm:px-5 sm:text-[15px]">
          AI-Powered Brand Media
        </Pill>
      </div>
    </header>
  )
}

export default CreateHeader
