import { Image, Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'

function UploadReferenceCard({
  references,
  isEditing = true,
  onFilesSelect,
  onRemove,
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
    <div className="rounded-[18px] border border-dashed border-[#d8d1eb] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(252,250,255,0.96)_100%)] p-4">
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
            ? 'border-[#d8d1eb] hover:border-[#bca8ff] hover:shadow-[0_18px_40px_rgba(135,107,219,0.12)]'
            : 'border-[#ebe4f6] bg-white/45'
        }`}
      >
        <Image className="h-10 w-10 text-[#9c91bf] transition group-hover:text-[#7b52f3]" />
        <p className="mt-3 max-w-[280px] text-[15px] leading-6 text-[#7b758f]">
          Upload any image that captures your brand feel
        </p>
        <p className="mt-1 text-[12px] text-[#b1a8c7]">PNG, JPG up to 10MB</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-[#d9d2eb] px-4 py-2 text-[15px] font-medium text-[#252042] transition group-hover:border-[#baa6ff] group-hover:text-[#7b52f3]">
          <Upload className="h-4 w-4" />
          {isEditing ? 'Upload image' : 'Reference gallery'}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {references.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {references.map((reference, index) => (
            <div
              key={`${reference.fileName}-${index}`}
              className="group relative overflow-hidden rounded-[14px] border border-[#e7e0f4] bg-white shadow-[0_10px_24px_rgba(89,68,148,0.06)]"
            >
              <img
                src={reference.dataUrl}
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
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffffd9] text-[#7b708f] shadow-[0_8px_20px_rgba(61,39,114,0.12)] transition hover:text-[#d25584]"
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
