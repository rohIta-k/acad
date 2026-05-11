import { Clapperboard, FolderCog, Sparkles, Video, Wand2 } from 'lucide-react'
import { includeOptions } from '../data/brandData'
import { getAssetUrl } from '../data/brandData'
import BrandSummaryCard from '../components/cards/BrandSummaryCard'
import CreateSection from '../components/cards/CreateSection'
import ControlPanelCard from '../components/cards/ControlPanelCard'
import CheckboxPill from '../components/forms/CheckboxPill'
import DurationSlider from '../components/forms/DurationSlider'
import IconChoice from '../components/forms/IconChoice'
import PromptInput from '../components/forms/PromptInput'

function CreateControlPanelSection({
  brandData,
  prompt,
  onPromptChange,
  selectedFormat,
  onFormatChange,
  formatOptions,
  selectedPlatform,
  onPlatformChange,
  platformOptions,
  includedItems,
  onIncludeToggle,
  duration,
  onDurationChange,
  onGenerateClick,
  isGenerating = false,
}) {
  const isGenerateDisabled =
    isGenerating ||
    !prompt.trim() ||
    !selectedFormat ||
    !selectedPlatform ||
    includedItems.length === 0 ||
    duration === null ||
    duration === undefined
  return (
    <ControlPanelCard>
      <BrandSummaryCard brandData={brandData} />

      <CreateSection
        icon={Video}
        title="Format"
        subtitle="What type of content do you want to create?"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {formatOptions.map((option) => (
            <IconChoice
              key={option.id}
              active={selectedFormat === option.id}
              onClick={() => onFormatChange(option.id)}
              icon={option.icon}
            >
              {option.label}
            </IconChoice>
          ))}
        </div>
      </CreateSection>

      <CreateSection
        icon={Sparkles}
        title="Platform"
        subtitle="Where will you publish this?"
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {platformOptions.map((option) => (
            <IconChoice
              key={option.id}
              compact
              active={selectedPlatform === option.id}
              onClick={() => onPlatformChange(option.id)}
              icon={option.icon}
            >
              <span className="text-[13px] leading-none tracking-[-0.01em]">
                {option.label}
              </span>
            </IconChoice>
          ))}
        </div>
      </CreateSection>

      <CreateSection
        icon={FolderCog}
        title="Include in your ad"
        subtitle="What brand elements should we include?"
      >
        <div className="flex flex-wrap gap-6">
          {includeOptions.map((item) => (
            <CheckboxPill
              key={item}
              checked={
                item === 'Mascot'
                  ? Boolean(getAssetUrl(brandData?.mascot)) && includedItems.includes(item)
                  : includedItems.includes(item)
              }
              disabled={item === 'Mascot' && !getAssetUrl(brandData?.mascot)}
              label={item}
              onToggle={() => onIncludeToggle(item)}
            />
          ))}
        </div>
      </CreateSection>

      <CreateSection
        icon={Clapperboard}
        title="Duration"
        subtitle="How long should your video be?"
        extra="(for video)"
      >
        <DurationSlider
          value={duration}
          onChange={onDurationChange}
          disabled={selectedFormat !== 'video'}
        />
      </CreateSection>

      <CreateSection
        icon={Wand2}
        title="Describe your idea"
        subtitle="What's the ad about? Who is it for? What's the vibe?"
      >
        <PromptInput
          value={prompt}
          onChange={(value) => {
            const words = value.trim().split(/\s+/).filter(Boolean)
            if (words.length <= 200) {
              onPromptChange(value)
            }
          }}
          placeholder={`Describe an ad for ${brandData.brandName || 'your brand'} using your saved brand DNA.`}
          count={`${prompt.trim().split(/\s+/).filter(Boolean).length}/200`}
        />
      </CreateSection>

      <button
        onClick={onGenerateClick}
        disabled={isGenerateDisabled}
        className={`mt-7 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[14px] px-5 py-4 text-[20px] font-medium tracking-[-0.04em] transition-all duration-200 sm:min-h-[60px] sm:text-[24px] ${isGenerateDisabled
          ? 'cursor-not-allowed border border-[#2C2D3C] bg-[#111219] text-[#766f8d]'
          : 'bg-[#B8C2FF] text-[#131318] hover:bg-[#C3C8FF]  hover:-translate-y-[1px] hover: active:translate-y-0 active:scale-[0.995]'
          }`}
      >
        <Sparkles className="h-5 w-5" />

        {isGenerating ? 'Generating' : 'Generate'}
      </button>
    </ControlPanelCard>
  )
}

export default CreateControlPanelSection
