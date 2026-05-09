import { Bot, ImagePlus, Palette, Sparkles, UsersRound } from 'lucide-react'

function BrandSummaryCard({ brandData }) {
  const { brandName, tagline, tone, audience, logo, mascot } = brandData

  return (
    <div className="mb-7 rounded-[18px] border border-[#e7e0f3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,249,255,0.98)_100%)] p-4 shadow-[0_16px_36px_rgba(85,63,146,0.08)]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#e6dff2] bg-[#f7f3ff]">
          {logo?.dataUrl ? (
            <img
              src={logo.dataUrl}
              alt={logo.fileName || 'Brand logo'}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlus className="h-6 w-6 text-[#9d92bf]" />
          )}
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#e6dff2] bg-[#f7f3ff]">
          {mascot?.dataUrl ? (
            <img
              src={mascot.dataUrl}
              alt={mascot.fileName || 'Brand mascot'}
              className="h-full w-full object-cover"
            />
          ) : (
            <Bot className="h-6 w-6 text-[#9d92bf]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[20px] font-semibold tracking-[-0.04em] text-[#1a1632]">
              {brandName || 'Your Brand'}
            </h3>
            <span className="rounded-full bg-[#f5efff] px-3 py-1 text-[12px] font-medium text-[#7556ef]">
              {tone || 'Brand DNA'}
            </span>
          </div>
          <p className="mt-2 text-[15px] leading-6 text-[#766f8d]">
            {tagline || 'Add your tagline in setup to keep every ad aligned.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[13px] text-[#7a7392]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ece5f5] bg-white px-3 py-1.5">
              <Palette className="h-3.5 w-3.5 text-[#8b63ff]" />
              {brandData.palette.length} brand colors
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ece5f5] bg-white px-3 py-1.5">
              <UsersRound className="h-3.5 w-3.5 text-[#8b63ff]" />
              {audience.length > 0 ? audience.join(', ') : 'Audience pending'}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ece5f5] bg-white px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#8b63ff]" />
              {brandData.references.length > 0 ? `${brandData.references.length} reference image${brandData.references.length > 1 ? 's' : ''}` : 'No references yet'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandSummaryCard
