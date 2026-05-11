import { Lock } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageFrame from '../components/layout/PageFrame'
import CreateHeader from '../components/navigation/CreateHeader'
import { includeOptions } from '../data/brandData'
import {
  formatOptions,
  platformOptions,
} from '../data/navigation'
import { useBrandStorage } from '../hooks/useBrandStorage'
import { useToggleList } from '../hooks/useToggleList'
import { useCreatePagePersistence } from '../hooks/useCreatePagePersistence'
import CreateControlPanelSection from '../sections/CreateControlPanelSection'
import CreatePreviewSection from '../sections/CreatePreviewSection'
import { generateRunwayVideo } from '../utils/api'
import { useGenerationStorage } from '../hooks/useGenerationStorage'
import { getAssetUrl } from '../data/brandData'

function CreatePage() {
  const navigate = useNavigate()
  const [selectedFormat, setSelectedFormat] = useState('video')
  const [selectedPlatform, setSelectedPlatform] = useState('instagram_reel')
  const [duration, setDuration] = useState(10)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [generationResult, setGenerationResult] = useState(null)
  const [generationError, setGenerationError] = useState('')
  const { items: included, setItems: setIncluded, toggleItem: toggleIncluded } = useToggleList(includeOptions)

  const {
    user,
    brandData,
    activeBrandId,
    loading: brandLoading,
  } = useBrandStorage()
  const { saveGeneration } = useGenerationStorage(user)

  // Persist state across page refreshes
  useCreatePagePersistence({
    prompt,
    selectedFormat,
    selectedPlatform,
    duration,
    included,
    generationResult,
    hasGenerated,
    setPrompt,
    setSelectedFormat,
    setSelectedPlatform,
    setDuration,
    setIncluded,
    setGenerationResult,
    setHasGenerated,
  })

  useEffect(() => {
    // Only fetch/load brand data on mount; no silent redirects
  }, [activeBrandId, brandLoading, user])

  const handleGenerate = async () => {
    if (isGenerating) return

    setIsGenerating(true)
    setHasGenerated(false)
    setGenerationResult(null)
    setGenerationError('')

    try {
      const result = await generateRunwayVideo({
        idea: prompt.trim(),
        format: selectedFormat,
        platform: selectedPlatform,
        include: included,
        duration: selectedFormat === 'video' ? duration : null,
        brandData: {
          brandName: brandData.brandName,
          tagline: brandData.tagline,
          tone: brandData.tone,
          audience: brandData.audience,
          palette: brandData.palette,
            hasLogo: Boolean(getAssetUrl(brandData.logo)),
            hasMascot: Boolean(getAssetUrl(brandData.mascot)),
          logo: brandData.logo,
          mascot: brandData.mascot,
          referencesCount: brandData.references?.length || 0,
        },
      })

      await saveGeneration({
        brandId: activeBrandId,
        brandName: brandData.brandName,
        prompt: prompt.trim(),
        format: selectedFormat,
        platform: selectedPlatform,
        duration: selectedFormat === 'video' ? duration : null,
        include: included,
        outputUrl: result.outputUrl || result.videoUrl || result.imageUrl || '',
        videoUrl: result.videoUrl || '',
        imageUrl: result.imageUrl || result.outputUrl || '',
        title: result.title || 'Generated creative',
        summary: result.summary || '',
        rawResponse: result,
      })

      setGenerationResult(result)
      setHasGenerated(true)
    } catch (error) {
      setGenerationError(error.message || 'Unable to generate creative right now.')
    } finally {
      setIsGenerating(false)
    }
  }

  const helperCopy = useMemo(() => {
    const brandLabel = brandData.brandName || 'Your brand'
    return `${brandLabel} is ready for content creation with your saved assets and brand tone.`
  }, [brandData.brandName])

  if (brandLoading) {
    return (
      <PageFrame className="px-3 py-3 sm:px-4 sm:py-4 lg:px-0">
        <div className="pointer-events-none absolute inset-0" />
        <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="relative z-10 mx-auto max-w-[900px] rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#a1a1aa]  sm:p-8">
            Loading your brand workspace...
          </div>
        </div>
      </PageFrame>
    )
  }

  if (!user) {
    return (
      <PageFrame className="px-3 py-3 sm:px-4 sm:py-4 lg:px-0">
        <div className="pointer-events-none absolute inset-0" />
        <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="relative z-10 mx-auto max-w-[900px] rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
            Please sign in to generate ads.
          </div>
        </div>
      </PageFrame>
    )
  }

  if (!activeBrandId) {
    return (
      <PageFrame className="px-3 py-3 sm:px-4 sm:py-4 lg:px-0">
        <div className="pointer-events-none absolute inset-0" />
        <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="relative z-10 mx-auto max-w-[900px] rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
            <h2 className="text-[20px] font-semibold text-white mb-2">No Active Brand</h2>
            <p className="text-[#a1a1aa] mb-6">You need to set up a brand before generating cinematic ad content.</p>
            <button
              onClick={() => navigate('/brands/new')}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#B8C2FF] hover:bg-[#C3C8FF] px-5 py-3 text-[15px] font-medium text-[#131318] transition"
            >
              Set up a Brand
            </button>
          </div>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame className="px-3 py-3 sm:px-4 sm:py-4 lg:px-0">
      <div className="pointer-events-none absolute inset-0" />
      <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <CreateHeader
          onBackToBrands={() => navigate('/brands')}
          onOpenMyStuff={() => navigate('/my-stuff')}
        />

        <main className="mt-8 sm:mt-10 lg:mt-12">
          <h1 className="text-[clamp(2.35rem,7vw,3.25rem)] font-semibold tracking-[0.00em] text-[#ffffff]">
            Create on-brand content
          </h1>
          <p className="mt-1 max-w-[760px] text-[16px] tracking-[-0.02em] text-[#7d7692] sm:text-[18px]">
            Use your saved brand DNA, uploaded assets, and audience profile to
            shape every new concept.
          </p>

          <div className="mt-6 grid gap-6 lg:mt-8 xl:grid-cols-[minmax(300px,460px)_minmax(0,1fr)] xl:gap-8">
            <CreateControlPanelSection
              brandData={brandData}
              prompt={prompt}
              onPromptChange={setPrompt}
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
              formatOptions={formatOptions}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              platformOptions={platformOptions}
              includedItems={included}
              onIncludeToggle={toggleIncluded}
              duration={duration}
              onDurationChange={setDuration}
              onGenerateClick={handleGenerate}
              isGenerating={isGenerating}
            />
            <CreatePreviewSection
              brandData={brandData}
              isGenerating={isGenerating}
              hasGenerated={hasGenerated}
              generationResult={generationResult}
              generationError={generationError}
              selectedPlatform={selectedPlatform}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-[13px] text-[#9991b1] sm:mt-8 sm:text-[14px]">
            <Lock className="h-4 w-4" />
            {helperCopy}
          </div>
        </main>
      </div>
    </PageFrame>
  )
}

export default CreatePage
