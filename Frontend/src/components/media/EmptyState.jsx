import { Clapperboard } from 'lucide-react'

function EmptyState({ brandData, isGenerating, hasGenerated }) {
  const title = isGenerating
    ? 'Crafting your render'
    : hasGenerated
      ? `Ready for ${brandData.brandName || 'your brand'}`
      : 'Your content will appear here'

  const description = isGenerating
    ? 'Generating cinematic visuals, refining composition, and aligning every frame with your brand identity.'
    : hasGenerated
      ? `Brand DNA loaded with ${brandData.tone || 'your'} tone, ${brandData.audience.length || 0} audience segment${brandData.audience.length === 1 ? '' : 's'}, and your saved assets.`
      : 'Fill in your intent and hit Generate to see your on-brand content.'

  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-[22px] bg-[radial-gradient(circle_at_50%_42%,rgba(139,103,255,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.22)_100%)] px-4 py-8 sm:min-h-[380px] sm:px-6 lg:min-h-[460px] xl:min-h-[540px]">
      <div className="text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          {isGenerating ? (
            <>
              <div className="absolute inset-0 rounded-full border border-[#ece7f5]" />

              <div className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-full border-t-[2px] border-t-[#7b52f3] border-r-[2px] border-r-[#e26db8] border-l-transparent border-b-transparent" />

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffffff_0%,#f7f3ff_100%)] shadow-[0_12px_30px_rgba(125,85,255,0.10)]">
                <Clapperboard className="h-6 w-6 text-[#7b52f3]" />
              </div>
            </>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(140,92,255,0.10)_0%,rgba(244,90,143,0.10)_100%)]">
              <Clapperboard className="h-10 w-10 text-[#b29ce4]" />
            </div>
          )}
        </div>

        <h2
          className={`mt-4 text-[clamp(1.9rem,5vw,2.625rem)] font-medium tracking-[-0.05em] sm:mt-8 ${
            isGenerating
              ? 'bg-[linear-gradient(90deg,#5f36e9_0%,#e26db8_100%)] bg-clip-text text-transparent'
              : 'text-[#77718b]'
          }`}
        >
          {title}
        </h2>

        <p className="mx-auto mt-2 max-w-[440px] text-[16px] leading-7 tracking-[-0.02em] text-[#827b98] sm:text-[18px] sm:leading-8">
          {description}
        </p>
      </div>
    </div>
  )
}

export default EmptyState