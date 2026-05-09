import { UserRound } from 'lucide-react'
import FormPanel from '../components/cards/FormPanel'
import FieldBlock from '../components/forms/FieldBlock'
import StaticInput from '../components/forms/StaticInput'
import MediaDrop from '../components/media/MediaDrop'

function SetupIdentitySection({
  brandName,
  logo,
  mascot,
  isEditing,
  brandNameError,
  logoError,
  onBrandNameChange,
  onLogoUpload,
  onMascotUpload,
  onLogoRemove,
  onMascotRemove,
}) {
  console.log(brandName, logo, mascot);
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
          onRemove={onMascotRemove}
        />
      </div>
    </FormPanel>
  )
}

export default SetupIdentitySection
