import { ImagePlus, Sparkles, Trash2, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
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
  const [showImageModal, setShowImageModal] = useState(false)

  const openPicker = () => {
    if (!isEditing) return
    inputRef.current?.click()
  }

  const handleImageClick = () => {
    const assetUrl = getAssetUrl(asset)
    console.log(`[MediaDrop-${type}] Asset:`, asset, 'URL:', assetUrl)
    // For mascot or logo: show full image if it exists, regardless of editing mode
    if ((type === 'mascot' || type === 'logo') && assetUrl) {
      setShowImageModal(true)
    }
    // For other types in editing mode with no image: open picker
    else if (isEditing && !assetUrl) {
      openPicker()
    }
  }

  const handleFiles = (files) => {
    const [file] = Array.from(files || [])
    if (!file) return
    onFileSelect?.(file)
  }

  return (
    <div>
      <div className="mb-3 outfit-font text-[15px] font-semibold tracking-[-0.015em] text-[#e2e2e8]">
        {label}
        {required ? <span className="text-[#f2708f]"> *</span> : null}
        {hint ? <span className="font-normal text-[#a1a1aa] lowercase"> ({hint})</span> : null}
      </div>
      <button
        type="button"
        onClick={handleImageClick}
        onDrop={(event) => {
          event.preventDefault()
          if (!isEditing) return
          handleFiles(event.dataTransfer.files)
        }}
        onDragOver={(event) => event.preventDefault()}
        className={`group relative flex min-h-[128px] w-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-white/12 bg-[rgba(29,30,41,0.72)] px-4 py-4 backdrop-blur-md transition duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.03)] ${isEditing
          ? hasError
            ? 'border-[#ef8aaa] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(239,138,170,0.14),0_0_24px_rgba(239,138,170,0.08)] hover:bg-[rgba(29,30,41,0.84)]'
            : 'hover:bg-[rgba(29,30,41,0.84)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(184,194,255,0.08),0_0_28px_rgba(184,194,255,0.08)]'
          : hasError
            ? 'border-[#ef8aaa] bg-[#1D1E29]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(239,138,170,0.12)]'
            : 'bg-[#1D1E29]/50'
          }`}
      >
        {getAssetUrl(asset) ? (
          <>
            <img
              src={getAssetUrl(asset)}
              alt={asset.fileName || `${type} upload`}
              className={`absolute inset-0 h-full w-full ${type === 'mascot' ? 'object-contain p-3' : 'object-cover'}`}
            />
            <div
              className={`absolute inset-0 ${type === 'mascot'
                ? 'bg-[linear-gradient(180deg,rgba(7,8,12,0.32)_0%,rgba(7,8,12,0.56)_100%)]'
                : 'bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.7)_100%)]'
                }`}
            />
            <div className="absolute bottom-3 right-3 z-10 rounded-[10px] border border-[#2C2D3C] bg-[#111219]/80 px-3 py-1.5 text-[11px] font-medium tracking-[-0.03em] text-[#e2e2e8] backdrop-blur">
              {asset.fileName || `Uploaded ${type}`}
            </div>
            {(type === 'mascot' || type === 'logo') ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setShowImageModal(true)
                }}
                aria-label={`Open ${type} image`}
                className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#2C2D3C] bg-[#111219]/86 text-[#e2e2e8] backdrop-blur transition hover:bg-[#131318]"
              >
                <ImagePlus className="h-4 w-4" />
              </button>
            ) : null}
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
      {isEditing ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openPicker}
            disabled={!isEditing}
            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[13px] transition duration-300 backdrop-blur-md ${hasError ? 'border-[#ef8aaa]/45 bg-[#111219]/72 text-[#ffd5e1] hover:bg-[#111219]/88 hover:shadow-[0_0_16px_rgba(239,138,170,0.08)]' : 'border-[#B8C2FF]/25 bg-[#111219]/68 text-[#e2e2e8] hover:border-[#B8C2FF]/45 hover:bg-[#111219]/84 hover:text-white hover:shadow-[0_0_16px_rgba(184,194,255,0.12)]'}`}
          >
            <Upload className="h-3.5 w-3.5" />
            {getAssetUrl(asset) ? `Replace ${type}` : `Upload ${type}`}
          </button>
          {type === 'mascot' && onGenerate ? (
            <button
              type="button"
              onClick={onGenerate}
              disabled={!isEditing || isGenerating}
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[13px] transition duration-300 backdrop-blur-md ${isGenerating ? 'border-[#B8C2FF]/25 bg-[#111219]/68 text-[#a1a1aa]' : 'border-[#B8C2FF]/25 bg-[#111219]/68 text-[#B8C2FF] hover:border-[#B8C2FF]/45 hover:bg-[#111219]/84 hover:text-white hover:shadow-[0_0_16px_rgba(184,194,255,0.12)]'}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isGenerating ? 'Generating...' : getAssetUrl(asset) ? 'Regenerate mascot' : 'Generate mascot'}
            </button>
          ) : null}
          {getAssetUrl(asset) ? (
            <button
              type="button"
              onClick={onRemove}
              disabled={!isEditing}
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[13px] transition duration-300 backdrop-blur-md ${hasError ? 'border-[#ef8aaa]/45 bg-[#111219]/72 text-[#ffd5e1] hover:bg-[#111219]/88' : 'border-[#B8C2FF]/25 bg-[#111219]/68 text-[#f2a3b4] hover:border-[#B8C2FF]/45 hover:bg-[#111219]/84 hover:text-white hover:shadow-[0_0_16px_rgba(239,138,170,0.10)]'}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
      {errorText ? (
        <p className="mt-3 text-[14px] leading-6 text-[#da5f86]">{errorText}</p>
      ) : null}

      {/* Full Image Modal */}
      {showImageModal && getAssetUrl(asset) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.96)] p-6 backdrop-blur-md"
          onClick={() => setShowImageModal(false)}
        >
          <button
            type="button"
            onClick={() => setShowImageModal(false)}
            aria-label={`Close ${type} preview`}
            className="absolute right-8 top-8 z-[100] inline-flex items-center justify-center rounded-[12px] border border-white/10 bg-[#B8C2FF] px-4 py-2 text-[14px] font-medium text-[#131318] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-[#C3C8FF]"
          >
            Close
          </button>

          <img
            src={getAssetUrl(asset)}
            alt={asset.fileName || 'Mascot'}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-[24px] object-contain shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      )}
    </div>
  )
}

export default MediaDrop
