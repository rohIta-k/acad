import { ArrowLeft, FolderOpen } from 'lucide-react'
import BrandForgeLogo from '../shared/BrandForgeLogo'

function CreateHeader({
  onBackToBrands,
  onOpenMyStuff,
}) {
  return (
    <header className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        <button
          onClick={onBackToBrands}
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#B8C2FF] text-[#131318] transition-all duration-200 hover:scale-[1.03] hover:bg-[#C3C8FF] active:scale-[0.98]"
        >
          <ArrowLeft className="h-6 w-6 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
        </button>


        <div className="hidden h-5 w-px bg-[#e3ddef] md:block" />

        <BrandForgeLogo />
      </div>

      <div className="flex items-center gap-3 self-start sm:self-end lg:self-auto lg:-translate-x-6">
        <button
          onClick={onOpenMyStuff}
          className="inline-flex items-center gap-2 rounded-[12px] border border-[#2C2D3C] bg-[#111219] px-4 py-2.5 text-[14px] font-medium text-[#e2e2e8] transition hover:border-[#B8C2FF]"
        >
          <FolderOpen className="h-4 w-4" />
          My Stuff
        </button>
      </div>
    </header>
  )
}

export default CreateHeader
