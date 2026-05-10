import { UserRound } from 'lucide-react'
import FormPanel from '../components/cards/FormPanel'
import FieldBlock from '../components/forms/FieldBlock'
import StaticInput from '../components/forms/StaticInput'
import MediaDrop from '../components/media/MediaDrop'

function SetupIdentitySection({
  brandName,
  logo,
  mascot,
  mascotBrief,
  isEditing,
  brandNameError,
  logoError,
  mascotError,
  onBrandNameChange,
  onLogoUpload,
  onMascotUpload,
  onMascotGenerate,
  onMascotBriefChange,
  onLogoRemove,
  onMascotRemove,
  isMascotGenerating = false,
}) {
  return (
    <FormPanel
      icon={UserRound}
      title="Identity"
      subtitle="The basics of your brand."
    >
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <FieldBlock
          label="Brand name"
          required
          hint="This is how your brand name will appear."
          errorText={brandNameError}
        >
          <StaticInput
            value={brandName}
            isEditing={isEditing}
            onChange={onBrandNameChange}
            placeholder="Enter your brand name"
            hasError={Boolean(brandNameError)}
          />
        </FieldBlock>
        <MediaDrop
          label="Logo"
          required
          type="logo"
          asset={logo}
          isEditing={isEditing}
          onFileSelect={onLogoUpload}
          onRemove={onLogoRemove}
          hasError={Boolean(logoError)}
          errorText={logoError}
        />
        <MediaDrop
          label="Mascot"
          hint="optional"
          type="mascot"
          asset={mascot}
          isEditing={isEditing}
          onFileSelect={onMascotUpload}
          onGenerate={onMascotGenerate}
          onRemove={onMascotRemove}
          isGenerating={isMascotGenerating}
          hasError={Boolean(mascotError)}
          errorText={mascotError}
        />

        <FieldBlock
          label="Mascot brief"
          hint="optional"
          errorText=""
        >
          <textarea
            value={mascotBrief}
            onChange={(event) => onMascotBriefChange?.(event.target.value)}
            disabled={!isEditing}
            placeholder="Describe the mascot you want, for example: a friendly fox with a camera strap and playful posture"
            rows={4}
            className="flex w-full rounded-[12px] border border-[#ddd6ea] bg-white px-4 py-3 text-[16px] leading-6 tracking-[-0.02em] text-[#28243f] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-[#b3abc9] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </FieldBlock>
      </div>
    </FormPanel>
  )
}

export default SetupIdentitySection
