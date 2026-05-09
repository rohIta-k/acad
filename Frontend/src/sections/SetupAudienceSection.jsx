import { ScanFace } from 'lucide-react'
import FormPanel from '../components/cards/FormPanel'
import FieldBlock from '../components/forms/FieldBlock'
import SelectableChip from '../components/forms/SelectableChip'

function SetupAudienceSection({
  audienceOptions,
  selectedAudience,
  isEditing,
  audienceError,
  onAudienceToggle,
}) {
  return (
    <FormPanel
      icon={ScanFace}
      title="Audience"
      subtitle="Who are we creating for?"
    >
      <FieldBlock
        label="Who is this for?"
        required
        hint="You can select more than one."
        errorText={audienceError}
      >
        <div className="flex flex-wrap gap-3">
          {audienceOptions.map((option) => (
            <SelectableChip
              key={option}
              active={selectedAudience.includes(option)}
              disabled={!isEditing}
              onClick={() => onAudienceToggle(option)}
            >
              {option}
            </SelectableChip>
          ))}
        </div>
      </FieldBlock>
    </FormPanel>
  )
}

export default SetupAudienceSection
