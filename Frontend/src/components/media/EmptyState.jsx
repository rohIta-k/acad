import { Clapperboard, LoaderCircle } from 'lucide-react'

function EmptyState({ brandData, isGenerating, hasGenerated }) {
  const title = isGenerating
    ? 'Generating your creative'
    : hasGenerated
      ? `Ready for ${brandData.brandName || 'your brand'}`
      : 'Your ad will appear here'

  const description = isGenerating
    ? 'We are staging your on-brand concept locally and preparing the preview workspace.'
    : hasGenerated
      ? `Brand DNA loaded with ${brandData.tone || 'your'} tone, ${brandData.audience.length || 0} audience segment${brandData.audience.length === 1 ? '' : 's'}, and your saved assets.`
      : 'Fill in your intent and hit Generate to see your on-brand content.'

  return (
    <div className="mt-5 flex min-h-[420px] items-center justify-center rounded-[22px] border border-dashed border-[#d8d1eb] bg-[radial-gradient(circle_at_50%_42%,rgba(139,103,255,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.2)_100%)] px-4 py-10 sm:min-h-[520px] sm:px-6 lg:min-h-[640px] xl:min-h-[758px]">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(140,92,255,0.12)_0%,rgba(244,90,143,0.12)_100%)]">
          {isGenerating ? (
            <LoaderCircle className="h-10 w-10 animate-spin text-[#8b63ff]" />
          ) : (
            <Clapperboard className="h-10 w-10 text-[#b29ce4]" />
          )}
        </div>
        <h2 className="mt-6 text-[clamp(1.9rem,5vw,2.625rem)] font-medium tracking-[-0.05em] text-[#77718b] sm:mt-8">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-[440px] text-[16px] leading-7 tracking-[-0.02em] text-[#827b98] sm:text-[18px] sm:leading-8">
          {description}
        </p>
      </div>
    </div>
  )
}

export default EmptyState
