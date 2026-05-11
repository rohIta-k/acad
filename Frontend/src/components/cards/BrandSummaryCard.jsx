import { Bot, ImagePlus, Palette, Sparkles, UsersRound } from 'lucide-react'
import { getAssetUrl } from '../../data/brandData'

function BrandSummaryCard({ brandData }) {
  const { brandName, tagline, tone, audience, logo, mascot } = brandData

  return (
    <div className="mb-5 rounded-[18px] border border-[#2C2D3C] bg-[#111219] p-4 ">
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 flex-col gap-2">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29]">
            {getAssetUrl(logo) ? (
              <img
                src={getAssetUrl(logo)}
                alt={logo.fileName || 'Brand logo'}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="h-5 w-5 text-[#9d92bf]" />
            )}
          </div>

          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29]">
            {getAssetUrl(mascot) ? (
              <img
                src={getAssetUrl(mascot)}
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
            <h3 className="truncate text-[18px] font-semibold tracking-[-0.04em] text-[#e2e2e8]">
              {brandName || 'Your Brand'}
            </h3>

            <span className="rounded-full bg-[#B8C2FF] px-2.5 py-1 text-[11px] font-medium text-[#131318]">
              {tone || 'Brand DNA'}
            </span>
          </div>

          <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#a1a1aa]">
            {tagline || 'Add your tagline in setup to keep every ad aligned.'}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C2D3C] bg-[#1D1E29] px-2.5 py-1 text-[11px] text-[#a1a1aa]">
              <Palette className="h-3 w-3 text-[#8b63ff]" />
              {brandData.palette.length} colors
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C2D3C] bg-[#1D1E29] px-2.5 py-1 text-[11px] text-[#a1a1aa]">
              <UsersRound className="h-3 w-3 text-[#8b63ff]" />
              {audience.length > 0
                ? `${audience[0]}${audience.length > 1 ? ` and ${audience.length - 1} more` : ''}`
                : 'Audience'}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C2D3C] bg-[#1D1E29] px-2.5 py-1 text-[11px] text-[#a1a1aa]">
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