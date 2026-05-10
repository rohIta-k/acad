import { Clapperboard } from 'lucide-react'

function BrandForgeLogo() {
  return (
    <div className="flex items-center gap-2 leading-none text-[#B8C2FF]">
      <Clapperboard className="h-8 w-8 shrink-0 select-none" strokeWidth={2} />
      <div className="text-[28px] tracking-[0.02em] text-white flex items-center font-bold font-['Outfit']">
        ACAD
      </div>
    </div>
  )
}

export default BrandForgeLogo