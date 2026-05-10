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
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
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
              className="flex w-full rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-3 text-[16px] leading-6 tracking-[0.02em] text-[#e2e2e8] shadow-none outline-none transition placeholder:text-[#a1a1aa] focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </FieldBlock>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex-1">
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
          </div>
          <div className="flex-1">
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
          </div>
        </div>
      </div>
    </FormPanel>
  )
}

export default SetupIdentitySection
