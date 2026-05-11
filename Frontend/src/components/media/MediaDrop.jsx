import { ImagePlus, Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'
import { getAssetUrl } from '../../data/brandData'

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
      <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.1em] text-[#e2e2e8] font-mono">
        {label}
        {required ? <span className="text-[#f2708f]"> *</span> : null}
        {hint ? <span className="font-normal text-[#a1a1aa] lowercase"> ({hint})</span> : null}
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
            ? 'border-[#ef8aaa] bg-[#1D1E29] hover:border-[#ef5d8d] hover:'
            : 'border-[#2C2D3C] bg-[#1D1E29] hover:border-[#4f46e5] hover:'
          : hasError
            ? 'border-[#ef8aaa] bg-[#1D1E29]/50'
            : 'border-[#2C2D3C] bg-[#1D1E29]/50'
          }`}
      >
        {getAssetUrl(asset) ? (
          <>
            <img
              src={getAssetUrl(asset)}
              alt={asset.fileName || `${type} upload`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.7)_100%)]" />
            <div className="relative z-10 rounded-[10px] border border-[#2C2D3C] bg-[#111219]/80 px-4 py-2 text-[12px] font-medium text-[#e2e2e8] backdrop-blur uppercase tracking-[0.08em]">
              {asset.fileName || `Uploaded ${type}`}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#131318] border border-[#2C2D3C]">
              <ImagePlus className="h-6 w-6 text-[#a1a1aa]" />
            </div>

            <div className="text-center">
              <p className="text-[15px] font-medium text-[#e2e2e8]">
                {type === 'mascot' ? 'Generate mascot' : `Upload ${type}`}
              </p>

              <p className="mt-1 text-[13px] text-[#a1a1aa]">
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
          className={`inline-flex items-center gap-2 text-[15px] transition ${isEditing ? 'text-[#e2e2e8] hover:text-[#4f46e5]' : 'cursor-default text-[#a1a1aa]'
            }`}
        >
          <Upload className="h-4 w-4" />
          {getAssetUrl(asset)
            ? `Replace ${type}`
            : `Upload ${type}`}
        </button>
        {type === 'mascot' && onGenerate ? (
          <button
            type="button"
            onClick={onGenerate}
            disabled={!isEditing || isGenerating}
            className={`inline-flex items-center gap-2 text-[15px] transition ${isEditing && !isGenerating ? 'text-[#4f46e5] hover:text-[#818cf8]' : 'cursor-default text-[#a1a1aa]'
              }`}
          >
            {isGenerating ? 'Generating...' : getAssetUrl(asset) ? 'Regenerate mascot' : 'Generate mascot'}
          </button>
        ) : null}
        {getAssetUrl(asset) ? (
          <button
            type="button"
            onClick={onRemove}
            disabled={!isEditing}
            className={`inline-flex items-center gap-2 text-[15px] transition ${isEditing ? 'text-[#ef4444] hover:text-[#f87171]' : 'cursor-default text-[#a1a1aa]'
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
