import { MicVocal } from 'lucide-react'
import FormPanel from '../components/cards/FormPanel'
import FieldBlock from '../components/forms/FieldBlock'
import SelectableChip from '../components/forms/SelectableChip'
import StaticInput from '../components/forms/StaticInput'

function SetupPersonalitySection({
  tagline,
  tone,
  toneOptions,
  isEditing,
  toneError,
  onTaglineChange,
  onToneChange,
}) {
  return (
    <FormPanel
      icon={MicVocal}
      title="Personality"
      subtitle="How your brand sounds and feels."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)]">
        <FieldBlock
          label="Tagline"
          required
          hint="A short line that captures your brand's promise."
        >
          <StaticInput
            value={tagline}
            isEditing={isEditing}
            onChange={onTaglineChange}
            placeholder="Skincare that glows naturally."
          />
        </FieldBlock>
        <FieldBlock
          label="Tone of voice"
          required
          hint="Choose the tone that best represents your brand."
          errorText={toneError}
        >
          <div className="flex flex-wrap gap-2.5">
            {toneOptions.map((option) => (
              <SelectableChip
                key={option}
                active={tone === option}
                disabled={!isEditing}
                onClick={() => onToneChange(option)}
              >
                {option}
              </SelectableChip>
            ))}
          </div>
        </FieldBlock>
      </div>
    </FormPanel>
  )
}

export default SetupPersonalitySection
