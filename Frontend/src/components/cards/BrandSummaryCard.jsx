import { Bot, ImagePlus, Palette, Sparkles, UsersRound } from 'lucide-react'

function BrandSummaryCard({ brandData }) {
  const { brandName, tagline, tone, audience, logo, mascot } = brandData

  return (
    <div className="mb-5 rounded-[18px] border border-[#e7e0f3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,249,255,0.98)_100%)] p-4 shadow-[0_16px_36px_rgba(85,63,146,0.08)]">
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 flex-col gap-2">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border border-[#e6dff2] bg-[#f7f3ff]">
            {logo?.dataUrl ? (
              <img
                src={logo.dataUrl}
                alt={logo.fileName || 'Brand logo'}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="h-5 w-5 text-[#9d92bf]" />
            )}
          </div>

          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border border-[#e6dff2] bg-[#f7f3ff]">
            {mascot?.dataUrl ? (
              <img
                src={mascot.dataUrl}
                alt={mascot.fileName || 'Brand mascot'}
                className="h-full w-full object-cover"
              />
            ) : (
              <Bot className="h-5 w-5 text-[#9d92bf]" />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[18px] font-semibold tracking-[-0.04em] text-[#1a1632]">
              {brandName || 'Your Brand'}
            </h3>

            <span className="rounded-full bg-[#f5efff] px-2.5 py-1 text-[11px] font-medium text-[#7556ef]">
              {tone || 'Brand DNA'}
            </span>
          </div>

          <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#766f8d]">
            {tagline || 'Add your tagline in setup to keep every ad aligned.'}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ece5f5] bg-white px-2.5 py-1 text-[11px] text-[#7a7392]">
              <Palette className="h-3 w-3 text-[#8b63ff]" />
              {brandData.palette.length} colors
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ece5f5] bg-white px-2.5 py-1 text-[11px] text-[#7a7392]">
              <UsersRound className="h-3 w-3 text-[#8b63ff]" />
              {audience.length > 0
                ? `${audience[0]}${audience.length > 1 ? ` and ${audience.length - 1} more` : ''}`
                : 'Audience'}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ece5f5] bg-white px-2.5 py-1 text-[11px] text-[#7a7392]">
              <Sparkles className="h-3 w-3 text-[#8b63ff]" />
              {brandData.references.length} refs
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandSummaryCard