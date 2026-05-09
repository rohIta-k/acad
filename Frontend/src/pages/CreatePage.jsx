import { Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
import PageFrame from '../components/layout/PageFrame'
import CreateHeader from '../components/navigation/CreateHeader'
import { defaultPromptCopy, includeOptions } from '../data/brandData'
import {
  appTabs,
  formatOptions,
  platformOptions,
  profileMenuItems,
} from '../data/navigation'
import { useBrandStorage } from '../hooks/useBrandStorage'
import { useToggleList } from '../hooks/useToggleList'
import CreateControlPanelSection from '../sections/CreateControlPanelSection'
import CreatePreviewSection from '../sections/CreatePreviewSection'

function CreatePage({ navigate }) {
  const [selectedFormat, setSelectedFormat] = useState('video')
  const [selectedPlatform, setSelectedPlatform] = useState('reel')
  const [duration, setDuration] = useState(20)
  const [activeTab, setActiveTab] = useState('Preview')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [prompt, setPrompt] = useState(defaultPromptCopy)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const { items: included, toggleItem: toggleIncluded } = useToggleList(includeOptions)
  const { brandData } = useBrandStorage()

  const handleGenerate = () => {
    setIsGenerating(true)

    window.setTimeout(() => {
      setIsGenerating(false)
      setHasGenerated(true)
    }, 1200)
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
          navigate={navigate}
          menuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((value) => !value)}
          menuItems={profileMenuItems}
          onMenuItemClick={() => setIsMenuOpen(false)}
          onBackToSetup={() => navigate('/setup')}
        />

        <main className="mt-8 sm:mt-10 lg:mt-12">
          <h1 className="text-[clamp(2.35rem,7vw,3.25rem)] font-semibold tracking-[-0.06em] text-[#131129]">
            Create on-brand content
          </h1>
          <p className="mt-1 max-w-[760px] text-[16px] tracking-[-0.02em] text-[#7d7692] sm:text-[18px]">
            Use your saved brand DNA, uploaded assets, and audience profile to
            shape every new concept.
          </p>

          <div className="mt-6 grid gap-6 lg:mt-8 xl:grid-cols-[minmax(340px,580px)_minmax(0,1fr)] xl:gap-8">
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
            />
            <CreatePreviewSection
              tabs={appTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              brandData={brandData}
              isGenerating={isGenerating}
              hasGenerated={hasGenerated}
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
