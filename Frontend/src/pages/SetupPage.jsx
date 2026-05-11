import { ArrowRight, PencilLine } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SetupShell from '../components/layout/SetupShell'
import PageFrame from '../components/layout/PageFrame'
import SetupSidebar from '../components/navigation/SetupSidebar'
import {
  audienceOptions,
  createDefaultBrandData,
  createEmptyAsset,
  toneOptions,
} from '../data/brandData'
import { sidebarSteps } from '../data/navigation'
import { useBrandStorage } from '../hooks/useBrandStorage'
import SetupAudienceSection from '../sections/SetupAudienceSection'
import SetupHeaderSection from '../sections/SetupHeaderSection'
import SetupIdentitySection from '../sections/SetupIdentitySection'
import SetupPersonalitySection from '../sections/SetupPersonalitySection'
import SetupVisualStyleSection from '../sections/SetupVisualStyleSection'
import { useGenerationStorage } from '../hooks/useGenerationStorage'
import { generateRunwayMascot } from '../utils/api'
import { fileToDataUrl, isImageFile } from '../utils/fileUpload'

function BrandSetupEditor({
  initialDraft,
  isEditMode,
  brandId,
  navigate,
  persistBrandData,
  setActiveBrand,
  user,
  saveGeneration,
  error,
}) {
  const [step, setStep] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [draftData, setDraftData] = useState(initialDraft)
  const [isEditing] = useState(true)
  const [showValidation, setShowValidation] = useState(false)
  const [activePaletteIndex, setActivePaletteIndex] = useState(-1)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isMascotGenerating, setIsMascotGenerating] = useState(false)
  const [mascotError, setMascotError] = useState('')

  const validation = useMemo(() => {
    const brandNameValid = draftData.brandName.trim().length > 0
    const logoValid = Boolean(draftData.logo.dataUrl)
    const toneValid = Boolean(draftData.tone)
    const audienceValid = draftData.audience.length > 0
    const paletteValid =
      draftData.palette.length >= 3 && draftData.palette.length <= 5

    return {
      brandNameValid,
      logoValid,
      toneValid,
      audienceValid,
      paletteValid,
      isValid:
        brandNameValid &&
        logoValid &&
        toneValid &&
        audienceValid &&
        paletteValid,
    }
  }, [draftData])

  console.log(draftData);

  const updateDraftField = (field, value) => {
    setDraftData((current) => ({
      ...current,
      [field]: value,
      updatedAt: current.updatedAt,
    }))
  }

  const updateDraftAsset = (field, asset) => {
    setDraftData((current) => ({
      ...current,
      [field]: asset,
    }))
  }

  const updateMascotBrief = (value) => {
    setDraftData((current) => ({
      ...current,
      mascot: {
        ...current.mascot,
        brief: value,
      },
    }))
  }

  const updateDraftReferences = (references) => {
    setDraftData((current) => ({
      ...current,
      references,
    }))
  }

  const handleAssetUpload = async (field, file) => {
    if (!isImageFile(file)) return
    const asset = await fileToDataUrl(file)
    updateDraftAsset(field, asset)
  }

  const handleMascotGenerate = async () => {
    if (isMascotGenerating) return

    setIsMascotGenerating(true)
    setMascotError('')

    try {
      const result = await generateRunwayMascot({
        brandData: {
          brandName: draftData.brandName,
          tagline: draftData.tagline,
          tone: draftData.tone,
          audience: draftData.audience,
          palette: draftData.palette,
          logo: draftData.logo,
          mascot: draftData.mascot,
          references: draftData.references,
        },
      })

      const generatedMascot = {
        fileName: `${draftData.brandName || 'Brand'} mascot`,
        fileType: 'image/png',
        dataUrl: result.imageUrl || result.outputUrl || '',
        brief: draftData.mascot?.brief || '',
      }

      if (!generatedMascot.dataUrl) {
        throw new Error('Runway did not return a mascot image URL.')
      }

      updateDraftAsset('mascot', generatedMascot)

      if (user?.id) {
        await saveGeneration({
          brandId: brandId || null,
          brandName: draftData.brandName,
          prompt: generatedMascot.brief || `Mascot for ${draftData.brandName || 'brand'}`,
          format: 'image',
          platform: 'mascot',
          include: ['Mascot'],
          outputUrl: generatedMascot.dataUrl,
          imageUrl: generatedMascot.dataUrl,
          title: `${draftData.brandName || 'Brand'} mascot`,
          summary: 'Generated mascot saved to My Stuff.',
          rawResponse: result,
        })
      }

      if (isEditMode) {
        const savedBrand = await persistBrandData(
          {
            ...draftData,
            mascot: generatedMascot,
            updatedAt: new Date().toISOString(),
          },
          brandId,
        )

        setDraftData(savedBrand)
      }

    } catch (error) {
      setMascotError(error?.message || 'Unable to generate a mascot right now.')
    } finally {
      setIsMascotGenerating(false)
    }
  }

  const handleReferenceUpload = async (files) => {
    const nextAssets = await Promise.all(
      files.filter(isImageFile).map((file) => fileToDataUrl(file)),
    )

    if (nextAssets.length === 0) return

    updateDraftReferences([...draftData.references, ...nextAssets].slice(0, 6))
  }

  const toggleAudience = (value) => {
    const nextAudience = draftData.audience.includes(value)
      ? draftData.audience.filter((item) => item !== value)
      : [...draftData.audience, value]

    updateDraftField('audience', nextAudience)
  }

  const openPaletteEditor = (index) => {
    if (!isEditing) return
    setActivePaletteIndex(index)
  }

  const handleAddColor = () => {
    if (!isEditing || draftData.palette.length >= 5) return
    const nextPalette = [...draftData.palette, '#CBA8FF']
    setDraftData((current) => ({
      ...current,
      palette: nextPalette,
    }))
    setActivePaletteIndex(nextPalette.length - 1)
  }

  const handlePaletteColorChange = (value) => {
    setDraftData((current) => ({
      ...current,
      palette: current.palette.map((item, index) =>
        index === activePaletteIndex ? value : item,
      ),
    }))
  }

  const handleRemoveColor = (index) => {
    if (draftData.palette.length <= 3) return
    setDraftData((current) => ({
      ...current,
      palette: current.palette.filter((_, itemIndex) => itemIndex !== index),
    }))
    setActivePaletteIndex(-1)
  }

  const saveAndContinue = async () => {
    setShowValidation(true)
    if (!validation.isValid) return

    setIsSaving(true)
    setSaveError('')

    try {
      const savedBrand = await persistBrandData(
        {
          ...draftData,
          completedSetup: true,
          updatedAt: new Date().toISOString(),
        },
        isEditMode ? brandId : null,
      )

      setActiveBrand(savedBrand.id)
      navigate('/create')
    } catch (err) {
      setSaveError(err?.message || 'Failed to save your brand. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PageFrame className="p-3 sm:p-4 lg:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(137,92,255,0.15),transparent_22%),radial-gradient(circle_at_86%_20%,rgba(255,255,255,0.95),transparent_24%),radial-gradient(circle_at_75%_76%,rgba(251,174,206,0.12),transparent_25%)]" />
      <SetupShell
        sidebar={
          <SetupSidebar
            steps={sidebarSteps}
            activeStep={step}
            onStepChange={setStep}
            open={isSidebarOpen}
            onOpen={() => setIsSidebarOpen(true)}
            onClose={() => setIsSidebarOpen(false)}
          />
        }
      >
        <div className="flex min-h-full flex-col">
          <SetupHeaderSection />
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-end">
            {draftData.completedSetup && !isEditing ? (
              <button
                onClick={() => navigate('/brands')}
                className="inline-flex items-center gap-2 self-start rounded-[12px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[15px] font-medium text-[#e2e2e8] transition hover:border-[#B8C2FF] hover:bg-[#1D1E29] sm:self-auto"
              >
                <PencilLine className="h-4 w-4" />
                Back to Brands
              </button>
            ) : null}
          </div>

          <div className="mt-8 space-y-4">
            <div id="step-1" className="scroll-mt-24">
              <SetupIdentitySection
                brandName={draftData.brandName}
                logo={draftData.logo}
                mascot={draftData.mascot}
                mascotBrief={draftData.mascot?.brief || ''}
                isEditing={isEditing}
                brandNameError={
                  showValidation && !validation.brandNameValid
                    ? 'Add your brand name to continue.'
                    : ''
                }
                logoError={
                  showValidation && !validation.logoValid
                    ? 'Upload a logo before continuing.'
                    : ''
                }
                mascotError={mascotError}
                onBrandNameChange={(value) => updateDraftField('brandName', value)}
                onLogoUpload={(file) => handleAssetUpload('logo', file)}
                onMascotUpload={(file) => handleAssetUpload('mascot', file)}
                onMascotGenerate={handleMascotGenerate}
                onMascotBriefChange={updateMascotBrief}
                onLogoRemove={() => updateDraftAsset('logo', createEmptyAsset())}
                onMascotRemove={() => updateDraftAsset('mascot', createEmptyAsset())}
                isMascotGenerating={isMascotGenerating}
              />
            </div>
            <div id="step-2" className="scroll-mt-24">
              <SetupPersonalitySection
                tagline={draftData.tagline}
                tone={draftData.tone}
                toneOptions={toneOptions}
                isEditing={isEditing}
                toneError={
                  showValidation && !validation.toneValid
                    ? 'Select the tone that best represents your brand.'
                    : ''
                }
                onTaglineChange={(value) => updateDraftField('tagline', value)}
                onToneChange={(value) => updateDraftField('tone', value)}
              />
            </div>
            <div id="step-3" className="scroll-mt-24">
              <SetupVisualStyleSection
                palette={draftData.palette}
                references={draftData.references}
                isEditing={isEditing}
                paletteError={
                  showValidation && !validation.paletteValid
                    ? 'Choose between 3 and 5 brand colors.'
                    : ''
                }
                activePaletteIndex={activePaletteIndex}
                onAddPaletteColor={handleAddColor}
                onUpdatePaletteColor={openPaletteEditor}
                onRemovePaletteColor={handleRemoveColor}
                onPaletteEditorClose={() => setActivePaletteIndex(-1)}
                onPaletteColorChange={handlePaletteColorChange}
                onReferenceUpload={handleReferenceUpload}
                onReferenceRemove={(index) =>
                  updateDraftReferences(
                    draftData.references.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              />
            </div>
            <div id="step-4" className="scroll-mt-24">
              <SetupAudienceSection
                audienceOptions={audienceOptions}
                selectedAudience={draftData.audience}
                isEditing={isEditing}
                audienceError={
                  showValidation && !validation.audienceValid
                    ? 'Choose at least one audience segment.'
                    : ''
                }
                onAudienceToggle={toggleAudience}
              />
            </div>
          </div>

          <div className="mt-auto pt-6">
            {!validation.isValid && showValidation ? (
              <div className="mb-4 rounded-[16px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
                Complete the required brand details before continuing.
              </div>
            ) : null}
            {error ? (
              <div className="mb-4 rounded-[16px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
                {error}
              </div>
            ) : null}
            {saveError ? (
              <div className="mb-4 rounded-[16px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
                {saveError}
              </div>
            ) : null}
            <button
              onClick={saveAndContinue}
              disabled={!validation.isValid}
              className={`flex min-h-[58px] w-full items-center justify-center gap-3 rounded-[12px] px-6 py-4 text-center text-[16px] font-medium tracking-[-0.02em] shadow-[0_18px_48px_rgba(125,85,255,0.26)] transition duration-300 sm:px-8 sm:text-[17px] ${validation.isValid
                ? 'bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] text-white hover:-translate-y-0.5 hover:shadow-[0_22px_58px_rgba(125,85,255,0.34)] active:scale-[0.995]'
                : 'cursor-not-allowed bg-[linear-gradient(90deg,#cbb7ff_0%,#edc6de_100%)] text-white/85 shadow-none'
                }`}
            >
              {isSaving ? 'Saving brand...' : 'Save Brand & Start Creating'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SetupShell>
    </PageFrame>
  )
}

function SetupPage() {
  const navigate = useNavigate()
  const { brandId } = useParams()
  const isEditMode = Boolean(brandId)
  const { user, brands, loading, error, persistBrandData, setActiveBrand } = useBrandStorage()
  const { saveGeneration } = useGenerationStorage(user)

  const selectedBrand = useMemo(() => {
    if (!isEditMode) return null
    return brands.find((item) => item.id === brandId) || null
  }, [brandId, brands, isEditMode])

  if (loading) {
    return (
      <PageFrame className="p-6 sm:p-8">
        <div className="relative z-10 mx-auto max-w-[900px] rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
          Loading your brand workspace...
        </div>
      </PageFrame>
    )
  }

  if (!user) {
    return (
      <PageFrame className="p-6 sm:p-8">
        <div className="relative z-10 mx-auto max-w-[900px] rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
          Please sign in to create and manage your brands.
        </div>
      </PageFrame>
    )
  }

  if (isEditMode && !selectedBrand) {
    return (
      <PageFrame className="p-6 sm:p-8">
        <div className="relative z-10 mx-auto max-w-[900px] rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
          <p>This brand no longer exists in your account.</p>
          <button
            onClick={() => navigate('/brands')}
            className="mt-4 inline-flex items-center gap-2 rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[14px] font-medium text-[#e2e2e8]"
          >
            Back to Brands
          </button>
        </div>
      </PageFrame>
    )
  }

  return (
    <BrandSetupEditor
      key={brandId || 'new'}
      initialDraft={selectedBrand || createDefaultBrandData()}
      isEditMode={isEditMode}
      brandId={brandId}
      navigate={navigate}
      persistBrandData={persistBrandData}
      setActiveBrand={setActiveBrand}
      user={user}
      saveGeneration={saveGeneration}
      error={error}
    />
  )
}

export default SetupPage