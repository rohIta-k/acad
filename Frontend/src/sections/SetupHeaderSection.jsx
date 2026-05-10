import { Sparkles } from 'lucide-react'
import Pill from '../components/shared/Pill'

function SetupHeaderSection() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#ece7f5] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <Sparkles className="h-5 w-5 text-[#7b52f3]" />
        </div>
        <div>
          <h1 className="bg-[linear-gradient(90deg,#5f36e9_0%,#e26db8_100%)] bg-clip-text text-[clamp(2.1rem,7vw,3.25rem)] font-semibold tracking-[-0.055em] text-transparent">
            Let&apos;s build your brand DNA
          </h1>
          <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] tracking-[-0.02em] text-[#7a7390] sm:text-[18px]">
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
