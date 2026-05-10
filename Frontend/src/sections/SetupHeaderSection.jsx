import { Sparkles } from 'lucide-react'
import Pill from '../components/shared/Pill'

function SetupHeaderSection() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#2C2D3C] bg-[#1D1E29] ">
          <Sparkles className="h-5 w-5 text-[#7b52f3]" />
        </div>
        <div>
          <h1 className="text-[#e2e2e8] text-[clamp(2.1rem,7vw,3.25rem)] font-semibold tracking-[-0.055em]">
            Let&apos;s build your brand DNA
          </h1>
          <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] tracking-[-0.02em] text-[#a1a1aa] sm:text-[18px]">
            Tell us about your brand. We&apos;ll use this DNA to create content
            that&apos;s always on-brand.
          </p>
        </div>
      </div>
      <Pill icon={Sparkles}>AI-Powered Brand Media</Pill>
    </div>
  )
}

export default SetupHeaderSection
