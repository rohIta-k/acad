import { Image, Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'
import { getAssetUrl } from '../../data/brandData'

function UploadReferenceCard({
  references,
  isEditing = true,
  onFilesSelect,
  onRemove,
  showUploadArea = true,
  showPreviewGrid = true,
}) {
  const inputRef = useRef(null)

  const openPicker = () => {
    if (!isEditing) return
    inputRef.current?.click()
  }

  const handleFiles = (files) => {
    const nextFiles = Array.from(files || [])
    if (nextFiles.length === 0) return
    onFilesSelect?.(nextFiles)
  }

  return (
    <div className="rounded-[18px] border border-dashed border-[#2C2D3C] bg-[#111219] p-4">
      {showUploadArea ? (
        <button
          type="button"
          onClick={openPicker}
          onDrop={(event) => {
            event.preventDefault()
            if (!isEditing) return
            handleFiles(event.dataTransfer.files)
          }}
          onDragOver={(event) => event.preventDefault()}
          className={`group flex min-h-[164px] w-full flex-col items-center justify-center rounded-[14px] border border-dashed px-8 py-6 text-center transition ${
            isEditing
              ? 'border-[#2C2D3C] hover:border-[#bca8ff] hover:'
              : 'border-[#ebe4f6] bg-[#1D1E29]/45'
          }`}
        >
          <Image className="h-10 w-10 text-[#9c91bf] transition group-hover:text-[#7b52f3]" />
          <p className="mt-3 max-w-[280px] text-[15px] leading-6 text-[#7b758f]">
            Upload any image that captures your brand feel
          </p>
          <p className="mt-1 text-[12px] text-[#b1a8c7]">PNG, JPG up to 10MB</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-[#d9d2eb] px-4 py-2 text-[15px] font-medium text-[#e2e2e8] transition group-hover:border-[#baa6ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(184,194,255,0.10)]">
            <Upload className="h-4 w-4" />
            {isEditing ? 'Upload image' : 'Reference gallery'}
          </span>
        </button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {showPreviewGrid && references.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {references.map((reference, index) => (
            <div
              key={`${reference.fileName}-${index}`}
              className="group relative overflow-hidden rounded-[14px] border border-[#2C2D3C] bg-[#1D1E29] "
            >
              <img
                src={getAssetUrl(reference)}
                alt={reference.fileName || `Reference ${index + 1}`}
                className="h-24 w-full object-cover"
              />
              <div className="px-3 py-2">
                <p className="truncate text-[12px] text-[#716987]">
                  {reference.fileName || `Reference ${index + 1}`}
                </p>
              </div>
              {isEditing ? (
                <button
                  type="button"
                  onClick={() => onRemove?.(index)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1E29] text-[#a1a1aa]  transition hover:text-[#d25584]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default UploadReferenceCard
