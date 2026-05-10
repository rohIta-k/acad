import { ImagePlus, Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'

function MediaDrop({
  label,
  required = false,
  hint,
  type,
  asset,
  isEditing = true,
  onFileSelect,
  onGenerate,
  onRemove,
  isGenerating = false,
  hasError = false,
  errorText = '',
}) {
  const inputRef = useRef(null)

  const openPicker = () => {
    if (!isEditing) return
    inputRef.current?.click()
  }

  const handleFiles = (files) => {
    const [file] = Array.from(files || [])
    if (!file) return
    onFileSelect?.(file)
  }

  return (
    <div>
      <div className="mb-3 text-[15px] font-medium tracking-[-0.02em] text-[#211d38]">
        {label}
        {required ? <span className="text-[#f2708f]"> *</span> : null}
        {hint ? <span className="font-normal text-[#9d96b3]"> ({hint})</span> : null}
      </div>
      <button
        type="button"
        onClick={openPicker}
        onDrop={(event) => {
          event.preventDefault()
          if (!isEditing) return
          handleFiles(event.dataTransfer.files)
        }}
        onDragOver={(event) => event.preventDefault()}
        className={`group relative flex min-h-[128px] w-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed px-4 py-4 transition ${isEditing
          ? hasError
            ? 'border-[#ef8aaa] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,247,255,0.96)_100%)] hover:border-[#ef5d8d] hover:shadow-[0_18px_40px_rgba(218,95,134,0.12)]'
            : 'border-[#d8d1eb] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,247,255,0.96)_100%)] hover:border-[#bba7ff] hover:shadow-[0_18px_40px_rgba(135,107,219,0.1)]'
          : hasError
            ? 'border-[#ef8aaa] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,245,255,0.98)_100%)]'
            : 'border-[#e5def3] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,245,255,0.98)_100%)]'
          }`}
      >
        {asset?.dataUrl ? (
          <>
            <img
              src={asset.dataUrl}
              alt={asset.fileName || `${type} upload`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,20,62,0.08)_0%,rgba(31,20,62,0.22)_100%)]" />
            <div className="relative z-10 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[13px] font-medium text-white backdrop-blur">
              {asset.fileName || `Uploaded ${type}`}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3efff]">
              <ImagePlus className="h-6 w-6 text-[#8b63ff]" />
            </div>

            <div className="text-center">
              <p className="text-[15px] font-medium text-[#2a2340]">
                {type === 'mascot' ? 'Generate mascot' : `Upload ${type}`}
              </p>

              <p className="mt-1 text-[13px] text-[#8f88a8]">
                {type === 'mascot'
                  ? 'Create an AI-generated brand mascot'
                  : 'PNG, JPG or SVG supported'}
              </p>
            </div>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openPicker}
          disabled={!isEditing}
          className={`inline-flex items-center gap-2 text-[15px] transition ${isEditing ? 'text-[#4e486d] hover:text-[#7b52f3]' : 'cursor-default text-[#a099b7]'
            }`}
        >
          <Upload className="h-4 w-4" />
          {asset?.dataUrl
            ? `Replace ${type}`
            : `Upload ${type}`}
        </button>
        {type === 'mascot' && onGenerate ? (
          <button
            type="button"
            onClick={onGenerate}
            disabled={!isEditing || isGenerating}
            className={`inline-flex items-center gap-2 text-[15px] transition ${isEditing && !isGenerating ? 'text-[#7b52f3] hover:text-[#5e37d6]' : 'cursor-default text-[#a099b7]'
              }`}
          >
            {isGenerating ? 'Generating...' : asset?.dataUrl ? 'Regenerate mascot' : 'Generate mascot'}
          </button>
        ) : null}
        {asset?.dataUrl ? (
          <button
            type="button"
            onClick={onRemove}
            disabled={!isEditing}
            className={`inline-flex items-center gap-2 text-[15px] transition ${isEditing ? 'text-[#8d5771] hover:text-[#d25584]' : 'cursor-default text-[#b4adc7]'
              }`}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        ) : null}
      </div>
      {errorText ? (
        <p className="mt-3 text-[14px] leading-6 text-[#da5f86]">{errorText}</p>
      ) : null}
    </div>
  )
}

export default MediaDrop
