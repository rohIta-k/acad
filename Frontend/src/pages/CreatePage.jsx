import { Lock } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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
import CreateControlPanelSection from '../sections/CreateControlPanelSection'
import CreatePreviewSection from '../sections/CreatePreviewSection'
import { generateRunwayVideo } from '../utils/api'

function CreatePage() {
  const navigate = useNavigate()
  const [selectedFormat, setSelectedFormat] = useState('video')
  const [selectedPlatform, setSelectedPlatform] = useState('reel')
  const [duration, setDuration] = useState(10)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [generationResult, setGenerationResult] = useState(null)
  const [generationError, setGenerationError] = useState('')
  const { items: included, toggleItem: toggleIncluded } = useToggleList(includeOptions)

  const {
    user,
    brandData,
    activeBrandId,
    loading: brandLoading,
  } = useBrandStorage()

  useEffect(() => {
    if (brandLoading) return

    if (!user) {
      navigate('/')
      return
    }

    if (!activeBrandId) {
      navigate('/brands')
    }
  }, [activeBrandId, brandLoading, navigate, user])

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
          hasLogo: Boolean(brandData.logo?.dataUrl),
          hasMascot: Boolean(brandData.mascot?.dataUrl),
          referencesCount: brandData.references?.length || 0,
        },
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

  return (
    <PageFrame className="px-3 py-3 sm:px-4 sm:py-4 lg:px-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(137,92,255,0.14),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.96),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(252,173,205,0.12),transparent_28%)]" />
      <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <CreateHeader
          onBackToBrands={() => navigate('/brands')}
        />

        <main className="mt-6 sm:mt-10 lg:mt-12">
          <h1 className="bg-[linear-gradient(90deg,#5f36e9_0%,#e26db8_100%)] bg-clip-text text-[clamp(2.1rem,7vw,3.25rem)] font-semibold tracking-[-0.055em] text-transparent">
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
