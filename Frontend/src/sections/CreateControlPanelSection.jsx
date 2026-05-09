import { Clapperboard, FolderCog, Sparkles, Video, Wand2 } from 'lucide-react'
import { includeOptions } from '../data/brandData'
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
}) {
  return (
    <ControlPanelCard>
      <BrandSummaryCard brandData={brandData} />

      <CreateSection
        icon={Wand2}
        title="Describe your idea"
        subtitle="What's the ad about? Who is it for? What's the vibe?"
      >
        <PromptInput
          value={prompt}
          onChange={onPromptChange}
          placeholder={`Describe an ad for ${brandData.brandName || 'your brand'} using your saved brand DNA.`}
          count={`${prompt.length}/500`}
        />
      </CreateSection>

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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {platformOptions.map((option) => (
            <IconChoice
              key={option.id}
              active={selectedPlatform === option.id}
              onClick={() => onPlatformChange(option.id)}
              icon={option.icon}
            >
              {option.label}
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
              checked={includedItems.includes(item)}
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
        <DurationSlider value={duration} onChange={onDurationChange} />
      </CreateSection>

      <button
        onClick={onGenerateClick}
        className="mt-7 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[12px] bg-[linear-gradient(90deg,#7340f6_0%,#8e56ff_46%,#7340f6_100%)] px-5 py-4 text-[20px] font-medium tracking-[-0.04em] text-white shadow-[0_18px_48px_rgba(125,85,255,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_58px_rgba(125,85,255,0.38)] active:scale-[0.995] sm:min-h-[60px] sm:text-[24px]"
      >
        <Sparkles className="h-5 w-5" />
        Generate
      </button>
    </ControlPanelCard>
  )
}

export default CreateControlPanelSection
