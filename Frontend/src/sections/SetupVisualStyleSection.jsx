import { CircleX, Palette } from 'lucide-react'
import FormPanel from '../components/cards/FormPanel'
import FieldBlock from '../components/forms/FieldBlock'
import UploadReferenceCard from '../components/media/UploadReferenceCard'

function SetupVisualStyleSection({
  palette,
  references,
  isEditing,
  paletteError,
  activePaletteIndex,
  paletteEditorMode,
  pendingPaletteColor,
  onAddPaletteColor,
  onUpdatePaletteColor,
  onRemovePaletteColor,
  onPaletteEditorClose,
  onPaletteColorChange,
  onPendingPaletteColorChange,
  onConfirmPaletteColor,

  onReferenceUpload,
  onReferenceRemove,
}) {
  const activeColor =
    paletteEditorMode === 'edit' &&
      activePaletteIndex >= 0 &&
      activePaletteIndex < palette.length
      ? palette[activePaletteIndex]
      : pendingPaletteColor

  return (
    <FormPanel
      icon={Palette}
      title="Visual style"
      subtitle="The look and feel of your brand."
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.65fr)]">
        <FieldBlock
          label="Color palette"
          required
          hint="Pick 3-5 colors that represent your brand."
          errorText={paletteError}
        >
          <div className="relative overflow-visible">
            <div className="flex flex-wrap gap-4">
              {palette.map((hex, index) => (
                <div key={`${hex}-${index}`} className="relative space-y-1">
                  <button
                    type="button"
                    onClick={() => onUpdatePaletteColor(index)}
                    disabled={!isEditing}
                    className="group relative"
                  >
                    <div
                      className={`h-[52px] w-[52px] rounded-[12px] border shadow-[0_12px_25px_rgba(92,72,153,0.08)] sm:h-[66px] sm:w-[66px] ${paletteError ? 'border-[#ef8aaa]' : 'border-[#e6def7]'
                        }`}
                      style={{ background: hex }}
                    />
                    {isEditing && palette.length > 3 ? (
                      <span
                        onClick={(event) => {
                          event.stopPropagation()
                          onRemovePaletteColor(index)
                        }}
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[18px] text-[#8e789d] shadow-[0_10px_24px_rgba(89,68,148,0.14)]"
                      >
                        ×
                      </span>
                    ) : null}
                  </button>
                  <p className="text-[14px] text-[#7a738e]">{hex}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => onAddPaletteColor()}
                disabled={!isEditing || palette.length >= 5}
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-dashed bg-white text-[#6d6486] transition sm:h-[66px] sm:w-[66px] ${isEditing
                  ? palette.length >= 5
                    ? 'cursor-not-allowed border-[#ece5f6] text-[#b8afca]'
                    : 'border-[#d8d1eb] hover:border-[#b8a8e8] hover:bg-[#faf8ff]'
                  : 'cursor-default border-[#ebe4f6] text-[#b5acc9]'
                  }`}
              >
                <span className="text-4xl font-light leading-none">+</span>
              </button>
            </div>

            {isEditing && activePaletteIndex >= 0 ? (
              <div className="absolute left-0 top-full z-50 mt-4 w-full max-w-[320px] rounded-[18px] border border-[#e7e0f3] bg-white/96 p-4 shadow-[0_22px_50px_rgba(83,61,144,0.16)] backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-medium text-[#1c1832]">
                      {paletteEditorMode === 'add' ? 'Add color' : 'Edit color'}
                    </p>
                    <p className="mt-1 text-[13px] text-[#847c99]">
                      {paletteEditorMode === 'add'
                        ? 'Choose a new color for your palette.'
                        : 'Fine-tune your existing brand color.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onPaletteEditorClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6f1ff] text-[#756d8e] transition hover:text-[#403a5c]"
                  >
                    <CircleX className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 ">
                  <div className="min-w-0 flex-1">
                    <label className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[12px] border border-[#ddd6ea] bg-white px-4 text-[14px] font-medium text-[#6e6685] transition hover:border-[#b8a8e8] hover:bg-[#faf8ff]">
                      Click to pick color
                      <input
                        type="color"
                        value={activeColor}
                        onChange={(event) => {
                          if (paletteEditorMode === 'add') {
                            onPendingPaletteColorChange(event.target.value)
                          } else {
                            onPaletteColorChange(event.target.value)
                          }
                        }}
                        className="pointer-events-none absolute opacity-0"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </FieldBlock>

        <FieldBlock
          label="Reference image"
          hint="optional"
          hintText="Helps us understand the vibe, style and mood you love."
        >
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_180px] xl:items-center">
            <UploadReferenceCard
              references={references}
              isEditing={isEditing}
              onFilesSelect={onReferenceUpload}
              onRemove={onReferenceRemove}
            />
          </div>
        </FieldBlock>
      </div>
    </FormPanel>
  )
}

export default SetupVisualStyleSection