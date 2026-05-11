import { AlertCircle, FileJson } from 'lucide-react'
import EmptyState from '../components/media/EmptyState'
import { platformOptions } from '../data/navigation'

function ResultRow({ icon: Icon, label, children }) {
  return (
    <div className="rounded-[16px] border border-[#2C2D3C] bg-[#111219] p-4 ">
      <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8b63ff]">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      {children}
    </div>
  )
}

function getPlatformAspect(platform, type = 'video') {
  const option = platformOptions.find(
    (item) => item.id === platform
  )

  const ratioString =
    type === 'image'
      ? option?.imageRatio
      : option?.videoRatio

  if (!ratioString) {
    return {
      aspectRatio: '16 / 9',
      maxWidth: '100%',
    }
  }

  const [width, height] =
    ratioString.split(':').map(Number)

  return {
    aspectRatio: `${width} / ${height}`,
    maxWidth: option.previewWidth || '100%',
  }
}

function CreateResult({ result,selectedPlatform }) {
  const imageSrc =
  !result.videoUrl
    ? result.imageUrl || result.outputUrl || ''
    : ''

  return (
    <div className="mt-5 rounded-[22px] bg-[#1D1E29] px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.35rem)] font-medium tracking-[-0.05em] text-[#ffffff]">
            {result.title}
          </h2>
          <p className="mt-2 max-w-[620px] text-[16px] leading-7 tracking-[-0.02em] text-[#827b98]">
            {result.summary}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-5">
        {result.videoUrl ? (
          <div className="flex justify-center rounded-[26px] border border-[#2C2D3C] bg-[radial-gradient(circle_at_top,rgba(123,82,243,0.08),transparent_52%),#faf9fc] p-5 ">
            <video
              src={result.videoUrl}
              controls
              autoPlay
              loop
              className="w-full rounded-[20px] object-cover"
              style={{
                aspectRatio: getPlatformAspect(selectedPlatform,'video').aspectRatio,
                maxWidth: getPlatformAspect(selectedPlatform,'video').maxWidth,
                maxHeight: '720px',
              }}
            />
          </div>
        ) : null}

        {imageSrc ? (
          <div className="flex justify-center rounded-[26px] border border-[#2C2D3C] bg-[radial-gradient(circle_at_top,rgba(123,82,243,0.04),transparent_60%),#faf9fc] p-5 ">
            <img
              src={imageSrc}
              alt={result.title || 'Generated image'}
              className="w-full rounded-[20px] object-contain"
              style={{
                aspectRatio: getPlatformAspect(selectedPlatform,'image').aspectRatio,
                maxWidth: getPlatformAspect(selectedPlatform,'image').maxWidth,
                maxHeight: '720px',
              }}
            />
          </div>
        ) : null}

        {Array.isArray(result.sceneDirection) && result.sceneDirection.length > 0 ? (
          <ResultRow icon={FileJson} label="Scene direction">
            <div className="space-y-3">
              {result.sceneDirection.map((line) => (
                <div
                  key={line}
                  className="rounded-[12px] border border-[#ece6f6] bg-[#111219] px-4 py-3 text-[14px] leading-6 text-[#a1a1aa]"
                >
                  {line}
                </div>
              ))}
            </div>
          </ResultRow>
        ) : null}
      </div>
    </div>
  )
}

function CreateError({ message }) {
  return (
    <div className="mt-5 flex min-h-[200px] items-center justify-center rounded-[22px] border border-dashed border-[#2C2D3C] bg-[#1D1E29] px-4 py-8 sm:min-h-[380px] sm:px-6 lg:min-h-[460px] xl:min-h-[540px]">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#131318]">
          <AlertCircle className="h-10 w-10 text-[#8b63ff]" />
        </div>
        <h2 className="mt-4 text-[clamp(1.9rem,5vw,2.625rem)] font-medium tracking-[-0.05em] text-[#e2e2e8] sm:mt-8">
          Backend connection needed
        </h2>
        <p className="mx-auto mt-2 max-w-[440px] text-[16px] leading-7 tracking-[-0.02em] text-[#827b98] sm:text-[18px] sm:leading-8">
          {message}
        </p>
      </div>
    </div>
  )
}

function CreatePreviewSection({
  brandData,
  isGenerating,
  hasGenerated,
  generationResult,
  generationError,
  selectedPlatform,
}) {
  if (generationError && !isGenerating) {
    return <CreateError message={generationError} />
  }

  if (hasGenerated && generationResult) {
    return <CreateResult result={generationResult} selectedPlatform={selectedPlatform} />
  }

  return (
    <EmptyState
      brandData={brandData}
      isGenerating={isGenerating}
      hasGenerated={hasGenerated}
    />
  )
}

export default CreatePreviewSection
