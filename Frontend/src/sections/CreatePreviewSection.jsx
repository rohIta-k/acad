import { AlertCircle, FileJson } from 'lucide-react'
import EmptyState from '../components/media/EmptyState'
import { platformOptions } from '../data/navigation'

function ResultRow({ icon: Icon, label, children }) {
  return (
    <div className="rounded-[16px] border border-[#e6e0f1] bg-white/70 p-4 shadow-[0_18px_44px_rgba(70,51,126,0.08)]">
      <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8b63ff]">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      {children}
    </div>
  )
}

function getPlatformAspect(platform) {
  const option = platformOptions.find((item) => item.id === platform)

  if (!option) {
    return 'aspect-video'
  }

  switch (option.ratio) {
    case '9:16':
      return 'aspect-[9/16]'

    case '1:1':
      return 'aspect-square'

    case '21:9':
      return 'aspect-[21/9]'

    default:
      return 'aspect-video'
  }
}

function CreateResult({ result }) {

  return (
    <div className="mt-5 rounded-[22px] bg-[radial-gradient(circle_at_50%_42%,rgba(139,103,255,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.22)_100%)] px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.35rem)] font-medium tracking-[-0.05em] text-[#4f4968]">
            {result.title}
          </h2>
          <p className="mt-2 max-w-[620px] text-[16px] leading-7 tracking-[-0.02em] text-[#827b98]">
            {result.summary}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-5">
            {result.videoUrl ? (
              <div className="flex justify-center rounded-[26px] border border-[#ebe7f3] bg-[radial-gradient(circle_at_top,rgba(123,82,243,0.08),transparent_52%),#faf9fc] p-5 shadow-[0_18px_44px_rgba(70,51,126,0.10)]">
                <video
                  src={result.videoUrl}
                  controls
                  autoPlay
                  loop
                  className={`${getPlatformAspect(result.platform)} max-h-[720px] rounded-[20px] object-cover shadow-[0_24px_60px_rgba(15,23,42,0.18)]`}
                />
              </div>
            ) : null}

            {result.imageUrl ? (
              <div className="flex justify-center rounded-[26px] border border-[#ebe7f3] bg-[radial-gradient(circle_at_top,rgba(123,82,243,0.04),transparent_60%),#faf9fc] p-5 shadow-[0_18px_44px_rgba(70,51,126,0.08)]">
                <img
                  src={result.imageUrl}
                  alt={result.title || 'Generated image'}
                  className={`max-h-[720px] rounded-[20px] object-contain shadow-[0_24px_60px_rgba(15,23,42,0.12)] w-full`}
                />
              </div>
            ) : null}

        {Array.isArray(result.sceneDirection) && result.sceneDirection.length > 0 ? (
          <ResultRow icon={FileJson} label="Scene direction">
            <div className="space-y-3">
              {result.sceneDirection.map((line) => (
                <div
                  key={line}
                  className="rounded-[12px] border border-[#ece6f6] bg-white/70 px-4 py-3 text-[14px] leading-6 text-[#706983]"
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
    <div className="mt-5 flex min-h-[200px] items-center justify-center rounded-[22px] border border-dashed border-[#d8d1eb] bg-[radial-gradient(circle_at_50%_42%,rgba(139,103,255,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.2)_100%)] px-4 py-8 sm:min-h-[380px] sm:px-6 lg:min-h-[460px] xl:min-h-[540px]">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(140,92,255,0.12)_0%,rgba(244,90,143,0.12)_100%)]">
          <AlertCircle className="h-10 w-10 text-[#8b63ff]" />
        </div>
        <h2 className="mt-4 text-[clamp(1.9rem,5vw,2.625rem)] font-medium tracking-[-0.05em] text-[#77718b] sm:mt-8">
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
}) {
  if (generationError && !isGenerating) {
    return <CreateError message={generationError} />
  }

  if (hasGenerated && generationResult) {
    return <CreateResult result={generationResult} />
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
